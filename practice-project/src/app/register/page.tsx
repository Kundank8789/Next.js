'use client'
import React, { useState } from 'react'
import {FcGoogle} from 'react-icons/fc'
import axios from 'axios'

function Register() {
    const [name, setName] =useState("")
    const [email, setEmail] =useState("")
    const [password, setPassword] =useState("")

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !email || !password) {
            alert('Please fill in all fields');
            return;
        }
        
        try {
            const response = await axios.post('/api/auth/register', {
                name,
                email,
                password
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            if (response.status === 201) {
                console.log('Registration successful');
                // Optional: Clear the form
                setName('');
                setEmail('');
                setPassword('');
                alert('Registration successful! Please login.');
                // You can add router.push('/signin') here if you want to redirect
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const errorMessage = error.response?.data?.message || 'Registration failed';
                console.error('Registration error:', errorMessage);
                alert(errorMessage);
            } else {
                console.error('Registration error:', error);
                alert('An unexpected error occurred');
            }
        }
    }

    return (
        <div className='min-h-screen flex items-center justify-center bg-black text-white px-4' >
            <div className='w-full max-w-md border-2 border-white rounded-2xl p-8 shadow-lg bg-gray-900'>
                <h1 className='text-2xl font-semibold text-center mb-6'>Register</h1>
                <form className='space-y-4'onSubmit={handleRegister}>
                    <div>
                        <label className='block mb-1 font-medium'>Name</label>
                        <input
                            type="text"
                            placeholder='Enter Name'
                            className='w-full border-b border-white py-2 px-1 bg-gray-900 text-white outline-none placeholder-gray-400'
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                        />
                    </div>
                    <div>
                        <label className='block mb-1 font-medium'>Email</label>
                        <input
                            type="text"
                            placeholder='Enter Email'
                            className='w-full border-b border-white py-2 px-1 bg-gray-900 text-white outline-none placeholder-gray-400'
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />
                    </div>

                    <div>
                        <label className='block mb-1 font-medium'>Password</label>
                        <input
                            type="password"
                            placeholder='Enter Password'
                            className='w-full border-b border-white py-2 px-1 bg-gray-900 text-white outline-none placeholder-gray-400'
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                        />
                    </div>
                    <p className='text-sm text-center mt-1'>Already have an account? <span className='text-blue-400 hover:underline'>login</span></p>
                    <button className='w-full py-2 px-4 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-colors'>Register</button>
                </form>

                <div className='flex items-center gap-[5px] justify-center my-5'>
                    <hr className="grow border-gray-500" />
                    <span>OR</span>
                    <hr className="grow border-gray-500" />
                </div>
                <button className=' w-full flex items-center justify-center gap-2 py-2 px-4 border border-gray-400 rounded-lg bg-white text-black hover:bg-gray-100 transition-colors'>
                    <FcGoogle className='w-6 h-6' />
                    <span>Sign Up with Google</span>
                </button>


            </div>
        </div>
    )
}

export default Register;