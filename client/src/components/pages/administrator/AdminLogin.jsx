import React from 'react'
import { Link } from 'react-router-dom'

const AdminLogin = () => {
  return (
    <div className='h-lvh relative bg-white' style={{zIndex:'100'}}>
        <form action="">
            <input type="text" placeholder='username' />
            <input type="password" placeholder='password' />
            <Link to='/administrator/user'>
                <button>Submit</button>
            </Link>
        </form>
    </div>
  )
}

export default AdminLogin