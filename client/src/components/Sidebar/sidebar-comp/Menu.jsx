import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom';
// import {sidebarItems} from '../SidebarData';

import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { MdOutlineDashboard,MdOutlineLocalOffer  } from "react-icons/md";
import { IoRestaurantOutline } from "react-icons/io5";
import { IoMdNotificationsOutline } from "react-icons/io";
import { useLocation } from 'react-router-dom';
import useGetAllFoodItems from '../../../hooks/useGetAllFoodItems';

const Menu = (props) => {
    const location = useLocation();
    const [openItem,setOpenItem] = useState(null);
    const {foods} = useGetAllFoodItems();
    const uniqueCategories = [...new Set(foods.map(item => item.category))];

    const sidebarItems = [
        {
            title:"Home / Menu",
            icon:<MdOutlineDashboard/> ,
            submenu: uniqueCategories.map((category, id) => ({
                id: id,
                title: category,
                url: ""
            }))
        },
        {
            title: "Notifications",
            icon:<IoMdNotificationsOutline /> ,
            submenu:[
                {id:1, title: "My Orders", url: "my-orders"}
            ]
        },
        {
            title:"Info",icon:<IoRestaurantOutline/>,
            submenu:[
                {id:2 , title: "Contact",url:"contact"},
            ]
        },
    ]

    const toggleSubmenu = (index) =>{
        if(openItem === index){
            setOpenItem(null);
        }else{
            setOpenItem(index);
        }
    }
    useEffect(()=>{
        if (location.pathname === '/' || location.pathname.startsWith('/administrator')) {
            setOpenItem(0);
        }
        
    },[])
    
    // scroll to id
    const [scrollTarget, setScrollTarget] = useState(null);
    useEffect(()=>{
        if(scrollTarget){
            const scrollOffset = 100; // Adjust this value as needed
            const topPos = scrollTarget.getBoundingClientRect().top + window.scrollY - scrollOffset;
            window.scrollTo({ top: topPos, behavior: 'smooth' });
        }
    },[scrollTarget]);
    const scrollToElement = (id) =>{
        const element = document.getElementById(id);
        setScrollTarget(element);
        props.triggerSidebar();
    }
  return (
    <>
        <ul>
                    {
                        sidebarItems.map(
                            (item,index)=>(
                                <li key={index} className={`list-none p-2 ${window.innerWidth<1024 ? 'opacity-0 ':'opacity-100'} cursor-pointer ${props.openedSidebar && 'opacity-100 transition duration-1000'}`}>
                                    <div onClick={()=>toggleSubmenu(index)} className={`px-2 py-3 flex items-center rounded-lg transition-all ${openItem===index?"theme-main-color text-white":""}`}>
                                        <div className='grow-0'>{item.icon}</div>
                                        <div className='grow px-2'>{item.title}</div>
                                        <div className='grow-0'>
                                            {openItem===index?
                                                (<IoIosArrowDown  />)
                                                :(<IoIosArrowForward />)
                                            }
                                        </div>
                                    </div>
                                    <ul className={`overflow-hidden ml-4 block ${openItem === index ? 'max-h-screen transition-all duration-300':'max-h-0 transition-all duration-300'}`}>
                                        {item.submenu.map((element) => (
                                            <li key={element.id} onClick={()=>scrollToElement(element.title)} className={`sidebar-submenu p-1`}>
                                                <Link to={element.url}>{element.title}</Link>
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                            )
                        )
                    }
               </ul>
    </>
  )
}

export default Menu