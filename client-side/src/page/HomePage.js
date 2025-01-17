import {
  MdOutlineShoppingCart,
  MdProductionQuantityLimits,
} from "react-icons/md";
import BestSelling from "../features/bestsellingproduct/components/BestSelling";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllProductsAsync,
  fetchCategoriesAsync,
  fetchNewArrivalsAsync,
  selectAllProducts,
  selectCategories,
  selectNewArrivals,
} from "../features/products/productSlice";
import CategoryCart from "./common/CategoryCart";
import { useEffect, useRef } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import ProductsCart from "./common/ProductsCart";

import { motion } from "framer-motion";
import ProductCart from "../features/products/components/ProductCart";
import Testimonials from "./Testimonials";
import SpecialOffers from "./SpecialOffers";

function HomePage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategoriesAsync());
    dispatch(fetchAllProductsAsync());
    dispatch(fetchNewArrivalsAsync());
  }, [dispatch]);

  const categories = useSelector(selectCategories);
  const products = useSelector(selectAllProducts);
  const new_arrivals = useSelector(selectNewArrivals);

  const containerRef = useRef(null);
  // slider...setting..for category
  useEffect(() => {
    const interval = setInterval(() => {
      if (containerRef.current) {
        const scrollWidth = containerRef.current.scrollWidth;
        const containerWidth = containerRef.current.offsetWidth;
        const scrollPosition = containerRef.current.scrollLeft;

        // Reset scroll position when end of container is reached
        if (scrollPosition >= scrollWidth - containerWidth) {
          containerRef.current.scrollLeft = 0;
        } else {
          containerRef.current.scrollLeft += 2; // Adjust scroll speed here
        }
      }
    }, 20); // Interval controls the scroll speed

    return () => clearInterval(interval); // Clean up interval
  }, []);

  return (
    <div className="container mx-auto bg-base-100">
      {/* banner */}
      <div className="flex md:flex-row flex-col sm:items-start md:items-start md:justify-stretch md:gap-12  pt-20">
        <div
          className="w-[40%]  block"
          data-aos="fade-right"
          data-aos-offset="200"
          data-aos-delay="50"
          data-aos-duration="1000"
          data-aos-easing="ease-in-out"
          data-aos-mirror="true"
          data-aos-once="true"
        >
          <h1 className="text-5xl text-black block md:hidden font-bold mb-1">
            Welcome to ShopZen
          </h1>
          <h1 className="text-5xl hidden md:block font-bold mb-1 text-black">
            Welcome,
          </h1>
          <h1 className="text-5xl hidden md:block font-bold text-black">
            to ShopZen
          </h1>

          <div className=" font-thin mt-8 ">
            <p className="text-lg text-black w-screen text-left  max-w-screen-sm md:max-w-[90%]">
              Where ellegance meet your destiny Discover Quality, Elegance, and
              Unmatched Service Today! Shop now for exclusive offers and
              timeless style.Experience seamless shopping, curated collections,
              and exceptional customer care always. Enjoy luxury, convenience,
              and personalized experiences every time you visit.
            </p>
          </div>

          <Link to="/products">
            <button className="btn flex flex-row gap-2 btn-wide hover:bg-[#b43939] bg-[#db4444] text-white font-bold text-lg mt-16">
              <MdOutlineShoppingCart className="font-bold text-2xl"></MdOutlineShoppingCart>
              Shop Now!
            </button>
          </Link>
        </div>

        <div
          className="w-[55%] block relative  md:h-96"
          data-aos="fade-left"
          data-aos-offset="200"
          data-aos-delay="50"
          data-aos-duration="1000"
          data-aos-easing="ease-in-out"
          data-aos-mirror="true"
          data-aos-once="true"
        >
          <video
            className="absolute top-0 left-0 w-full h-full object-cover z-0"
            autoPlay
            muted
            loop
          >
            <source src="images/Shopping Discounts.mp4" type="video/mp4" />
            Loading...
          </video>
        </div>
      </div>

      {/* cateogory... */}
      <div className="mt-16 border-t py-11">
        <div className="mt-10">
          <div className="flex flex-row gap-2 font-semibold items-center  ">
            <div className="w-4 h-8 bg-[#db4444] rounded-l-md"></div>
            <p className="text-[#db4444] font-bold">Categories</p>
          </div>

          <div className="flex flex-row justify-between items-center">
            <h1 className="mt-3 font-semibold text-3xl">Browse By Category</h1>
            <div className="flex flex-row gap-2">
              <FaArrowRight className="hover:bg-slate-300 cursor-pointer bg-slate-200 w-8 h-8 p-2 rounded-2xl"></FaArrowRight>
              <FaArrowLeft className=" hover:bg-slate-300 cursor-pointer bg-slate-200 w-8 h-8 p-2 rounded-2xl"></FaArrowLeft>
            </div>
          </div>

          {/* Scrolling Container */}
          <div className="mt-12 py-5 overflow-hidden relative">
            <motion.div
              className="flex gap-4"
              animate={{
                x: ["0%", "-100%"],
              }}
              transition={{
                repeat: Infinity,
                repeatType: "loop",
                duration: 20,
                ease: "linear",
              }}
            >
              {categories.map((category) => (
                <div
                  key={category.id}
                  className="flex items-center justify-center bg-gray-100 p-4 rounded-lg w-40 h-40"
                >
                  <CategoryCart category={category} />
                </div>
              ))}

              {/* Duplicate items for seamless scrolling */}
              {categories.map((category) => (
                <div
                  key={`duplicate-${category.id}`}
                  className="flex items-center justify-center bg-gray-100 p-4 rounded-lg w-40 h-40"
                >
                  <CategoryCart category={category} />
                </div>
              ))}
            </motion.div>
          </div>

          {/* banner2.. */}
          <div
            data-aos="fade-up"
            data-aos-offset="200"
            data-aos-delay="50"
            data-aos-duration="1500"
            data-aos-easing="ease-in-out"
            data-aos-mirror="true"
            data-aos-once="false"
            className="relative mt-20 border-t py-11 h-[470px] w-full bg-cover bg-center"
            style={{ backgroundImage: "url(images/b.jpg)" }}
          >
            <div className="absolute left-8 top-7 p-4">
              <p className="mt-7 text-[#00ff66] pl-2   border-l-8 border-[#00ff66]">
                ShopZen
              </p>
              <p className="text-white text-2xl md:text-5xl font-semibold italic mt-8 mb-4">
                Effortless Shopping,{" "}
              </p>
              <p className="text-white text-2xl  md:text-5xl font-semibold italic">
                {" "}
                Seamless shopping experience
              </p>
              <Link to="/products">
                {" "}
                <button className=" btn px-10 mt-14 bg-[#00ff66] text-white font-semibold text-lg">
                  Buy Now
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* our products.. */}
      <div className="mt-20 ">
        <div className="flex flex-row gap-2 font-semibold items-center  ">
          <div className="w-4 h-8 bg-[#db4444] rounded-l-md"></div>
          <p className="text-[#db4444] font-bold">Our Products</p>
        </div>

        <div className="flex flex-row justify-between items-center">
          <h1 className="mt-3 font-semibold text-3xl">Explore Our Products</h1>
          <div className="flex flex-row gap-2">
            <FaArrowRight className="hover:bg-slate-300 cursor-pointer bg-slate-200 w-8 h-8 p-2 rounded-2xl"></FaArrowRight>
            <FaArrowLeft className=" hover:bg-slate-300 cursor-pointer bg-slate-200 w-8 h-8 p-2 rounded-2xl"></FaArrowLeft>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-5  gap-5">
          {products?.slice(0, 10)?.map((product) => (
            <ProductCart key={product.id} product={product}></ProductCart>
          ))}
        </div>

        <div className="flex flex-row justify-center items-center">
          <Link to="/products">
            <button className="btn btn-wide mt-8 flex flex-row gap-2 px-7 hover:bg-[#b43939] bg-[#db4444] text-white  text-base ">
              <MdProductionQuantityLimits className="font-bold text-2xl"></MdProductionQuantityLimits>
              View All Products
            </button>
          </Link>
        </div>
      </div>


      {/* new arrivals */}

      <div className="mt-20">
        <div className="flex flex-row gap-2 font-semibold items-center">
          <div className="w-4 h-8 bg-[#db4444] rounded-l-md"></div>
          <p className="text-[#db4444] font-bold">Featured</p>
        </div>
        <h1 className="mt-3 font-semibold text-3xl">New Arrival</h1>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {new_arrivals?.slice(0, 4)?.map((product, index) => (
            <div
              key={product.id}
              className={`overflow-hidden rounded-lg shadow-lg ${
                index === 0
                  ? "row-span-2 col-span-2"
                  : index === 1
                  ? "row-span-1 col-span-2"
                  : index === 2
                  ? "row-span-2 col-span-1"
                  : "row-span-1 col-span-1"
              }`}
            >
              <Link to={`/products/${product.id}`}>
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="border-2 shadow-2xl w-full h-full object-cover transform transition-transform duration-300 hover:scale-105"
                />
              </Link>
            </div>
          ))}
        </div>

        
      </div>


      {/* customer testimonials */}
      <div>
        <Testimonials></Testimonials>
      </div>


      {/* special offers */}
      <div>
        <SpecialOffers></SpecialOffers>
      </div>


    </div>
  );
}

export default HomePage;
