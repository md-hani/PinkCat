import Header from '../components/Header'
import React from 'react'
import { Link } from "react-router-dom"

const Signup = () => {
    const [name, setName] = React.useState('');
    const [username, setUsername] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confpass, setConfpass] = React.useState('');
    const [error, setError] = React.useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault()

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
                //console.log(error)
            }
            if(response.ok)
            {
                setName('')
                setEmail('')
                setUsername('')
                setPassword('')
                setConfpass('')
                setError('New user created')
                //console.log('new user created')
            }
        }
        else{
            setError('Password does not match')
            //console.log(error)
        }
    }

    React.useEffect(() => {
        if(error!=null)
        {
            alert(error)
            setError(null)
        }
    }, [error])

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