import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUsers,
  FaMoneyCheckAlt,
  FaChartBar,
  FaCogs,
  FaUsersCog,
  FaTasks,
  FaComments,
} from "react-icons/fa";
import {
  FiPlusCircle,
  FiEdit,
  FiTrash2,
  FiUserPlus,
  FiUserMinus,
} from "react-icons/fi";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { logoutUserAsync } from "../../features/Auth/authSlice";

const Navbar = () => {
  const [operationsSubmenuOpen, setOperationsSubmenuOpen] = useState(false);

  const dispatch = useDispatch();

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logoutUserAsync());
  };

  const linkBaseStyle =
    "flex items-center cursor-pointer hover:bg-red-700 p-2 rounded transition-all";
    const activeLinkStyle = "border-b-4 border-[#db444] inline-block text-white"; // Active link with underline
    const inactiveLinkStyle = "text-gray-300"; // Inactive style for links

  return (
    <div className="h-full w-full p-4 z-40 overflow-y-auto">
      <div className="flex items-center mb-6">
        <img
          src="/images/logo.png"
          className="w-40"
          alt="Logo"
          // className="rounded-full w-10 h-10 mr-3 sm:w-12 sm:h-12"
        />
        {/* <h1 className="text-xl sm:text-4xl font-black text-white">shopZen</h1> */}
      </div>
      <ul className="space-y-4">
        {/* Dashboard */}
        <li>
          <NavLink
            to="/admin/dash"
            className={({ isActive }) =>
              `${linkBaseStyle} ${isActive ? activeLinkStyle : inactiveLinkStyle}`
            }
          >
            <FaTachometerAlt className="mr-2" /> Dashboard
          </NavLink>
        </li>

        {/* Leads */}
        <li>
          <NavLink
            to="/admin/leads"
            className={({ isActive }) =>
              `${linkBaseStyle} ${isActive ? activeLinkStyle : inactiveLinkStyle}`
            }
          >
            <FaUsers className="mr-2" /> Leads
          </NavLink>
        </li>

        {/* Transactions */}
        <li>
          <NavLink
            to="/admin/transactions"
            className={({ isActive }) =>
              `${linkBaseStyle} ${isActive ? activeLinkStyle : inactiveLinkStyle}`
            }
          >
            <FaMoneyCheckAlt className="mr-2" /> Transactions
          </NavLink>
        </li>

        {/* Operations Menu */}
        <li>
          <div
            onClick={() => setOperationsSubmenuOpen(!operationsSubmenuOpen)}
            className={`${linkBaseStyle} cursor-pointer ${
              operationsSubmenuOpen ? activeLinkStyle : inactiveLinkStyle
            }`}
          >
            <FaTasks className="mr-2" /> Operations
          </div>
          {operationsSubmenuOpen && (
            <ul className="pl-6 space-y-2">
              <li>
                <NavLink
                  to="/admin/operations/add-product"
                  className={({ isActive }) =>
                    `${linkBaseStyle} ${isActive ? activeLinkStyle : inactiveLinkStyle}`
                  }
                >
                  <FiPlusCircle className="mr-2" /> Add Product
                </NavLink>
              </li>
              <li> 
                <NavLink
                  to="/admin/operations/product-list"
                  className={({ isActive }) =>
                    `${linkBaseStyle} ${isActive ? activeLinkStyle : inactiveLinkStyle}`
                  }
                >
                  <FiEdit className="mr-2" /> Product List
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/admin/operations/edit-product"
                  className={({ isActive }) =>
                    `${linkBaseStyle} ${isActive ? activeLinkStyle : inactiveLinkStyle}`
                  }
                >
                  <FiEdit className="mr-2" /> Edit Product
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/admin/operations/delete-product"
                  className={({ isActive }) =>
                    `${linkBaseStyle} ${isActive ? activeLinkStyle : inactiveLinkStyle}`
                  }
                >
                  <FiTrash2 className="mr-2" /> Delete Product
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/admin/operations/add-brand"
                  className={({ isActive }) =>
                    `${linkBaseStyle} ${isActive ? activeLinkStyle : inactiveLinkStyle}`
                  }
                >
                  <FiTrash2 className="mr-2" /> Add Brand
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/admin/operations/add-category"
                  className={({ isActive }) =>
                    `${linkBaseStyle} ${isActive ? activeLinkStyle : inactiveLinkStyle}`
                  }
                >
                  <FiTrash2 className="mr-2" /> Add Category
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/admin/operations/add-user"
                  className={({ isActive }) =>
                    `${linkBaseStyle} ${isActive ? activeLinkStyle : inactiveLinkStyle}`
                  }
                >
                  <FiUserPlus className="mr-2" /> Add User
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/admin/operations/delete-user"
                  className={({ isActive }) =>
                    `${linkBaseStyle} ${isActive ? activeLinkStyle : inactiveLinkStyle}`
                  }
                >
                  <FiUserMinus className="mr-2" /> Delete User
                </NavLink>
              </li>
            </ul>
          )}
        </li>

        {/* Chats */}
        <li>
          <NavLink
            to="/admin/chats"
            className={({ isActive }) =>
              `${linkBaseStyle} ${isActive ? activeLinkStyle : inactiveLinkStyle}`
            }
          >
            <FaComments className="mr-2" /> Chats
          </NavLink>
        </li>

        {/* Logout */}
        <li>
          <NavLink to="#" onClick={handleLogout} className={linkBaseStyle}>
            <FaUsersCog className="mr-2" /> Logout
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
