import { useNavigate } from 'react-router-dom';
import './Vprediction.css'
import React, { useState } from "react"


const Adminpatientid = () => {

    const [id, setId] = useState('');
    const navigate = useNavigate();

    const handleSubmit = () => {
        navigate(`/adminpredictionchart/${id}`);
    };

    return (
    <>
    <body className="vbody">
        <div className="vheading">
            <h1><span id="vspan">medi</span>Assist</h1>
        </div>
        <div className="vpage">
        <div className="adpacover" >
            <div className='vsub'><h2>Predicion Chart</h2></div>
                <form>

                    <p>
                        <label>Patient ID</label>
                        <br/>
                        <input className="vinput" type="text" name="id" value={id} onChange={(e) => setId(e.target.value)} required/>
                    </p>
                
                    <p>
                    <button id="vbutton" type="submit" onClick={handleSubmit}>View Chart</button>
                    </p>
                </form>     
        </div>
        </div>
        </body>
        </>
    );
}

export default Adminpatientid;

