import axios from 'axios'
import React, { useCallback, useState } from 'react'
import {FiEye} from "react-icons/fi"
import { Link } from 'react-router-dom'
import FormLogic from '../../helpers/FormLogic'
import Logo from "../../assets/LOGO.png"
import cookieService from '../cookieService'




const Login = () => {
   const {form,handleChange}=FormLogic() 
   const [loading, setLoading] = useState(false)
   const [passwordVisible, setPasswordVisible] = useState(false)
   const [error, setError] = useState('')
    

   const loginSubmitBtn=useCallback(async(e)=>{
         setLoading(true)
        e.preventDefault()
       try {
        const response=await axios.post('/login',{
            email:form.email,
            password:form.password
        })
        const options={"maxAge":86400,"path":"/"}
          if(response.status===200){
            window.localStorage.setItem("token", response.data.token);
            setLoading(false)
            cookieService.set(
                "token",
                 response.data.token,
                 options
            )

            //  redirect user to homapage after successful login
            window.location.href = '/';
          }
       } catch (error) {
            setLoading(false)
            setError(error.response.data.message)
            console.log(error)
       }
        
        
   },[form])


  return (
    <div className='bg-[#E5E5E5] h-[100vh]'>
    <div className='sm:w-[80%] h-[inherent] w-full mx-auto'>
        <div className="header sm:pt-16 pt-10 sm:px-0 px-4 flex justify-between items-center">
            <div className="title">
                <img src={Logo} alt="logo" 
                  className='sm:w-[100px] w-[100px]'
                />
            </div>
            <div className="right-bar flex items-center">
                <div>
                    <span className='text-[#606060] font-[inter]'>
                      New to Xpress Rewards?
                    </span>
                </div>
                <div className="link ml-2">
                    <Link to="/register">
                        <button 
                        className='border-2 border-[#039BF0] text-[#039BF0] font-[inter] font-[700] px-3 py-2 rounded-lg  hover:bg-[#039BF0] hover:text-[#fff]'>
                          Register
                        </button>
                    </Link>
                </div>
            </div>
        </div>
         <div className='flex justify-center items-center  w-full h-[80vh]'>
        {/* form inner container */}
        <div className='bg-[#FFFFFF] rounded-[8px]  sm:max-w-md w-[90%] p-5'>
            {/* form header */}
            <div className='block h-auto mt-9 mb-12'>
                <h2 className='text-[#039BF0] font-[500] text-[24px] leading-[29px] font-[inter]'>Welcome Back!</h2>
                <p className='text-[#606060] text-[14px] mt-2 font-[400] font-[inter]'>
                    Sign in to your Xpress reward partner's dashboard
                </p>
            </div>
            {/* form body */}
            <form action="POST" onSubmit={loginSubmitBtn}>
                {/* email */}
                <div className='mb-6'>
                    <label htmlFor='email' className='text-sm text-[#1A1619]'>
                        Email Address
                    </label>
                    <input
                        type='email'
                        id='email'
                        className='w-full p-2 border border-gray-200 rounded-[5px] bg-[#FFFFFF] mt-3'
                        name='email'
                        value={form.email}
                        onChange={handleChange}
                    />
                </div>
                {/* password */}
                <div className='relative'>
                    <label htmlFor='password' className='text-sm text-[#1A1619]'>
                        Password
                    </label>
                    <input
                        type={passwordVisible ? 'text' : 'password'}
                        id='password'
                        className='w-full p-2 border border-gray-200 rounded-[5px] bg-[#FFFFFF] mt-3'
                        name='password'
                        value={form.password}
                        onChange={handleChange}
                    />
                     {/* eye icons */}
                     <FiEye 
                     className='absolute top-[60%] text-xl z-50 right-[10px]'
                        onClick={()=>setPasswordVisible(!passwordVisible)}
                     />
                </div>
                <div className="forgot-password mt-4">
                    <span className='text-sm text-[#606060] text-[14px] font-[400] font-[inter]'>
                        Forgot Password?
                    </span>
                    <Link to={"/reset"} 
                    className="ml-3 text-[#039BF0] font-[500]">
                        Reset it
                    </Link>
                </div>
                {/* display error */}
                {error && <div className='text-red-500 text-sm font-[400] font-[inter] mt-10'>{error}</div>}
                <div className="submit-btn mt-6">
                    <button 
                    className='w-full p-2 border border-gray-200 rounded-[5px] bg-[#039BF0] mt-3 text-[#FFFFFF] font-[Rubik] shadow-login-btn-shadow
                     py-[16px]'
                     type='submit'>
                         {
                            loading ?
                                <span>please wait..</span>
                            :
                            <span> Sign In</span>
                         }
                    </button>
                </div>
            </form>
        </div>
    </div>
     </div>
    </div>
  )
}

export default Login