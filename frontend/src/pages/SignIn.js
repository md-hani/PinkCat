import Header from '../components/Header'
import { Link } from "react-router-dom"
import React from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';
import { useLogin } from '../hooks/useLogin';
import eyeImage from '../assets/eye-regular.svg'
import crossEyeImage from '../assets/eye-slash-regular.svg'

const Signin = () => {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [modalOpen, setModalOpen] = React.useState(false)
    const [email, setEmail] = React.useState('');
    const [success, setSuccess] = React.useState(null)
    const {login, isLoading, error, setError} = useLogin()
    const [eyeValue, setEyeValue] = React.useState('password')

    const findEmail = async () => {
        const response = await fetch('/api/findemail', {
            method: 'POST',
            body: JSON.stringify({email}),
            headers: {
                'content-type': 'application/json'
            }
        })
        const json = await response.json()

        if(!response.ok)
        {
            setError(json.error)
            console.log(error)
            return false
        }
        if(response.ok)
        {
            if(json)
            {
                return true
            }
            else
            {
                return false
            }
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        await login(username, password)
    }

    React.useEffect(() => {
        if(error != null)
        {
            toast.error(error, {position: "bottom-left"});
            setError(null)
        }
        if(success != null)
        {
            toast.success(success, {position: "bottom-left"});
            setSuccess(null)
        }
    }, [error, success, setError])

    const handleClick = () => {
        setModalOpen(true)
    }

    const handleClose = () => {
        setModalOpen(false)
        setEmail(null)
    }

    const handleModalSubmit = async () => {
        if(await findEmail())
        {
            const response = await fetch('/api/send', {
                method: 'POST',
            body: JSON.stringify({email}),
            headers: {
                'content-type': 'application/json'
            }
            })
            const json = await response.json()
            if(response.ok)
            {
                console.log(json)
                setSuccess(`Email sent to ${email}`)
                setEmail(null)
                setModalOpen(false)
            }
        }
        else
        {
            toast.error('Email not found', {position: 'bottom-left'})
        }
    }

    const handleEyeClick = () => {
        if(eyeValue === 'password'){
            setEyeValue('text')
        }
        else if(eyeValue === 'text'){
            setEyeValue('password')
        }
    }

    return (
        <>
        <Modal show={modalOpen} onHide={handleClose} centered>
            <Modal.Header closeButton className='modalTitleTextSI'>
                <Modal.Title className=''>Password Reset</Modal.Title>
            </Modal.Header>

            <Modal.Body className='modalBodySI'>
                <label className='modalInputBoxLabelSI'>Enter your Email<input size={20} className='modalInputBoxSI' type='email' placeholder='JDoe12@mail.com' name='emailInput' onChange={(e) => setEmail(e.target.value)} value={email} required/></label>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleModalSubmit}>
                    Submit
                </Button>
            </Modal.Footer>
        </Modal>
        <div className='mainDivSI'>
            <Header className='headerSU' />
            <div className='paneDivSI'>
                <div className='leftPaneSI'>
                    <div className='Welcomeback'>Welcome Back</div>
                    <form onSubmit={handleSubmit}>
                        <div className='inputAreaSI'>
                            <label className='inputBoxLabelSI'>Username<input size={25} className='inputBoxSI' type='text' placeholder='JDoe12' name='usernameInput' onChange={(e) => setUsername(e.target.value)} value={username} required/></label>                      
                        </div>
                        <div className='inputAreaSI'>
                            <label className='inputBoxLabelSI'>Password<input size={25} className='inputBoxSI' type={eyeValue} placeholder='*****' name='passwordInput' onChange={(e) => setPassword(e.target.value)} value={password} required /></label>
                            <img className='SeePasswordImg' src={eyeValue === 'password' ? eyeImage : crossEyeImage} alt='See Password' onClick={handleEyeClick}/>
                        </div>
                        <div className='forgotPassSI'>
                            <span className='forgotPassLink' onClick={handleClick}>Forgot your password?</span>
                        </div>
                        <div className='inputAreaSI'>
                            <label className='inputBoxLabelSI'><input disabled={isLoading} size={25} className='inputButtonSI' type='submit' value='LOG IN' name='submitSignup'/></label>
                        </div>
                    </form>
                </div>
                <div className='rightPaneSI'>
                    <div className='newHere'>NEW<br/>HERE?</div>
                    <Link to='/signup'><button className='signinNavSI' type='button'>SIGN UP</button></Link>
                </div>
            </div>
        </div>
        </>
    )
}

export default Signin