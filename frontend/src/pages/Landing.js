import React from 'react'
import { Link } from "react-router-dom"
import Header from '../components/Header'

const Landing = () => 
{   
    return (
        <div className="landing">

            <Header></Header>

            <div className='paneDivLAN'>
                <div className='eventsHeaderLAN'>EVENTS</div>
                    <form className="eventsCarousel"  >EVENTS CAROUSEL
                    </form>
                <Link to= '/meetteam ' className='teamHeaderLAN'>MEET THE TEAM</Link>
                    <form className="teamCarousel"  >TEAM CAROUSEL
                    </form>
            </div>
        </div>
    )
}

export default Landing