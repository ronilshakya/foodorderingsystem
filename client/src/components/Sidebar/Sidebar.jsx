import './sidebar.css';
import { useEffect, useState } from 'react';

import Menu from './sidebar-comp/Menu';

export default function Sidebar(props) {
    return(
        <>
        <div className={`h-[100vh] border overflow-hidden fixed font-semibold z-30 w-64 bg-white  ${props.openedSidebar?'max-lg:w-64 transition-all duration-300':'max-lg:w-0 transition-all duration-300'}`}>
            <div className="relative top-20 p-3 flex flex-col justify-between">
               <Menu sidebarItems={props.sidebarItems}/>
            </div>
        </div>
        </>
    )
}