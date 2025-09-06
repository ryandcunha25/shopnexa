import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";

function Products() {
    const [products, setProducts] = useState([]);
    const backendUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

    useEffect(() => {
        axios.get(backendUrl + "/shopnexa_api/products")
            .then(res => setProducts(res.data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            {products.map(product => (
                <ProductCard key={product._id} product={product} />
            ))}
        </div>
    );
}

export default Products;
