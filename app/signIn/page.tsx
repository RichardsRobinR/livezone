'use client';
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export const SignIn = () => {
    const router = useRouter();
    const [inputTextName, setInputTextName] = useState("");
    

    const handleChange = (e : any) => {   
      setInputTextName(e.target.value);
    };

  return (
    <div>
    <input type="text" placeholder="Type here" value={inputTextName} onChange={handleChange} className="input input-bordered w-full max-w-xs" />
    <Link href={{query: { name: inputTextName },pathname: '/chat',}}>
      <button className="btn btn-wide" >Wide</button>
    </Link>
    </div>
  )
}


export default SignIn
