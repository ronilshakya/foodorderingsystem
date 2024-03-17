import { MdOutlineDashboard,MdOutlineLocalOffer  } from "react-icons/md";
import { IoRestaurantOutline } from "react-icons/io5";

export const sidebarItems = [
    {
        title:"Home / Menu",icon:<MdOutlineDashboard/> ,
        submenu:[
            {id:1,title:"Burger",url:""},
            {id:2,title:"Pizza",url:""},
            {id:3,title:"Momo",url:""},
            {id:4,title:"Chowmein",url:""},
        ]
    },
    {
        title:"Offers",
        icon:<MdOutlineLocalOffer/>,
        submenu:[
            {id:1, title:"10%Offer",url:""}
        ]},
    {
        title:"Info",icon:<IoRestaurantOutline/>,
        submenu:[
            {id:1 , title: "About",url:"about"},
            {id:2 , title: "Contact",url:"contact"},
        ]
    },
]