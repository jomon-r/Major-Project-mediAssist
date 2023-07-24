import React from 'react'
import Navbarpatient from './Navbarpatient'
import './patient.css'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

function Patient() {
  const [records, setRecords] = useState([]);
  const id = useParams();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/getpatientdetails/${id.id}`);
        const data = await response.json();
        setRecords(data);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };
    fetchUserDetails();
  }, [records.length]);

  return (
    <>

    <Navbarpatient/>
    <div className='patient1'>
      <h1>Patient</h1>
      <div className='apage'>
      <div className='ppacover'>
      <p>
      <label>Name</label>
      <br/>                    
      <input className="ainput" type="text" value={records[0]?.Name || ''}/>  
      </p>
      <p>
          <label>Email </label>
                            <br/>
                            <input className="ainput" type="text" value={records[0]?.Email || ''}/>
                        </p>
                        <p>
                            <label>Patient ID</label>
                            <br/>
                            <input className="ainput" type="text" value={records[0]?.ID || ''}/>
                        </p>
                        <p>
                            <label>DOB</label>
                            <br/>
                            <input className="ainput" type="text" value={records[0]?.Date || ''}/>
                        </p>
                        <p>
                            <label>Sex</label>
                            <br/>
                            <input className="ainput" type="text" value={records[0]?.Sex || ''}/>
                        </p>
                        <p>
                            <label>Hospital (Current)</label>
                            <br/>
                            <input className="ainput" type="text" value={records[0]?.Hospital || ''}/>
                        </p>
                        <p>
                            <label>Doctor</label>
                            <br/>
                            <input className="ainput" type="text" value={records[0]?.Doctor || ''}/>
                        </p>
      
      </div>
      </div>
    </div>
  
    </>
  )
}

export default Patient