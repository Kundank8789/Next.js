'use client'
import { signOut } from 'next-auth/react'
import React, { useContext, useState } from 'react'
import Image from 'next/image'
import { HiPencil } from "react-icons/hi2";
import { useRouter } from 'next/navigation';
import { userDataContext } from '@/context/UserContext';
function Page() {
  
const data=useContext(userDataContext)
  const router =useRouter()
  const [loading,setLoading]=useState(false)

  const handleSignOut=async ()=>{
    setLoading(true)
    try {
      await signOut()
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }
  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-black text-white px-4 '>
      {data &&
        <div className='w-full max-w-md border-2 border-white rounded-2xl p-8 shadow-lg text-center relative flex flex-col items-center'>
          <HiPencil size={22} color='white' className='absolute right-[20px] top-[20px] cursor-pointer' onClick={()=>router.push("/edit")}/>
           {data.user?.image && <div className='relative w-[200px] h-[200px] rounded-full border-2 border-white overflow-hidden'>
            <Image src={data.user.image} fill alt='userImage'/>
            </div>}
            <h1 className='text-2xl font-semibold my-4'>Welcome, {data.user?.name}</h1>
            <button className='w-full py-2 px-4 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-colors' onClick={handleSignOut}>Sign Out</button>
        </div>}
      {!data && <div className='text-white text-2xl'>Loading...</div>}

    </div>
  )
}

export default Page