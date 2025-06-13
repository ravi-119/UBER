import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import { useUserData } from '../context/userContext'  


const UserLogin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [userData, setUserData] = useState({})
  
  const navigate = useNavigate()
  const { setUser } = useUserData();

  const submitHandler = async(e) => {
    e.preventDefault();
    const userData = {
      email,
      password
    }

    const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, userData)
      .then((res) => {
        if (res.status === 200) {
          setUser(res.data.user);
          localStorage.setItem('token', res.data.token);
          navigate('/home');
        }
      })
      .catch((err) => {
        console.log(err.response?.data);
        alert(err.response?.data?.message || JSON.stringify(err.response?.data));
      }); 
    
    setEmail('')
    setPassword('')
  }

  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
      <div>
        <img className='w-16 mb-10' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
        <form onSubmit={(e)=>{
          submitHandler(e)
          }} className='bg-white pb-7 py-4 px-4'>

          <h3 className='text-lg font-medium mb-2'>Whats your email</h3>
          <input 
            required
            value={email}
            onChange={(e) =>{
              setEmail(e.target.value)
            }}

            className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
          type="email" 
          placeholder='email@example.com' 

          />

          <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
          <input 
            required
            value={password}
            onChange={(e) =>{
              setPassword(e.target.value)
            }}  
            className='bg-[#eeeeee] mb-7 rounnded px-4 py-2 border w-full text-lg placeholder:text-base' 
            type="password" 
            placeholder='password' 

          />

          <button className='bg-[#111] text-white font-semibold mb-3 rounnded px-4 py-2  w-full text-lg placeholder:text-base'>Login</button>

          <p className='text-center'>New here?<Link to='/signup' className='text-blue-600'>Create new Account</Link></p>

        </form>
      </div>
      <div>
        <Link 
          to='/captain-login'
          className='bg-[#10b461] flex items-center justify-center text-white font-semibold mb-5 rounnded px-4 py-2  w-full text-lg placeholder:text-base'>Sign in as Captain</Link>
      </div>
    </div>
  )
}

export default UserLogin

