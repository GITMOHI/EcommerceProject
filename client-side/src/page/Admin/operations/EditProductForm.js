import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-photo-view/dist/react-photo-view.css";
import { PhotoProvider, PhotoView } from "react-photo-view";

const EditProductForm = () => {
  const { p_id } = useParams();
  console.log(p_id);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [availableBrands, setAvailableBrands] = useState([]);
  const [availableCategories, setAvailableCategories] = useState([]);
  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    discountPercentage: "",
    stockQuantity: "",
    brand: "",
    category: "",
    thumbnail: null,
    images: [],
    highlights:""
  });

  useEffect(() => {
    // Fetch the product details to prefill the form
    const fetchProductDetails = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/products/${p_id}`
        );
        if (response.ok) {
          const data = await response.json();
          setFormData({
            title: data.title,
            description: data.description,
            price: data.price,
            discountPercentage: data.discountPercentage || "",
            stockQuantity: data.stock,
            brand: data.brand,
            highlights: data.highlights,
            category: data.category,
            thumbnail: data.thumbnail, 
            images: data.images || [], 
      
          });
        } else {
          toast.error("Failed to fetch product details.");
        }
      } catch (error) {
        console.error("Error fetching product details:", error);
        toast.error("An error occurred while fetching product details.");
      } finally {
        setLoading(false);
      }
    };

    // Fetch brands and categories
    const fetchBrandsAndCategories = async () => {
      try {
        const [brandsRes, categoriesRes] = await Promise.all([
          fetch(`${process.env.REACT_APP_API_URL}/brands`),
          fetch(`${process.env.REACT_APP_API_URL}/categories`),
        ]);

        if (brandsRes.ok) {
          const brandsData = await brandsRes.json();
          setAvailableBrands(brandsData);
        }

        if (categoriesRes.ok) {
          const categoriesData = await categoriesRes.json();
          setAvailableCategories(categoriesData);
        }
      } catch (error) {
        console.error("Error fetching brands/categories:", error);
        toast.error("An error occurred while fetching brands and categories.");
      }
    };

    fetchProductDetails();
    fetchBrandsAndCategories();
  }, [p_id]);

  console.log(formData);



  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'Chat-app'); // Your actual preset name
  
    try {
      const response = await fetch(`https://api.cloudinary.com/v1_1/dmc0prejr/image/upload`, {
        method: 'POST',
        body: formData,
      });
  
      if (response.ok) {
        const data = await response.json();
        return data.secure_url; // This is the URL of the uploaded image
      } else {
        throw new Error('Failed to upload image');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };
  

  
  // JSX for file input  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const removeImage = (imageUrl) => {
    setFormData((prevData) => ({
      ...prevData,
      images: prevData.images.filter((url) => url !== imageUrl), // Remove image by URL
      thumbnail: prevData.thumbnail === imageUrl ? null : prevData.thumbnail, // Remove thumbnail if it matches
    }));
  };

  
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
  
    if (file && file.type.startsWith("image/") && file.size <= 5 * 1024 * 1024) {
      try {
  
        // Call uploadToCloudinary and get the URL
        const imageUrl = await uploadToCloudinary(file);
  
        // Update formData with the Cloudinary URL
        setFormData((prevData) => ({
          ...prevData,
          thumbnail: imageUrl,
        }));
  
        toast.success("Thumbnail uploaded successfully.");
      } catch (error) {
        toast.error("Error uploading the image. Please try again.");
      }
    } else {
      toast.error("Invalid thumbnail. Please upload a valid image within 5 MB.");
    }
  };
  

  const handleMultipleImagesChange = async (e) => {
    const files = Array.from(e.target.files).filter(
      (file) => file.type.startsWith("image/") && file.size <= 5 * 1024 * 1024
    );
  
    try {
      toast.success(`${files.length} image(s) selected successfully.`);
  
      // Upload images to Cloudinary and collect their URLs
      const imageUrls = await Promise.all(
        files.map(async (file) => {
          const imageUrl = await uploadToCloudinary(file); // Upload the image and get the URL
          return imageUrl; // Return the URL
        })
      );
  
      // Update formData with the new images
      setFormData((prevData) => ({
        ...prevData,
        images: [...prevData.images, ...imageUrls], // Add the URLs to the existing images array
      }));
  
      toast.success(`${files.length} image(s) uploaded successfully.`);
    } catch (error) {
      toast.error("Error uploading the images. Please try again.");
    }
  };
  



  //sending req to server.................
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validation logic
    const errors = {};
    [
      "title",
      "description",
      "price",
      "stockQuantity",
      "brand",
      "category",
    ].forEach((field) => {
      if (!formData[field])
        errors[field] = `${
          field.charAt(0).toUpperCase() + field.slice(1)
        } is required.`;
    });

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setLoading(false);
      return;
    }

    // Prepare form data for submission
    const submissionData = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "images")
        value.forEach((image) => submissionData.append("images", image));
      else submissionData.append(key, value);
    });



    console.log(formData);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/products/update/${p_id}`,
        {
          method: "PATCH",  
          headers: {
            "Content-Type": "application/json", 
          },
          body: JSON.stringify(formData),  
          credentials: "include",  
        }
      );

      if (response.ok) {
        toast.success("Product updated successfully!");
        navigate("/products"); // Redirect to the products list
      } else {
        toast.error("Failed to update product.");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("An error occurred while updating the product.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 bg-white rounded-lg shadow-lg border border-gray-300">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-blue-500">
        Edit Product
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {/* Form Fields */}
        {[
          { name: "title", label: "Title", type: "text" },
          { name: "description", label: "Description", type: "textarea" },
          { name: "price", label: "Price", type: "number" },
          { name: "stockQuantity", label: "Stock Quantity", type: "number" },
        ].map(({ name, label, type }) => (
          <div key={name} className="col-span-1">
            <label className="block font-medium mb-1">{label}</label>
            {type === "textarea" ? (
              <textarea
                name={name}
                value={formData[name]}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <input
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              />
            )}
            {formErrors[name] && (
              <p className="text-red-500 text-sm">{formErrors[name]}</p>
            )}
          </div>
        ))}

        {[
          { name: "brand", label: "Brand", options: availableBrands },
          { name: "category", label: "Category", options: availableCategories },
        ].map(({ name, label, options }) => (
          <div key={name} className="col-span-1">
            <label className="block font-medium mb-1">{label}</label>
            <select
              name={name}
              value={formData[name]} // Keep the controlled component in sync
              onChange={handleChange}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a {label}</option>
              {options.map(({ id, label }) => (
                <option key={id} value={label}>
                  {label}
                </option>
              ))}
            </select>
            {formErrors[name] && (
              <p className="text-red-500 text-sm">{formErrors[name]}</p>
            )}

          </div>
        ))}

      {/* Thumbnail & Additional Images */}
{[
  {
    label: "Thumbnail Image",
    handler: handleFileChange,
    name: "thumbnail",
  },
  {
    label: "Additional Images",
    handler: handleMultipleImagesChange,
    name: "images",
    multiple: true,
  },
].map(({ label, handler, name, multiple }) => (
  <div key={name} className="col-span-1">
    <label className="block font-medium mb-1">{label}</label>
    <input
      type="file"
      accept="image/*"
      onChange={handler}
      multiple={multiple}
      className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
    />

    {/* Additional Images */}
    {name === "images" && formData[name].length > 0 && (
      <PhotoProvider
        speed={() => 800}
        easing={(type) =>
          type === 2
            ? "cubic-bezier(0.36, 0, 0.66, -0.56)"
            : "cubic-bezier(0.34, 1.56, 0.64, 1)"
        }
      >
        <div className="foo" style={{ display: "flex", flexWrap: "wrap" }}>
          {formData["images"].map((item, index) => (
            <div key={index} className="relative">
              <PhotoView src={item}>
                <img
                  src={item}
                  className="w-20 h-20 object-cover border rounded"
                  alt="Uploaded"
                />
              </PhotoView>
              {/* Remove Button (X) */}
              <button
                onClick={() => removeImage(item)} // Handle image removal
                className="absolute top-0 right-0 bg-red-500 text-white  px-2 rounded-full"
              >
                X
              </button>
            </div>
          ))}
        </div>
      </PhotoProvider>
    )}

    {/* Thumbnail Image */}
    {name === "thumbnail" && formData[name] && (
      <PhotoProvider
        speed={() => 800}
        easing={(type) =>
          type === 2
            ? "cubic-bezier(0.36, 0, 0.66, -0.56)"
            : "cubic-bezier(0.34, 1.56, 0.64, 1)"
        }
      >
        <div className="mt-2 relative">
          <PhotoView
            src={
              formData[name]
                ? formData[name]
                : URL.createObjectURL(formData[name])
            }
          >
            <img
              src={
                formData[name]
                  ? formData[name]
                  : URL.createObjectURL(formData[name])
              }
              alt="Thumbnail"
              className="w-20 h-20 object-cover border rounded"
            />
          </PhotoView>
          {/* Remove Button (X) for Thumbnail */}
          <button
            onClick={() => removeImage(formData[name])} // Handle removal of thumbnail
            className="absolute top-0 right-0 bg-red-500 text-white  px-2 rounded-full"
          >
            X
          </button>
        </div>
      </PhotoProvider>
    )}

    {formErrors[name] && (
      <p className="text-red-500 text-sm">{formErrors[name]}</p>
    )}
  </div>
))}


<div className="col-span-1 md:col-span-2">
          <label className="block font-medium mb-1">Highlights</label>
          <textarea
            name="highlights"
            value={formData.highlights}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-red-500"
          />
          {formErrors.highlights && <p className="text-red-500 text-sm">{formErrors.highlights}</p>}
        </div>
<div className="col-span-1 md:col-span-2">
          <label className="block font-medium mb-1">Discount Percentage</label>
          <input type="number"
            name="discountPercentage"
            value={formData.discountPercentage}
            onChange={handleChange}
            className="w-full  border rounded focus:ring-2 focus:ring-red-500"
          />
          {formErrors.discountPercentage && <p className="text-red-500 text-sm">{formErrors.discountPercentage}</p>}
        </div>

        {/* Submit Button */}
        <div className="col-span-1 md:col-span-2 flex justify-center">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white font-bold py-2 px-8 rounded hover:bg-blue-500 transition"
          >
            {loading ? "Updating..." : "Update Product"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProductForm;
