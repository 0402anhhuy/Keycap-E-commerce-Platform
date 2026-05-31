import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProductCard from "../../components/ProductCard";
import Header from "../../components/user/Header";
import Footer from "../../components/user/Footer";
import Breadcrumb from "../../components/Breadcrumb";
import { useCart } from "../../context/CartContext";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:3000";

const normalizeArray = (data) => {
    if (Array.isArray(data)) return data;
    if (Array.isArray(data?.products)) return data.products;
    if (Array.isArray(data?.data)) return data.data;
    return [];
};

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();

    const [product, setProduct] = useState(null);
    const [similarProducts, setSimilarProducts] = useState([]);
    const [similarStartIndex, setSimilarStartIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const handleNextSimilar = () => {
        if (similarStartIndex + 3 < similarProducts.length) {
            setSimilarStartIndex((prev) => prev + 1);
        }
    };

    const handlePrevSimilar = () => {
        if (similarStartIndex > 0) {
            setSimilarStartIndex((prev) => prev - 1);
        }
    };

    // Interactive states
    const [selectedColor, setSelectedColor] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [adding, setAdding] = useState(false);
    const [success, setSuccess] = useState(false);

    // Engagement & History states
    const [recentlyViewed, setRecentlyViewed] = useState([]);
    const [isFavorite, setIsFavorite] = useState(false);

    // Reviews states
    const [reviews, setReviews] = useState([]);
    const [loadingReviews, setLoadingReviews] = useState(true);
    const [eligibleOrder, setEligibleOrder] = useState(null);

    // Form inputs
    const [ratingInput, setRatingInput] = useState(5);
    const [commentInput, setCommentInput] = useState("");
    const [imagesInput, setImagesInput] = useState("");
    const [submittingReview, setSubmittingReview] = useState(false);
    const [reviewMessage, setReviewMessage] = useState("");

    // UI states
    const [expandedSpec, setExpandedSpec] = useState("Product Details");
    const [ratingFilter, setRatingFilter] = useState("4.8");

    const fetchProductReviews = async () => {
        try {
            setLoadingReviews(true);
            const res = await fetch(`${API_BASE}/api/reviews/product/${id}`);
            const data = await res.json();
            if (res.ok) setReviews(data.reviews || []);
        } catch (e) {
            console.error(e);
        } finally {
            setLoadingReviews(false);
        }
    };

    const checkEligibility = async () => {
        const token = localStorage.getItem("accessToken");
        if (!token) return;
        try {
            const res = await fetch(`${API_BASE}/api/orders`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const orders = await res.json();
            if (res.ok && Array.isArray(orders)) {
                const eligible = orders.find(
                    (o) =>
                        o.status === "delivered" &&
                        o.items?.some(
                            (item) => Number(item.productId) === Number(id),
                        ),
                );
                if (eligible) {
                    setEligibleOrder(eligible);
                }
            }
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        const controller = new AbortController();

        const load = async () => {
            try {
                setLoading(true);
                setError("");
                setQuantity(1);
                setSuccess(false);

                const res = await fetch(`${API_BASE}/api/products/${id}`, {
                    signal: controller.signal,
                });

                if (!res.ok) throw new Error("Load product failed");

                const data = await res.json();
                setProduct(data);

                // Set default color if available
                if (data.colors && data.colors.length > 0) {
                    setSelectedColor(data.colors[0].label);
                } else {
                    setSelectedColor("");
                }

                // Fetch similar products recommendation from custom endpoint
                try {
                    const r = await fetch(
                        `${API_BASE}/api/products/${id}/similar`,
                        { signal: controller.signal },
                    );
                    if (r.ok) {
                        const simData = await r.json();
                        setSimilarProducts(simData);
                        setSimilarStartIndex(0);
                    } else {
                        setSimilarProducts([]);
                        setSimilarStartIndex(0);
                    }
                } catch (e) {
                    setSimilarProducts([]);
                    setSimilarStartIndex(0);
                }

                fetchProductReviews();
                checkEligibility();
            } catch (err) {
                if (err.name !== "AbortError") {
                    setError(err.message || "Error");
                }
            } finally {
                setLoading(false);
            }
        };

        load();
        return () => controller.abort();
    }, [id]);

    const [activeImage, setActiveImage] = useState(0);
    const [showCarousel, setShowCarousel] = useState(false);

    useEffect(() => {
        setActiveImage(0);
        setShowCarousel(false);
    }, [id]);

    const images = useMemo(() => {
        if (!product) return [];
        if (Array.isArray(product.images)) return product.images;
        if (typeof product.images === "string") {
            try {
                return JSON.parse(product.images);
            } catch {
                return [];
            }
        }
        return product.image ? [product.image] : [];
    }, [product]);

    // When selectedColor changes, show the image at the same index (assumes images array ordered by color)
    useEffect(() => {
        if (!product || !product.colors || !selectedColor) return;
        const idx = product.colors.findIndex((c) => c.label === selectedColor);
        if (idx >= 0 && images[idx]) {
            setActiveImage(idx);
        }
    }, [selectedColor, product, images]);

    // Check wishlist status on mount/product change
    useEffect(() => {
        if (!product) return;

        const token = localStorage.getItem("accessToken");
        if (token) {
            fetch(`${API_BASE}/api/wishlists`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((res) => res.json())
                .then((data) => {
                    const list = normalizeArray(data);
                    setIsFavorite(
                        list.some((p) => String(p.id) === String(product.id)),
                    );
                })
                .catch(() => {
                    let favorites = [];
                    try {
                        const raw = localStorage.getItem("wishlist");
                        favorites = raw ? JSON.parse(raw) : [];
                    } catch (e) {
                        favorites = [];
                    }
                    setIsFavorite(
                        favorites.some(
                            (fav) => String(fav.id) === String(product.id),
                        ),
                    );
                });
        } else {
            let favorites = [];
            try {
                const raw = localStorage.getItem("wishlist");
                favorites = raw ? JSON.parse(raw) : [];
            } catch (e) {
                favorites = [];
            }
            setIsFavorite(
                favorites.some((fav) => String(fav.id) === String(product.id)),
            );
        }
    }, [product]);

    // Track recently viewed history
    useEffect(() => {
        if (!product) return;

        let items = [];
        try {
            const raw = localStorage.getItem("recentlyViewed");
            items = raw ? JSON.parse(raw) : [];
        } catch (e) {
            items = [];
        }

        // Remove duplicate of current product if it exists
        items = items.filter((item) => String(item.id) !== String(product.id));

        // Add current product details
        const newItem = {
            id: product.id,
            title: product.title,
            price: product.price,
            originalPrice: product.originalPrice,
            category: product.category,
            colors: product.colors,
            image: images[0] || product.image,
            rating: product.rating,
        };
        items.unshift(newItem);

        // Keep only top 10 items
        items = items.slice(0, 10);

        localStorage.setItem("recentlyViewed", JSON.stringify(items));

        // Filter out current product to display in list below
        setRecentlyViewed(
            items.filter((item) => String(item.id) !== String(product.id)),
        );
    }, [product, images]);

    const toggleFavorite = async () => {
        if (!product) return;
        const token = localStorage.getItem("accessToken");
        if (token) {
            try {
                const res = await fetch(
                    `${API_BASE}/api/wishlists/${product.id}`,
                    {
                        method: "POST",
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    },
                );
                if (res.ok) {
                    const result = await res.json();
                    setIsFavorite(!!result.added);
                    return;
                }
            } catch (e) {
                console.error(
                    "Backend wishlist toggle failed, using local storage",
                    e,
                );
            }
        }

        let favorites = [];
        try {
            const raw = localStorage.getItem("wishlist");
            favorites = raw ? JSON.parse(raw) : [];
        } catch (e) {
            favorites = [];
        }

        const exists = favorites.some(
            (fav) => String(fav.id) === String(product.id),
        );
        if (exists) {
            favorites = favorites.filter(
                (fav) => String(fav.id) !== String(product.id),
            );
            setIsFavorite(false);
        } else {
            favorites.push({
                id: product.id,
                title: product.title,
                price: product.price,
                image: images[0] || product.image,
                rating: product.rating,
            });
            setIsFavorite(true);
        }
        localStorage.setItem("wishlist", JSON.stringify(favorites));
    };

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        if (!commentInput.trim()) return;

        setSubmittingReview(true);
        setReviewMessage("");
        const token = localStorage.getItem("accessToken");

        try {
            const res = await fetch(`${API_BASE}/api/reviews/product`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    productId: Number(id),
                    orderId: eligibleOrder.id,
                    rating: Number(ratingInput),
                    comment: commentInput.trim(),
                    images: imagesInput
                        .split(",")
                        .map((i) => i.trim())
                        .filter(Boolean),
                }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Đánh giá thất bại.");

            setReviewMessage(
                `🎉 Đánh giá thành công! Bạn nhận được +${data.rewardPoints || 10} điểm tích lũy và mã giảm giá ${data.rewardCouponCode || ""}`,
            );
            setCommentInput("");
            setImagesInput("");
            setEligibleOrder(null);
            fetchProductReviews();
        } catch (err) {
            setReviewMessage(`❌ Lỗi: ${err.message}`);
        } finally {
            setSubmittingReview(false);
        }
    };

    const handleQuantityChange = (val) => {
        if (val < 1) return;
        setQuantity(val);
    };

    const handleAddToCart = async () => {
        if (adding) return;
        setAdding(true);
        try {
            await addToCart(product.id, quantity, selectedColor);
            setSuccess(true);
            setTimeout(() => setSuccess(false), 2000);
        } catch (err) {
            alert(err.message || "Lỗi thêm giỏ hàng");
        } finally {
            setAdding(false);
        }
    };

    const handleBuyNow = async () => {
        try {
            await addToCart(product.id, quantity, selectedColor);
            navigate("/checkout");
        } catch (err) {
            alert(err.message || "Lỗi mua ngay");
        }
    };

    if (loading) return <div className="p-4">Loading...</div>;
    if (error) return <div className="p-4 text-red-500">{error}</div>;
    if (!product) return <div className="p-4">Not found</div>;

    return (
        <div className="min-h-screen text-black relative">
            <Header />

            <div className="max-w-[1400px] mx-auto px-6 pt-[90px] md:pt-[100px] pb-4">
                <Breadcrumb
                    items={[
                        { label: "Homepage", to: "/" },
                        { label: "Product", to: "/products" },
                        { label: product.title },
                    ]}
                />
            </div>

            <div className="relative z-20 flex flex-col min-h-screen">
                <main className="max-w-[1400px] mx-auto px-6 pb-24 w-full flex-1">
                    <div className="flex flex-col lg:flex-row justify-between gap-12 lg:gap-16">
                        {/* Left: Images & Details */}
                        <div className="flex-1 min-w-0 flex flex-col">
                            {/* Main Image */}
                            <div
                                className="w-full bg-[#f8f8f8] aspect-[4/3] relative flex items-center justify-center p-8 mb-4 border-2 border-black cursor-pointer shadow-[8px_8px_0_rgba(0,0,0,1)] transition-transform hover:-translate-y-1 hover:translate-x-1"
                                onClick={() => setShowCarousel(true)}
                            >
                                <img
                                    src={images[activeImage] || images[0]}
                                    alt={product.title}
                                    className="w-full h-full object-contain drop-shadow-2xl"
                                />
                            </div>

                            {/* Thumbnails */}
                            {images.length > 1 && (
                                <div
                                    className="flex gap-4 overflow-x-auto pb-4 pt-2 justify-start"
                                    style={{ scrollbarWidth: "none" }}
                                >
                                    {images.map((img, idx) => (
                                        <div
                                            key={idx}
                                            onClick={() => setActiveImage(idx)}
                                            className={`relative w-24 h-24 flex-shrink-0 bg-[#f8f8f8] overflow-hidden cursor-pointer border-2 transition-all hover:shadow-[4px_4px_0_rgba(0,0,0,1)] hover:-translate-y-1 ${activeImage === idx ? "border-black shadow-[4px_4px_0_rgba(0,0,0,1)] -translate-y-1" : "border-black/20"}`}
                                        >
                                            <img
                                                src={img}
                                                alt={`Thumbnail ${idx}`}
                                                className="w-full h-full object-contain p-2"
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* SPECIFICATION SECTION */}
                            <div className="mt-16 pt-10 pb-8 lg:pr-10">
                                <h2
                                    className="text-4xl md:text-[44px] font-black uppercase mb-6 tracking-wide"
                                    style={{ fontFamily: "Anton, sans-serif" }}
                                >
                                    Specification
                                </h2>
                                <div className="border-t border-black/20">
                                    {[
                                        "Product Details",
                                        "Inside the package",
                                        "Delivery & shipping",
                                    ].map((spec) => (
                                        <div
                                            key={spec}
                                            className="border-b border-black/20"
                                        >
                                            <button
                                                onClick={() =>
                                                    setExpandedSpec(
                                                        expandedSpec === spec
                                                            ? null
                                                            : spec,
                                                    )
                                                }
                                                className="w-full py-4 flex items-center text-left uppercase font-bold text-sm tracking-widest hover:bg-black/5 transition-colors cursor-pointer"
                                            >
                                                <span className="text-xl font-normal w-6 leading-none inline-block">
                                                    {expandedSpec === spec
                                                        ? "−"
                                                        : "+"}
                                                </span>{" "}
                                                {spec}
                                            </button>
                                            <div
                                                className={`overflow-hidden transition-all duration-300 ${expandedSpec === spec ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
                                            >
                                                <div className="p-4 pt-0 text-sm text-black/70 leading-relaxed pl-6">
                                                    {spec ===
                                                        "Product Details" && (
                                                        <ul className="list-disc pl-5 space-y-1">
                                                            <li>
                                                                Chất liệu: Resin
                                                                cao cấp
                                                            </li>
                                                            <li>
                                                                Profile: SA R1
                                                            </li>
                                                            <li>
                                                                Stem: Cherry MX
                                                            </li>
                                                            <li>
                                                                Sơn thủ công với
                                                                độ chi tiết cao
                                                            </li>
                                                        </ul>
                                                    )}
                                                    {spec ===
                                                        "Inside the package" && (
                                                        <ul className="list-disc pl-5 space-y-1">
                                                            <li>
                                                                1x Keycap
                                                                Artisan
                                                            </li>
                                                            <li>
                                                                1x Hộp đựng bảo
                                                                vệ
                                                            </li>
                                                            <li>
                                                                Thẻ chứng nhận
                                                                (nếu có)
                                                            </li>
                                                        </ul>
                                                    )}
                                                    {spec ===
                                                        "Delivery & shipping" && (
                                                        <p>
                                                            Thời gian chuẩn bị:
                                                            1-2 ngày làm việc.
                                                            <br />
                                                            Thời gian vận
                                                            chuyển: 2-4 ngày tùy
                                                            khu vực.
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* HAPPY OWNERS SECTION */}
                            <div className="mt-12 mb-20 pr-10">
                                <h2
                                    className="text-4xl md:text-[44px] font-black uppercase mb-6 tracking-wide"
                                    style={{ fontFamily: "Anton, sans-serif" }}
                                >
                                    Happy Owners
                                </h2>

                                {/* Rating filter */}
                                <div className="relative mb-8">
                                    <div className="absolute right-0 top-0 flex -space-x-2 -mt-10 mr-4">
                                        <div className="w-12 h-12 rounded-full bg-[#F17336] border-2 border-[#d8d8d8] shadow-md flex items-center justify-center text-xl z-30">
                                            🦊
                                        </div>
                                        <div className="w-12 h-12 rounded-full bg-[#F17336] border-2 border-[#d8d8d8] shadow-md flex items-center justify-center text-xl z-20">
                                            🦊
                                        </div>
                                        <div className="w-12 h-12 rounded-full bg-[#F17336] border-2 border-[#d8d8d8] shadow-md flex items-center justify-center text-xl z-10">
                                            🦊
                                        </div>
                                    </div>
                                    <button className="w-full border border-black/20 bg-black/5 py-3 px-4 flex justify-between items-center text-sm font-bold uppercase tracking-widest cursor-pointer hover:bg-black/10 transition-colors">
                                        <span>
                                            Rating Filter: {ratingFilter}{" "}
                                            <span className="text-[#F17336] text-lg leading-none align-middle ml-1">
                                                ★
                                            </span>
                                        </span>
                                        <svg
                                            className="w-5 h-5"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M19 9l-7 7-7-7"
                                            ></path>
                                        </svg>
                                    </button>
                                </div>

                                {/* Review Form (if eligible) */}
                                {eligibleOrder && (
                                    <div className="border border-black/10 p-6 mb-8 relative bg-white/40 backdrop-blur-sm">
                                        <h3 className="font-black text-lg text-black mb-1 uppercase tracking-wider">
                                            Gửi đánh giá của bạn
                                        </h3>
                                        <p className="text-xs text-black/60 mb-4">
                                            Bạn đã nhận được sản phẩm từ đơn
                                            hàng #{eligibleOrder.id}. Chia sẻ
                                            cảm nhận để nhận ưu đãi tích điểm
                                            nhé!
                                        </p>

                                        {reviewMessage && (
                                            <div className="mb-4 p-3 bg-black/5 border border-black/10 text-xs font-semibold">
                                                {reviewMessage}
                                            </div>
                                        )}

                                        <form
                                            onSubmit={handleReviewSubmit}
                                            className="space-y-4"
                                        >
                                            <div className="flex items-center gap-3">
                                                <span className="text-xs font-bold text-black/60 uppercase tracking-wider">
                                                    Điểm đánh giá:
                                                </span>
                                                <div className="flex gap-1.5 text-xl">
                                                    {[1, 2, 3, 4, 5].map(
                                                        (star) => (
                                                            <button
                                                                key={star}
                                                                type="button"
                                                                onClick={() =>
                                                                    setRatingInput(
                                                                        star,
                                                                    )
                                                                }
                                                                className={`transition-transform active:scale-95 cursor-pointer ${star <= ratingInput ? "text-[#F17336]" : "text-black/20"}`}
                                                            >
                                                                ★
                                                            </button>
                                                        ),
                                                    )}
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-xs font-bold text-black/60 mb-1 uppercase tracking-wider">
                                                    Bình luận của bạn
                                                </label>
                                                <textarea
                                                    value={commentInput}
                                                    onChange={(e) =>
                                                        setCommentInput(
                                                            e.target.value,
                                                        )
                                                    }
                                                    placeholder="Sản phẩm rất tốt, giao hàng nhanh, phục vụ chu đáo..."
                                                    rows={3}
                                                    className="w-full border border-black/20 px-4 py-2 text-sm focus:outline-none focus:border-black bg-transparent resize-none"
                                                    required
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-xs font-bold text-black/60 mb-1 uppercase tracking-wider">
                                                    Hình ảnh (URLs cách nhau bởi
                                                    dấu phẩy - tùy chọn)
                                                </label>
                                                <input
                                                    type="text"
                                                    value={imagesInput}
                                                    onChange={(e) =>
                                                        setImagesInput(
                                                            e.target.value,
                                                        )
                                                    }
                                                    placeholder="https://example.com/image.jpg"
                                                    className="w-full border border-black/20 px-4 py-2 text-sm focus:outline-none focus:border-black bg-transparent"
                                                />
                                            </div>

                                            <button
                                                type="submit"
                                                disabled={submittingReview}
                                                className="px-6 py-2.5 bg-[#F17336] hover:bg-[#D55F2A] text-white font-bold text-xs shadow-xs transition-colors cursor-pointer uppercase tracking-wider"
                                            >
                                                {submittingReview
                                                    ? "Đang gửi..."
                                                    : "Gửi đánh giá"}
                                            </button>
                                        </form>
                                    </div>
                                )}

                                {/* Reviews List */}
                                {loadingReviews ? (
                                    <div className="flex justify-center py-6">
                                        <div className="animate-spin w-6 h-6 border-2 border-[#F17336] border-t-transparent rounded-full" />
                                    </div>
                                ) : reviews.length === 0 ? (
                                    <p className="text-black/50 text-sm italic py-4">
                                        Chưa có đánh giá nào cho sản phẩm này.
                                    </p>
                                ) : (
                                    <div className="space-y-8">
                                        {reviews.map((rev) => (
                                            <div
                                                key={rev.id}
                                                className="flex gap-4 border-b border-black/10 pb-8"
                                            >
                                                <div className="w-10 h-10 rounded-full bg-[#F17336] border-2 border-[#d8d8d8] flex items-center justify-center text-lg shrink-0 mt-1 shadow-sm">
                                                    🦊
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex justify-between items-start">
                                                        <div>
                                                            <h4 className="font-bold text-black text-[15px]">
                                                                {rev.user
                                                                    ?.name ||
                                                                    "Người mua ẩn danh"}
                                                            </h4>
                                                            <p className="text-black/60 text-xs mt-1 leading-relaxed max-w-[80%]">
                                                                {rev.comment}
                                                            </p>

                                                            {rev.vendorReply && (
                                                                <div className="mt-3.5 bg-black/5 p-3 text-xs text-left">
                                                                    <p className="font-bold text-black/80 uppercase tracking-wider mb-1">
                                                                        Phản hồi
                                                                        từ người
                                                                        bán:
                                                                    </p>
                                                                    <p className="text-black/60 leading-relaxed">
                                                                        {
                                                                            rev.vendorReply
                                                                        }
                                                                    </p>
                                                                </div>
                                                            )}

                                                            <p className="text-[9px] text-black/40 mt-2 font-bold uppercase tracking-wider">
                                                                {new Date(
                                                                    rev.createdAt,
                                                                ).toLocaleDateString(
                                                                    "en-US",
                                                                    {
                                                                        month: "short",
                                                                        day: "numeric",
                                                                        year: "numeric",
                                                                    },
                                                                )}{" "}
                                                                {new Date(
                                                                    rev.createdAt,
                                                                ).toLocaleTimeString(
                                                                    "en-US",
                                                                    {
                                                                        hour: "numeric",
                                                                        minute: "2-digit",
                                                                    },
                                                                )}
                                                            </p>
                                                        </div>
                                                        <div className="flex gap-[2px] text-[#F17336] text-sm">
                                                            {[
                                                                1, 2, 3, 4, 5,
                                                            ].map((star) => (
                                                                <span
                                                                    key={star}
                                                                    className={
                                                                        star <=
                                                                        rev.rating
                                                                            ? "opacity-100"
                                                                            : "opacity-30"
                                                                    }
                                                                >
                                                                    ★
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>

                                                    {rev.images &&
                                                        rev.images.length >
                                                            0 && (
                                                            <div className="flex gap-3 mt-4">
                                                                {rev.images.map(
                                                                    (
                                                                        img,
                                                                        i,
                                                                    ) => (
                                                                        <div
                                                                            key={
                                                                                i
                                                                            }
                                                                            className="w-24 h-24 bg-black/10"
                                                                        >
                                                                            <img
                                                                                src={
                                                                                    img.startsWith(
                                                                                        "http",
                                                                                    )
                                                                                        ? img
                                                                                        : `${API_BASE}${img}`
                                                                                }
                                                                                className="w-full h-full object-cover"
                                                                            />
                                                                        </div>
                                                                    ),
                                                                )}
                                                            </div>
                                                        )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Right: Info */}
                        <div className="w-full lg:w-[420px] flex flex-col items-end shrink-0 relative h-full">
                            <button
                                onClick={toggleFavorite}
                                className={`mb-4 px-5 py-2 border-2 flex items-center gap-2 text-sm font-bold uppercase transition-all cursor-pointer tracking-widest ${
                                    isFavorite
                                        ? "bg-black text-white border-black"
                                        : "bg-transparent text-black border-black hover:bg-black hover:text-white hover:-translate-y-[2px] hover:shadow-[4px_4px_0_rgba(0,0,0,1)]"
                                }`}
                            >
                                <span className="text-lg leading-none">
                                    {isFavorite ? "−" : "+"}
                                </span>{" "}
                                WISHLIST
                            </button>

                            <div className="w-full bg-white border-2 border-black shadow-[8px_8px_0_rgba(0,0,0,1)] relative flex flex-col text-left sticky top-24 z-30">
                                <div className="p-8 pb-6">
                                    <h1
                                        className="text-[32px] font-black leading-tight tracking-wide text-black"
                                        style={{
                                            fontFamily: "Anton, sans-serif",
                                        }}
                                    >
                                        {product.title}
                                    </h1>

                                    <div className="text-2xl font-bold text-black mt-2">
                                        $
                                        {Number(product.price).toLocaleString()}
                                        {product.originalPrice &&
                                            product.originalPrice >
                                                product.price && (
                                                <span className="text-xl text-black/40 line-through ml-3 font-medium">
                                                    $
                                                    {Number(
                                                        product.originalPrice,
                                                    ).toLocaleString()}
                                                </span>
                                            )}
                                    </div>

                                    {/* Colors / Skin */}
                                    <div className="mt-10 border-t-2 border-black/10 pt-6">
                                        <div className="flex justify-between items-center mb-4">
                                            <div className="text-xl font-bold text-black">
                                                Skin
                                            </div>
                                            <div className="text-sm text-black/60">
                                                {product.colors
                                                    ? product.colors.length
                                                    : 0}{" "}
                                                skins
                                            </div>
                                        </div>
                                        <div className="text-sm text-black/60 mb-2">
                                            {selectedColor || "--"}
                                        </div>
                                        <div className="flex gap-4">
                                            {product.colors &&
                                            product.colors.length > 0 ? (
                                                product.colors.map((c, i) => (
                                                    <div
                                                        key={i}
                                                        title={c.label}
                                                        onClick={() => {
                                                            setSelectedColor(
                                                                c.label,
                                                            );
                                                            if (images[i])
                                                                setActiveImage(
                                                                    i,
                                                                );
                                                        }}
                                                        className={`w-16 h-16 overflow-hidden transition-all cursor-pointer flex items-center justify-center border-2 ${selectedColor === c.label ? "border-black shadow-[4px_4px_0_rgba(0,0,0,1)] -translate-y-1" : "border-black/20 hover:border-black hover:-translate-y-1"}`}
                                                        style={{
                                                            backgroundColor:
                                                                images[i]
                                                                    ? "transparent"
                                                                    : c.value,
                                                        }}
                                                    >
                                                        {images[i] ? (
                                                            <img
                                                                src={images[i]}
                                                                alt={c.label}
                                                                className="w-full h-full object-cover p-1"
                                                            />
                                                        ) : (
                                                            <div className="text-[10px] text-black font-bold text-center p-1">
                                                                {c.label}
                                                            </div>
                                                        )}
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="text-sm text-black/40">
                                                    Không có phân loại màu sắc
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Bottom bar with Quantity and Add to Cart */}
                                <div className="bg-[#f8f8f8] p-8 pt-6 pb-8 border-t-2 border-black">
                                    <div className="flex items-center gap-4 relative">
                                        <div className="text-[var(--theme-accent)] text-[11px] font-bold mb-2 absolute -top-5 tracking-widest uppercase whitespace-nowrap">
                                            {product.stock > 0
                                                ? `${product.stock} INSTOCKS`
                                                : "10 INSTOCKS"}
                                        </div>
                                        <div className="flex items-center border-2 border-black h-[52px] bg-white w-24 shrink-0 relative mt-1">
                                            <button
                                                onClick={() =>
                                                    handleQuantityChange(
                                                        quantity - 1,
                                                    )
                                                }
                                                className="w-8 h-full flex items-center justify-center text-black hover:bg-black/5 transition-colors text-lg"
                                            >
                                                −
                                            </button>
                                            <div className="w-[2px] h-[100%] bg-black"></div>
                                            <input
                                                type="text"
                                                value={quantity}
                                                readOnly
                                                className="flex-1 h-full text-center border-none bg-transparent focus:outline-none text-base font-bold text-black w-8"
                                            />
                                            <div className="w-[2px] h-[100%] bg-black"></div>
                                            <button
                                                onClick={() =>
                                                    handleQuantityChange(
                                                        quantity + 1,
                                                    )
                                                }
                                                className="w-8 h-full flex items-center justify-center text-black hover:bg-black/5 transition-colors text-lg"
                                            >
                                                +
                                            </button>
                                        </div>

                                        <div className="flex-1 relative top-[2px]">
                                            <button
                                                onClick={handleAddToCart}
                                                disabled={adding}
                                                className="w-full bg-[var(--theme-accent)] hover:bg-black text-white font-black h-[52px] flex items-center justify-center gap-2 transition-all transform hover:-translate-y-[2px] active:scale-95 disabled:opacity-70 border-2 border-black shadow-[4px_4px_0_rgba(0,0,0,1)] hover:shadow-[6px_6px_0_rgba(0,0,0,1)]"
                                            >
                                                <span className="text-[15px] leading-tight tracking-widest uppercase">
                                                    {adding
                                                        ? "ĐANG THÊM..."
                                                        : success
                                                          ? "ĐÃ THÊM ✓"
                                                          : "ADD TO CART"}
                                                </span>
                                                {!adding && !success && (
                                                    <svg
                                                        className="w-5 h-5 ml-1"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2.5"
                                                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                                                        ></path>
                                                    </svg>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Shop Profile Card */}
                    {product?.shop && (
                        <div className="mt-8 bg-[rgba(255,255,255,0.04)] p-6 rounded-[28px] border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.28)] flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                            <div className="flex items-center gap-4 text-left">
                                <div className="w-16 h-16 rounded-full bg-white/5 text-[var(--theme-accent)] flex items-center justify-center font-bold text-2xl border border-white/10 overflow-hidden shrink-0">
                                    {product.shop.logo ? (
                                        <img
                                            src={
                                                product.shop.logo.startsWith(
                                                    "http",
                                                )
                                                    ? product.shop.logo
                                                    : `${API_BASE}${product.shop.logo}`
                                            }
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        "🏪"
                                    )}
                                </div>
                                <div>
                                    <h3 className="font-extrabold text-white text-base">
                                        {product.shop.name}
                                    </h3>
                                    <p className="text-xs text-white/50 mt-1">
                                        {product.shop.description ||
                                            "Chưa có mô tả cửa hàng."}
                                    </p>
                                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2.5 text-xs text-white/45 font-semibold">
                                        <span className="text-[var(--theme-accent-2)]">
                                            ⭐{" "}
                                            {Number(
                                                product.shop.rating || 0,
                                            ).toFixed(1)}{" "}
                                            / 5 ({product.shop.reviewCount || 0}{" "}
                                            đánh giá)
                                        </span>
                                        <span>📍 {product.shop.address}</span>
                                        <span>📞 {product.shop.phone}</span>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() =>
                                    navigate(
                                        `/products?shopId=${product.shop.id}`,
                                    )
                                }
                                className="px-5 py-2.5 bg-[var(--theme-accent)] border border-transparent text-black hover:brightness-110 font-black text-sm rounded-xl transition-all whitespace-nowrap cursor-pointer uppercase tracking-[0.18em]"
                            >
                                Xem Cửa Hàng
                            </button>
                        </div>
                    )}
                    <div className="mt-10 mb-16 relative">
                        <div className="flex items-center justify-between border-b pb-3 border-white/10 mb-6">
                            <h2
                                className="font-black text-xl text-white uppercase tracking-[0.18em]"
                                style={{ fontFamily: "Anton, sans-serif" }}
                            >
                                Sản phẩm tương tự
                            </h2>
                            {similarProducts.length > 3 && (
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={handlePrevSimilar}
                                        disabled={similarStartIndex === 0}
                                        className="p-2 rounded-full border border-gray-200 bg-white hover:bg-gray-50 disabled:opacity-40 disabled:hover:bg-white text-gray-600 transition-colors shadow-sm cursor-pointer"
                                    >
                                        <svg
                                            className="w-5 h-5"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M15 19l-7-7 7-7"
                                            />
                                        </svg>
                                    </button>
                                    <button
                                        onClick={handleNextSimilar}
                                        disabled={
                                            similarStartIndex + 3 >=
                                            similarProducts.length
                                        }
                                        className="p-2 rounded-full border border-gray-200 bg-white hover:bg-gray-50 disabled:opacity-40 disabled:hover:bg-white text-gray-600 transition-colors shadow-sm cursor-pointer"
                                    >
                                        <svg
                                            className="w-5 h-5"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M9 5l7 7-7 7"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            )}
                        </div>
                        {similarProducts.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 transition-all duration-300">
                                {similarProducts
                                    .slice(
                                        similarStartIndex,
                                        similarStartIndex + 3,
                                    )
                                    .map((p) => (
                                        <div
                                            key={p.id}
                                            onClick={() =>
                                                navigate(`/product/${p.id}`)
                                            }
                                            className="cursor-pointer h-full"
                                        >
                                            <ProductCard product={p} />
                                        </div>
                                    ))}
                            </div>
                        ) : (
                            <p className="text-gray-400 text-sm italic">
                                Chưa có sản phẩm tương tự.
                            </p>
                        )}
                    </div>

                    {/* (Product Reviews moved to Happy Owners section) */}
                </main>
                <Footer />
            </div>

            {/* Carousel Modal */}
            {showCarousel && (
                <div className="fixed inset-0 z-[9999] bg-black/95 flex flex-col backdrop-blur-sm">
                    {/* Top Controls */}
                    <div className="absolute top-6 left-6 z-50">
                        <button
                            onClick={() => setShowCarousel(false)}
                            className="flex items-center gap-2 text-white/70 hover:text-white transition-colors cursor-pointer group"
                        >
                            <svg
                                className="w-6 h-6 transform group-hover:-translate-x-1 transition-transform"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                                ></path>
                            </svg>
                            <span className="font-oswald tracking-widest uppercase font-bold text-lg mt-0.5">
                                BACK
                            </span>
                        </button>
                    </div>

                    {/* Title */}
                    <div className="absolute top-8 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
                        <h2 className="text-white text-3xl font-oswald tracking-widest text-center uppercase drop-shadow-lg">
                            {product.title.split(":")[1]?.trim() ||
                                product.title}
                        </h2>
                    </div>

                    {/* Main Image View - Gallery */}
                    <div className="flex-1 min-h-0 w-full flex items-center justify-center relative overflow-hidden">
                        {/* Left Arrow */}
                        <button
                            onClick={() =>
                                setActiveImage((prev) =>
                                    prev > 0 ? prev - 1 : images.length - 1,
                                )
                            }
                            className="absolute left-4 md:left-12 w-16 h-16 flex items-center justify-center text-white/50 hover:text-white hover:scale-110 transition-all z-40 cursor-pointer drop-shadow-xl"
                        >
                            <svg
                                className="w-12 h-12"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
                            </svg>
                        </button>

                        {/* Right Arrow */}
                        <button
                            onClick={() =>
                                setActiveImage((prev) =>
                                    prev < images.length - 1 ? prev + 1 : 0,
                                )
                            }
                            className="absolute right-4 md:right-12 w-16 h-16 flex items-center justify-center text-white/50 hover:text-white hover:scale-110 transition-all z-40 cursor-pointer drop-shadow-xl"
                        >
                            <svg
                                className="w-12 h-12"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
                            </svg>
                        </button>

                        {/* Images Container */}
                        <div className="w-full max-w-7xl h-full relative flex items-center justify-center">
                            {images.map((img, idx) => {
                                const total = images.length;
                                let offset = idx - activeImage;
                                if (offset > Math.floor(total / 2))
                                    offset -= total;
                                if (offset < -Math.floor(total / 2))
                                    offset += total;

                                const isCenter = offset === 0;
                                const isVisible = Math.abs(offset) <= 2;

                                if (!isVisible) return null;

                                return (
                                    <div
                                        key={idx}
                                        onClick={() => {
                                            if (!isCenter) {
                                                setActiveImage(idx);
                                                if (
                                                    product &&
                                                    Array.isArray(
                                                        product.colors,
                                                    ) &&
                                                    product.colors.length ===
                                                        images.length
                                                ) {
                                                    const colorLabel =
                                                        product.colors[idx]
                                                            ?.label;
                                                    if (colorLabel)
                                                        setSelectedColor(
                                                            colorLabel,
                                                        );
                                                }
                                            }
                                        }}
                                        className={`absolute w-[80vw] sm:w-[50vw] lg:w-[calc(33.333%-1rem)] max-w-[400px] aspect-square transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform flex items-center justify-center bg-[#f8f8f8] border-2 border-black ${isCenter ? "cursor-default" : "cursor-pointer"}`}
                                        style={{
                                            transform: `translateX(calc(${offset * 100}% + ${offset * 24}px)) translateZ(0)`,
                                            opacity: 1,
                                            zIndex: isCenter
                                                ? 20
                                                : 10 - Math.abs(offset),
                                        }}
                                    >
                                        <img
                                            src={img}
                                            className="w-full h-full object-cover"
                                            alt={`Slide ${idx}`}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Pagination Indicators */}
                    <div className="shrink-0 w-full flex justify-center items-center gap-2 p-8 z-20">
                        {images.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => {
                                    setActiveImage(idx);
                                    if (
                                        product &&
                                        Array.isArray(product.colors) &&
                                        product.colors.length === images.length
                                    ) {
                                        const colorLabel =
                                            product.colors[idx]?.label;
                                        if (colorLabel)
                                            setSelectedColor(colorLabel);
                                    }
                                }}
                                className={`h-[3px] transition-all duration-300 cursor-pointer ${activeImage === idx ? "w-10 bg-[var(--theme-accent)]" : "w-6 bg-white/30 hover:bg-white/60"}`}
                            ></button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductDetail;
