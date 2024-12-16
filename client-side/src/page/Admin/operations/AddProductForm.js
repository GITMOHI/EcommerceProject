import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddProductForm = () => {
  const [availableBrands, setAvailableBrands] = useState([]);
  const [availableCategories, setAvailableCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  
  useEffect(() => {
    // Fetch brands
    const fetchBrands = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/brands`);
        if (response.ok) {
          const data = await response.json();
          setAvailableBrands(data);
        } else {
          toast.error("Failed to load brands.");
        }
      } catch (error) {
        console.error("Error fetching brands:", error);
        toast.error("An error occurred while fetching brands.");
      }
    };
    fetchBrands();
  }, []);

  useEffect(() => {
    // Fetch categories
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/categories`);
        if (response.ok) {
          const data = await response.json();
          setAvailableCategories(data);
        } else {
          toast.error("Failed to load categories.");
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        toast.error("An error occurred while fetching categories.");
      }
    };
    fetchCategories();
  }, []);

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
    if (!formData.thumbnail) errors.thumbnail = "Thumbnail image is required.";
    if (formData.images.length === 0) errors.images = "At least one additional image is required.";

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setLoading(false);
      return;
    }

    // Form submission logic
    const submissionData = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "images") value.forEach((image) => submissionData.append("images", image));
      else submissionData.append(key, value);
    });

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/products`, {
        method: "POST",
        body: submissionData,
      });
      if (response.ok) {
        toast.success("Product added successfully!");
        setFormData({
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
      } else {
        toast.error("Failed to add product.");
      }
    } catch (error) {
      toast.error("An error occurred while adding the product.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 bg-white rounded-lg shadow-lg border border-gray-300">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-red-500">Add New Product</h2>

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
                className="w-full p-2 border rounded focus:ring-2 focus:ring-red-500"
              />
            ) : (
              <input
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-red-500"
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
              className="w-full p-2 border rounded focus:ring-2 focus:ring-red-500"
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
              className="w-full p-2 border rounded focus:ring-2 focus:ring-red-500"
            />
            {formErrors[name] && <p className="text-red-500 text-sm">{formErrors[name]}</p>}
          </div>
        ))}

        {/* Submit Button */}
        <div className="col-span-1 md:col-span-2 flex justify-center">
          <button
            type="submit"
            disabled={loading}
            className="bg-red-600 text-white font-bold py-2 px-8 rounded hover:bg-red-500 transition"
          >
            {loading ? "Adding..." : "Add Product"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProductForm;
