import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUsers,
  FaMoneyCheckAlt,
  FaTasks,
  FaComments,
  FaUsersCog,
  FaShoppingCart,
} from "react-icons/fa";
import {
  FiPlusCircle,
  FiEdit,
  FiTrash2,
  FiUserMinus,
} from "react-icons/fi";
import { useDispatch } from "react-redux";
import { logoutUserAsync } from "../../features/Auth/authSlice";
import { MdOutlineAddShoppingCart } from "react-icons/md";


const Navbar = () => {
  const [operationsSubmenuOpen, setOperationsSubmenuOpen] = useState(false);
  const [ordersSubmenuOpen, setOrdersSubmenuOpen] = useState(false); // State for Orders submenu

  const dispatch = useDispatch();

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logoutUserAsync());
  };

  const linkBaseStyle =
    "flex items-center cursor-pointer hover:bg-red-700 p-2 rounded transition-all";
  const activeLinkStyle = "border-b-4 border-[#db444] inline-block text-white";
  const inactiveLinkStyle = "text-gray-300";

  return (
    <div className="h-full w-full p-4 z-40 overflow-y-auto">
      <div className="flex items-center mb-6">
        <img src="/images/logo.png" className="w-40" alt="Logo" />
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

        {/* Orders */}
        <li>
          <div
            onClick={() => setOrdersSubmenuOpen(!ordersSubmenuOpen)}
            className={`${linkBaseStyle} cursor-pointer ${
              ordersSubmenuOpen ? activeLinkStyle : inactiveLinkStyle
            }`}
          >
            <FaUsers className="mr-2" /> Orders
          </div>
          {ordersSubmenuOpen && (
            <ul className="pl-6 space-y-2">
              <li>
                <NavLink
                  to="/admin/orders/pending"
                  className={({ isActive }) =>
                    `${linkBaseStyle} ${isActive ? activeLinkStyle : inactiveLinkStyle}`
                  }
                >
                <MdOutlineAddShoppingCart className="mr-2" />  Pending Orders
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/admin/orders/received"
                  className={({ isActive }) =>
                    `${linkBaseStyle} ${isActive ? activeLinkStyle : inactiveLinkStyle}`
                  }
                >
                  <FaShoppingCart className="mr-2"/>   Completed Orders
                </NavLink>
              </li>
            </ul>
          )}
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

        {/* Operations */}
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
