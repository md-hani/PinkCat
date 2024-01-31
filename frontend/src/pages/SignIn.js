import Header from '../components/Header'
import { Link } from "react-router-dom"
import React from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { ToastContainer, toast } from 'react-toastify';

const Signin = () => {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState(null);
    const [modalOpen, setModalOpen] = React.useState(false)
    const [email, setEmail] = React.useState('');

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
            setError('Login successful!')
        }
    }

    React.useEffect(() => {
        if(error != null)
        {
            toast.error(error, {position: "bottom-left"});
            setError(null)
        }
    }, [error])

    const handleClick = () => {
        setModalOpen(true)
    }

    const handleClose = () => {
        setModalOpen(false)
        setEmail(null)
    }

    const handleModalSubmit = () => {
        if(email != null)
        {
            setError(`Email sent to ${email}`)
            setEmail(null)
        }
        setModalOpen(false)
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
                            <label className='inputBoxLabelSI'>Password<input size={25} className='inputBoxSI' type='password' placeholder='*****' name='passwordInput' onChange={(e) => setPassword(e.target.value)} value={password} required/></label>                      
                        </div>
                        <div className='forgotPassSI'>
                            <span className='forgotPassLink' onClick={handleClick}>Forgot your password?</span>
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
            <ToastContainer/>
        </div>
        </>
    )
}

export default Signin