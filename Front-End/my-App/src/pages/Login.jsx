import React from 'react'
import { Link } from 'react-router-dom'

export default function Login() {
  return (
    <div className='flex flex-col max-w-sm mt-20 md:mt-28 p-3 mx-auto md:max-w-lg lg:max-w-2xl '>
        <div className="bg-gray-950 text-white p-3 text-center rounded-lg text-2xl">
            <h1>Welcome to <span className='text-orange-600 font-semibold'>VIJAY's Billing App</span></h1>
        </div>
        <div className="flex flex-col mt-10 p-5 gap-5 bg-purple-200 rounded-t-xl md:flex-row ">
        <div className="md:w-1/2 md:border-r-2 md:border-pink-700 p-3">
            <img className='w-full h-auto rounded-lg   '
             src="https://images.unsplash.com/photo-1529539795054-3c162aab037a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bG9naW58ZW58MHx8MHx8fDA%3D" alt="Login image" />
        </div>
        <div className="">
            <form className='flex flex-col gap-4 ' >
                <input type="email" placeholder='email' id='email' className='boder p-3 rounded-lg ' />
                <input type="password" placeholder='password' id='password' className='boder p-3 rounded-lg ' />
                <button className='bg-blue-800 p-3 rounded-lg uppercase text-white hover:opacity-80'>Login</button>
                <p>if you don't have account  <Link to="/" ><span className='font-semibold text-red-800 '>SIGN UP </span></Link> </p>
            </form>
        </div>
        </div>
        
    </div>
  )
}
