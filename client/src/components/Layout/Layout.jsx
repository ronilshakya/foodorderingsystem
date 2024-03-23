import { useState,useEffect } from "react";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import {sidebarItems} from '../Sidebar/SidebarData';
export default function Dashboard() {
    const [openedSidebar,setOpenedSidebar] = useState(false);
    const triggerSidebar = () =>{
        setOpenedSidebar(!openedSidebar);
    }
    useEffect(() => {
        const handleResize = () => {
          if (window.innerWidth > 1024) {
            setOpenedSidebar(true);
          } else {
            setOpenedSidebar(false);
          }
        };
    
        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);
    return(
        <div>
            <Header 
                openedSidebar={openedSidebar} 
                triggerSidebar={triggerSidebar}
            />
            <Sidebar 
                openedSidebar={openedSidebar} 
                triggerSidebar={triggerSidebar}
                sidebarItems ={sidebarItems}
            />
            <Outlet />
            <Footer />
        </div>
    )
}