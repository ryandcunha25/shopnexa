import { useEffect, useState } from "react";
import { Search, Filter, Grid3X3, List, X, ChevronDown, Star } from 'lucide-react';
import axios from "axios";
import ProductCard from "../components/ProductCard.jsx";
import toast from 'react-hot-toast';
import { pushAddToCart } from "../gtm/gtmEvents.js";



function Products() {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [sortBy, setSortBy] = useState("latest");
    const [priceRange, setPriceRange] = useState({ min: "", max: "" });
    const [viewMode, setViewMode] = useState("grid");
    const [showFilters, setShowFilters] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 8;


    const backendUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(backendUrl + "/shopnexa_api/products");
                const data = await response.json();
                setProducts(data)
                setCategories([...new Set(data.map(product => product.category))]);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, []);

    // useEffect(() => {
    //     // Extract unique categories
    //     const uniqueCategories = [...new Set(products.map(product => product.category))];
    //     setCategories(uniqueCategories);
    //     console.log(categories)
    // }, [products]);

    useEffect(() => {
        let filtered = [...products];

        // Search filter
        if (searchTerm) {
            filtered = filtered.filter(product =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Category filter
        if (selectedCategory !== "All") {
            filtered = filtered.filter(product => product.category === selectedCategory);
        }

        // Price range filter
        if (priceRange.min) {
            filtered = filtered.filter(product => product.price >= parseInt(priceRange.min));
        }
        if (priceRange.max) {
            filtered = filtered.filter(product => product.price <= parseInt(priceRange.max));
        }

        // Sort
        filtered.sort((a, b) => {
            switch (sortBy) {
                case "priceLow":
                    return a.price - b.price;
                case "priceHigh":
                    return b.price - a.price;
                case "oldest":
                    return new Date(a.createdAt) - new Date(b.createdAt);
                case "latest":
                default:
                    return new Date(b.createdAt) - new Date(a.createdAt);
            }
        });

        setFilteredProducts(filtered);
        setCurrentPage(1);
    }, [products, searchTerm, selectedCategory, sortBy, priceRange]);

    const handleAddToCart = async (product, action = 'add') => {
        const existingItem = cartItems.find(item => item.productId === product._id);

        if (existingItem) {
            if (action === 'increase') {
                setCartItems(cartItems.map(item =>
                    item.productId === product._id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                ));
            } else if (action === 'decrease') {
                if (existingItem.quantity > 1) {
                    setCartItems(cartItems.map(item =>
                        item.productId === product._id
                            ? { ...item, quantity: item.quantity - 1 }
                            : item
                    ));
                } else {
                    setCartItems(cartItems.filter(item => item.productId !== product._id));
                }
            }
        } else {
            setCartItems([...cartItems, {
                productId: product._id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: 1
            }]);


            try {
                const token = localStorage.getItem("token");
                const response = await axios.post(backendUrl + "/shopnexa_api/cart/add", {
                    productId: product._id,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    quantity: 1
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                pushAddToCart(product);
                console.log(product)
                console.log("Added to cart:", response.data);
                toast.success("Product added to cart!");
            } catch (error) {
                console.error("Error adding to cart:", error);
                toast.error("Failed to add product to cart");
            }
        }
    };

    const clearFilters = () => {
        setSearchTerm("");
        setSelectedCategory("All");
        setPriceRange({ min: "", max: "" });
        setSortBy("latest");
    };

    // Pagination
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-gradient-to-br from-slate-50 via-white to-blue-50 border-b border-slate-200/60">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 via-slate-800 to-blue-900 bg-clip-text text-transparent mb-3">
                            Our Products
                        </h1>
                        <p className="text-slate-600 text-lg">Discover our curated collection of premium products</p>
                    </div>

                    {/* Main Controls */}
                    <div className="flex flex-col lg:flex-row gap-6 lg:gap-4 items-start lg:items-center justify-between mb-6">
                        {/* Search */}
                        <div className="relative flex-1 max-w-md w-full">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Search className="h-5 w-5 text-slate-400" />
                            </div>
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="block w-full pl-6 pr-4 py-3.5 text-slate-900 placeholder-slate-500 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all duration-200"
                            />
                        </div>

                        {/* Controls Group */}
                        <div className="flex items-center gap-3 w-full lg:w-auto">
                            {/* Filter Toggle */}
                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className={`inline-flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-2xl border transition-all duration-200 ${showFilters
                                    ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-600/25'
                                    : 'bg-white/80 backdrop-blur-sm text-slate-700 border-slate-200 hover:bg-white hover:border-slate-300 shadow-sm'
                                    }`}
                            >
                                <Filter className="w-4 h-4" />
                                Filters
                                <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                            </button>

                            {/* View Mode Toggle */}
                            <div className="inline-flex bg-white/80 backdrop-blur-sm border border-slate-200 rounded-2xl p-1 shadow-sm">
                                <button
                                    onClick={() => setViewMode('grid')}
                                    className={`inline-flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-200 ${viewMode === 'grid'
                                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
                                        : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                                        }`}
                                >
                                    <Grid3X3 className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={() => setViewMode('list')}
                                    className={`inline-flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-200 ${viewMode === 'list'
                                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
                                        : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                                        }`}
                                >
                                    <List className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Advanced Filters Panel */}
                    {showFilters && (
                        <div className="bg-white/60 backdrop-blur-sm border border-slate-200 rounded-3xl p-6 shadow-xl shadow-slate-900/5">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-slate-900">Advanced Filters</h3>
                                <button
                                    onClick={() => setShowFilters(false)}
                                    className="p-1 text-slate-400 hover:text-slate-600 transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {/* Price Range */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-slate-700">Price Range</label>
                                    <div className="flex items-center gap-3">
                                        <div className="relative">
                                            <input
                                                type="number"
                                                placeholder="Min"
                                                value={priceRange.min}
                                                onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                                                className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all duration-200"
                                            />
                                        </div>
                                        <span className="text-slate-400 font-medium">to</span>
                                        <div className="relative">
                                            <input
                                                type="number"
                                                placeholder="Max"
                                                value={priceRange.max}
                                                onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                                                className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all duration-200"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Categories */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-slate-700">Category</label>
                                    <select
                                        value={selectedCategory}
                                        onChange={(e) => setSelectedCategory(e.target.value)}
                                        className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all duration-200 bg-white"
                                    >
                                        <option value="All">All Categories</option>
                                        {categories.map(category => (
                                            <option key={category} value={category}>
                                                {category}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Sort */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-slate-700">Sort by</label>
                                    <select
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value)}
                                        className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all duration-200 bg-white"
                                    >
                                        <option value="latest">Latest</option>
                                        <option value="oldest">Oldest</option>
                                        <option value="priceLow">Price: Low to High</option>
                                        <option value="priceHigh">Price: High to Low</option>
                                    </select>
                                </div>

                                {/* Clear Filters */}
                                <div className="flex items-end">
                                    <button
                                        onClick={clearFilters}
                                        className="w-full px-6 py-2.5 text-sm font-medium text-slate-600 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all duration-200"
                                    >
                                        Clear All
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Active Filters Display */}
                    {(searchTerm || selectedCategory !== 'all' || priceRange.min || priceRange.max || sortBy !== 'latest') && (
                        <div className="flex flex-wrap items-center gap-2 mt-4">
                            <span className="text-sm font-medium text-slate-600">Active filters:</span>

                            {searchTerm && (
                                <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                                    Search: "{searchTerm}"
                                    <button onClick={() => setSearchTerm('')} className="hover:text-blue-900">
                                        <X className="w-3 h-3" />
                                    </button>
                                </span>
                            )}

                            {selectedCategory !== 'all' && (
                                <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                                    {selectedCategory}
                                    <button onClick={() => setSelectedCategory('all')} className="hover:text-green-900">
                                        <X className="w-3 h-3" />
                                    </button>
                                </span>
                            )}

                            {(priceRange.min || priceRange.max) && (
                                <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">
                                    ${priceRange.min || '0'} - ${priceRange.max || '∞'}
                                    <button onClick={() => setPriceRange({ min: '', max: '' })} className="hover:text-purple-900">
                                        <X className="w-3 h-3" />
                                    </button>
                                </span>
                            )}

                            {sortBy !== 'latest' && (
                                <span className="inline-flex items-center gap-1 px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-xs font-medium">
                                    Sort: {sortBy}
                                    <button onClick={() => setSortBy('latest')} className="hover:text-orange-900">
                                        <X className="w-3 h-3" />
                                    </button>
                                </span>
                            )}

                            <button
                                onClick={clearFilters}
                                className="text-xs text-slate-500 hover:text-slate-700 underline"
                            >
                                Clear all
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Products Grid */}
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-6">
                    <p className="text-gray-600">
                        Showing {currentProducts.length} of {filteredProducts.length} products
                    </p>
                </div>

                {currentProducts.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="text-gray-400 text-6xl mb-4">🛍️</div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                        <p className="text-gray-600">Try adjusting your search or filter criteria</p>
                    </div>
                ) : (
                    <div className={`grid gap-6 ${viewMode === 'grid'
                        ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                        : 'grid-cols-1'
                        }`}>
                        {currentProducts.map(product => (
                            <ProductCard
                                key={product._id}
                                product={product}
                                cartItems={cartItems}
                                onAddToCart={handleAddToCart}
                                onViewDetails={setSelectedProduct}
                            />
                        ))}
                    </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex justify-center mt-12">
                        <div className="flex gap-2">
                            <button
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                                className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 hover:bg-gray-50 transition-colors"
                            >
                                Previous
                            </button>

                            {[...Array(totalPages)].map((_, index) => (
                                <button
                                    key={index + 1}
                                    onClick={() => setCurrentPage(index + 1)}
                                    className={`px-4 py-2 border border-gray-300 rounded-lg transition-colors ${currentPage === index + 1
                                        ? 'bg-indigo-600 text-white border-indigo-600'
                                        : 'hover:bg-gray-50'
                                        }`}
                                >
                                    {index + 1}
                                </button>
                            ))}

                            <button
                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages}
                                className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 hover:bg-gray-50 transition-colors"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Product Modal */}
            <ProductModal
                product={selectedProduct}
                isOpen={!!selectedProduct}
                onClose={() => setSelectedProduct(null)}
            />
        </div>
    );
}



function ProductModal({ product, isOpen, onClose }) {
    if (!isOpen || !product) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="relative">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-60 object-cover"
                    />
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 bg-white/90 p-2 rounded-full hover:bg-white transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div className="p-6">
                    <div className="mb-2">
                        <span className="bg-indigo-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                            {product.category}
                        </span>
                    </div>
                    <h2 className="text-2xl font-bold mb-4">{product.name}</h2>
                    <p className="text-gray-600 mb-4">{product.description}</p>
                    <div className="flex items-center gap-4 mb-6">
                        <span className="text-3xl font-bold text-indigo-600">₹{product.price.toLocaleString()}</span>
                        <div className="flex items-center">
                            <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                            <span className="ml-1 font-medium">{product.ratings}</span>
                        </div>
                    </div>
                    <div className="mb-6">
                        <h3 className="font-semibold mb-2">Product Details:</h3>
                        <ul className="text-gray-600 space-y-1">
                            <li>• High-quality materials and construction</li>
                            <li>• Fast shipping and reliable delivery</li>
                            <li>• 30-day return policy</li>
                            <li>• Customer support available 24/7</li>
                        </ul>
                    </div>
                    <button
                        disabled={!product.inStock}
                        className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-3 rounded-xl font-semibold hover:from-indigo-700 hover:to-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {product.inStock !== 0 ? 'Add to Cart' : 'Out of Stock'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Products;