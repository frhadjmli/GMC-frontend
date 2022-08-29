import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useContext } from 'react';
import AuthContext from "../context/AuthContext";


const PrivateRoutes = ({allowedRoles}) => {
    let {authTokens} = useContext(AuthContext);
    const location = useLocation();
    
    return(

        authTokens?.roles?.find(role => allowedRoles?.includes(role))
        ? <Outlet />
        : authTokens?.token
            ? <Navigate to="/unauthorizad" state={{ from: location }} replace />
            : <Navigate to="/login" state={{ from: location }} replace />

    );
}

export default PrivateRoutes;