

import { Outlet } from "react-router-dom";
import Drawer from "./components/Drawer/Drawer";
import Sidebar from "./components/Sidebar/Sidebar";


const DashBoard = () => {
    
    return (
        <div>
            <Drawer></Drawer>
            <div className="flex gap-8">
                <Sidebar></Sidebar>

                <div className=" w-full">
                   <Outlet></Outlet>
                </div>
            </div>
        </div>
    );
};

export default DashBoard;