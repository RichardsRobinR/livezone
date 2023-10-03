'use client';
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import CustomNavbar from '../../components/customNavbar';

export const SignIn = () => {
    const router = useRouter();
    const [inputTextName, setInputTextName] = useState("");
    

    const handleChange = (e : any) => {   
      setInputTextName(e.target.value);
    };

  return (
    
    // <div className=" bg-black flex flex-col h-screen justify-center items-center">
    // <CustomNavbar/>
    // <div className='flex flex-col items-center'>
    
    // </div>
    // </div>



<div className="bg-primary-content min-h-screen flex items-center">
    <div className="bg-white p-10 md:w-2/3  mx-auto rounded">
        <form action="">

            <div className="flex items-center mb-5">
                {/* <label className="w-20 inline-block text-right mr-4 text-gray-500">Name</label> */}
                <input type="text" placeholder="Enter Your Name" value={inputTextName} onChange={handleChange} className="input input-bordered w-full " />
    
            </div>

            <div className="items-end">
            <Link href={{query: { name: inputTextName },pathname: '/chat',}}>
              <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg" >Sign In</button>
            </Link>
            </div>
        </form>
    </div>
</div>
  )
}


export default SignIn
