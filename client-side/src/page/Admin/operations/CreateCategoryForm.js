import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateCategoryForm = () => {
  const [formData, setFormData] = useState({
    label: "",
    image: null,
  });

  const [loading, setLoading] = useState(false);

  // Handle input changes for text
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle file input changes
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      image: file,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formDataObj = new FormData();
      formDataObj.append("label", formData.label);
      formDataObj.append("image", formData.image);

      const response = await fetch(`${process.env.REACT_APP_API_URL}/categories`, {
        method: "POST",
        body: formDataObj, // FormData handles multipart/form-data
        credentials: "include",
      },
    );

      if (response.ok) {
        toast.success("Category created successfully!");
        setFormData({ label: "", image: null }); // Reset form
      } else {
        toast.error("Failed to create category.");
      }
    } catch (error) {
      console.error("Error creating category:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg border-2 border-gray-200 px-9 mt-7">
      <h2 className="text-2xl font-bold mb-6 text-center text-[#db444]">
        Create Category
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Label Input */}
        <div>
          <label className="block font-medium mb-1">Category Label</label>
          <input
            type="text"
            name="label"
            value={formData.label}
            onChange={handleChange}
            placeholder="Enter category label"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#db444] transition"
            required
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block font-medium mb-1">Category Image</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#db444] transition"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-red-600 text-white p-3 rounded font-semibold transition-all duration-300 ease-in-out transform scale-105 shadow-lg hover:scale-110"
          disabled={loading}
        >
          {loading ? "Creating Category..." : "Create Category"}
        </button>
      </form>

      {/* Toast Notifications */}
      <ToastContainer />
    </div>
  );
};

export default CreateCategoryForm;
