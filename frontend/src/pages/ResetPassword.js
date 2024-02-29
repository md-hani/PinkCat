import { useState } from 'react'
import logo from '../assets/StMarys_AcademicMediaCenter_SideBySideLogo_White.png'
import validator from 'validator'
import { toast } from 'react-toastify';

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState('')
    const [confirmNewPassword, setConfirmNewPassword] = useState('')
    const [username, setUsername] = useState('')
    const [flag, setFlag] = useState(true)

    if(flag){
        const authResult = new URLSearchParams(window.location.search); 
        setUsername(authResult.get('uid'))
        setFlag(false)
    }

    const validate = (value) => {
        if (validator.isStrongPassword(value, {
            minLength: 8, minLowercase: 1,
            minUppercase: 1, minNumbers: 1, minSymbols: 1
        })) {
            setNewPassword(value)
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

        if(validate(newPassword))
        {
            if(newPassword === confirmNewPassword)
            {
                console.log(newPassword)
                const response = await fetch('/api/resetPasswordPoint', {
                    method: 'POST',
                    body: JSON.stringify({newPassword, username}),
                    headers: {
                        'content-type': 'application/json'
                    }
                })
                const json = await response.json()
                if(response.ok){
                    toast.success('Password reset Successfully', {position: "bottom-right"})
                    setNewPassword('')
                    setConfirmNewPassword('')
                }
                else{
                    console.log(json)
                }
            }
            else
            {
                toast.error('Passwords do not match', {position: "bottom-right"})
            }
        }
    }

    return (
        <div className='resetPasswordWrap'>
            <nav>
                <a className='myLinkNav'href='/'><img className='logo' src={logo} alt="logo" /></a>
            </nav>
            <div className='resetPasswordPageContent'>
                <div className='InputFieldWrapResetPassword'>
                    <span className='ResetPasswordText'>RESET PASSWORD</span>
                    <form onSubmit={handleSubmit}>
                        <div className='inputAreaResetPassword'>
                            <label className='inputBoxLabelResetPassword'>New Password<input size={25} className='inputBoxResetPassword' type='password' placeholder='*****' onChange={(e) => setNewPassword(e.target.value)} value={newPassword} required/></label>                      
                        </div>
                        <div className='inputAreaResetPassword'>
                            <label className='inputBoxLabelResetPassword'>Confirm new Password<input size={25} className='inputBoxResetPassword' type='password' placeholder='*****' onChange={(e) => setConfirmNewPassword(e.target.value)} value={confirmNewPassword} required /></label>
                        </div>
                        <div className='inputAreaResetPassword'>
                            <label className='inputBoxLabelResetPassword'><input size={25} className='inputButtonResetPassword' type='submit' value='SUBMIT' /></label>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ResetPassword