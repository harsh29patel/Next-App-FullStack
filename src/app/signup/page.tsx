  'use client' // always remember this write it in frontend work
  import React ,{useEffect, useState} from 'react'
  import axios from 'axios'
  import toast, { Toast } from 'react-hot-toast'
  import { error } from 'console'
  import { useRouter } from 'next/navigation'
import Link from 'next/link'
  export default function signUpPage() {

    const router = useRouter()    // router from naigation not of router
    const  [user, setuser] = useState({
      email:"",
      password:"",
      username:""
    })

  const [buttonDisabled, setbuttonDisabled] = useState(false)   // for disabling the button so user cannot send reques

    const [lodaing, setlodaing] = useState(false)  // when user send request button cannot be clicked by him another time

  const onSignup = async ()=>{         // for user clicking on the signup button


    try {
        setlodaing(true)  // for disabling sign up button
        const response = await axios.post("/api/users/signup" , user)
        console.log("Signup Success" , response.data);
        router.push("/login")
        
    } catch (error:any) {
      console.log("Signup failed");
      toast.error(error.message)
    }


  }

    useEffect(()=>{
      if(user.email.length>0  && user.password.length>0 && user.username.length>0){   // if length greater than 0 setbutton to false that means any value is there so we allow user signup 
        setbuttonDisabled(false)
      }
      else{
        setbuttonDisabled(true)
      }
    },[user])

    return (
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1>{lodaing ? "Proccessing" : "SignUp"}</h1>  {/*is lodaings state true write Proccessing else SignUp*/}

        <hr/>
        <label htmlFor="username">username</label>
        <input 
         className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id='username'
        value={user.username}
        onChange={(e)=>{setuser({...user , username:e.target.value})}}  // if change in user.username do setuser destructered and change only user.username by targeting  
        type='text'
        placeholder='Username'/> 
       
       
       
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
        
        onClick={onSignup}
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        >
          {buttonDisabled?"Please fill the form":"Signup"}
        </button>
        <Link href={"/login"}>Visit Login Page</Link>
      </div>
    )
  }
