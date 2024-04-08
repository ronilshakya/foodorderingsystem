import { MdOutlineDashboard,MdOutlineLocalOffer  } from "react-icons/md";
import { IoRestaurantOutline } from "react-icons/io5";

export const sidebarItems = [
    {
        title:"Home / Menu",icon:<MdOutlineDashboard/> ,
        submenu:[
            {id:1,title:"Momo",url:""},
            {id:2,title:"Chowmein",url:""},
            {id:3,title:"Pizza",url:""},
            {id:4,title:"Burger",url:""},
        ]
    },
    {
        title:"Info",icon:<IoRestaurantOutline/>,
        submenu:[
            {id:2 , title: "Contact",url:"contact"},
        ]
    },
]