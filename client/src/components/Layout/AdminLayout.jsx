import React, {useState} from 'react'
import Sidebar from '../Sidebar/Sidebar'
import Header from "../Header/Header";
import { sidebarItems } from '../pages/administrator/AdminMenuItems'
import { Outlet } from 'react-router-dom'
const AdminLayout = () => {
  const [openedSidebar,setOpenedSidebar] = useState(false);
  const triggerSidebar = () =>{
      setOpenedSidebar(!openedSidebar);
  }
  return (
    <div className='h-lvh'>
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
    </div>
  )
}

export default AdminLayout