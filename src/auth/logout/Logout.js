import React, { useCallback } from 'react'
import {useNavigate} from 'react-router-dom';
import cookieService from '../cookieService';

const Logout = () => {
    const navigate = useNavigate();
 
    const logout=useCallback(async(e)=>{
         if(localStorage.getItem("token") || cookieService.get("token")){
             localStorage.removeItem("token")
             window.location.reload()
             navigate("/")
         }
    },[navigate])


  return (
    <div>
           <button 
                className='bg-blue-500 hover:bg-blue-700 text-white font-medium  font-serif px-3 py-3 flex items-center'
                onClick={logout}
                >
                 <span>Logout</span>
            </button>
    </div>
  )
}

export default Logout