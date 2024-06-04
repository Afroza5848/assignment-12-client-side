import MenuItem from "./MenuItem";
import { GiConfirmed } from "react-icons/gi";
import { BsFillBox2HeartFill } from "react-icons/bs";
import { IoSettings } from "react-icons/io5";

const NormalUserMenu = () => {
    return (
        <>
        <MenuItem label="Book A Parcel" address="/dashboard/bookingParcel" icon={GiConfirmed}></MenuItem>
        <MenuItem label="My Parcel" address="/dashboard/myParcel" icon={BsFillBox2HeartFill}></MenuItem>
        <MenuItem label="My Profile Menu" address="/dashboard/myProfile" icon={IoSettings}></MenuItem>
    </>
    );
};

export default NormalUserMenu;