import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditProductForm = () => {
  const { id } = useParams(); // Assuming the product ID is passed via URL params
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
  });

  useEffect(() => {
    // Fetch the product details to prefill the form
    const fetchProductDetails = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/products/${id}`);
        if (response.ok) {
          const data = await response.json();
          setFormData({
            title: data.title,
            description: data.description,
            price: data.price,
            discountPercentage: data.discountPercentage || "",
            stockQuantity: data.stockQuantity,
            brand: data.brand,
            category: data.category,
            thumbnail: data.thumbnail, // Placeholder for thumbnail
            images: data.images || [], // Placeholder for additional images
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
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/") && file.size <= 5 * 1024 * 1024) {
      setFormData({ ...formData, thumbnail: file });
      toast.success("Thumbnail selected successfully.");
    } else {
      toast.error("Invalid thumbnail. Please upload a valid image within 5 MB.");
    }
  };

  const handleMultipleImagesChange = (e) => {
    const files = Array.from(e.target.files).filter(
      (file) => file.type.startsWith("image/") && file.size <= 5 * 1024 * 1024
    );
    setFormData({ ...formData, images: [...formData.images, ...files] });
    toast.success(`${files.length} image(s) selected successfully.`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validation logic
    const errors = {};
    ["title", "description", "price", "stockQuantity", "brand", "category"].forEach((field) => {
      if (!formData[field]) errors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required.`;
    });

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setLoading(false);
      return;
    }

    // Prepare form data for submission
    const submissionData = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "images") value.forEach((image) => submissionData.append("images", image));
      else submissionData.append(key, value);
    });

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/products/${id}`, {
        method: "PUT",
        body: submissionData,
      });

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

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            {formErrors[name] && <p className="text-red-500 text-sm">{formErrors[name]}</p>}
          </div>
        ))}

        {/* Brand & Category */}
        {[
          { name: "brand", label: "Brand", options: availableBrands },
          { name: "category", label: "Category", options: availableCategories },
        ].map(({ name, label, options }) => (
          <div key={name} className="col-span-1">
            <label className="block font-medium mb-1">{label}</label>
            <select
              name={name}
              value={formData[name]}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a {label}</option>
              {options.map(({ id, label }) => (
                <option key={id} value={id}>
                  {label}
                </option>
              ))}
            </select>
            {formErrors[name] && <p className="text-red-500 text-sm">{formErrors[name]}</p>}
          </div>
        ))}

        {/* Thumbnail & Additional Images */}
        {[
          { label: "Thumbnail Image", handler: handleFileChange, name: "thumbnail" },
          { label: "Additional Images", handler: handleMultipleImagesChange, name: "images", multiple: true },
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
            {formErrors[name] && <p className="text-red-500 text-sm">{formErrors[name]}</p>}
          </div>
        ))}

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
