import React, {useState, useEffect} from 'react'
import Sidebar from '../Sidebar/Sidebar'
import AdminHeader from "../Header/AdminHeader";
import { sidebarItems } from '../pages/administrator/AdminMenuItems'
import { Outlet } from 'react-router-dom'
const AdminLayout = () => {
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
  return (
    <div className='h-lvh'>
      <AdminHeader 
                openedSidebar={openedSidebar} 
                triggerSidebar={triggerSidebar}
            />
        <Sidebar 
                openedSidebar={openedSidebar} 
                triggerSidebar={triggerSidebar}
                sidebarItems ={sidebarItems}
          />
        <Outlet />
    </div>
  )
}

export default AdminLayout