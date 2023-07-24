import './Patientregistration.css'
import React, { useState } from "react"
import Tesseract from 'tesseract.js'
import axios from 'axios';
import { async } from 'q';

const Doctorprescriptioninput = () => {

    const [file, setFile] = useState();
    const [username, setUser] = useState({id:"", medicine:""});
    
    const [image, setImage] = useState(null);
    const [result, setResult] = useState('');


    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        setImage(file);
        setFile(URL.createObjectURL(event.target.files[0]));
    };

    const recognizeText = async (event) => {
        event.preventDefault();
        if (!image) {
          console.log('No image selected');
          return;
        }
    
        const formData = new FormData();
        formData.append('apikey', 'K86498832088957'); // Replace with your OCR.space API key
        formData.append('file', image);
        formData.append('OCREngine', '2');
    
        try {
          const response = await axios.post('https://api.ocr.space/parse/image', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
    
          if (response.data && response.data.ParsedResults && response.data.ParsedResults.length > 0) {
            const parsedText = response.data.ParsedResults[0].ParsedText;
            username.medicine = parsedText;
            sendData();
          }
        } catch (error) {
          console.log('OCR API Error:', error);
        }
    };

    const sendData = async () => {
        try{
            const response = await fetch('http://localhost:5000/api/pres', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(username),
            });
            const data = await response.json();
            console.log(data.message);
        }catch (error) {
            console.error('Error:', error);
        }
    };

    
    const handleChange = (event) => {
        // console.log("events", event);
        const label = event.target.name;
        const value = event.target.value;
        setUser({...username,[label]:value});
        console.log(username);
    };


    return (
    <>
    <body>
        <div className='abc'>
        <div className="aheading">
            <h1><span id="aspan">medi</span>Assist</h1>
        </div>
        <div className="pipage">
        <div className='pisub'><h2>Prescription Upload</h2></div>
        <div className='picover'>
        
        <div>
            <form>
                <p>
                    <label>Patient ID</label>
                    <br/>
                    <input className="ainput" type="text" name="id" onChange={handleChange}/>
                </p>
                <p>
                    <label>Prescription</label>
                    <br/>
                    <input className="ainput" type="file" name="pres" onChange={handleImageUpload}/>
                    <br/>
                </p>
                <p>
                    <button id="dbutton" type="submit" onClick={recognizeText}>Upload</button>
                </p>
                    <label>Prescription converted to text</label>
                    <br/>
                    <input className="ainput" type="text" value={username.medicine}></input>
                    </form>
                </div>

            <div className='pic'><img src={file}  alt=''/>
            
            </div>
                
                
            
        </div>
        </div>
        </div>
        </body>
        </>
    )
}

export default Doctorprescriptioninput;

