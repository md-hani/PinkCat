import Header from '../components/Header'
import React from 'react'
import { Link } from "react-router-dom"
import { toast } from 'react-toastify';
import validator from 'validator'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useSignup } from '../hooks/useSignup';

const Signup = () => {
    const [name, setName] = React.useState('');
    const [username, setUsername] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [access, setAccess] = React.useState('');
    const [confpass, setConfpass] = React.useState('');
    const [disabled, setDisabled] = React.useState(false);
    const [checked, setChecked] = React.useState(false)
    const [modalOpen, setModalOpen] = React.useState(false)
    const {signup, isLoading, error, setError} = useSignup()

    const validate = (value) => {
        if (validator.isStrongPassword(value, {
            minLength: 8, minLowercase: 1,
            minUppercase: 1, minNumbers: 1, minSymbols: 1
        })) {
            setPassword(value)
            return true
        } else {
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
                if(checked)
                {
                    var priv = "Staff"
                }
                else{
                    priv = "Student"
                }

                await signup(name, email, username, password, priv)
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
    }, [error, setError])

    const handleClose = () => {
        setModalOpen(false)
        setChecked(!checked)
        setAccess('')
    }

    const handleModalSubmit = () => {
        if(access === 'HaHwm')
        {
            setChecked(true)
            setDisabled(true)
            setModalOpen(false)
        }
        else
        {
            setAccess('')
            toast.error('Invalid Access Code', {position: 'bottom-right'})
        }
    }

    const handleCheck= (e) => {
        if (e.target.checked)
        {
            setModalOpen(true)
            setChecked(e.target.checked)
        }
    }

    return (
        <>
        <Modal show={modalOpen} onHide={handleClose} centered>
            <Modal.Header closeButton className='modalTitleTextSI'>
                <Modal.Title className=''>Staff Sign Up</Modal.Title>
            </Modal.Header>

            <Modal.Body className='modalBodySI'>
                <label className='modalInputBoxLabelSI'>Enter your access code<input size={20} className='modalInputBoxSI' type='text' onChange={(e) => setAccess(e.target.value)} value={access} required/></label>
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
                        <div className='checkboxDiv'>
                            <label className='checkboxLabel'><input size={25} className='myCheckbox' type='checkbox' checked={checked} disabled={disabled} onChange={handleCheck}/> Are you a staff member?</label>
                        </div>
                        <div className='inputArea'>
                            <label className='inputBoxLabel'><input disabled={isLoading} size={25} className='inputButton' type='submit' value='SIGN UP' name='submitSignup'/></label>
                        </div>
                    </form>
                </div>
                <div className='rightPane'>
                    <div className='alreadyMember'>ALREADY A<br/>MEMBER?</div>
                    <Link to='/signin'><button className='signinNav' type='button'>LOG IN</button></Link>
                </div>
            </div>
        </div>
        </>
    )
}

export default Signup