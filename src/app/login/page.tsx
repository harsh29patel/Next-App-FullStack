'use client' // always remember this write it in frontend work
import React ,{useEffect, useState} from 'react'
import axios from 'axios'
import toast, { Toast } from 'react-hot-toast'
import { error } from 'console'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
export default function loginPage() {

  const router = useRouter()    // router from naigation not of router
  const  [user, setuser] = useState({
    email:"",
    password:"",
   
  })

const [buttonDisabled, setbuttonDisabled] = useState(false)   // for disabling the button so user cannot send reques

  const [lodaing, setlodaing] = useState(false)  // when user send request button cannot be clicked by him another time

const onLogin = async ()=>{         // for user clicking on the signup button


  try {
      setlodaing(true)  // for disabling sign up button
      const response = await axios.post("/api/users/login" , user)
      console.log("Login Success" , response.data);
      router.push("/profile")
      
  } catch (error:any) {
    console.log("Signup failed");
    toast.error(error.message)
  }


}

  useEffect(()=>{
    if(user.email.length>0  && user.password.length>0 ){   // if length greater than 0 setbutton to false that means any value is there so we allow user signup 
      setbuttonDisabled(false)
    }
    else{
      setbuttonDisabled(true)
    }
  },[user])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>{lodaing ? "Proccessing" : "Login"}</h1>  {/*is lodaings state true write Proccessing else SignUp*/}

    
     
     
     
      <hr/>
      <label htmlFor='email'>email</label>
      <input
       className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
      id='email'
      value={user.email}
      onChange={(e)=>{setuser({...user , email:e.target.value })}}
      type='text'
      placeholder='Email'
      />
      
      <hr/>
      <label htmlFor='password'>Password</label>
      <input 
       className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
      id='password'
      value={user.password}
      onChange={(e)=>{setuser({...user ,password:e.target.value })}}
      placeholder='Password'
      type="text" />
      <button
      
      onClick={onLogin}
      className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
      >
        {buttonDisabled?" No Login":"Login"}
      </button>
      <Link href={"/signup"}>Visit Signup Page</Link>
    </div>
  )
}
