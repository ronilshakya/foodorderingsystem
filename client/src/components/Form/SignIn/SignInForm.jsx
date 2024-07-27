import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../form.css';
import Input from '../../template/Input';
import burgerImg from './img/burger-cover.jpg';
import fbImg from './img/facebook.png';
import glImg from './img/google.png';
import Button from '../../template/Button';
import useLogin from '../../../hooks/useLogin';
import logo from '../../../assets/horizontallogo.png'

const mediaLogin = [
    { name: 'Google', src: glImg },
    { name: 'Facebook', src: fbImg }
];

const SignInForm = () => {
    const { loginUser } = useLogin();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [formError, setFormError] = useState('');

    const handleSignIn = async (event) => {
        event.preventDefault();
        
        if (!username.trim() || !password.trim()) {
            setFormError("Username and password are required");
            return;
        }

        try {
            const userData = {
                username: username,
                password: password
            };

            
            await loginUser(userData)
        } catch (error) {
            setFormError("Sign-in failed. Please try again later.");
            console.error("Sign-in failed:", error);
        }
    };

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const mediaLoginList = mediaLogin.map((item, index) => (
        <div key={index} className="flex items-center gap-1 border border-neutral-200 hover:bg-neutral-200 transition cursor-pointer p-3 rounded-lg">
            <img src={item.src} alt="loginimage" className="w-4" />
            <h5 className="form-text">{item.name}</h5>
        </div>
    ));

    return (
        <div className="container">
            <div className="flex flex-row max-lg:flex-col items-center justify-center h-screen gap-4 mx-8">
                <div className="overflow-hidden max-lg:w-80 rounded-xl">
                    <img src={burgerImg} alt="burgercover" className="form-img" />
                </div>
                <div className="p-3 flex flex-col gap-4">
                    <div className="flex flex-col items-center gap-4">
                        <Link to='/'><img src={logo} alt="logo" /></Link>
                        <div className="flex items-center w-2/5">
                            <hr className="flex-grow border-t border-gray-300" />
                            <span className="px-3 font-semibold text-gray-500">Sign In</span>
                            <hr className="flex-grow border-t border-gray-300" />
                        </div>
                    </div>
                    <form className="flex flex-col gap-4 w-96" onSubmit={handleSignIn}>
                        <Input
                            label="Username"
                            type="text"
                            placeholder="example@gmail.com"
                            id="username"
                            value={username}
                            onChange={handleUsernameChange}
                        />
                        <Input
                            label="Password"
                            type="password"
                            placeholder="********"
                            id="password"
                            value={password}
                            onChange={handlePasswordChange}
                        />
                        {formError && <p className="text-red-500">{formError}</p>}
                        <div className="flex items-center gap-2">
                            <input type="checkbox" id="remember" className="w-4 h-4 text-neutral-200" />
                            <label htmlFor="remember" className="form-text">Remember my preference</label>
                        </div>
                        <Button type="submit">Sign Me In</Button>
                    </form>
                    <div className="flex flex-col items-center gap-4">
                        <div className="flex items-center w-2/5">
                            <hr className="flex-grow border-t border-gray-300" />
                            <span className="px-3 text-gray-500">Continue With</span>
                            <hr className="flex-grow border-t border-gray-300" />
                        </div>
                        <div className="flex justify-center gap-2">
                            {mediaLoginList}
                        </div>
                        <div>
                            <h4 className="text-sm text-neutral-600 text-center">Don&apos;t have an account?
                                <Link to="/sign-up-form" className="text-orange-500"> Sign Up</Link>
                            </h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignInForm;
