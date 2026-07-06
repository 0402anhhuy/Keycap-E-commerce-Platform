import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Breadcrumb from "../../components/Breadcrumb";
import { useCart } from "../../context/CartContext";
import ScrollToTop from "../../components/ScrollToTop";

const CartPage = () => {
    const navigate = useNavigate();
    const { items, total, loading, updateItem, removeItem, clearCart } =
        useCart();
    const [coupon, setCoupon] = useState("");
    const [couponApplied, setCouponApplied] = useState(false);
    const [actionLoading, setActionLoading] = useState({});
    const [itemToRemove, setItemToRemove] = useState(null);

    const fmt = (n) => "$" + Number(n).toFixed(2);

    const handleQtyChange = async (itemId, newQty) => {
        if (newQty < 1) return;
        setActionLoading((p) => ({ ...p, [itemId]: true }));
        try {
            await updateItem(itemId, newQty);
        } catch {}
        setActionLoading((p) => ({ ...p, [itemId]: false }));
    };

    const handleRemove = async (itemId) => {
        setActionLoading((p) => ({ ...p, [itemId]: true }));
        try {
            await removeItem(itemId);
        } catch {}
        setActionLoading((p) => ({ ...p, [itemId]: false }));
    };

    const subtotal = total;
    const tax = 0; // Assuming no tax shown in mockup
    const finalTotal = subtotal + tax;

    return (
        <div className="min-h-screen bg-[url('https://dwarf-factory.com/assets/images/bg/light.jpg')] font-oswald flex flex-col relative text-black">
            <Header />
            <main className="flex-1 max-w-6xl w-full mx-auto px-4 pt-[90px] md:pt-[100px] pb-24 relative z-10">
                <Breadcrumb />

                {/* Header & Stepper */}
                <div className="mt-8 mb-4 border-b-2 border-black/10 pb-4 relative">
                    <div className="flex flex-col lg:flex-row gap-12 items-end">
                        <div className="flex-1 flex justify-between items-end w-full">
                            <h1
                                className="text-6xl font-anton uppercase tracking-wider text-black m-0 leading-none"
                                style={{
                                    textShadow:
                                        "1px 1px 0 rgba(255,255,255,0.5)",
                                }}
                            >
                                YOUR CART
                            </h1>
                            <span className="text-[13px] font-oswald font-medium text-black/50 tracking-widest uppercase mb-1 hidden md:block">
                                {items.length > 1
                                    ? `${items.length} ITEMS`
                                    : `${items.length} ITEM`}
                            </span>
                        </div>
                        <div className="w-full lg:w-[380px] xl:w-[380px] shrink-0">
                            {/* Stepper Steps */}
                            <div className="flex items-center gap-3 md:gap-4 w-full text-[11px] xl:text-[12px] tracking-widest uppercase font-oswald font-medium">
                                <div className="flex-1 flex flex-col gap-2 cursor-pointer">
                                    <div className="w-full h-[4px] bg-[#F17336]"></div>
                                    <div className="flex justify-between items-center text-black">
                                        <span>YOUR CART</span>
                                        <span>01</span>
                                    </div>
                                </div>
                                <div className="flex-1 flex flex-col gap-2">
                                    <div className="w-full h-[4px] bg-black/30"></div>
                                    <div className="flex justify-between items-center text-black/50">
                                        <span className="truncate mr-1">
                                            INFORMATION
                                        </span>
                                        <span>02</span>
                                    </div>
                                </div>
                                <div className="flex-1 flex flex-col gap-2">
                                    <div className="w-full h-[4px] bg-black/30"></div>
                                    <div className="flex justify-between items-center text-black/50">
                                        <span>PAYMENT</span>
                                        <span>03</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {items.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-24 text-center">
                        <h2 className="font-anton text-2xl uppercase tracking-widest text-black mb-2">
                            Your cart is empty
                        </h2>
                        <p className="text-sm font-bold uppercase tracking-widest text-black/50 mb-8">
                            Add products to your cart to continue
                        </p>
                        <Link
                            to="/products"
                            className="px-8 py-4 bg-[url('https://dwarf-factory.com/assets/images/button/btn-orange.jpg')] !text-white font-oswald font-bold text-lg uppercase tracking-widest hover:opacity-80 transition-all shadow-md rounded-sm"
                        >
                            Explore Now
                        </Link>
                    </div>
                ) : (
                    <div className="flex flex-col lg:flex-row gap-12 mt-12">
                        {/* Cart Items List */}
                        <div className="flex-1 flex flex-col">
                            <div className="flex flex-col divide-y divide-black/10 border-b border-black/10">
                                {items.map((item) => {
                                    const imgSrc = item.product?.image;
                                    const stock = item.product?.stock || 0;
                                    const price =
                                        item.product?.price -
                                        (item.product?.price *
                                            item.product?.discountPercent) /
                                            100;
                                    return (
                                        <div
                                            key={item.id}
                                            className="py-8 flex flex-col sm:flex-row gap-6 relative"
                                        >
                                            {/* Image */}
                                            <div className="w-[120px] h-[120px] bg-white shadow-md flex-shrink-0 flex items-center justify-center rounded-sm overflow-hidden p-2">
                                                {imgSrc && (
                                                    <img
                                                        src={imgSrc}
                                                        alt={
                                                            item.product?.title
                                                        }
                                                        className="w-full h-full object-contain cursor-pointer"
                                                        onClick={() =>
                                                            navigate(
                                                                `/products/${item.product?.slug}`,
                                                            )
                                                        }
                                                    />
                                                )}
                                            </div>

                                            {/* Details */}
                                            <div className="flex-1 flex flex-col justify-start">
                                                <div className="flex justify-between items-start gap-4">
                                                    <div>
                                                        <h3 className="font-oswald text-[22px] font-medium leading-tight">
                                                            {item.product
                                                                ?.title ||
                                                                "KEYCAP"}
                                                        </h3>
                                                        <div className="inline-block bg-[#F17336] text-white text-[9px] font-bold px-1.5 py-0.5 uppercase tracking-widest rounded-sm">
                                                            {stock} IN STOCK
                                                        </div>
                                                        <p className="text-[14px] text-black/60 font-medium">
                                                            Skin:{" "}
                                                            <span className="text-black font-semibold">
                                                                {
                                                                    item.product?.title?.split(
                                                                        ": ",
                                                                    )[1]
                                                                }
                                                            </span>
                                                        </p>
                                                        <p className="text-[14px] text-black/60 font-medium">
                                                            Form:{" "}
                                                            <span className="text-black font-semibold">
                                                                {
                                                                    item.product
                                                                        ?.form
                                                                }
                                                            </span>
                                                        </p>
                                                        <p className="text-[14px] text-black/60 font-medium">
                                                            Color:{" "}
                                                            <span className="text-black font-semibold">
                                                                {item.product?.color
                                                                    .charAt(0)
                                                                    .toUpperCase() +
                                                                    item.product?.color.slice(
                                                                        1,
                                                                    )}
                                                            </span>
                                                        </p>
                                                    </div>

                                                    <div className="text-right flex flex-col items-end gap-3">
                                                        <div className="font-anton text-2xl tracking-widest text-black">
                                                            {fmt(price)}
                                                        </div>

                                                        <div className="flex flex-col items-end gap-2">
                                                            <div className="flex border border-black/30 bg-transparent h-8 items-center rounded-sm overflow-hidden">
                                                                <button
                                                                    onClick={() =>
                                                                        handleQtyChange(
                                                                            item.id,
                                                                            item.quantity -
                                                                                1,
                                                                        )
                                                                    }
                                                                    disabled={
                                                                        actionLoading[
                                                                            item
                                                                                .id
                                                                        ] ||
                                                                        item.quantity <=
                                                                            1
                                                                    }
                                                                    className="w-8 h-full flex items-center justify-center text-black/70 hover:bg-black/5 transition-colors disabled:opacity-40 cursor-pointer"
                                                                >
                                                                    <svg
                                                                        className="w-3 h-3"
                                                                        fill="none"
                                                                        stroke="currentColor"
                                                                        viewBox="0 0 24 24"
                                                                    >
                                                                        <path
                                                                            strokeLinecap="round"
                                                                            strokeLinejoin="round"
                                                                            strokeWidth="2"
                                                                            d="M20 12H4"
                                                                        />
                                                                    </svg>
                                                                </button>
                                                                <span className="w-8 text-center text-[13px] font-medium text-black border-x border-black/30 h-full flex items-center justify-center">
                                                                    {
                                                                        item.quantity
                                                                    }
                                                                </span>
                                                                <button
                                                                    onClick={() =>
                                                                        handleQtyChange(
                                                                            item.id,
                                                                            item.quantity +
                                                                                1,
                                                                        )
                                                                    }
                                                                    disabled={
                                                                        actionLoading[
                                                                            item
                                                                                .id
                                                                        ]
                                                                    }
                                                                    className="w-8 h-full flex items-center justify-center text-black/70 hover:bg-black/5 transition-colors disabled:opacity-40 cursor-pointer"
                                                                >
                                                                    <svg
                                                                        className="w-3 h-3"
                                                                        fill="none"
                                                                        stroke="currentColor"
                                                                        viewBox="0 0 24 24"
                                                                    >
                                                                        <path
                                                                            strokeLinecap="round"
                                                                            strokeLinejoin="round"
                                                                            strokeWidth="2"
                                                                            d="M12 4v16m8-8H4"
                                                                        />
                                                                    </svg>
                                                                </button>
                                                            </div>
                                                            <button
                                                                onClick={() =>
                                                                    setItemToRemove(
                                                                        {
                                                                            id: item.id,
                                                                            title:
                                                                                item
                                                                                    .product
                                                                                    ?.title ||
                                                                                "KEYCAP",
                                                                        },
                                                                    )
                                                                }
                                                                disabled={
                                                                    actionLoading[
                                                                        item.id
                                                                    ]
                                                                }
                                                                className="text-black/50 hover:text-red-500 transition-colors p-1 cursor-pointer disabled:opacity-40"
                                                            >
                                                                <svg
                                                                    className="w-4 h-4"
                                                                    fill="none"
                                                                    stroke="currentColor"
                                                                    viewBox="0 0 24 24"
                                                                >
                                                                    <path
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        strokeWidth="2"
                                                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                                    />
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Warning */}
                                                <div className="mt-4 flex items-center gap-1.5 text-[#F17336] text-[13px] font-medium">
                                                    {stock <= 25 && (
                                                        <>
                                                            <svg
                                                                className="w-4 h-4"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                viewBox="0 0 24 24"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth="2"
                                                                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                                                />
                                                            </svg>
                                                            Only {stock} Item(s)
                                                            in stock
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Actions below cart items */}
                            <div className="mt-8 flex items-center justify-between">
                                <Link
                                    to="/products"
                                    className="text-[13px] font-bold tracking-widest uppercase text-black hover:underline underline-offset-4 flex items-center gap-2"
                                >
                                    <svg
                                        className="w-4 h-4"
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
                                    CONTINUE SHOPPING
                                </Link>

                                <button
                                    onClick={() =>
                                        setItemToRemove({
                                            id: "ALL",
                                            title: "ALL ITEMS",
                                        })
                                    }
                                    className="text-[13px] font-bold tracking-widest uppercase text-black/50 hover:text-red-500 hover:underline underline-offset-4 flex items-center gap-2 cursor-pointer transition-colors"
                                >
                                    <svg
                                        className="w-4 h-4"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                        />
                                    </svg>
                                    CLEAR CART
                                </button>
                            </div>
                        </div>

                        {/* Order Summary Right Panel */}
                        <div className="w-full lg:w-[380px] flex-shrink-0">
                            <div className="sticky top-6">
                                <h2 className="font-anton text-[28px] uppercase tracking-widest text-black mb-8">
                                    ORDER SUMMARY
                                </h2>

                                <div className="space-y-4 mb-8">
                                    <div className="flex items-center justify-between border-b border-black/10 pb-4">
                                        <span className="text-[14px] font-medium uppercase tracking-widest text-black/80">
                                            MERCHANDISE SUBTOTAL
                                        </span>
                                        <span className="font-anton text-xl tracking-wider text-black">
                                            {fmt(subtotal)}
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <span className="text-[16px] font-bold uppercase tracking-widest text-black">
                                            ORDER TOTAL
                                        </span>
                                        <span className="font-anton text-2xl tracking-wider text-black">
                                            {fmt(finalTotal)}
                                        </span>
                                    </div>
                                </div>

                                <button
                                    onClick={() => navigate("/checkout")}
                                    className="w-full bg-[url('https://dwarf-factory.com/assets/images/button/btn-orange.jpg')] bg-cover bg-center bg-no-repeat text-white font-oswald font-bold py-4 text-[16px] tracking-widest uppercase hover:opacity-80 transition-all flex items-center justify-center gap-2 rounded-sm shadow-md cursor-pointer"
                                >
                                    CHECK OUT
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
                                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </main>

            {/* Remove Confirmation Modal */}
            {itemToRemove && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div className="bg-white rounded-md p-8 md:p-10 w-full max-w-sm flex flex-col items-center text-center relative border-[3px] border-black shadow-2xl">
                        {/* Close button */}
                        <button
                            onClick={() => setItemToRemove(null)}
                            className="absolute top-4 right-4 text-black hover:scale-110 transition-transform cursor-pointer"
                        >
                            <svg
                                className="w-7 h-7"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="red"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <circle cx="12" cy="12" r="10"></circle>
                                <line x1="15" y1="9" x2="9" y2="15"></line>
                                <line x1="9" y1="9" x2="15" y2="15"></line>
                            </svg>
                        </button>

                        {/* Trash Icon */}
                        <div className="text-[#F17336] mb-6">
                            <svg
                                className="w-[72px] h-[72px]"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                            </svg>
                        </div>

                        {/* Title */}
                        <h3 className="font-anton text-[28px] leading-none tracking-wide text-black mb-4 uppercase">
                            Do you want to remove?
                        </h3>

                        {/* Text */}
                        <p className="text-black/80 font-medium mb-8 text-[15px] leading-relaxed">
                            {itemToRemove.id === "ALL" ? (
                                <>
                                    All items will be removed from your cart.
                                    Are you sure to remove them?
                                </>
                            ) : (
                                <>
                                    The item{" "}
                                    <span className="text-black font-bold">
                                        {itemToRemove.title}
                                    </span>{" "}
                                    will be removed from your cart. Are you sure
                                    to remove it?
                                </>
                            )}
                        </p>

                        {/* OK Button */}
                        <button
                            onClick={() => {
                                if (itemToRemove.id === "ALL") {
                                    clearCart();
                                } else {
                                    handleRemove(itemToRemove.id);
                                }
                                setItemToRemove(null);
                            }}
                            className="w-full bg-[url('https://dwarf-factory.com/assets/images/button/btn-orange.jpg')] text-white font-oswald font-bold text-xl uppercase tracking-widest py-3 mb-5 cursor-pointer hover:opacity-80 transition-opacity"
                            style={{
                                clipPath:
                                    "polygon(0% 0%, 100% 0%, 98% 10%, 100% 20%, 97% 30%, 100% 40%, 98% 50%, 100% 60%, 97% 70%, 100% 80%, 98% 90%, 100% 100%, 0% 100%, 2% 90%, 0% 80%, 3% 70%, 0% 60%, 2% 50%, 0% 40%, 3% 30%, 0% 20%, 2% 10%)",
                            }}
                        >
                            OK
                        </button>

                        {/* Cancel Button */}
                        <button
                            onClick={() => setItemToRemove(null)}
                            className="text-black text-sm font-bold tracking-widest uppercase hover:underline underline-offset-4 cursor-pointer transition-all"
                        >
                            CANCEL
                        </button>
                    </div>
                </div>
            )}
            <ScrollToTop />
            <Footer />
        </div>
    );
};

export default CartPage;
