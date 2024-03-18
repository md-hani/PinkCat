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
import './styles/StaffAnalytics.css'
import './styles/StaffInventory.css'
import './styles/ResetPassword.css'
import './styles/Services.css'
import './styles/CalendarTab.css'
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
import Home from './pages/Home';
import ResetPassword from './pages/ResetPassword';
import Services from './pages/Services';
import Calendar from './pages/Calendar';
import Inventory from './pages/Inventory';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';

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
              element={loading ? null : !user.user ? <Signup /> : <Navigate to='/studentHome' />}
            />
            <Route 
              path='/signin'
              element={loading ? null : !user.user ? <SignIn /> : <Navigate to='/studentHome' />}
            />
            <Route 
              path='/meetteam'
              element={<MeetTeam />}
            />
            <Route 
              path='/home'
              element={loading ? null : user.user ? <Home /> : <Navigate to='/' />}
            />
            <Route 
              path='/resetPassword'
              element={<ResetPassword />}
            />
            <Route 
              path='/services'
              element={<Services />}
            />
            <Route 
              path='/calendar'
              element={loading ? null : user.user ? <Calendar /> : <Navigate to='/' />}
            />
            <Route 
              path='/inventory'
              element={loading ? null : user.user ? <Inventory /> : <Navigate to='/' />}
            />
            <Route 
              path='/analytics'
              element={loading ? null : user.user ? <Analytics /> : <Navigate to='/' />}
            />
            <Route 
              path='/settings'
              element={loading ? null : user.user ? <Settings /> : <Navigate to='/' />}
            />
          </Routes>
        </div>
      </BrowserRouter>
      <ToastContainer/>
    </div>
  );
}

export default App;
