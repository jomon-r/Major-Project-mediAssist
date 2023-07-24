import React from 'react'
import { Link } from 'react-router-dom'
import './Navbarpatient.css'
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

function Navbarpatient() {

  const id = useParams();

  const navigate = useNavigate();

  const handlePredictioSubmit = () => {
    console.log(id);
    navigate(`/patientpredictionchart/${id.id}`);
};

const handlePrescriptionSubmit = () => {
    navigate(`/patientprescriptionoutput/${id.id}`);
};
const handlePredictSubmit = () => {
   navigate(`/patientpredictioninput/${id.id}`);
};

  return (
    <>
   
    <div className='ghorizontal-navbardoc'>
    
    <button id='pabutt' onClick={handlePredictioSubmit}><h4 className='gnavbar-linkpat'>Prediction Chart</h4></button>
    <button id='pabutt'onClick={handlePredictSubmit}><h4 className='gnavbar-linkpat'>Predict</h4></button>
    <button id='pabutt'onClick={handlePrescriptionSubmit}><h4 className='gnavbar-linkpat'>Show Prescription</h4></button>
    
    
   
      <h1 id='med'><span id="vspan">medi</span>Assist</h1>
      <Link to='/'><button  className='gbutton-navbarpat'>Sign Out</button></Link>      
    </div>
    </>
  )
}

export default Navbarpatient