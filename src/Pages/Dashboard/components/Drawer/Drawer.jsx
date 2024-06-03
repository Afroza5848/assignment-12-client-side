import { FaBars } from "react-icons/fa6";
import Sidebar from "../Sidebar/Sidebar";


const Drawer = () => {
    return (
        <div className="navbar bg-base-100">
            <div className="flex-1">
                <a className="btn btn-ghost text-xl">daisyUI</a>
            </div>
            <div className="flex-none">
                <div className="drawer">
                    <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                    <div className="drawer-content">
                        {/* Page content here */}
                        <label htmlFor="my-drawer" className="btn  drawer-button"><FaBars></FaBars></label>
                    </div>
                    <div className="drawer-side">
                        <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                        <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                            <Sidebar></Sidebar>

                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Drawer;