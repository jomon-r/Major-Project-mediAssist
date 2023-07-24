import './Vprediction.css'
import React, { useState } from "react"
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const Doctorprespatientid = () => {

    const [username, setUser] = useState({id:""});
    const navigate = useNavigate();

    const handleChange = (event) => {
        // console.log("events", event);
        const label = event.target.name;
        const value = event.target.value;
        setUser({...username,[label]:value});
        console.log(username);
    };

    const handleSubmit = (event) => {
        //event.preventDefault();
        navigate(`/doctorprescriptionoutput/${username.id}`)

    };

    return (
    <>
    <body className="vbody">
        <div className="vheading">
            <h1><span id="vspan">medi</span>Assist</h1>
        </div>
        <div className="vpage">
        <div className="ashcover" >
            <div className='vsub'><h2>Prescription</h2></div>
        
                <form onSubmit={handleSubmit}>
                    <p>
                        <label>Patient ID</label>
                        <br/>
                        <input className="vinput" type="text" name="id" onChange={handleChange}/>
                    </p>
                
                    <p>
                        <button id="vbutton" type="submit">Submit</button>
                    </p>
                </form>
                          
        </div>
        </div>
        </body>
        </>
    )
}

export default Doctorprespatientid;

