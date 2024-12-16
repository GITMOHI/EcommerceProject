function RecommendedProducts({ products }) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="border p-4 rounded-md shadow-sm">
            <img src={product.image} alt={product.name} className="w-full h-32 object-cover mb-4" />
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p className="text-gray-500 mb-2">${product.price.toFixed(2)}</p>
            <button className="text-red-500 font-semibold">View Details</button>
          </div>
        ))}
      </div>
    );
  }
  
  export default RecommendedProducts;
  