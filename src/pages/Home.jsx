import React, { useState, useEffect } from 'react';
import {
  ShoppingBag,
  Star,
  ArrowRight,
  Zap,
  Truck,
  Shield,
  Gift,
  Heart,
  ChevronLeft,
  ChevronRight,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Smartphone,
  Shirt,
  Watch,
  Headphones,
  Camera,
  Home as HomeIcon,
  TrendingUp,
  Clock,
  Users,
  CheckCircle,
  Cpu,
  BookOpen,
  Music,
  Utensils,
  Sofa,
  Car,
  Gamepad2,
} from 'lucide-react';
import { Link } from 'react-router-dom';

function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [email, setEmail] = useState('');
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);


  const backendUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

  const categoryIcons = [
    Cpu,           // Electronics
    Shirt,         // Fashion
    HomeIcon,      // Home & Kitchen
    Sofa,          // Furniture
    Smartphone,    // Default 1
    Heart,         // Default 2
    BookOpen,      // Default 3
    Music,         // Default 4
    Utensils,      // Default 5
    Watch,         // Default 6
    Car,           // Default 7
    Gamepad2,      // Default 8
    Camera,        // Default 9
    ShoppingBag,   // Default 10
  ];

  const categoryColors = [
    "from-blue-500 to-blue-600",
    "from-pink-500 to-pink-600",
    "from-green-500 to-green-600",
    "from-amber-500 to-amber-600",
    "from-purple-500 to-purple-600",
    "from-red-500 to-red-600",
    "from-indigo-500 to-indigo-600",
    "from-teal-500 to-teal-600"
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(backendUrl + "/shopnexa_api/products");
        const data = await response.json();
        // setProducts(data)
        console.log(data)
        // Extract unique categories with counts
        const categoryMap = {};

        data.forEach(product => {
          if (categoryMap[product.category]) {
            categoryMap[product.category] += 1;
          } else {
            categoryMap[product.category] = 1;
          }
        });


        // Convert to array of objects
        const categoriesWithCounts = Object.keys(categoryMap).map(category => ({
          name: category,
          count: categoryMap[category]
        }));

        console.log(categoriesWithCounts)

        setCategories(categoriesWithCounts);
        console.log(categories)
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Hero banners data
  const heroBanners = [
    {
      id: 1,
      title: "Big Festive Sale",
      subtitle: "Up to 70% Off on Electronics",
      description: "Discover amazing deals on smartphones, laptops, and more!",
      image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200&h=600&fit=crop",
      gradient: "from-purple-600 to-blue-600",
      cta: "Shop Electronics"
    },
    {
      id: 2,
      title: "Fashion Forward",
      subtitle: "New Collection 2024",
      description: "Trendy styles that define your personality",
      image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=1200&h=600&fit=crop",
      gradient: "from-pink-600 to-rose-600",
      cta: "Explore Fashion"
    },
    {
      id: 3,
      title: "Tech Revolution",
      subtitle: "Latest Gadgets & More",
      description: "Stay ahead with cutting-edge technology",
      image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=1200&h=600&fit=crop",
      gradient: "from-blue-600 to-cyan-600",
      cta: "Shop Tech"
    }
  ];

  // // Categories data
  // const categories = [
  //   { name: "Electronics", icon: Smartphone, color: "from-blue-500 to-purple-600", items: "2,543 items" },
  //   { name: "Fashion", icon: Shirt, color: "from-pink-500 to-rose-600", items: "1,832 items" },
  //   { name: "Watches", icon: Watch, color: "from-amber-500 to-orange-600", items: "864 items" },
  //   { name: "Audio", icon: Headphones, color: "from-green-500 to-emerald-600", items: "721 items" },
  //   { name: "Cameras", icon: Camera, color: "from-red-500 to-pink-600", items: "456 items" },
  //   { name: "Home & Living", icon: HomeIcon, color: "from-indigo-500 to-purple-600", items: "1,234 items" }
  // ];

  // Featured products data
  const featuredProducts = [
    {
      id: 1,
      name: "Premium Wireless Headphones",
      price: 15999,
      originalPrice: 22999,
      rating: 4.8,
      reviews: 1247,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
      badge: "Best Seller",
      badgeColor: "bg-green-500"
    },
    {
      id: 2,
      name: "Smart Fitness Watch",
      price: 12999,
      originalPrice: 18999,
      rating: 4.9,
      reviews: 892,
      image: "https://images.unsplash.com/photo-1544117519-31a4b719223d?w=400&h=300&fit=crop",
      badge: "Trending",
      badgeColor: "bg-orange-500"
    },
    {
      id: 3,
      name: "Professional Camera",
      price: 45999,
      originalPrice: 59999,
      rating: 4.7,
      reviews: 634,
      image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=300&fit=crop",
      badge: "Featured",
      badgeColor: "bg-purple-500"
    },
    {
      id: 4,
      name: "Gaming Laptop",
      price: 89999,
      originalPrice: 109999,
      rating: 4.6,
      reviews: 423,
      image: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=400&h=300&fit=crop",
      badge: "Hot Deal",
      badgeColor: "bg-red-500"
    }
  ];

  // Testimonials data
  const testimonials = [
    {
      id: 1,
      name: "Priya Sharma",
      role: "Verified Buyer",
      content: "Amazing quality products and super fast delivery! ShopNexa has become my go-to shopping destination.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b977?w=100&h=100&fit=crop&crop=face"
    },
    {
      id: 2,
      name: "Rahul Kumar",
      role: "Premium Member",
      content: "The customer service is exceptional and the product range is incredible. Highly recommended!",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
    },
    {
      id: 3,
      name: "Anita Patel",
      role: "Regular Customer",
      content: "Great deals and authentic products. The shopping experience is smooth and hassle-free.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
    }
  ];

  // Auto-rotate hero banners
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroBanners.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroBanners.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroBanners.length) % heroBanners.length);
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter subscription
    alert(`Thanks for subscribing with email: ${email}`);
    setEmail('');
  };



  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="relative h-[600px] md:h-[700px]">
          {heroBanners.map((banner, index) => (
            <div
              key={banner.id}
              className={`absolute inset-0 transition-all duration-1000 ${index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
                }`}
            >
              <div className="absolute inset-0">
                <img
                  src={banner.image}
                  alt={banner.title}
                  className="w-full h-full object-cover"
                />
                <div className={`absolute inset-0 bg-gradient-to-r ${banner.gradient} opacity-80`}></div>
                <div className="absolute inset-0 bg-black/20"></div>
              </div>

              <div className="relative z-10 max-w-7xl mx-auto px-4 h-full flex items-center">
                <div className="text-white max-w-2xl">
                  <div className="flex items-center gap-2 mb-4">
                    <Zap className="w-6 h-6 text-yellow-400" />
                    <span className="text-yellow-400 font-semibold">Limited Time Offer</span>
                  </div>
                  <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
                    {banner.title}
                  </h1>
                  <h2 className="text-2xl md:text-4xl font-bold mb-4 text-blue-100">
                    {banner.subtitle}
                  </h2>
                  <p className="text-xl mb-8 text-blue-50 max-w-lg">
                    {banner.description}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button className="bg-white text-slate-900 font-bold py-4 px-8 rounded-2xl hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-2xl flex items-center gap-3 justify-center">
                      <ShoppingBag className="w-6 h-6" />
                      {banner.cta}
                      <ArrowRight className="w-5 h-5" />
                    </button>
                    <button className="border-2 border-white text-white font-bold py-4 px-8 rounded-2xl hover:bg-white hover:text-slate-900 transition-all duration-300 transform hover:scale-105 flex items-center gap-3 justify-center">
                      <Gift className="w-6 h-6" />
                      View Deals
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-md text-white p-3 rounded-full hover:bg-white/30 transition-all duration-300 z-20"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-md text-white p-3 rounded-full hover:bg-white/30 transition-all duration-300 z-20"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
          {heroBanners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-white scale-125' : 'bg-white/50'
                }`}
            />
          ))}
        </div>
      </section>

      {/* Features Bar */}
      <section className="bg-white/80 backdrop-blur-sm border-y border-slate-200/60 py-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-8 text-center">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <Truck className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <p className="font-bold text-slate-900">Free Shipping</p>
                <p className="text-sm text-slate-600">Orders over ₹999</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <p className="font-bold text-slate-900">Secure Payment</p>
                <p className="text-sm text-slate-600">100% Protected</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <p className="font-bold text-slate-900">24/7 Support</p>
                <p className="text-sm text-slate-600">Always here to help</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Showcase */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-slate-900 to-blue-800 bg-clip-text text-transparent mb-4">
              Shop by Category
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Discover amazing products across all categories
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 items-center">
            {categories.map((category, index) => {
              const IconComponent = categoryIcons[index % categoryIcons.length];
              const color = categoryColors[index % categoryColors.length];

              return (
                <div
                  key={category.name}
                  className="group relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer border border-slate-200/60 hover:border-slate-300/80"
                >
                  <div className={`w-16 h-16 bg-gradient-to-br ${color} rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-bold text-lg text-slate-900 text-center mb-2">
                    {category.name}
                  </h3>
                  <p className="text-sm text-slate-600 text-center">
                    {category.items}
                  </p>
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-purple-600/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-gradient-to-br from-slate-100/50 to-blue-50/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <TrendingUp className="w-8 h-8 text-blue-600" />
              <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-slate-900 to-blue-800 bg-clip-text text-transparent">
                Featured Products
              </h2>
            </div>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Handpicked products that our customers love most
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-slate-200/60 hover:border-blue-200/80 transform hover:-translate-y-2"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className={`absolute top-4 left-4 ${product.badgeColor} text-white px-3 py-1 rounded-full text-sm font-bold`}>
                    {product.badge}
                  </div>
                  <button className="absolute top-4 right-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white">
                    <Heart className="w-5 h-5 text-slate-600 hover:text-red-500" />
                  </button>
                </div>

                <div className="p-6">
                  <h3 className="font-bold text-lg text-slate-900 mb-2 line-clamp-2">
                    {product.name}
                  </h3>

                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-slate-300'}`}
                        />
                      ))}
                    </div>
                    <span className="text-sm font-medium text-slate-700">
                      {product.rating} ({product.reviews})
                    </span>
                  </div>

                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl font-black text-slate-900">
                      ₹{product.price.toLocaleString()}
                    </span>
                    <span className="text-lg text-slate-400 line-through">
                      ₹{product.originalPrice.toLocaleString()}
                    </span>
                  </div>

                  <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-3 px-6 rounded-2xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/products">
              <button className="bg-white text-blue-600 font-bold py-4 px-8 rounded-2xl border-2 border-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-3 mx-auto">
                View All Products
                <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Deals & Offers */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-gradient-to-br from-orange-500 via-red-500 to-pink-600 rounded-3xl overflow-hidden shadow-2xl">
            <div className="relative p-12 md:p-20">
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="relative z-10 text-center text-white">
                <div className="flex items-center justify-center gap-3 mb-6">
                  <Zap className="w-12 h-12 text-yellow-300 animate-bounce" />
                  <h2 className="text-4xl md:text-6xl font-black">
                    Flash Sale!
                  </h2>
                </div>
                <p className="text-2xl md:text-3xl font-bold mb-4">
                  Buy 2 Get 1 Free
                </p>
                <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                  Limited time offer on selected electronics. Hurry up before the deal expires!
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="bg-white text-red-600 font-bold py-4 px-8 rounded-2xl hover:bg-yellow-50 transition-all duration-300 transform hover:scale-105 shadow-xl flex items-center gap-3 justify-center">
                    <Gift className="w-6 h-6" />
                    Grab Deal Now
                  </button>
                  <button className="border-2 border-white text-white font-bold py-4 px-8 rounded-2xl hover:bg-white hover:text-red-600 transition-all duration-300 transform hover:scale-105 flex items-center gap-3 justify-center">
                    <Clock className="w-6 h-6" />
                    View Timer
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-br from-slate-100/50 to-blue-50/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Users className="w-8 h-8 text-blue-600" />
              <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-slate-900 to-blue-800 bg-clip-text text-transparent">
                What Our Customers Say
              </h2>
            </div>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Don't just take our word for it - hear from our satisfied customers
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-slate-200/60 hover:border-blue-200/80 transform hover:-translate-y-2"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-slate-700 mb-6 text-lg leading-relaxed">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center gap-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-bold text-slate-900">{testimonial.name}</p>
                    <p className="text-sm text-slate-600">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 rounded-3xl overflow-hidden shadow-2xl">
            <div className="relative p-12 md:p-16">
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="relative z-10 text-center text-white">
                <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-8">
                  <Mail className="w-10 h-10" />
                </div>
                <h2 className="text-4xl md:text-5xl font-black mb-6">
                  Stay Updated
                </h2>
                <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                  Subscribe to our newsletter and get exclusive deals, new arrivals, and shopping tips delivered to your inbox!
                </p>

                <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto">
                  <div className="flex gap-4">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      required
                      className="flex-1 px-6 py-4 rounded-2xl text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-4 focus:ring-white/30"
                    />
                    <button
                      type="submit"
                      className="bg-white text-blue-600 font-bold px-8 py-4 rounded-2xl hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center gap-2"
                    >
                      <CheckCircle className="w-5 h-5" />
                      Subscribe
                    </button>
                  </div>
                  <p className="text-sm opacity-75 mt-4">
                    No spam, unsubscribe at any time
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;