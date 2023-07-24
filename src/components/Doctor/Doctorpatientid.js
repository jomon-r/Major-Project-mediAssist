import './Vprediction.css'
import React, { useState } from "react"
import { useNavigate } from 'react-router-dom';


const Doctorpatientid = () => {

    const [id, setId] = useState('');
    const navigate = useNavigate();

    const handleSubmit = () => {
        navigate(`/doctorpredictionchart/${id}`);
    };

    return (
    <>
    <body className="vbody">
        <div className="vheading">
            <h1><span id="vspan">medi</span>Assist</h1>
        </div>
        <div className="vpage">
        <div className="doidcover" >
            <div className='vsub'><h2>Predicion Chart</h2></div>
                <form>
                    <p>
                        <label>Patient ID</label>
                        <br/>
                        <input className="vinput" type="text" name="pno" value={id} onChange={(e) => setId(e.target.value)}/>
                    </p>
                
                    <p>
                    <button id="vbutton" type="submit" onClick={handleSubmit}>View Chart</button>
                    </p>
                </form>
                          
        </div>
        </div>
        </body>
        </>
    )
}

export default Doctorpatientid;

