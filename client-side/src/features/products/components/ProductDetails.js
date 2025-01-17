import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductByIdAsync, selectSingleProduct } from "../productSlice";
import { FaDollarSign, FaStar } from "react-icons/fa6";
import { StarIcon } from "@heroicons/react/24/outline";
import { fetchLoggedInUser } from "../../Auth/authAPI";
import {
  fetchLoggedInUserAsync,
  selectLoggedInUser,
} from "../../Auth/authSlice";
import { addToCartAsync, fetchItemsByUserIdAsync, selectCartItems } from "../../cart/cartSlice";

const reviews = { href: "#", average: 4.43, totalCount: 117 };

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProductByIdAsync(id));
    dispatch(fetchLoggedInUserAsync());
    dispatch(fetchItemsByUserIdAsync()); 
  }, [dispatch, id]);
  const user = useSelector(selectLoggedInUser);

  const product = useSelector(selectSingleProduct);
  const cartItems = useSelector(selectCartItems);
  console.log(cartItems);  // Log to see the structure


  console.log(product);
  const {
    title,
    description,
    price,
    discountPercentage,
    rating,
    stock,
    brand,
    category,
    thumbnail,
    images,
  } = product;

  const navigate = useNavigate();

  // // functions...
  // const handleCart = (e) => {
  //   e.preventDefault();
    
  //   if (!user?.id) {
  //     navigate("/login");
  //   } else {
  //     // Check if the product is already in the cart
  //     const existingItem = cartItems.find(item => item.product.id === product.id);
  //     console.log(existingItem);
  //     if (!existingItem) {
  //       dispatch(addToCartAsync({ userId: user.id, productId: product.id }));
  //     } 
  //   }
  // };

    // // functions...
    // const handleCart = (e) => {
    //   e.preventDefault();
    //   console.log("CLicked!!!!!!!", user);
    //   if (!user?.id) {
    //     console.log("here in..", user);
    //     navigate("/login");
    //   } else {
    //     const existingItem = cartItems.find(item => item.product.id === product.id);
    //     if(!existingItem){
    //       const new_item = { product: product.id, quantity: 1, user: user?.id };
    //       delete new_item["id"];
    //       dispatch(addToCartAsync(new_item));
    //     }
    //     // const new_item = { product: product.id, quantity: 1, user: user?.id };
    //     // delete new_item["id"];
    //     // dispatch(addToCartAsync(new_item));
    //   }
    // }; 

    const handleCart = (e) => {
      e.preventDefault();
      console.log("Clicked!!!!!!!", user);
      
      // Redirect to login if user is not authenticated
      if (!user?.id) {
        // console.log("here in..", user);
        navigate("/login");
      } else {
        // Check if the product already exists in the cart
        console.log('new --> ',product);
        console.log('cartItems --> ',cartItems);
        const existingItem = cartItems.find(item => 
          item.product === product.id || (item.product.id && item.product.id === product.id)
      );
      
        console.log(existingItem);
        // If the item does not exist, add it to the cart
        if (!existingItem) {
          const new_item = { product: product.id, quantity: 1, user: user?.id };
          delete new_item["id"];
          console.log('Adding item to cart.........',new_item);
          console.log(new_item);
          dispatch(addToCartAsync(new_item));
        }
      }
    };

    
  return (
    <div className="bg-white mt-10">
      <div className="pt-6">
        <nav aria-label="Breadcrumb">
          <ol
            role="list"
            className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
          >
            <li className="text-sm">{title}</li>
          </ol>
        </nav>

        {/* Image gallery */}
        <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
          {images && images.length > 0 && (
            <>
              <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
                <img
                  src={images[0]}
                  alt={images[0]}
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
                {images[1] && (
                  <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                    <img
                      src={images[1]}
                      alt={images[1]}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                )}
                {images[2] && (
                  <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                    <img
                      src={images[2]}
                      alt={images[2]}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                )}
              </div>
              <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
                <img
                  src={thumbnail}
                  alt={thumbnail}
                  className="h-full w-full object-cover object-center"
                />
              </div>
            </>
          )}
        </div>

        {/* Product info */}
        <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              {title}
            </h1>
          </div>

          {/* Options */}
          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <h2 className="sr-only">Product information</h2>
            <p className="text-3xl tracking-tight text-gray-900">
              Price: ${price}
            </p>

            {/* Reviews */}
            <div className="mt-6">
              <h3 className="sr-only">Reviews</h3>
              <div className="flex items-center">
                <div className="flex items-center">
                  {Array.from({
                    length: product.rating > 5 ? 5 : product.rating,
                  }).map((_, index) => (
                    <FaStar key={index} className="text-yellow-400" />
                  ))}
                </div>
              </div>
            </div>

            <form className="mt-10" onSubmit={handleCart}>
              {/* Colors */}
              {/* Sizes */}

              <button
                type="submit"
                className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-[#db4444] px-8 py-3 text-base font-medium text-white hover:bg-[#b93535] hover:scale-105 duration-500  focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Add to bag
              </button>
            </form>
          </div>

          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
            {/* Description and details */}
            <div>
              <h3 className="sr-only">Description</h3>

              <div className="space-y-6">
                <p className="text-base text-gray-900">{description}</p>
              </div>
            </div>

            <div className="mt-10">
              <h3 className="text-sm font-medium text-gray-900">Highlights</h3>

              <div className="mt-4">
                {product?.highlights && (
                  <p className="text-sm text-gray-600">{product?.highlights}</p>
                )}
              </div>
            </div>

            <div className="mt-10">
              <h2 className="text-sm font-medium text-gray-900">Details</h2>

              <div className="mt-4 space-y-6">
                <p className="text-sm text-gray-600">{description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
