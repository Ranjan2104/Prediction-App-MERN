import logo from './logo.svg';
import './App.css';
import Login from './Components/Home/Login';
import Register from './Components/Home/Register';
import Navbar from './Components/NavBar/Navbar';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import OtpVerify from './Components/Home/OtpVerify';
import Error from './Components/Error/Error';
import Home from './Components/Home/Home';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, {useState} from 'react';

function App() {
  const [load, setLoad] = useState(false);
  return (
    <div className="App">
      <Router>
        <Navbar loadHandler = {load}/>
        <Routes>
          <Route exact path='/' element={<Login loadHandler = {setLoad}/>} />
        </Routes>
        <Routes>
          <Route exact path='/register' element={<Register />} />
        </Routes>
        <Routes>
          <Route exact path='/otpVerify' element={<OtpVerify loadHandler = {setLoad} />} />
        </Routes>
        <Routes>
          <Route exact path='/404' element={<Error />} />
        </Routes>
        {load ? <Routes>
          <Route exact path='/home' element={<Home />} />
        </Routes> :
        <Routes>
        <Route exact path='/home' element={<Error />} />
          </Routes>}
      </Router>
      <ToastContainer autoClose={2000} position="top-center" theme="colored"/>
    </div>
  );
}

export default App;
