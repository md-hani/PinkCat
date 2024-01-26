import Header from '../components/Header'
import SplitPane from 'react-split-pane'
import { Link } from "react-router-dom"

const Signup = () => {
    return (
        <div>
            <Header />
            <SplitPane className='mypane' split='vertical' minSize='68%' defaultSize='68%' maxSize='68%'>
                <div className='leftPane'>
                    <div className='Welcometoamc'>Welcome To AMC</div>
                    <form>
                        <div className='inputArea'>
                            <label className='inputBoxLabel'>Name<input size={32} className='inputBox' type='text' placeholder='John Doe' name='nameInput' required/></label>                      
                        </div>
                        <div className='inputArea'>
                            <label className='inputBoxLabel'>Email Address<input size={32} className='inputBox' type='email' placeholder='Jdoe@mail.com' name='emailInput' required/></label>                      
                        </div>
                        <div className='inputArea'>
                            <label className='inputBoxLabel'>Username<input size={32} className='inputBox' type='text' placeholder='Jdoe12' name='usernameInput' required/></label>                      
                        </div>
                        <div className='inputArea'>
                            <label className='inputBoxLabel'>Password<input size={32} className='inputBox' type='password' placeholder='*****' name='passwordInput' required/></label>                      
                        </div>
                        <div className='inputArea'>
                            <label className='inputBoxLabel'>Confirm Password<input size={32} className='inputBox' type='password' placeholder='*****' name='confPassInput' required/></label>                      
                        </div>
                        <div className='inputArea'>
                            <label className='inputBoxLabel'><input size={32} className='inputButton' type='submit' value='SIGN UP' name='submitSignup'/></label>                      
                        </div>
                    </form>
                </div>
                <div className='rightPane'>
                    <div className='alreadyMember'>ALREADY A MEMBER?</div>
                    <Link to='/signin'><button className='signinNav' type='button'>LOG IN</button></Link>
                </div>
            </SplitPane>
        </div>
    )
}

export default Signup