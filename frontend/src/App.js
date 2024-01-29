import {BrowserRouter, Routes, Route} from 'react-router-dom'

import './styles/index.css';
import './styles/SignUp.css';
import './styles/SignIn.css'
import './styles/headerNav.css'

// Pages & Components
import Landing from './pages/Landing';
import Signup from './pages/Signup';
import SignIn from './pages/SignIn';

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
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
