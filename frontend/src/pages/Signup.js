import Header from '../components/Header'
import React from 'react'
import { Link } from "react-router-dom"
import { toast } from 'react-toastify';
import validator from 'validator'

const Signup = () => {
    const [name, setName] = React.useState('');
    const [username, setUsername] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confpass, setConfpass] = React.useState('');
    const [error, setError] = React.useState(null);
    const [success, setSuccess] = React.useState(null)

    const validate = (value) => {
        if (validator.isStrongPassword(value, {
            minLength: 8, minLowercase: 1,
            minUppercase: 1, minNumbers: 1, minSymbols: 1
        })) {
            setSuccess('Strong Password')
            setPassword(value)
            return true
        } else {
            //setError('Password requires:\nAt least 8 characters\nAt least 1 lowercase\nAt least 1 uppercase\nAt least 1 number\nAt least 1 special character')
            toast.error(<div>
                <p>Password requires:</p>
                <ul>
                    <li>At least 8 characters</li>
                    <li>At least 1 lowercase</li>
                    <li>At least 1 uppercase</li>
                    <li>At least 1 number</li>
                    <li>At least 1 special character</li>
                </ul>
            </div>, {position: "bottom-right"})
            return false
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if(validate(password))
        {
            if(password === confpass)
            {
                const user = {name, email, username, password}

                const response = await fetch('/api/createuser', {
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
                }
                if(response.ok)
                {
                    setName('')
                    setEmail('')
                    setUsername('')
                    setPassword('')
                    setConfpass('')
                    setSuccess('New user created')
                }
            }
            else
            {
                setError('Passwords do not match')
            }
        }
    }

    React.useEffect(() => {
        if(error!=null)
        {
            toast.error(error, {position:"bottom-right"})
            setError(null)
        }
        if(success!=null && success==="New user created")
        {
            //toast.success(success, {position:"bottom-left"})
            setSuccess(null)
            window.location.href='/signin?hello=1'
        }
    }, [error, success])

    return (
        <div className='mainDivSU'>
            <Header className='headerSU' />
            <div className='paneDiv'>
                <div className='leftPane'>
                    <div className='Welcometoamc'>Welcome To AMC</div>
                    <form className='formSU' onSubmit={handleSubmit}>
                        <div className='inputArea'>
                            <label className='inputBoxLabel'>Name<input size={25} className='inputBox' type='text' placeholder='John Doe' name='nameInput' onChange={(e) => setName(e.target.value)} value={name} required/></label>
                        </div>
                        <div className='inputArea'>
                            <label className='inputBoxLabel'>Email Address<input size={25} className='inputBox' type='email' placeholder='Jdoe@mail.com' name='emailInput' onChange={(e) => setEmail(e.target.value)} value={email} required/></label>                      
                        </div>
                        <div className='inputArea'>
                            <label className='inputBoxLabel'>Username<input size={25} className='inputBox' type='text' placeholder='Jdoe12' name='usernameInput' onChange={(e) => setUsername(e.target.value)} value={username} required/></label>                      
                        </div>
                        <div className='inputArea'>
                            <label className='inputBoxLabel'>Password<input size={25} className='inputBox' type='password' placeholder='*****' name='passwordInput' onChange={(e) => setPassword(e.target.value)} value={password} required/></label>                      
                        </div>
                        <div className='inputArea'>
                            <label className='inputBoxLabel'>Confirm Password<input size={25} className='inputBox' type='password' placeholder='*****' name='confPassInput' onChange={(e) => setConfpass(e.target.value)} value={confpass} required/></label>                      
                        </div>
                        <div className='inputArea'>
                            <label className='inputBoxLabel'><input size={25} className='inputButton' type='submit' value='SIGN UP' name='submitSignup'/></label>
                        </div>
                    </form>
                </div>
                <div className='rightPane'>
                    <div className='alreadyMember'>ALREADY A<br/>MEMBER?</div>
                    <Link to='/signin'><button className='signinNav' type='button'>LOG IN</button></Link>
                </div>
            </div>
        </div>
    )
}

export default Signup