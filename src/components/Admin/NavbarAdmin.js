import React from 'react'
import { Link } from 'react-router-dom';
import './navbaradmin.css'
function NavbarAdmin() {
  return (
    <>
    <div className='ghorizontal-navbar'>
      
      <div className='abc1'> 
      <Link to='/patientregistration'><h2 className='gnavbar-link1'>.</h2></Link>
      <label><h2>Patient Registartion</h2></label>
      </div> 
      <div className='abc1'> 
      <Link to='/doctorregistration'><h2 className='gnavbar-link2'>.</h2></Link>
      <label><h2>Doctor Registration</h2></label>
      </div>
      <div className='abc1'> 
      <Link to='/adminpatientid'><h2 className='gnavbar-link3'>.</h2></Link>
      <label><h2>Prediction Chart Display</h2></label>
      </div>

      
      

    </div>
   </>
  )
}

export default NavbarAdmin