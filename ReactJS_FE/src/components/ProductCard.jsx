import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
    const navigate = useNavigate();

    const hasDiscount =
        product.originalPrice && product.originalPrice > product.price;

    let image = product.image;
    if (Array.isArray(product.images) && product.images.length > 0)
        image = product.images[0];
    else if (typeof product.images === "string") {
        try {
            image = JSON.parse(product.images)[0];
        } catch (e) {}
    }

    const optionsCount =
        product.colors && product.colors.length > 0 ? product.colors.length : 1;

    return (
        <div
            onClick={() => navigate(`/product/${product.slug}`)}
            className="group relative flex h-full flex-col bg-white cursor-pointer transition-all duration-200 border-2 border-transparent hover:shadow-[6px_6px_0_rgba(0,0,0,1)] hover:-translate-y-1 hover:z-20"
        >
            <div className="absolute -inset-[2px] border-2 border-black pointer-events-none z-20"></div>
            {/* Image Section */}
            <div className="relative aspect-[4/3] w-full bg-transparent flex items-center justify-center border-b-2 border-black overflow-hidden">
                <img
                    src={image}
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* Badges */}
                <div className="absolute bottom-4 left-4 flex flex-col gap-1 items-start">
                    {product.stock === 0 ? (
                        <span className="bg-gray-500 text-white text-[10px] font-oswald font-bold px-2 py-0.5 uppercase tracking-wider">
                            Out of Stock
                        </span>
                    ) : (
                        hasDiscount && (
                            <span className="bg-[var(--theme-accent)] text-white text-[10px] font-oswald font-bold px-2 py-0.5 uppercase tracking-wider">
                                Sale
                            </span>
                        )
                    )}
                    {product.stock <= 5 && product.stock > 0 && (
                        <span className="bg-[var(--theme-accent)] text-white text-[10px] font-oswald font-bold px-2 py-0.5 uppercase tracking-wider">
                            Just a Few Left
                        </span>
                    )}
                </div>
            </div>

            {/* Info Section */}
            <div className="flex flex-col flex-1 px-5 pt-3 pb-5 bg-white text-black relative z-0">
                {/* Logo*/}
                <div className="flex justify-between items-center mb-3">
                    <div className="h-4 flex items-center opacity-70">
                        <div className="font-anton text-sm italic pr-1">
                            <img
                                src="https://dwarf-factory.com/assets/images/logo-v1.svg"
                                alt="brand-logo"
                                className="w-10 h-10"
                            />
                        </div>
                    </div>
                </div>

                {/* Title - Price */}
                <div className="flex justify-between items-start gap-2">
                    <div className="flex-1">
                        <h3 className="text-lg font-anton leading-tight uppercase tracking-wide line-clamp-2 text-black mb-1">
                            {product.title}
                        </h3>
                        <div className="text-[var(--theme-accent)] font-anton text-sm tracking-wider">
                            {Number(product.price).toLocaleString()}
                            <span className="text-xs align-top">$</span>
                        </div>
                    </div>

                    {/* Options */}
                    <div className="bg-[var(--theme-accent)] text-white text-[9px] font-oswald font-bold px-1.5 py-0.5 uppercase tracking-wider whitespace-nowrap mt-1">
                        {optionsCount} OPTION{optionsCount > 1 ? "S" : ""}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
