import React, { useState, useContext } from 'react';
import { BsTwitterX } from "react-icons/bs";
import { FaFacebookSquare } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaSnapchatSquare } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import DataContext from '../pages/DataContext';


axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:3500'; // Ensure this matches your backend URL

const LogIn = () => {
    const [errorMsg, setErrorMsg] = useState('');
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const { setUser } = useContext(DataContext);


    const handleLogin = async (data) => {
        try {
            const response = await axios.post('/login', { data }, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true
            });
            const result = response.data;
            console.log(result);
            if (result.username) {
                setErrorMsg('');
                localStorage.setItem('user', JSON.stringify(result.username));
                setUser(result.username);
                navigate('/fralon-peanuts');
            } else {
                setErrorMsg('Invalid login response. No user data return');
            }
        } catch (error) {

            console.log('Login request failed:', error);
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                setErrorMsg(error.response.data.error || 'Login failed. Please try again.');
            } //else if (error.request) {
            // The request was made but no response was received setErrorMsg('No response received from server. Please check your network.'); } else {
            // Something happened in setting up the request that triggered an Error setErrorMsg('Request setup failed. Please check your configuration.');}
        }
    };

    return (
        <div
            className='flex justify-start p-8 items-center flex-col'>


            <div className='flex items-center justify-center flex-col h-[100%]'>
                <div className='bg-black bg-opacity-10 backdrop-blur-sm p-6 rounded-lg text-center'>
                    <h1
                        id='header'
                        className='text-3xl text-center text-yellow-400 mb-[100px] p-4'>
                        <span className='font-extrabold'>Fralon</span> Peanuts
                    </h1>
                    <form onSubmit={handleSubmit(handleLogin)} className='flex flex-col items-center'>
                        <h1 className='text-black font-bold mb-2'>Log In to your account</h1>

                        <div className='flex justify-between flex-col items-center mb-4 font-light'>
                            <label className='text-black font-semibold' htmlFor="email">Email</label>
                            <input
                                className='px-10 py-2 rounded-sm'
                                type="text"
                                placeholder='Type your email...'
                                {...register('email', {
                                    required: 'Email is required',
                                    pattern: {
                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                        message: 'Enter a valid email address'
                                    }
                                })}
                            />
                            {errors.email && <p className='text-red mt-1'>{errors.email.message}</p>}
                        </div>

                        <div className='flex justify-between items-center flex-col mb-4 font-light'>
                            <label className='text-black font-semibold' htmlFor="password">Password</label>
                            <input
                                className=' px-10 py-2 rounded-sm '
                                type="password"
                                placeholder='Type your password...'
                                {...register('password', {
                                    required: 'Password is required',
                                    minLength: {
                                        value: 6,
                                        message: 'Password must be at least 6 characters long'
                                    }
                                })}
                            />
                            {errors.password && <p className='text-red mt-1'>{errors.password.message}</p>}
                        </div>

                        <button className='bg-blue-600 text-white py-2 px-[6.5rem] mt-4 font-bold hover:bg-blue-500'>Log In</button>
                        {errorMsg && <p className='text-red-600 mt-2'>{errorMsg}</p>}
                        <Link className='mt-2 text-blue-600 hover:text-blue-500'>Forgot password?</Link>
                        <p className='mt-3'>Don't have an account?
                            <Link
                                className='text-blue-600 underline hover:no-underline font-bold mt-3'
                                to="/signup"> Sign Up</Link></p>
                    </form>
                    <div className='flex flex-row p-2 gap-6 items-center w-[100%] justify-center text-yellow-500 text-2xl mt-4'>
                        <Link><FaFacebookSquare /></Link>
                        <Link><FaInstagram /></Link>
                        <Link> <BsTwitterX /></Link>
                        <Link><FaSnapchatSquare /></Link>
                        <Link><FaTiktok /></Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LogIn;
