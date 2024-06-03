
import Drawer from "./components/Drawer/Drawer";
import Sidebar from "./components/Sidebar/Sidebar";


const DashBoard = () => {
    return (
        <div>
            <Drawer></Drawer>
            <div className="">
                <Sidebar className="side-bar"></Sidebar>
            </div>
        </div>
    );
};

export default DashBoard;