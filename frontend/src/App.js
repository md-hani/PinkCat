import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext';
import { React, useState, useEffect } from 'react';


import './styles/index.css';
import './styles/SignUp.css';
import './styles/SignIn.css'
import './styles/Landing.css'
import './styles/headerNav.css'
import './styles/StudentHome.css'
import './styles/DashStyles.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/MeetTeam.css'
import 'swiper/swiper-bundle.css'
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from 'react-toastify';

// Pages & Components
import Landing from './pages/Landing';
import Signup from './pages/Signup';
import SignIn from './pages/SignIn';
import MeetTeam from './pages/MeetTeam';
import StudentHome from './pages/StudentHome';
import StudentCalendar from './pages/StudentCalendar'
import StudentAnalytics from './pages/StudentAnalytics'
import StudentInventory from './pages/StudentInventory'

function App() {
  const [loading, setLoading] = useState(true)
  const [currentUser, setCurrentUser] = useState('');
  const [isLoad, setIsLoad] = useState(false);

  const fetchData = async (username) => {
      const response = await fetch('/api/getcurrentuser', {
          method: 'POST',
          body: JSON.stringify({username}),
          headers: {
              'content-type': 'application/json'
          }
      })
      const json = await response.json()
      setIsLoad(true)
      setCurrentUser(json)
  }

  const user = useAuthContext()

  useEffect(() => {
    setLoading(false)
    fetchData(user?.user?.username)
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
            />
            <Route 
              path='/studentcalendar'
              element={loading ? null : user.user ? <StudentCalendar /> : <Navigate to='/' />}
            />
            <Route 
              path='/studentanalytics'
              element={loading ? null : (user.user && isLoad) ? currentUser?.priv === 'Staff' ? <StudentAnalytics /> : <Navigate to='/' /> : <Navigate to='/' />}
            />
            <Route 
              path='/studentinventory'
              element={loading ? null : user.user ? <StudentInventory /> : <Navigate to='/' />}
            />
          </Routes>
        </div>
      </BrowserRouter>
      <ToastContainer/>
    </div>
  );
}

export default App;
