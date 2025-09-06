function ProductCard({ product }) {
    return (
        <div className="border rounded-lg p-4 shadow hover:shadow-lg transition">
            <img src={product.image} alt={product.title} className="w-full h-40 object-cover rounded" />
            <h3 className="mt-2 text-lg font-semibold">{product.name}</h3>
            <p className="text-gray-600">&#8377; {product.price}</p>
            <button className="mt-3 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
                Add to Cart
            </button>
        </div>
    );
}

export default ProductCard;
