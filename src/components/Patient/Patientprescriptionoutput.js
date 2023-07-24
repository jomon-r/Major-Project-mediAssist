import './Patientregistration.css'
import React from "react"
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from "react"

const Record = (props) => (

    <tr>
        <td>{props.record.Medicine}</td>
    </tr>



);
const Patientprescriptionoutput = () => {
    const id = useParams();
    const [records, setRecords] = useState([]);
    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/getpres/${id.id}`);
                const data = await response.json();
                setRecords(data);
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        };
        fetchUserDetails();
        return;
    }, []);

    function recordList() {
        return records.map((record) => {
            return (
                <Record
                    record={record}
                    key={record._id}
                />
            );
        }
        );
    }

    return (
        <>
            <body>
                <div className="vheading">
                    <h1><span id="aspan">medi</span>Assist</h1>
                </div>
                <div className="vpage">
                    <div className="vcover" >
                        <div className='vsub'><h2>Patient Prescription</h2></div>
                        <p>
                            <label>Patient ID</label>
                            <br />
                            <input className="vinput" type="text" name="pno" value={id.id} />
                        </p>
                        <p>
                            <label>Name</label>
                            <br />
                            <input className="vinput" type="text" name="name" value={records[0]?.Name || ''}/>
                        </p>
                        <p>
                            <label>Age</label>
                            <br />
                            <input className="vinput" type="text" name="age" value={records[0]?.Age || ''}/>
                        </p>
                        <p>
                            <table className="schedule-table-striped" style={{ marginTop: 20 }}>
                                <thead>
                                    <tr>
                                        <th>Prescription</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recordList()}
                                </tbody>
                            </table>
                        </p>



                    </div>
                </div>
            </body>
        </>
    )
}

export default Patientprescriptionoutput;

