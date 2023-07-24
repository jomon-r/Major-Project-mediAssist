import React, { useState } from "react"
import './aldrin.css'


const Signup = () => {

    const [username, setUser] = useState({fname:"",lname:"",email:"",phoneno:"",password:""});

    const handleChange = (event) => {
        // console.log("events", event);
        const label = event.target.name;
        const value = event.target.value;
        setUser({...username,[label]:value});
        console.log(username);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        localStorage.setItem("store",JSON.stringify(username));
    };

    return (
    <>
    <div className="abody1">
        <div className="main-page">
            <h1><span id="spani">medi</span>Assist</h1>
        </div>
        <div className="apage1">
        <div className="acover1">
        <div >
            <h2>Sign Up</h2>
            <form>
                <p>
                    <label>First Name</label>     <br/>               
                    <input className="ainput1" type="text" name="fname" onChange={handleChange}/>
                    </p>
                    <p>
                    <label>Last Name</label><br/>
                    <input className="ainput1" type="text" name="lname" onChange={handleChange}/>
                </p>
                <p>
                    <label>Email</label>
                    <br/>
                    <input className="ainput1" type="email" name="email" onChange={handleChange}/>
                </p>
                <p>
                    <label>Phone Number</label>
                    <br/>
                    <input className="ainput1" type="tel" name="phoneno" onChange={handleChange}/>
                </p>
                <p>
                    <label>Password</label>
                    <br/>
                    <input className="ainput1" type="password" name="password" onChange={handleChange} />
                </p>
                <p>
                    <button id="abutton" type="submit" onSubmit={handleSubmit}>Login</button>
                </p>
            </form>
            </div>
            </div>
            
        </div>
        </div>

        </>
    )
}

export default Signup;
