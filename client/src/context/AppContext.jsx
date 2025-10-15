import { createContext, useContext, useEffect, useState } from "react";
import {toast} from "react-hot-toast";
import axios from "axios"
import { useNavigate } from "react-router-dom";
axios.defaults.baseURL= import.meta.env.VITE_BASE_URL;
// eslint-disable-next-line react-refresh/only-export-components
export const AppContext = createContext();

export const AppProvider=({children})=>{
    const navigate =useNavigate();
    const currency = import.meta.env.VITE_CURRENCY;

    const [token,setToken]=useState(null);
    const [user,setUser]=useState(null);
    const [isOwner,setIsOwner]=useState(false);
    const [showLogin,setShowLogin]=useState(false);
    const [pickupDate,setPickupDate]=useState('');
    const [returnDate,setReturnDate]=useState('');
    const [cars,setCars]=useState([]);

    const fetchUser=async()=>{
        try {
          const {data} =  await axios.get('/api/user/data');
          if(data.success){
            setUser(data.user)
            setIsOwner(data.user?.role === 'owner')
          }else{
            navigate('/')
          }
        } catch (error) {
            console.log(error.message);
            toast.error(error.message);
            
        }

    }

    const fetchCars=async()=>{
        try {
           const {data}=await axios.get('/api/user/cars')
         data.success ? setCars(data.cars) : toast.error(data.message)
        } catch (error) {
             toast.error(error.message);
        }
    }


    const logout=()=>{
        localStorage.removeItem('token')
        setToken(null)
        setUser(null)
        setIsOwner(false)
            axios.defaults.headers.common['Authorization'] = ''
            toast.success('You have been logged out')
    }
    //useEffect to retrive the token from localstorage
    useEffect(()=>{
        const token = localStorage.getItem('token');
        setToken(token);
        fetchCars()
    },[])

    useEffect(()=>{
        if(token){
            axios.defaults.headers.common['Authorization'] = `${token}`
            fetchUser()
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[token])
    const value={
        currency,navigate,axios,user,setUser , token , setToken , isOwner,
        setIsOwner , fetchUser, fetchCars , showLogin,setShowLogin ,
        logout , cars,setCars , pickupDate ,returnDate ,setPickupDate,setReturnDate
    }
    return( 
    <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
)
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAppContext=()=>{
    return useContext(AppContext)
}