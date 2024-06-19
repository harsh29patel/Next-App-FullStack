"use client"
import React ,{useState}from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
 export default function ProfilePage() {

    const router = useRouter()
    const [data, setdata] = useState("nothing")
        const getuserDetails = async()=>{
             const res = await axios.post("/api/users/me")
             console.log(res.data.data._id);
             setdata(res.data.data._id)
        }

    const logout  = async()=>{
    try {
        await axios.get("/api/users/logout")
        toast.success("Logout success")
        router.push("/login")

    } catch (error:any) {
        console.log(error.message);
        toast.error(error.message)
        
    }
}
  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>

        <h1>Profile Page</h1>

        <hr/>
        <h2>{data === "nothing"?"Nothing":<Link href={`profile/${data}`}>{data}</Link>}</h2>
        <hr/>
        <button
        className='bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        onClick={logout}>Logout</button>
        <button
        className='bg-green-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        onClick={getuserDetails}>User details</button>
    </div>
  )
}
