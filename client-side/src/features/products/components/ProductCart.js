import React from "react";
import { FaStar } from "react-icons/fa6";
import { Link } from "react-router-dom";

function ProductCart({ product }) {
  let oldPrice = +product?.price;
  let ds = +product?.discountPercentage;
  let newPrice = oldPrice - (oldPrice * ds) / 100;

  return (
    <Link to={`/products/${product.id}`} className="no-underline">
      <div className="max-w-xs bg-white border border-gray-100 rounded-xl shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
        <div className="overflow-hidden rounded-t-xl">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full h-48 object-cover transition-transform duration-500 hover:scale-110"
          />
        </div>
        <div className="p-5">
          <h1 className="text-md font-semibold text-gray-900 truncate">{product?.title}</h1>
          
          <div className="flex items-baseline justify-between mt-3 mb-4">
            <div>
              <p className="text-xs text-gray-500">Price:</p>
              <span className="text-lg font-bold text-red-500">${newPrice.toFixed(2)}</span>
               <span className="text-gray-400 line-through text-xs ml-2">${Math.round(oldPrice)}</span>
            </div>
            <span className="bg-green-100 text-green-600 text-xs font-medium px-2 py-1 rounded-full">
              {product?.discountPercentage}% OFF
            </span>
          </div>

          <div className="flex items-center gap-1 mb-3">
            {Array.from({ length: 5 }).map((_, index) => (
              <FaStar key={index} className="text-yellow-400 text-sm" />
            ))}
            <span className="text-xs text-gray-500 ml-2">(120 reviews)</span>
          </div>

          <button className="w-full py-2 bg-gradient-to-r from-slate-800 to-slate-900 text-white text-sm font-medium rounded-lg hover:from-slate-900 hover:to-slate-950 transition-colors duration-300">
            Add to Cart
          </button>
        </div>
      </div>
    </Link>
  );
}

export default ProductCart;
