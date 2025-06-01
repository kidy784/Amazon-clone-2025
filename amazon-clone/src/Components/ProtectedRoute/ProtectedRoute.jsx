import { useContext,useEffect } from "react";
import { useNavigate, useNavigation } from "react-router-dom";
import { DataContext } from "../Dataprovider/Dataprovider";
import { IoFemaleOutline } from "react-icons/io5";

const ProtectedRoute = ({children,msg,redirect}) => {
    const navigate=useNavigate()
    const[{user}, dispatch]=useContext(DataContext)
    useEffect(()=>{
        if(!user){
            navigate("/auth",{state:{msg,redirect}})
        }

    },[user])
  return  children;
}

export default ProtectedRoute