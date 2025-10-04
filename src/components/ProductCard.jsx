import React, { useState } from 'react';
import { ShoppingCart, Star, Eye, Check, Zap, ArrowRight, Minus, Plus } from "lucide-react";
import toast from 'react-hot-toast';


function ProductCard({ product, cartItems, onAddToCart, onViewDetails }) {
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);

    const isInCart = cartItems?.some(item => item.productId === product._id) || false;
    const cartItem = cartItems?.find(item => item.productId === product._id);

    const handleAddToCart = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            toast.error("Please log in to add items to your cart.");
            return;
        }
        onAddToCart(product);
    };

    const handleWishlistToggle = () => {
        setIsWishlisted(!isWishlisted);
    };

    // Generate star rating display
    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;

        for (let i = 0; i < fullStars; i++) {
            stars.push(<Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />);
        }
        if (hasHalfStar) {
            stars.push(<Star key="half" className="w-3.5 h-3.5 fill-amber-200 text-amber-400" />);
        }
        return stars;
    };

    return (
        <div className="my-product-cards group relative bg-gradient-to-br from-white via-slate-50/50 to-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-slate-200/60 hover:border-slate-300/80 transform hover:-translate-y-2">
            {/* Decorative Elements */}
            <div className="absolute -top-2 -right-2 w-20 h-20 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute -bottom-2 -left-2 w-16 h-16 bg-gradient-to-tr from-pink-400/20 to-orange-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

            {/* Image Container */}
            <div className="relative overflow-hidden rounded-t-3xl bg-gradient-to-br from-slate-100 to-slate-50">
                <div className="aspect-[4/3] relative">
                    {!imageLoaded && (
                        <div className="absolute inset-0 bg-gradient-to-br from-slate-200 to-slate-100 animate-pulse"></div>
                    )}
                    <img
                        src={product.image || 'https://via.placeholder.com/400x300?text=Product+Image'}
                        alt={product.name}
                        onLoad={() => setImageLoaded(true)}
                        className={`w-full h-full object-cover transition-all duration-700 ${imageLoaded ? 'opacity-100' : 'opacity-0'} group-hover:scale-110`}
                    />

                    {/* Stock Overlay */}
                    {!product.inStock && (
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-800/60 to-transparent flex items-center justify-center backdrop-blur-sm">
                            <div className="bg-red-500/90 backdrop-blur-sm text-white px-4 py-2 rounded-2xl font-semibold shadow-lg border border-red-400/50">
                                <span className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-red-200 rounded-full animate-pulse"></div>
                                    Out of Stock
                                </span>
                            </div>
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="absolute top-4 right-4 flex flex-col gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                        <button
                            onClick={() => onViewDetails(product)}
                            className="p-3 rounded-2xl bg-white/90 backdrop-blur-md hover:bg-white text-slate-700 hover:text-blue-600 shadow-lg border border-white/20 transition-all duration-300 transform hover:scale-110"
                        >
                            <Eye className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                        <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-1.5 rounded-2xl text-xs font-semibold shadow-lg border border-white/20 backdrop-blur-sm">
                            <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                            {product.category}
                        </span>
                    </div>

                    {/* Featured Badge */}
                    {product.featured && (
                        <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
                            <span className="inline-flex items-center gap-1 bg-gradient-to-r from-amber-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg animate-pulse">
                                <Zap className="w-3 h-3 fill-current" />
                                Featured
                            </span>
                        </div>
                    )}
                </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
                {/* Title */}
                <div>
                    <h3 className="font-bold text-xl text-slate-800 mb-1 line-clamp-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
                        {product.name}
                    </h3>
                    <p className="text-slate-600 text-sm line-clamp-2 leading-relaxed">
                        {product.description}
                    </p>
                </div>

                {/* Rating */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-0.5">
                            {renderStars(product.ratings || 4.5)}
                        </div>
                        <span className="text-sm font-medium text-slate-700">
                            {product.ratings || '4.5'}
                        </span>
                        <span className="text-xs text-slate-500">
                            ({Math.floor(Math.random() * 500) + 50} reviews)
                        </span>
                    </div>
                </div>

                {/* Price */}
                <div className="flex items-center gap-3">
                    <span className="text-3xl font-black bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                        ₹{product.price?.toLocaleString() || '999'}
                    </span>
                    {product.originalPrice && (
                        <div className="flex items-center gap-2">
                            <span className="text-lg text-slate-400 line-through">
                                ₹{product.originalPrice.toLocaleString()}
                            </span>
                            <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs font-semibold">
                                {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                            </span>
                        </div>
                    )}
                </div>

                {/* Add to Cart Section */}
                <div className="pt-2">
                    {isInCart ? (
                        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-4">
                            <div className="flex items-center justify-center gap-3">
                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                <span className="text-lg font-bold text-green-700">Added to Cart</span>
                                <Check className="w-5 h-5 text-green-600" />
                            </div>
                        </div>
                    ) : (
                        <button
                            onClick={handleAddToCart}
                            disabled={!product.inStock}
                            className="group/btn relative w-full overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 text-white py-4 px-6 rounded-2xl font-bold transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:scale-100"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-700 via-purple-700 to-blue-800 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                            <div className="relative flex items-center justify-center gap-3">
                                <ShoppingCart className="w-5 h-5 transition-transform group-hover/btn:rotate-12" />
                                <span>{product.inStock ? 'Add to Cart' : 'Out of Stock'}</span>
                                <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                            </div>
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ProductCard;