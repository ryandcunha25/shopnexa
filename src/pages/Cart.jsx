import React, { useEffect, useState } from "react";
import {
    ShoppingBag,
    Trash2,
    Plus,
    Minus,
    Heart,
    ShoppingCart,
    ArrowRight,
    Shield,
    Truck,
    Clock,
    Gift,
    CreditCard,
    Tag
} from "lucide-react";
import axios from "axios";
import { Link } from "react-router-dom";

function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [couponCode, setCouponCode] = useState("");
    const [appliedCoupon, setAppliedCoupon] = useState(null);
    const backendUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    setLoading(false);
                    return;
                }

                const response = await axios.get(backendUrl + "/shopnexa_api/cart", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log(response.data.items)
                setCartItems(response.data.items);
                setLoading(false)


            } catch (error) {
                console.error("Error fetching cart:", error);
                setLoading(false);
            }
        };

        fetchCart();
    }, []);

    const updateQuantity = async (id, change) => {
        try {
            const updatedItem = cartItems.find(item => item._id === id);
            const newQuantity = Math.max(1, updatedItem.quantity + change);

            // Send request to backend
            await fetch(`${backendUrl}/shopnexa_api/cart/update/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}` // if you're using JWT
                },
                body: JSON.stringify({ quantity: newQuantity })
            });

            setCartItems(items =>
                items.map(item =>
                    item._id === id
                        ? { ...item, quantity: Math.max(1, item.quantity + change) }
                        : item
                )
            );
        } catch (err) {
            console.error("Failed to update quantity", err);
        }
    };

    const removeItem = async (id) => {
        try {
            const token = localStorage.getItem("token");
            const res = await fetch(`${backendUrl}/shopnexa_api/cart/remove/${id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            });

            const data = await res.json();

            if (res.status == 200) {
                setCartItems((items) => items.filter((item) => item._id !== id));
                alert("Item removed from cart");
            } else {
                alert(data.msg || "Failed to remove item");
            }
        } catch (error) {
            console.error("Error removing item:", error);
            alert("Something went wrong");
        }
    };


    const applyCoupon = () => {
        if (couponCode === "SAVE10") {
            setAppliedCoupon({ code: "SAVE10", discount: 10 });
        } else if (couponCode === "WELCOME20") {
            setAppliedCoupon({ code: "WELCOME20", discount: 20 });
        }
    };

    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const originalTotal = cartItems.reduce((sum, item) => sum + ((item.originalPrice || item.price) * item.quantity), 0);
    const savings = originalTotal - subtotal;
    const discount = appliedCoupon ? (subtotal * appliedCoupon.discount) / 100 : 0;
    const shipping = subtotal > 50000 ? 0 : 499;
    const tax = Math.round((subtotal - discount) * 0.18);
    const total = subtotal - discount + shipping + tax;

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
                <div className="max-w-7xl mx-auto px-4 py-8">
                    <div className="animate-pulse">
                        <div className="h-8 bg-slate-200 rounded-xl mb-6 w-48"></div>
                        <div className="grid lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2 space-y-4">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="bg-white rounded-2xl p-6">
                                        <div className="flex gap-4">
                                            <div className="w-24 h-24 bg-slate-200 rounded-xl"></div>
                                            <div className="flex-1 space-y-2">
                                                <div className="h-5 bg-slate-200 rounded w-3/4"></div>
                                                <div className="h-4 bg-slate-200 rounded w-1/2"></div>
                                                <div className="h-4 bg-slate-200 rounded w-1/4"></div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="bg-white rounded-2xl p-6 h-fit">
                                <div className="space-y-4">
                                    <div className="h-6 bg-slate-200 rounded w-32"></div>
                                    {[1, 2, 3, 4].map(i => (
                                        <div key={i} className="flex justify-between">
                                            <div className="h-4 bg-slate-200 rounded w-20"></div>
                                            <div className="h-4 bg-slate-200 rounded w-16"></div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
                <div className="max-w-4xl mx-auto px-4 py-16">
                    <div className="text-center">
                        <div className="relative mb-8">
                            <div className="w-32 h-32 mx-auto bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                                <ShoppingBag className="w-16 h-16 text-slate-400" />
                            </div>
                            <div className="absolute -top-2 -right-8 w-8 h-8 bg-gradient-to-r from-orange-400 to-red-400 rounded-full flex items-center justify-center">
                                <span className="text-white text-xs font-bold">0</span>
                            </div>
                        </div>
                        <h2 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-blue-800 bg-clip-text text-transparent mb-4">
                            Your Cart is Empty
                        </h2>
                        <p className="text-slate-600 text-lg mb-8 max-w-md mx-auto">
                            Looks like you haven't added any items to your cart yet. Start shopping to fill it up!
                        </p>
                        <Link to="/products">
                            <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-4 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-3 mx-auto">
                                <ShoppingCart className="w-5 h-5" />
                                Start Shopping
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                            <ShoppingBag className="w-6 h-6 text-white" />
                        </div>
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-blue-800 bg-clip-text text-transparent">
                            Shopping Cart
                        </h1>
                    </div>
                    <p className="text-slate-600 text-lg">
                        {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-4">
                        {cartItems.map((item) => (
                            <div
                                key={item._id}
                                className="group bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-blue-200"
                            >
                                <div className="flex gap-6">
                                    {/* Product Image */}
                                    <div className="relative">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-32 h-32 object-cover rounded-xl shadow-md"
                                        />
                                        <div className="absolute -top-2 -right-2">
                                            <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                                                {item.category}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Product Details */}
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                                                {item.name}
                                            </h3>
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => removeItem(item._id)}
                                                    className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all duration-200"
                                                >
                                                    <Trash2 className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3 mb-4">
                                            <span className="text-2xl font-bold text-slate-900">
                                                ₹{item.price.toLocaleString()}
                                            </span>
                                            {item.originalPrice && item.originalPrice > item.price && (
                                                <span className="text-lg text-slate-400 line-through">
                                                    ₹{item.originalPrice.toLocaleString()}
                                                </span>
                                            )}
                                            {item.originalPrice && item.originalPrice > item.price && (
                                                <span className="text-sm text-green-600 font-medium bg-green-100 px-2 py-1 rounded-full">
                                                    Save ₹{(item.originalPrice - item.price).toLocaleString()}
                                                </span>
                                            )}
                                        </div>

                                        {/* Quantity Controls */}
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3 bg-slate-100 rounded-2xl p-1">
                                                <button
                                                    onClick={() => updateQuantity(item._id, -1)}
                                                    className="w-10 h-10 rounded-xl bg-white shadow-sm hover:shadow-md flex items-center justify-center text-slate-600 hover:text-blue-600 transition-all duration-200"
                                                >
                                                    <Minus className="w-4 h-4" />
                                                </button>
                                                <span className="font-bold text-lg min-w-[40px] text-center">
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    onClick={() => updateQuantity(item._id, 1)}
                                                    className="w-10 h-10 rounded-xl bg-white shadow-sm hover:shadow-md flex items-center justify-center text-slate-600 hover:text-blue-600 transition-all duration-200"
                                                >
                                                    <Plus className="w-4 h-4" />
                                                </button>
                                            </div>

                                            <div className="text-right">
                                                <p className="text-2xl font-bold text-slate-900">
                                                    ₹{(item.price * item.quantity).toLocaleString()}
                                                </p>
                                                {item.quantity > 1 ? <p className="text-sm text-slate-500">
                                                    ₹{item.price.toLocaleString()} each
                                                </p> : null}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="space-y-6">
                        {/* Summary Card */}
                        <div className="bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-2xl p-6 shadow-lg sticky top-6">
                            <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                                <CreditCard className="w-6 h-6 text-blue-600" />
                                Order Summary
                            </h3>

                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-600">Subtotal</span>
                                    <span className="font-semibold">₹{subtotal.toLocaleString()}</span>
                                </div>

                                {savings > 0 && (
                                    <div className="flex justify-between items-center text-green-600">
                                        <span>You Save</span>
                                        <span className="font-semibold">-₹{savings.toLocaleString()}</span>
                                    </div>
                                )}

                                {appliedCoupon && (
                                    <div className="flex justify-between items-center text-green-600">
                                        <span>Coupon ({appliedCoupon.code})</span>
                                        <span className="font-semibold">-₹{discount.toLocaleString()}</span>
                                    </div>
                                )}

                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-2">
                                        <Truck className="w-4 h-4 text-slate-500" />
                                        <span className="text-slate-600">Shipping</span>
                                    </div>
                                    <span className={`font-semibold ${shipping === 0 ? 'text-green-600' : ''}`}>
                                        {shipping === 0 ? 'FREE' : `₹${shipping}`}
                                    </span>
                                </div>

                                <div className="flex justify-between items-center">
                                    <span className="text-slate-600">Tax (18%)</span>
                                    <span className="font-semibold">₹{tax.toLocaleString()}</span>
                                </div>

                                <div className="border-t pt-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-xl font-bold text-slate-900">Total</span>
                                        <span className="text-2xl font-bold text-slate-900">₹{total.toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Coupon Code */}
                            <div className="mb-6">
                                <div className="flex gap-2">
                                    <div className="relative flex-1">
                                        <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                                        <input
                                            type="text"
                                            placeholder="Coupon code"
                                            value={couponCode}
                                            onChange={(e) => setCouponCode(e.target.value)}
                                            className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500"
                                        />
                                    </div>
                                    <button
                                        onClick={applyCoupon}
                                        className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
                                    >
                                        Apply
                                    </button>
                                </div>
                                <p className="text-xs text-slate-500 mt-2">
                                    Try: SAVE10 or WELCOME20
                                </p>
                            </div>

                            {/* Checkout Button */}
                            <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl flex items-center justify-center gap-3 mb-4">
                                Proceed to Checkout
                                <ArrowRight className="w-5 h-5" />
                            </button>

                            {/* Features */}
                            <div className="space-y-3 text-sm text-slate-600">
                                <div className="flex items-center gap-3">
                                    <Shield className="w-4 h-4 text-green-500" />
                                    <span>Secure checkout</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Truck className="w-4 h-4 text-blue-500" />
                                    <span>Free shipping on orders over ₹50,000</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Clock className="w-4 h-4 text-orange-500" />
                                    <span>Delivery in 2-3 business days</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cart;