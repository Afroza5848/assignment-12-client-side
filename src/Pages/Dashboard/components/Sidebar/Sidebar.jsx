import { ImStatsDots } from "react-icons/im";
import { MdDashboard } from "react-icons/md";
import { GiConfirmed } from "react-icons/gi";
import { BsFillBox2HeartFill } from "react-icons/bs";
import { IoHome } from "react-icons/io5";
import { MdLogout } from "react-icons/md";
import { IoSettings } from "react-icons/io5";
import useRole from "@/Hooks/useRole";
import MenuItem from "./Menu/MenuItem";


const Sidebar = () => {
    const [role] = useRole();
    console.log(role);
    return (
        <div className="flex flex-col min-h-screen p-3 w-60 bg-base-200 dark:text-gray-800">
            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <h2 className="flex items-center gap-2 text-2xl bg-green-300 px-8 py-1 rounded"><MdDashboard />Dashboard</h2>
                    <button className="p-2">

                    </button>
                </div>

                <div className="flex-1">
                    <ul className="pt-2 pb-4 space-y-3 text-sm">
                        
                        <MenuItem label="Statistics" address="/dashboard" icon={ImStatsDots}></MenuItem>
                        <MenuItem label="Book A Parcel" address="/bookingParcel" icon={GiConfirmed}></MenuItem>
                        <MenuItem label="My Parcel" address="/myParcel" icon={BsFillBox2HeartFill}></MenuItem>
                        <MenuItem label="My Profile Menu" address="/myProfile" icon={IoSettings}></MenuItem>

                    </ul>
                </div>
            </div>
            <hr className="mt-10" />
            <div className="flex items-center p-2 mt-12 space-x-4 justify-self-end">
                <ul className="pt-2 pb-4 space-y-3 text-sm">
                    
                    <MenuItem label="Home" address="/" icon={IoHome}></MenuItem>
                    
                    <li className="rounded-sm">
                        <a rel="noopener noreferrer" href="#" className="flex text-xl items-center p-2 space-x-3 rounded-md">
                            <MdLogout className="text-green-500" />
                            <span>Logout</span>
                        </a>
                    </li>

                </ul>
            </div>
        </div>
    );
};

export default Sidebar;