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

const mediaLogin = [
    { name: 'Google', src: glImg },
    { name: 'Facebook', src: fbImg }
];

const SignInForm = () => {
    const navigate = useNavigate();
    const { error, loading, loginUser } = useLogin();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [formError, setFormError] = useState('');

    const handleSignIn = async (event) => {
        event.preventDefault();
        
        if (!email.trim() || !password.trim()) {
            setFormError("Email and password are required");
            return;
        }

        try {
            const userData = {
                email: email,
                password: password
            };

            await loginUser(userData);
            navigate('/');
        } catch (error) {
            setFormError("Sign-in failed. Please try again later.");
            console.error("Sign-in failed:", error);
        }
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
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
        <div className="signup-form container">
            <div className="flex flex-row max-lg:flex-col items-center justify-center h-lvh gap-4 mx-8">
                <div className="overflow-hidden max-lg:w-80 rounded-xl">
                    <img src={burgerImg} alt="burgercover" className="form-img" />
                </div>
                <div className="p-3 flex flex-col gap-7">
                    <div className="flex flex-col items-center gap-4">
                        <h1 className="text-4xl">FoodDesk</h1>
                        <div className="flex items-center w-2/5">
                            <hr className="flex-grow border-t border-gray-300" />
                            <span className="px-3 text-gray-500">Sign In</span>
                            <hr className="flex-grow border-t border-gray-300" />
                        </div>
                    </div>
                    <form className="flex flex-col gap-4" onSubmit={handleSignIn}>
                        <Input
                            label="Email Address"
                            type="text"
                            placeholder="example@gmail.com"
                            id="email"
                            value={email}
                            onChange={handleEmailChange}
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
                        <Button width={{ width: '30rem' }} type="submit">Sign Me In</Button>
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
