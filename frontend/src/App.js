import {BrowserRouter, Routes, Route} from 'react-router-dom'

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

function App() {
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
              element={<Signup />}
            />
            <Route 
              path='/signin'
              element={<SignIn />}
            />
            <Route 
              path='/meetteam'
              element={<MeetTeam />}
            />
          </Routes>
        </div>
      </BrowserRouter>
      <ToastContainer/>
    </div>
  );
}

export default App;
