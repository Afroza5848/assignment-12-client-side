import MenuItem from "./MenuItem";
import { FaThList } from "react-icons/fa";
import { MdReviews } from "react-icons/md";
const Deliverymen = () => {
    return (
        <>
            <MenuItem label="My Delivery List" address="/myDeliveryList" icon={FaThList}></MenuItem>
            <MenuItem label="My Reviews Menu" address="/myReviews" icon={MdReviews}></MenuItem>
        </>
    );
};

export default Deliverymen;