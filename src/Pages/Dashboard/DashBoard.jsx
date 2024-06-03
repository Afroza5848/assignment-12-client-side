
import Drawer from "./components/Drawer/Drawer";
import Sidebar from "./components/Sidebar/Sidebar";


const DashBoard = () => {
    
    return (
        <div>
            <Drawer></Drawer>
            <div className="">
                <Sidebar></Sidebar>
            </div>
        </div>
    );
};

export default DashBoard;