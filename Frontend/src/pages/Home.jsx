import React from 'react'
import { Link } from 'react-router-dom'
const Home = () => {
  return (
    <div>
        <div className='bg-cover bg-center bg-[url(https://images.unsplash.com/photo-1527603815363-e79385e0747e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHRyYWZmaWMlMjBsaWdodHxlbnwwfHwwfHx8MA%3D%3D)] h-screen pt-8 w-full flex justify-between flex-col '>
            <img className='w-16 ml-8' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
            <div className='bg-white pb-7 py-4 px-4'>
                <h2 className='text-2xl font-bold'>Get Started with Uber</h2>
                <Link to='/login' className='flex items-center justify-center w-full bg-black text-white py-3 rounded mt-4'>Continue</Link>
            </div>
        </div>
    </div>
  )
}

export default Home
