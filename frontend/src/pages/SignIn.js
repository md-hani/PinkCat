import Header from '../components/Header'
import { Link } from "react-router-dom"

const Signin = () => {
    return (
        <div className='mainDivSI'>
            <Header className='headerSU' />
            <div className='paneDivSI'>
                <div className='leftPaneSI'>
                    <div className='Welcomeback'>Welcome Back</div>
                    <form>
                        <div className='inputAreaSI'>
                            <label className='inputBoxLabelSI'>Name<input size={25} className='inputBoxSI' type='text' placeholder='John Doe' name='nameInput' required/></label>                      
                        </div>
                        <div className='inputAreaSI'>
                            <label className='inputBoxLabelSI'>Password<input size={25} className='inputBoxSI' type='password' placeholder='*****' name='nameInput' required/></label>                      
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