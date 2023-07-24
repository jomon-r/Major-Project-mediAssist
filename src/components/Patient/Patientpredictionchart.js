import './Vprediction.css'
import React from "react"
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const Patientpredictionchart = () => {

    const { id } = useParams();
    console.log(id);
    const [User, setUserDetails] = useState(null)
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/getwithId/${id}`);
                const data = await response.json();
                console.log(data)
                setUserDetails(data);
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        };

        fetchUserDetails();
    }, [id]);
    const handleSubmit = () => {
        navigate(`/patientvisualization/${User[0].ID}`);
    }
    return (
    <>
    <body className="vbody">
        <div className="vheading">
            <h1><span id="vspan">medi</span>Assist</h1>
        </div>
        <div className="vpage">
        <div className="pavcover" >
        
            
            <div className='vsub'><h2>Predicion Chart</h2></div>
            {User ? (
                <div>
                    <form onClick={handleSubmit} >
                    <p>
                        <label>Patient ID</label>
                        <br/>
                        <input className="ainput" type="text" name="id" value={User[0].ID}/>
                    </p>
                    <p>
                        <label>Name</label>
                        <br/>                    
                        <input className="ainput" type="text" name="name" value={User[0].Name}/>
                    </p>
                    <p>
                        <label>Age</label>
                        <br/>                    
                        <input className="ainput" type="text" name="age" value={User[0].Age}/>
                    </p>
                    <p>
                        <label>Blood Sugar</label>
                        <br/>
                        <input className="vinput" type="text" name="sugar" value={User[0].BloodSugar}/>
                    </p>
                    <p>
                        <label>Creatinine</label>
                        <br/>
                        <input className="vinput" type="text" name="creatinine" value={User[0].Creatinine}/>
                    </p>
                    <p>
                        <label>HBA1C</label>
                        <br/>
                        <input className="vinput" type="text" name="hba1c" value={User[0].HBA1C}/>
                    </p>
                    <p>
                        <label>Sodium</label>
                        <br/>
                        <input className="vinput" type="text" name="sodium" value={User[0].Sodium}/>
                    </p>
                    <p>
                        <label>HDL</label>
                        <br/>
                        <input className="vinput" type="text" name="hdl" value={User[0].HDL}/>
                    </p>
                    <p>
                        <label>LDL</label>
                        <br/>
                        <input className="vinput" type="text" name="ldl" value={User[0].LDL}/>
                    </p>
                    <p>
                                        <button id="vbutton" type="submit" >Visualize</button>
                                    </p>
                    </form>
                </div>
                ) : (
                <p>Loading user details...</p>
              )}   
        
            
        </div>
        </div>
        </body>
        </>
    )
}

export default Patientpredictionchart;

