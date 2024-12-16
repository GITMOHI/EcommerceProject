import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateBrandForm = () => {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    label: "",
    category: "",
  });
  const [loading, setLoading] = useState(false);

  // Fetch categories from the backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/categories`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setCategories(data);
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

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/brands`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      if (response.ok) {
        toast.success("Brand created successfully!");
        setFormData({ label: "", category: "" }); // Reset form
      } else {
        toast.error("Failed to create brand.");
      }
    } catch (error) {
      console.error("Error creating brand:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg border-2 border-gray-200 px-9 mt-7">
      <h2 className="text-2xl font-bold mb-6 text-center text-[#db444]">
        Create Brand
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Brand Name */}
        <div>
          <label className="block font-medium mb-1">Brand Name</label>
          <input
            type="text"
            name="label"
            value={formData.label}
            onChange={handleChange}
            placeholder="Enter brand name"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#db444] transition"
            required
          />
        </div>

        {/* Select Category */}
        <div>
          <label className="block font-medium mb-1">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#db444] transition"
            required
          >
            <option value="">Select a Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.label}
              </option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-[#db444] text-white p-3 rounded font-semibold transition-all duration-300 ease-in-out transform scale-105 shadow-lg bg-red-600 hover:scale-110"
          disabled={loading}
        >
          {loading ? "Creating Brand..." : "Create Brand"}
        </button>
      </form>

      {/* Toast Notifications */}
      <ToastContainer />
    </div>
  );
};

export default CreateBrandForm;
