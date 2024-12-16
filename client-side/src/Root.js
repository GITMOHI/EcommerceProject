import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./features/navbar/Navbar";
import Footer from "./page/common/Footer";

const Root = () => {
    const location = useLocation();
    const isAdminPath = location.pathname.startsWith('/admin');

    return (
        <div className="w-screen">
            <div className="sticky top-0 z-50 border-b bg-base-100 px-10">{!isAdminPath && <Navbar />}</div>
            <div className="max-w-screen-2xl mx-auto px-10 bg-base-100"> 
              <Outlet />
            </div>
            {!isAdminPath && <Footer />}
        </div>
    );
};

export default Root;
