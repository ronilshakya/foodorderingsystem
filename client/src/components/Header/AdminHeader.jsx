import AdminBranding from './header-comp/AdminBranding';
import { Spin as Hamburger } from 'hamburger-react';

export default function Header(props) {
    return(
        <div className='fixed w-full z-50'>
            <div className="bg-white flex border-b-2 border-orange-500 justify-between gap-2 items-center h-20 px-12">

                {/* responsive sidebar arorw */}
                <div className=' lg:hidden'>
                    <Hamburger color='#F97316' toggled={props.openedSidebar} toggle={props.triggerSidebar} size={24}/>
                </div>

                <AdminBranding/>
                
            </div>
        </div>
    )
}