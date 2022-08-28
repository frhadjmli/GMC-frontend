import { createContext, useState } from 'react'
import { useNavigate, useLocation } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AuthContext = createContext()

export default AuthContext;


export const AuthProvider = ({children}) => {
    
    let[authTokens,setAuthTokens] = useState(()=> localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null);
    
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    let loginUser = async (e )=> {
        e.preventDefault()
        let response = await fetch('http://127.0.0.1:8000/auth/', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({'username':e.target.username.value, 'password':e.target.password.value})
        })
        let data = await response.json()
       if(response.status === 200){
           setAuthTokens(data)
           localStorage.setItem('authTokens', JSON.stringify(data))
           navigate(from, {replace: true})
       }else{
           toast.error("Wrong Username Or Password!!!")
       }
    }

    let logoutUser = (e) => {
        e.preventDefault()
        setAuthTokens(null)
        localStorage.removeItem('authTokens')
        navigate('/login')
    }

    let contextData = {
        authTokens:authTokens,
        loginUser:loginUser,
        logoutUser:logoutUser,
    }

    return(
        <div>
            <AuthContext.Provider value={contextData}>
                {children}
            </AuthContext.Provider>
            <ToastContainer 
             position="bottom-center"
              />
        </div>

    )
}