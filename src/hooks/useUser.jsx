import { useContext, useEffect } from "react"
import { AppContext } from "../context/AppContext"
import { useNavigate } from "react-router-dom";
import axiosConfig from "../util/axiosConfig";
import { API_ENDPOINTS } from "../util/apiEndpoints";

export const useUser = () => {
    const {user,setUser,clearUser} = useContext(AppContext);
    const navigate = useNavigate();

    useEffect(() => {
        if(user){
            return;
        }

        let isMounted = true;

        const fetchUserInfo = async() => {
            try{
                const response = await axiosConfig.get(API_ENDPOINTS.GET_USER_INFO);

                if(isMounted && response.data){
                    setUser(response.data);
                }
            }catch(error){
                console.error("Failed to fetch the user info",error);
                if(isMounted){
                    clearUser();
                    navigate("/login");
                }
            }
        }

        fetchUserInfo();

        return () => {
            isMounted=false;
        }
    },[setUser,clearUser,navigate])
}