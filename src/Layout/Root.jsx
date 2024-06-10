
import Footer from "@/Shared/Footer/Footer";
import Navbar from "@/Shared/Navbar/Navbar";
import { Outlet, useLocation } from "react-router-dom";

const Root = () => {
    const location = useLocation();
    console.log(location);
    const noHeaderFooter = location.pathname.includes('login') || location.pathname.includes('registration');
    return (
        <div>
            {/* navbar */}
            {noHeaderFooter ||<Navbar></Navbar>}
            {/* outlet */}
            <Outlet></Outlet>
            {/* footer */}
            {noHeaderFooter ||<Footer></Footer>}
        </div>
    );
};

export default Root;