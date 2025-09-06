import axios from "axios";

function ProductCard({ product }) {
    const backendUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

    const handleAddToCart = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("Please log in to add items to your cart.");
            return;
        }

        try {
            const response = await axios.post(backendUrl + "/shopnexa_api/cart/add", {
                productId: product._id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: 1
            },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log("Added to cart:", response.data);
            alert("Product added to cart!");
        } catch (error) {
            console.error("Error adding to cart:", error);
            alert("Failed to add product to cart");
        }
    };

    return (
        <div className="border rounded-lg p-4 shadow hover:shadow-lg transition">
            <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-cover rounded"
            />
            <h3 className="mt-2 text-lg font-semibold">{product.name}</h3>
            <p className="text-gray-600">&#8377; {product.price}</p>
            <button
                onClick={handleAddToCart}
                className="mt-3 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
            >
                Add to Cart
            </button>
        </div>
    );
}

export default ProductCard;
