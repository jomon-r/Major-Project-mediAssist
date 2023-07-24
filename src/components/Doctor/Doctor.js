import './Patientregistration.css'
import React, { useEffect, useRef } from 'react'
import { useState } from 'react';
import NavbarDoctor from './NavbarDoctor'
import './doctor.css'
import * as d3 from 'd3';
import { useParams } from 'react-router-dom';


const Record = (props) => (
   
  <tr>
    <td>{props.record.ID}</td>
    <td>{props.record.Name}</td>
    <td>{props.record.Age}</td>
    </tr>
 
   
    
);

const Doctor = () => {
  const id = useParams();
  const [records, setRecords] = useState([]);
  //const [docrecord, setDocrecord] = useState([]);
  const [index, setIndex] = useState(-1);
  //const [index, setIndex] = useState(-1);
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/getpatient/${id.id}`);
        const data = await response.json();
        setRecords(data);
        const foundIndex = records.findIndex(entry => entry.UserType === 2);
        setIndex(foundIndex);
        console.log(index);
        console.log(records[index]);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    
    fetchUserDetails();
    //fetchDoctorDetails();
  }, [records.length]);

  // useEffect(() => {
  //   const fetchDoctorDetails = async () => {
  //     try {
  //       const response = await fetch(`http://localhost:5000/api/getDoctor/${id.id}`);
  //       const data = await response.json();
  //       console.log(data);
  //       setDocrecord(data);
  //     } catch (error) {
  //       console.error('Error fetching user details:', error);
  //     }
  //   };
  //   fetchDoctorDetails();
  //   return;
  // }, [records.length]);
  const [docid, setDocid] = useState('');
  function recordList() {
    return records.map((record) => {
      if(record.UserType === 3){
        return (
          <Record
            record={record}
            key={record._id}
          />
        );
      }
    });
  };

  // function getIndex() {
  //   var index = 0;
  //   return records.map((record) => {
  //     index = index + 1;
  //     if(record.UserType === 1){
  //       setDocid(index);
  //       console.log(docid);
  //     }
  //   }); 
  // }

  return (
    <>
    <NavbarDoctor/>
    <div className='doctor1'>
      <h1>Doctor</h1>
      <div className='apage'>
      <div className='docover2'>
        <h3>Doctor Details</h3>
        <br/>
      <p>
                        <label>Name</label>
                        <br/>                    
                        <input className="dinput" type="text" value={records[index]?.Name || ''}/>
                    </p>
                    <p>
                        <label>Email </label>
                        <br/>
                        <input className="dinput" type="text" value={records[index]?.Email || ''}/>
                    </p>
                    <p>
                        <label>Doctor ID</label>
                        <br/>
                        <input className="dinput" type="text" value={records[index]?.ID || ''}/>
                    </p>
                    <p>
                        <label>DOB</label>
                        <br/>
                        <input className="dinput" type="text" value={records[index]?.Date || ''}/>
                    </p>
                    <p>
                        <label>Sex</label>
                        <br/>
                        <input className="dinput" type="text" value={records[index]?.Sex || ''}/>
                    </p>
                    <p>
                        <label>Hospital</label>
                        <br/>
                        <input className="dinput" type="text" value={records[index]?.Hospital || ''}/>
                    </p>
                    <p>
                        <label>Department</label>
                        <br/>
                        <input className="dinput" type="text" value={records[index]?.Department || ''}/>
                    </p>
          </div>
      <div className='docover1'>
        {/* <h3>Patients Treating</h3>
        <br/>
        <div className='labheading'>
        <h3>Patient id</h3>
        <h3 className='namehead'>Name</h3>
        <h3  className='namehead'>Age</h3>
        </div>
        <br/> 
        <div className='alignrow'>
        <p>
                                           
                        <input className='doinput' type="text"/>
                    </p>
                    <p>                   
                        <input className='doinput' type="text"/>
                    </p>
                    <p>
                                           
                        <input className='doinput' type="text"/>
                    </p>
        </div> */}
        <table className="schedule-table-striped" style={{ marginTop: 20 }}>
       <thead>
         <tr>
              
              <th>Patient ID</th>
              <th>Name</th>
              <th>Age</th>
         </tr>
       </thead>
       <tbody>
       {recordList()} 

        </tbody>
     </table>
        
      </div>
      
      </div>
      
    </div>
    
    
    </>
  );
}

export default Doctor