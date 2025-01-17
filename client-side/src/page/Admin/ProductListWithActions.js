import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FaArrowLeft, FaArrowRight, FaSearch } from "react-icons/fa";

const ConfirmationModal = ({ isOpen, onClose, onConfirm, productId }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Are you sure?</h2>
        <p className="text-gray-600">Do you really want to delete this product? This process cannot be undone.</p>
        <div className="mt-6 flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirm(productId)}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

const ProductListWithActions = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/products`);
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
          setFilteredProducts(data);
        } else {
          toast.error("Failed to fetch products.");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        toast.error("An error occurred while fetching products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/products/delete/${id}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      if (response.ok) {
        setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
        setFilteredProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
        toast.success("Product deleted successfully.");
      } else {
        toast.error("Failed to delete product.");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  const openModal = (productId) => {
    setSelectedProductId(productId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProductId(null);
  };

  const confirmDelete = (id) => {
    handleDelete(id);
    closeModal();
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (!query) {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(
        (product) =>
          product.title.toLowerCase().includes(query.toLowerCase()) ||
          product.id.toString().includes(query)
      );
      setFilteredProducts(filtered);
    }
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <div className="container mx-auto p-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Manage Products</h2>
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Search by name or ID"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="border border-gray-300 rounded-lg p-3 w-72"
          />
          <FaSearch className="text-gray-500" />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center">
          <span>Loading products...</span>
        </div>
      ) : (
        <div className="overflow-x-auto shadow-lg rounded-lg p-4">
          <div className="min-w-full overflow-x-auto">
            <table className="w-full table-auto bg-white rounded-lg border-separate">
              <thead className="bg-gray-200 text-sm text-gray-700">
                <tr>
                  <th className="py-3 px-4 text-left">ID</th>
                  <th className="py-3 px-4 text-left">Title</th>
                  <th className="py-3 px-4 text-left">Price</th>
                  <th className="py-3 px-4 text-left">Stock</th>
                  <th className="py-3 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm text-gray-600">
                {currentProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50 transition">
                    <td className="py-2 px-4">{product.id}</td>
                    <td className="py-2 px-4">{product.title}</td>
                    <td className="py-2 px-4">${product.price}</td>
                    <td className="py-2 px-4">{product.stock}</td>
                    <td className="py-2 px-4">
                      <div className="flex gap-2 justify-center flex-wrap">
                        <Link
                          to={`/admin/operations/edit-product/${product.id}`}
                          className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-400 transition"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => openModal(product.id)}
                          className="bg-red-600 text-white px-4 py-2 rounded-lg shadow hover:bg-red-500 transition"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 flex justify-between items-center text-sm flex-wrap">
            <button
              onClick={() => setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))}
              className="bg-gray-200 px-4 py-2 rounded-lg shadow hover:bg-gray-300 disabled:opacity-50"
              disabled={currentPage === 1}
            >
              <FaArrowLeft />
            </button>
            <div className="text-center text-lg font-semibold mx-4">
              Page {currentPage} of {totalPages}
            </div>
            <button
              onClick={() => setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages))}
              className="bg-gray-200 px-4 py-2 rounded-lg shadow hover:bg-gray-300 disabled:opacity-50"
              disabled={currentPage === totalPages}
            >
              <FaArrowRight />
            </button>
          </div>

          <div className="mt-4 flex justify-center gap-2 flex-wrap">
            {[...Array(totalPages).keys()].map((num) => (
              <button
                key={num + 1}
                onClick={() => setCurrentPage(num + 1)}
                className={`px-4 py-2 rounded-lg shadow ${
                  currentPage === num + 1
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                {num + 1}
              </button>
            ))}
          </div>
        </div>
      )}

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={confirmDelete}
        productId={selectedProductId}
      />
    </div>
  );
};

export default ProductListWithActions;
