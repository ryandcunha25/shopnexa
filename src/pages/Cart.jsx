import { useEffect, useState } from "react";
import axios from "axios";

function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const backendUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    alert("Please log in to view your cart.");
                    setLoading(false);
                    return;
                }

                const response = await axios.get(backendUrl + "/shopnexa_api/cart", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log(response.data);
                setCartItems(response.data.items);
                console.log(cartItems)
                setLoading(false);
            } catch (error) {
                console.error("Error fetching cart:", error);
                setLoading(false);
            }
        };

        fetchCart();
    }, []);

    if (loading) {
        return <p className="p-6">Loading cart...</p>;
    }

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
            {cartItems.length === 0 ? (
                <p className="text-gray-600">No items added yet.</p>
            ) : (
                <div className="space-y-4">
                    {cartItems.map((item) => (
                        <div
                            key={item._id}
                            className="flex items-center justify-between border rounded p-4 shadow"
                        >
                            <div className="flex items-center space-x-4">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-16 h-16 object-cover rounded"
                                />
                                <div>
                                    <h3 className="text-lg font-semibold">{item.name}</h3>
                                    <p className="text-gray-600">
                                        &#8377; {item.price} × {item.quantity}
                                    </p>
                                </div>
                            </div>
                            <p className="font-bold">&#8377; {item.price * item.quantity}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Cart;
