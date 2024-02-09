import React from 'react'
import logo from '../assets/AMC Logo Transparent.png'
import { Link } from "react-router-dom"

const Landing = () => 
{   
    return (
        <div className="landing">
            
            <div className="navBarLAN">
                <Link to='/'><img src={logo} className="logoLAN" alt='logoLAN' /></Link>
                <div className='myButtonLAN'>
                    <Link to='/signin' className='loginLAN'>LOG IN</Link>
                    <Link to='/signup'><button className='signupLAN' type='button'>SIGN UP</button></Link>
                </div>
            </div>
            
            <div className='paneDivLAN'>
                <div className='eventsHeaderLAN'>EVENTS</div>
                    <form className="eventsCarousel"  >EVENTS CAROUSEL
                    </form>
                
                <div className='teamHeaderLAN'>MEET THE TEAM</div>
                    <form className="teamCarousel"  >TEAM CAROUSEL
                    </form>                   
            </div>
        </div>
    )
}

export default Landing