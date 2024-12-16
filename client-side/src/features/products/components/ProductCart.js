import React from "react";
import { FaStar } from "react-icons/fa6";
import { Link } from "react-router-dom";

function ProductCart({ product }) {
  let oldPrice = +product?.price;
  let ds = +product?.discountPercentage;
  oldPrice = oldPrice + oldPrice * (ds / 100);

  return (
    <Link to={`/products/${product.id}`}>
      <div className="card w-60 h-80 shadow-xl relative group cursor-pointer border hover:transform hover:-translate-y-2 hover:shadow-2xl transition-transform duration-300">
        <div className="px-14 py-10 bg-base-200 h-44 relative">
          <img
            src={product.thumbnail}
            alt="Product"
            width="150px"
            height="100px"
            className="rounded-xl"
          />
        </div>
        <button className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-90 text-white text-center py-2 hover:opacity-90 duration-700 transition-opacity">
          Add to Cart
        </button>
        <div className="card-body px-2 py-2 text-left">
          <h1 className="font-bold text-base text-left">{product?.title}</h1>
          <div className="flex flex-row gap-4">
            <h1 className="text-[#db4444] font-semibold">${product?.price}</h1>
            <h1 className="font-semibold text-gray-400">
              ${Math.round(oldPrice)}
            </h1>
          </div>
          <div className="flex flex-row gap-1 mt-0">
            {Array.from({
              length: product.rating > 5 ? 5 : product.rating,
            }).map((_, index) => (
              <FaStar key={index} className="text-yellow-400" />
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ProductCart;
