import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext';
import { React, useState, useEffect } from 'react';


import './styles/index.css';
import './styles/SignUp.css';
import './styles/SignIn.css'
import './styles/Landing.css'
import './styles/headerNav.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/MeetTeam.css'
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from 'react-toastify';

// Pages & Components
import Landing from './pages/Landing';
import Signup from './pages/Signup';
import SignIn from './pages/SignIn';
import MeetTeam from './pages/MeetTeam';
import StudentHome from './pages/StudentHome';

function App() {
  const [loading, setLoading] = useState(true)

  const user = useAuthContext()

  useEffect(() => {
    setLoading(false)
  }, [user])

  return (
    <div className="App">
      <BrowserRouter>
        <div className='pages'>
          <Routes>
            <Route 
              path='/'
              element={<Landing />}
            />
            <Route 
              path='/signup'
              element={loading ? null : !user.user ? <Signup /> : <Navigate to='/' />}
            />
            <Route 
              path='/signin'
              element={loading ? null : !user.user ? <SignIn /> : <Navigate to='/' />}
            />
            <Route 
              path='/meetteam'
              element={<MeetTeam />}
            />
            <Route 
              path='/studenthome'
              element={loading ? null : user.user ? <StudentHome /> : <Navigate to='/' />}
              //element={<StudentHome />}
            />
          </Routes>
        </div>
      </BrowserRouter>
      <ToastContainer/>
    </div>
  );
}

export default App;
