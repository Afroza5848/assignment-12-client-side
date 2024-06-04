import MenuItem from "./MenuItem";
import { ImStatsDots } from "react-icons/im";
import { BsInboxesFill } from "react-icons/bs";
import { FaUsers } from "react-icons/fa6";
import { FaMotorcycle } from "react-icons/fa6";

const Admin = () => {
    return (
        <>
            <MenuItem label="Statistics" address="/dashboard" icon={ImStatsDots}></MenuItem>
            <MenuItem label="All Parcels" address="/allParcels" icon={BsInboxesFill}></MenuItem>
            <MenuItem label="All Users" address="/allUsers" icon={FaUsers}></MenuItem>
            <MenuItem label="All Deliverymen" address="/allDeliverymen" icon={FaMotorcycle}></MenuItem>
        </>
    );
};

export default Admin;