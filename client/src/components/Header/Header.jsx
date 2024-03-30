import Branding from './header-comp/Branding';
import Searchbar from './header-comp/Searchbar';
import ProfileHeader from './header-comp/ProfileHeader';
import Button from '../template/Button';
import { Link } from 'react-router-dom';
import useAuth from '../../context/authContext';


import { Spin as Hamburger } from 'hamburger-react';

export default function Header(props) {
    const {isAuthenticated} = useAuth();
    return(
        <div className='fixed w-full z-50'>
            <div className="theme-main-color flex justify-between gap-2 items-center h-20 px-12">

                {/* responsive sidebar arorw */}
                <div className=' lg:hidden'>
                    <Hamburger color='#fff' toggled={props.openedSidebar} toggle={props.triggerSidebar} size={24}/>
                </div>

                <Branding/>
                <Searchbar />
                {isAuthenticated ? (
                    <ProfileHeader/>
                ):(
                    <div className='flex gap-3'>
                        <Link to="/sign-up-form">
                            <Button className="!bg-orange-600  ">Sign Up</Button>
                        </Link>
                        <Link to="/sign-in-form">
                            <Button className="!bg-white !text-orange-500">Sign In</Button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}