import React, { useState } from 'react';
import Input from '../../template/Input';
import { Link, useNavigate } from 'react-router-dom';
import useSignUp from '../../../hooks/useSignUp';
import logo from '../../../assets/horizontallogo.png'

const SignUpForm = () => {
    const {registerUser} = useSignUp();


    

    const [username, setUsername] = useState('');
    const [usernameError, setUsernameError] = useState('');
    
    const [phone, setPhone] = useState('');
    const [phoneError, setPhoneError] = useState('');

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
    const handlePhoneChange = (event) =>{
        const value = event.target.value;
        setPhone(value);
        if(!value.trim()){
            setPhoneError("Phone number is required")
        }else{
            setPhoneError("");
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
        if (username.length < 5) {
            setUsernameError('Username must be atleast 5 digits.');
            return false;
        }

        if (!phone.trim()) {
            setPhoneError('Phone number is required.');
            return false;
        }
        if(!phone.match(/^98\d{8}$/)){
            setPhoneError('Invalid Phone Number');
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
                phone: phone,
                password: password
            };
        await registerUser(userData);

        } else {
            console.log('Form is invalid.');
        }
    };
    
    

    return (
        <div className="bg-orange-50 h-screen w-full flex items-center justify-center">
            <div className="bg-white shadow-lg px-8 py-6 flex flex-col gap-7">
                <div className="flex flex-col items-center gap-4">
                    <Link to='/'><img src={logo} alt="logo" /></Link>
                    <div className="flex items-center w-3/5">
                        <hr className="flex-grow border-t border-gray-300" />
                        <span className="px-3 font-semibold text-gray-500">Sign up your account</span>
                        <hr className="flex-grow border-t border-gray-300" />
                    </div>
                </div>
                <form className="flex flex-col gap-4 w-96">
                    <Input
                        label="Username"
                        type="text"
                        placeholder="Enter username"
                        id="username"
                        spanError={usernameError}
                        onChange={handleUsernameChange}
                    />
                    <Input
                        label="Phone Number"
                        type="text"
                        placeholder="Enter phone number"
                        id="phone"
                        spanError={phoneError}
                        onChange={handlePhoneChange}
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
                        <Link to="/sign-in-form" className="text-orange-500"> Sign in</Link>
                    </h4>
                </div>
            </div>
        </div>
    );
};

export default SignUpForm;
