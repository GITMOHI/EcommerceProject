import { useEffect } from "react";
import { MdProductionQuantityLimits } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBestSellingsAsync,
  selectBestSellings,
} from "../bestSellingSlice";
import BestSellingCart from "./BestSellingCart";
import { Link, useNavigate, useNavigation } from "react-router-dom";

function BestSelling() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchBestSellingsAsync());
  }, [dispatch]);

  const bestSelling = useSelector(selectBestSellings);




  const naviagte = useNavigate();
  // functions..
  const handleBestSeller = () =>{
    const bestSeller = "bestSeller"
    naviagte(`/products/${bestSeller}`);
  }

  return (
    <div className="mt-10">
      <div className="flex flex-row gap-2 font-semibold items-center  ">
        <div className="w-4 h-8 bg-[#db4444] rounded-l-md"></div>
        <p className="text-[#db4444] font-bold">This Month</p>
      </div>

      <div className="flex flex-row justify-between items-center mt-1 ">
        <h1 className="font-semibold text-3xl">Best Selling Products</h1>
     
          <button onClick={handleBestSeller} className="btn flex flex-row gap-2 px-7 hover:bg-[#b43939] bg-[#db4444] text-white  text-base ">
            <MdProductionQuantityLimits className="font-bold text-2xl"></MdProductionQuantityLimits>
            View All
          </button>
      
      </div>

      <div className="grid grid-cols-5 mt-10 gap-5">
        {bestSelling?.slice(0, 5)?.map((bs) => (
          <BestSellingCart key={bs?.id} bestSeller={bs}></BestSellingCart>
        ))}
      </div>
    </div>
  );
}

export default BestSelling;
