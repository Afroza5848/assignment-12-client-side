import useAuth from "@/Hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";


// eslint-disable-next-line react/prop-types
const PrivateRoute = ({children}) => {
    const {user,loading} = useAuth()
    const location = useLocation();
    if(loading){
        return <progress className="progress w-56"></progress>
    }
    if(user){
        return children;
    }
    return <Navigate state={location.pathname} to="/login"></Navigate>
};

export default PrivateRoute;