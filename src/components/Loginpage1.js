import './login.css'
// import { Link } from 'react-router-dom'
import  React,{ useState} from "react"
import { useNavigate } from 'react-router-dom';

const Loginpage1 = () => {

  const [username, setUser] = useState({email:"",id:""});
  const navigate = useNavigate();

  const handleChange = (event) => {
    // console.log("events", event);
    const label = event.target.name;
    const value = event.target.value;
    setUser({...username,[label]:value});
    console.log(username);
};

// const handleSubmit = (event) => {
//     event.preventDefault();
//     localStorage.setItem("store",JSON.stringify(username));
// };
    const [popupStyle, showPopup] = useState("hide")

    const popup = async () => {
        // showPopup("login-popup")
        // setTimeout(() => showPopup("hide"), 3000)

        try {
          const response = await fetch(`http://localhost:5000/api/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(username),
          });
          const data = await response.json();
          console.log(data[0].UserType)
          if(data[0].UserType === 1) {
            navigate(`/adminpage`);
          } else if(data[0].UserType === 2) {
            navigate(`/doctorpage/${username.id}`);
          } else if(data[0].UserType === 3) {
            navigate(`/patient/${username.id}`);
          } else {
          
            navigate(`/`);
          }
        } catch (error) {
          console.error('Error fetching user details:', error);
        }

    }
  return (
    <>
    <div className="main-page">
    <h1 ><span id="spani">medi</span>Assist</h1>
    </div>
    <div  className="page">
    {/* <div className="cover"> */}
        
        <form onClick={popup} className="cover">
        <h1>Login</h1>
          <input className='linput'  type="text" name='email' onChange={handleChange} placeholder="Email" />
          <input  className='linput' type="text" name='id' onChange={handleChange} placeholder="ID" />

          <div className="login-btn" >Login</div>
        </form>

        {/* <p className="text">New register</p> */}
        {/* this is register */}

        

        <div className={popupStyle}>
            <h3>Login Failed</h3>
            <p>Username or password incorrect</p>
        </div>
        
        {/* <div>
          <li><Link to = './Signup'></Link></li>
        </div> */}
        
    </div>
    {/* </div> */}
    </>
  )
}

export default Loginpage1;