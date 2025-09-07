import { Link } from "react-router-dom";
import { ShoppingBag, User, Home, Package, Menu, X } from "lucide-react";
import { useState } from "react";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 text-white shadow-2xl sticky top-0 z-50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          
          {/* Logo */}
          <Link 
            to="/" 
            className="text-2xl md:text-3xl font-black bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent hover:scale-105 transition-all duration-300 flex items-center gap-2"
          >
            <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
              <ShoppingBag className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </div>
            ShopNexa
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            <Link 
              to="/" 
              className="flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-lg backdrop-blur-sm border border-transparent hover:border-white/20"
            >
              <Home className="w-5 h-5" />
              <span className="font-semibold">Home</span>
            </Link>
            
            <Link 
              to="/products" 
              className="flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-lg backdrop-blur-sm border border-transparent hover:border-white/20"
            >
              <Package className="w-5 h-5" />
              <span className="font-semibold">Products</span>
            </Link>
            
            <Link 
              to="/cart" 
              className="flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-lg backdrop-blur-sm border border-transparent hover:border-white/20 relative"
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="font-semibold">Cart</span>
            </Link>
            
            <Link 
              to="/login" 
              className="flex items-center gap-2 ml-4 px-4 py-2 bg-white text-indigo-600 font-bold rounded-xl hover:bg-yellow-400 hover:text-indigo-800 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl transform"
            >
              <User className="w-5 h-5" />
              <span>Login</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors duration-200"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
          <div className="px-2 pt-2 pb-6 space-y-2 bg-black/10 rounded-2xl mt-2 backdrop-blur-md border border-white/10">
            <Link 
              to="/" 
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition-all duration-300 font-semibold"
              onClick={() => setIsMenuOpen(false)}
            >
              <Home className="w-5 h-5" />
              Home
            </Link>
            
            <Link 
              to="/products" 
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition-all duration-300 font-semibold"
              onClick={() => setIsMenuOpen(false)}
            >
              <Package className="w-5 h-5" />
              Products
            </Link>
            
            <Link 
              to="/cart" 
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition-all duration-300 font-semibold relative"
              onClick={() => setIsMenuOpen(false)}
            >
              <ShoppingBag className="w-5 h-5" />
              Cart
              <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold ml-auto">
                3
              </div>
            </Link>
            
            <Link 
              to="/login" 
              className="flex items-center gap-3 px-4 py-3 bg-white text-indigo-600 font-bold rounded-xl hover:bg-yellow-400 hover:text-indigo-800 transition-all duration-300 mt-4"
              onClick={() => setIsMenuOpen(false)}
            >
              <User className="w-5 h-5" />
              Login
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;