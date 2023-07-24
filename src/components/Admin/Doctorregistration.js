import './Doctorregistration.css'
import React, { useState } from "react"


const Doctorregistration = () => {

    const [username, setUser] = useState({name:"",email:"",id:"",date:"",sex:"",hospital:"",department:"",doctor:"",usertype:"2"});

    const handleChange = (event) => {
        // console.log("events", event);
        const label = event.target.name;
        const value = event.target.value;
        setUser({...username,[label]:value});
        console.log(username);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        //localStorage.setItem("store",JSON.stringify(username));
        try{
            const response = await fetch('http://localhost:5000/api/set', {
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

    return (
    <>
    <body className="dbody">
        <div className="dheading">
            <h1><span id="dspan">medi</span>Assist</h1>
        </div>
        <div className="dpage">
        <div className="dcover" >
            <div className='dsub'><h2>Doctor Registration</h2></div>
                <form onSubmit={handleSubmit}>

                    <p>
                        <label>Name</label>
                        <br/>                    
                        <input className="dinput" type="text" name="name" onChange={handleChange}/>
                    </p>
                    <p>
                        <label>Email </label>
                        <br/>
                        <input className="dinput" type="text" name="email" onChange={handleChange}/>
                    </p>
                    <p>
                        <label>Doctor ID</label>
                        <br/>
                        <input className="dinput" type="text" name="id" onChange={handleChange}/>
                    </p>
                    <p>
                        <label>DOB</label>
                        <br/>
                        <input className="dinput" type="date" name="date" onChange={handleChange}/>
                    </p>
                    <p>
                        <label for="sex">Sex</label>
                        <br/>
                        <select className='dinput' name='sex' id='sex'  onClick={handleChange}>
                            <option value="Male">Male</option> 
                            <option value="Female">Female</option>
                        </select>
                    </p>
                    <p>
                        <label>Hospital</label>
                        <br/>
                        <input className="dinput" type="text" name="hospital" onChange={handleChange}/>
                    </p>
                    <p>
                        <label>Department</label>
                        <br/>
                        <input className="dinput" type="text" name="department" onChange={handleChange}/>
                    </p>
                    <p>
                        <button id="dbutton" type="submit">Register</button>
                    </p>
                </form>
            
        </div>
        </div>
        </body>
        </>
    )
}

export default Doctorregistration;

