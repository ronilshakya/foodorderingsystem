import React, { useState } from 'react';
import Input from '../../template/Input';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import useSignUp from '../../../hooks/useSignUp';

const SignUpForm = () => {
    const {loading,error,registerUser} = useSignUp();


    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [usernameError, setUsernameError] = useState('');
    
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');

    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const [confirmPassword, setConfirmPassword] = useState('');
    const [confirmError, setConfirmError] = useState('');

    const handleUsernameChange = (event) => {
        const value = event.target.value;
        setUsername(value);
        if (!value.trim()) {
            setUsernameError('Username is required.');
        } else {
            setUsernameError('');
        }
    };
    const handleEmailChange = (event) =>{
        const value = event.target.value;
        setEmail(value);
        if(!value.trim()){
            setEmailError("Email is required")
        }else{
            setEmailError("");
        }
    }
    const handlePasswordChange = (event) =>{
        const value = event.target.value;
        setPassword(value);
        if(!value.trim()){
            setPasswordError("Password cannot be empty")
        }else{
            setPasswordError("");
        }
    }
    const handleConfirmPasswordChange = (event) =>{
        const value = event.target.value;
        setConfirmPassword(value);
        if(!value.trim()){
            setConfirmError("Please fill this field")
        }else{
            setConfirmError("");
        }
    }

    const validateForm = () => {
        if (!username.trim()) {
            setUsernameError('Username is required.');
            return false;
        }

        if (!email.trim()) {
            setEmailError('Email is required.');
            return false;
        }
        if(!email.match(/^[a-zA-Z0-9._]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/)){
            setEmailError('Invalid Email Address');
            return false;
        }

        if (!password.trim()) {
            setPasswordError('Password cannot be empty');
            return false;
        }
        if(password.length < 8){
            setPasswordError("Password must be atleast 8 digits")
            return false;
        }

        if (!confirmPassword.trim()) {
            setConfirmError('Please fill this field');
            return false;
        }
        if(password !== confirmPassword){
            setConfirmError("Passwords do not match")
            return false;
        }
        return true;
    };

    const handleSignUp = async (event) => {
        event.preventDefault();
        if (validateForm()) {
            const userData = {
                username: username,
                email: email,
                password: password
            };
        await registerUser(userData);

        } else {
            console.log('Form is invalid.');
        }
    };
    
    

    return (
        <div className="bg-orange-50 h-lvh w-full flex items-center justify-center">
            <div className="bg-white shadow-lg p-8 flex flex-col gap-7">
                <div className="flex flex-col items-center gap-4">
                    <h1 className="text-4xl">FoodDesk</h1>
                    <div className="flex items-center w-3/5">
                        <hr className="flex-grow border-t border-gray-300" />
                        <span className="px-3 text-gray-500">Sign up your account</span>
                        <hr className="flex-grow border-t border-gray-300" />
                    </div>
                </div>
                <form className="flex flex-col gap-4">
                    <Input
                        label="Username"
                        type="text"
                        placeholder="Enter username"
                        id="username"
                        spanError={usernameError}
                        onChange={handleUsernameChange}
                    />
                    <Input
                        label="Email Address"
                        type="text"
                        placeholder="Enter email"
                        id="email"
                        spanError={emailError}
                        onChange={handleEmailChange}
                    />
                    <Input
                        label="Password"
                        type="password"
                        placeholder="Enter password"
                        id="password"
                        spanError={passwordError}
                        onChange={handlePasswordChange}
                    />
                    <Input
                        label="Confirm Password"
                        type="password"
                        placeholder="Confirm password"
                        id="confirm-password"
                        spanError={confirmError}
                        onChange={handleConfirmPasswordChange}
                    />
                    <button
                        onClick={handleSignUp}
                        className="theme-main-color hover:theme-hover-color transition p-2 text-white font-semibold text-md rounded-md cursor-pointer disabled:opacity-35 disabled:cursor-not-allowed"
                    >
                        Sign Me Up
                    </button>
                </form>
                <div>
                    <h4 className="text-sm text-neutral-600 text-center">
                        Already have an account?
                        <Link to="/" className="text-orange-500"> Sign in</Link>
                    </h4>
                </div>
            </div>
        </div>
    );
};

export default SignUpForm;
