import { useNavigate } from "react-router-dom";


function CategoryCart({category}) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/products/${category.value}`);
  };


  return (
    <div onClick={handleClick} className="carousel-item cursor-pointer stack border-2 rounded-xl border-gray-300 group hover:bg-[#db4444]">
      <div className="text-center flex flex-row justify-center items-center  rounded-md card w-40 h-40 ">
        <div className="card-body flex flex-col items-center">
           <img src={category.image} className="h-16 w-16 inline-block text-white" alt = 'loading'></img>
           <p>{category.label}</p>
        </div>
      </div>

    </div>
  );
}

export default CategoryCart;
