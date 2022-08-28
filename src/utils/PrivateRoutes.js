import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useContext } from 'react';
import AuthContext from "../context/AuthContext";


const PrivateRoutes = () => {
    let {authTokens} = useContext(AuthContext);
    const location = useLocation();
    
    return(
        authTokens ?
            <Outlet/> :
            <Navigate to="/login" state={{ from: location }} replace />

    );
}

export default PrivateRoutes;