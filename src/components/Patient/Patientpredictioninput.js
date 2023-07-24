
import { React, useState } from 'react';
import { useParams } from 'react-router';
import emailjs from "emailjs-com"
import * as tf from '@tensorflow/tfjs';
import { async } from 'q';
import { useNavigate } from "react-router-dom";

function Patientpredictioninput() {

    const id = useParams();
    const [username, setUser] = useState({ parameter1: "", pval1: "" });
    const [age, setAge] = useState(null);

    const form = {
        id: id.id,
        BloodSugar: "",
        Creatinine: "",
        HBA1C: "",
        Sodium: "",
        HDL: "",
        LDL: ""
    }
    const navigate = useNavigate();
    const fetchUserDetails = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/model/${id.id}`);
            const data = await response.json();
            setAge(data[0].Age);
            console.log(age)

        } catch (error) {
            console.error('Error fetching user details:', error);
        }
    };

    const sendUserDetails = async () => {
        if (form.BloodSugar != "" || form.Creatinine != "" || form.HBA1C != "" || form.HDL != "" || form.LDL != "" || form.Sodium != "") {
            if (form.BloodSugar < 100 || form.BloodSugar > 125 || form.Creatinine < 0.6 || form.Creatinine > 1.2 || form.HBA1C > 6 || form.Sodium < 136 || form.Sodium > 145 || form.HDL > 70 || form.HDL < 35 || form.LDL > 150) {
                const emailContent = {
                    from_name: 'mediAssist',
                    to_name: 'jomonraju223@gmail.com',
                    message: "ALERT!!!\n\nYour Patient with ID " + form.id + " has checked and predicted these values\n Blood Sugar: " + form.BloodSugar + "\nCreatinine: " + form.Creatinine + "\nSodium: " + form.Sodium + "\nHDL: " + form.HDL + "\nLDL: " + form.LDL + "\nHbA1c: " + form.HBA1C + "\nKindly check the prediction chart and do the needful"
                };


                emailjs.send("service_bs9pzis", "template_cl5175o", emailContent, "yRKsiZXzHHJRruxl9")
                    .then((result) => {
                        console.log(result.txt);

                    }, (error) => {
                        console.log(error.text);
                    });

                try {
                    const response = await fetch('http://localhost:5000/api/storemodel', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(form),
                    });
                    const data = await response.json();
                    console.log(data.message);
                } catch (error) {
                    console.error('Error:', error);
                }
            }
            navigate(`/patientvisualization/${form.id}`);
        }
    };


    const handleChange = (event) => {
        // console.log("events", event);
        const label = event.target.name;
        const value = event.target.value;
        setUser({ ...username, [label]: value });
        console.log(username);
    };

    async function handleSubmit(event) {
        event.preventDefault();
        fetchUserDetails();

        if (username.parameter1 === 'sugar') {
            // const model = await tf.loadLayersModel('./models/BloodSugar/model.json');
            const model = await tf.loadLayersModel('../../models/BloodSugar/model.json');
            const input = [parseFloat(age), parseFloat(username.pval1)];

            const reshapedInput = tf.tensor(input, [1, 1, 2]);

            const predictions = model.predict(reshapedInput);

            predictions.array().then(result => {
                console.log('Predictions:', result[0]);
                form.HBA1C = result[0][0]
                form.Sodium = result[0][1]
                form.Creatinine = result[0][2]
                form.HDL = result[0][3]
                form.LDL = result[0][4]

                form.BloodSugar = username.pval1
            });

        }
        else if (username.parameter1 === 'creatinine') {
            const model = await tf.loadLayersModel('../../models/Creatinine/model.json');

            const input = [parseFloat(age), parseFloat(username.pval1)];

            const reshapedInput = tf.tensor(input, [1, 1, 2]);

            const predictions = model.predict(reshapedInput);

            predictions.array().then(result => {
                console.log('Predictions:', result[0][0]);
                form.HBA1C = result[0][0]
                form.Sodium = result[0][1]
                form.HDL = result[0][2]
                form.LDL = result[0][3]
                form.BloodSugar = result[0][4]

                form.Creatinine = username.pval1
            });

        }
        else if (username.parameter1 === 'hba1c') {
            const model = await tf.loadLayersModel('../../models/hba1c/model.json');

            const input = [parseFloat(age), parseFloat(username.pval1)];

            const reshapedInput = tf.tensor(input, [1, 1, 2]);

            const predictions = model.predict(reshapedInput);

            predictions.array().then(result => {
                console.log('Predictions:', result[0][0]);
                form.Sodium = result[0][0]
                form.Creatinine = result[0][1]
                form.HDL = result[0][2]
                form.LDL = result[0][3]
                form.BloodSugar = result[0][4]

                form.HBA1C = username.pval1
            });

        }
        else if (username.parameter1 === 'sodium') {
            const model = await tf.loadLayersModel('../../models/sodium/model.json');

            const input = [parseFloat(age), parseFloat(username.pval1)];

            const reshapedInput = tf.tensor(input, [1, 1, 2]);

            const predictions = model.predict(reshapedInput);

            predictions.array().then(result => {
                console.log('Predictions:', result[0][0]);
                form.HBA1C = result[0][0]
                form.Creatinine = result[0][1]
                form.HDL = result[0][2]
                form.LDL = result[0][3]
                form.BloodSugar = result[0][4]

                form.Sodium = username.pval1
            });

        }
        else if (username.parameter1 === 'hdl') {
            const model = await tf.loadLayersModel('../../models/HDL/model.json');

            const input = [parseFloat(age), parseFloat(username.pval1)];

            const reshapedInput = tf.tensor(input, [1, 1, 2]);

            const predictions = model.predict(reshapedInput);

            predictions.array().then(result => {
                console.log('Predictions:', result[0][0]);
                form.HBA1C = result[0][0]
                form.Sodium = result[0][1]
                form.Creatinine = result[0][2]
                form.LDL = result[0][3]
                form.BloodSugar = result[0][4]

                form.HDL = username.pval1
            });

        }
        else if (username.parameter1 === 'LDL') {
            const model = await tf.loadLayersModel('../../models/LDL/model.json');

            const input = [parseFloat(age), parseFloat(username.pval1)];

            const reshapedInput = tf.tensor(input, [1, 1, 2]);

            const predictions = model.predict(reshapedInput);

            predictions.array().then(result => {
                console.log('Predictions:', result[0][0]);
                form.HBA1C = result[0][0]
                form.Sodium = result[0][1]
                form.Creatinine = result[0][2]
                form.HDL = result[0][3]
                form.BloodSugar = result[0][4]

                form.LDL = username.pval1
            });

        }
        // send to db
        console.log(form)
        sendUserDetails();



    };

    return (
        <>
            <body className="vbody">
                <div className="vheading">
                    <h1><span id="vspan">medi</span>Assist</h1>
                </div>
                <div className="vpage">
                    <div className="vcover" >
                        <div className='vsub'><h2>Predicion</h2></div>
                        <form>

                            <p>
                                <label>Patient ID</label>
                                <br />
                                <input className="vinput" type="text" name="dno" value={id.id} readOnly />
                            </p>

                            <p>
                                <label for="parameter">Select Parameter</label>
                                <select className='vinput' name='parameter1' id='parameter1' onClick={handleChange}>
                                    <option value="sugar">Blood Sugar</option>
                                    <option value="creatinine">Creatinine</option>
                                    <option value="hba1c">HBA1C</option>
                                    <option value="sodium">Sodium</option>
                                    <option value="hdl">HDL</option>
                                    <option value="ldl">LDL</option>
                                </select>
                            </p>
                            <p>
                                <label>Enter input value</label>
                                <br />
                                <input className="vinput" type="text" name="pval1" onChange={handleChange} />
                            </p>

                            <p>
                                <button id="vbutton" type="submit" onClick={handleSubmit}>Predict</button>
                            </p>
                        </form>

                    </div>
                </div>
            </body>
        </>
    )
}

export default Patientpredictioninput;
