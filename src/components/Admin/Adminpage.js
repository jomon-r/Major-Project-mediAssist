import React from 'react'
import NavbarAdmin from './NavbarAdmin'
import './adminpage.css'
import { Link } from 'react-router-dom';

function Adminpage() {
  return (
    <>
    
    
    <div className='admin1'>
      
      <div className='admin2'>
     <h1 className='medi'>medi<span className='adhead'>Assist</span></h1>
      
      <Link to='/'><button  className='gbutton-navbar'>Sign Out</button></Link>
      </div>
      <h1>Admin Page</h1>
        <NavbarAdmin/> 

        
          
    
    </div>
          
        
    
    </>
  )
}

export default Adminpage