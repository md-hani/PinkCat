import Header from '../components/Header'
import { Link } from "react-router-dom"
import React from 'react'

const Signin = () => {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState(null);

    const handleSubmit= async (e) => {
        e.preventDefault()

        const user = {username, password}

        const response = await fetch('/api/loginuser', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'content-type': 'application/json'
            }
        })
        const json = await response.json()

        if(!response.ok)
            {
                setError(json.error)
                console.log(error)
            }
            if(response.ok)
            {
                setUsername('')
                setPassword('')
                setError(null)
                console.log('login successful')
            }
    }

    return (
        <div className='mainDivSI'>
            <Header className='headerSU' />
            <div className='paneDivSI'>
                <div className='leftPaneSI'>
                    <div className='Welcomeback'>Welcome Back</div>
                    <form onSubmit={handleSubmit}>
                        <div className='inputAreaSI'>
                            <label className='inputBoxLabelSI'>Username<input size={25} className='inputBoxSI' type='text' placeholder='John Doe' name='usernameInput' onChange={(e) => setUsername(e.target.value)} value={username} required/></label>                      
                        </div>
                        <div className='inputAreaSI'>
                            <label className='inputBoxLabelSI'>Password<input size={25} className='inputBoxSI' type='password' placeholder='*****' name='passwordInput' onChange={(e) => setPassword(e.target.value)} value={password} required/></label>                      
                        </div>
                        <div className='inputAreaSI'>
                            <label className='inputBoxLabelSI'><input size={25} className='inputButtonSI' type='submit' value='LOG IN' name='submitSignup'/></label>                      
                        </div>
                    </form>
                </div>
                <div className='rightPaneSI'>
                    <div className='newHere'>NEW<br/>HERE?</div>
                    <Link to='/signup'><button className='signinNavSI' type='button'>SIGN UP</button></Link>
                </div>
            </div>
        </div>
    )
}

export default Signin