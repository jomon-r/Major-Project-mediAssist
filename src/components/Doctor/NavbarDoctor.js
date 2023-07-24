import React from 'react'
import { Link } from 'react-router-dom';
import './navbardoctor.css'
function NavbarDoctor() {
  return (
    <>
   
    <div className='ghorizontal-navbardoc'>
      
      <Link to='/doctorpatientid'><h4 className='gnavbar-linkdoc'>Prediction Chart</h4></Link>
      <Link to='/vprediction'><h4 className='gnavbar-linkdoc'> Predict</h4></Link>
      <Link to='/doctorprescriptioninput'><h4 className='gnavbar-linkdoc'>Insert Prescription</h4></Link>
      <Link to='/doctorprespatientid'><h4 className='gnavbar-linkdoc'>Show Prescription</h4></Link>
      <h1 id='med1'><span id="vspan">medi</span>Assist</h1>
      
      <Link to='/'><button  className='gbutton-navbardoc'>Sign Out</button></Link>

      {/* <Link to='/KeyRequest'><h4 className='gnavbar-link'>Doctor Registration</h4></Link>
      
      <Link to='/SchedulesG'><h4 className='gnavbar-link'>Prediction Chart</h4></Link> */}
      

      
      



    


    </div>
   </>
  )
}

export default NavbarDoctor