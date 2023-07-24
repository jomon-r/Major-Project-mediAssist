import './App.css';
import {
  BrowserRouter,
  Routes,
  Route
  
} from 'react-router-dom'
import Loginpage1 from './components/Loginpage1'
import Adminpage from './components/Admin/Adminpage';
import Doctor from './components/Doctor/Doctor';
import Patient from './components/Patient/Patient';
import Doctorregistration from './components/Admin/Doctorregistration';
import Patientregistration from './components/Admin/Patientregistration';
import Adminpatientid from './components/Admin/Adminpatientid';
import Adminpredictionchart from './components/Admin/Adminpredictionchart';
import Doctorpredictionchart from './components/Doctor/Doctorpredictionchart';
import Doctorprespatientid from './components/Doctor/Doctorprespatientid';
import Doctorpatientid from './components/Doctor/Doctorpatientid';
import Vprediction from './components/Doctor/Vprediction';
import Doctorprescriptioninput from './components/Doctor/Doctorprescriptioninput';
import Doctorprescriptionoutput from './components/Doctor/Doctorprescriptionoutput';
import Patientpredictionchart from './components/Patient/Patientpredictionchart';
import Patientprescriptionoutput from './components/Patient/Patientprescriptionoutput';
import Patientpredictioninput from './components/Patient/Patientpredictioninput';
// import Patientprespatientid from './components/Patient/Patientprespatientid';
import Patientvisualization from './components/Patient/Patientvisualization';
import Doctorvisualization from './components/Doctor/Doctorvisualization';
import Adminvisualization from './components/Admin/Adminvisualization';
const App = () => {
  return (
    <>      
      
      <BrowserRouter>
        <Routes>
          <Route path ='/' element= {<Loginpage1 />} />
          <Route path ='/patient/:id' element={<Patient/>}/>
          <Route path='/adminpage' element={<Adminpage/>}/>
          <Route path='/doctorpage/:id' element={<Doctor />}/>
          
          <Route path='/doctorregistration' element={<Doctorregistration/>}/>
          <Route path='/patientregistration' element={<Patientregistration/>}/>
          <Route path='/adminpatientid' element={<Adminpatientid/>}/>
          <Route path="/adminpredictionchart/:id" element={<Adminpredictionchart />}/>
          <Route path='/adminvisualization/:id' element={<Adminvisualization/>}/>
         
         
          <Route path="/doctorpredictionchart/:id" element={<Doctorpredictionchart />}/>
          <Route path='/doctorprespatientid'element={<Doctorprespatientid/>}/>
          <Route path='/doctorpatientid' element={<Doctorpatientid/>}/>
          <Route path='/vprediction' element={<Vprediction/>}/>
          <Route path='/doctorprescriptioninput' element={<Doctorprescriptioninput/>}/>
          <Route path="/doctorprescriptionoutput/:id" element={<Doctorprescriptionoutput/>}/>
          <Route path='/doctorvisualization/:id' element={<Doctorvisualization/>}/>
          
          
          <Route path='/patientpredictionchart/:id' element={<Patientpredictionchart/>}/>
          <Route path='/patientprescriptionoutput/:id' element={<Patientprescriptionoutput/>}/>
          <Route path='/patientpredictioninput/:id' element={<Patientpredictioninput/>}/>
          <Route path='/patientvisualization/:id' element={<Patientvisualization/>}/>




          </Routes>
          
      </BrowserRouter>
  
       
    </>

  );
}
 
export default App;