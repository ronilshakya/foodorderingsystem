import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import profPic from '../img/1.png';
import arrowImg from '../img/right-arrow.png';
import arrowDarkImg from '../img/right-arrow-dark.png';
import userImg from '../img/user.png';
import logoutImg from '../img/logout.png';
import mailImg from '../img/mail.png';
import notificationImg from '../img/notification.png';
import useAuth from '../../../context/authContext';
import useGetProfilePic from '../../../hooks/useGetProfilePic';
import { useEffect } from 'react';
import LoadingSpinner from '../../../assets/Spinner-1s-200px.svg';


const ProfileHeader = () => {
    const [navOpen, setNavOpen] = useState(false);
    const {userData, logout} = useAuth();
    const {userImage,getProfilePic} = useGetProfilePic();
    const [isLoading, setIsLoading] = useState(true);

    
    const triggerNavOpen = () =>{
        setNavOpen(!navOpen);
    }
    const menu = [
        {title: "Profile",url:"profile",icon: userImg},
        {title: "Logout",url:"", icon: logoutImg, onClick: logout},
    ]
    const menuList = menu.map(
        (item, index) =>(
            <li key={index}>
                <Link to={item.url} onClick={()=>{item.onClick(); triggerNavOpen()}} className='px-4 py-2 w-40 flex gap-2  hover:bg-neutral-200'>
                    <img src={item.icon} alt="icon" className='w-5'/>
                    <p className='text-neutral-600 text-sm font-semibold'>{item.title}</p>
                </Link>
            </li>
        )
    )
    useEffect(()=>{
        getProfilePic(userData._id)
        .then(setIsLoading(false))
        .catch((error) => {
            console.error('Error fetching profile picture:', error);
            setIsLoading(false);
        });
    },[getProfilePic,userData])
  return (
    <div className={``}>
                <div className={`flex items-center justify-between gap-2 px-4 py-2 w-40 cursor-pointer ${navOpen ? "bg-white rounded-t-md transition duration-300": "theme-light-color rounded-md transition duration-300" }`} onClick={triggerNavOpen}>
                    <div className="rounded-full ring-2 ring-white overflow-hidden w-9 h-9">
                    {isLoading?(
                        <img src={LoadingSpinner} alt="spinner" className='w-20' />
                    ):(
                        <img src={`${import.meta.env.VITE_BASE_URL}/userprofile/${userImage.profileImage}`} className="w-20" alt="profilepic" />
                    )}
                    </div>
                    <h1 className={`${navOpen ? "text-black" : "text-white"} font-semibold select-none `}>{userData.username}</h1>
                    <img 
                        src={navOpen ? arrowDarkImg : arrowImg} alt="arrow" 
                        className={`w-4 ${navOpen ?'rotate-90 transition-transform duration-300':'rotate-0 transition-transform duration-300'}`}
                    />
                </div>
                    <div className={`${navOpen?"absolute bg-white ":"hidden"} pt-3`}>
                        <ul className='shadow-lg rounded-b-md'>
                            {menuList}
                        </ul>
                    </div>
            </div>
  )
}

export default ProfileHeader