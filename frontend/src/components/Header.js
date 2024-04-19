import logo from '../assets/StMarys_AcademicMediaCenter_SideBySideLogo_White.png'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext';
import { React, useState, useEffect } from 'react';
import { useLogout } from '../hooks/useLogout';
import { useLocation } from 'react-router-dom';
import RoundedImage from 'react-rounded-image';
import settingsIcon from '../assets/settingsLogo.png'
import logoutIcon from '../assets/logoutIcon.png'

const Header = (props) => {
    const [loading, setLoading] = useState(true)
    const [isLoad, setIsLoad] = useState(false);
    const [currentUser, setCurrentUser] = useState('');
    const {logout} = useLogout()

    const user = useAuthContext()
    const location = useLocation().pathname;

    const fetchData = async (username) => {
        const response = await fetch('/api/getcurrentuser', {
            method: 'POST',
            body: JSON.stringify({username}),
            headers: {
                'content-type': 'application/json'
            }
        })
        const json = await response.json()
        setIsLoad(true)
        setCurrentUser(json)
    }


    useEffect(() => {
        fetchData(user?.user?.username)
        setLoading(false)
    }, [user, location])

    const handleLogOut = () =>{
        logout()
    }

    const handleProfileSettingsClick = () => {
        window.location.href = '/profileSettings'
    }

    function getImage(){
        const defPic = require('../assets/pINKcAT.jpg')
        try{
            const im = require(`../assets/${currentUser.picture}`)
            return im
        }catch(error){
            return defPic
        }
    }

    return (
        <>
            <nav>
                <a className='myLinkNav'href='/'><img className='logo' src={logo} alt="logo" /></a>
                {!loading ? user?.user ? !props.atDashboard ? 
                <div className='headerLinks'>
                    <a className='meetTeamHeaderLinkNav' href='/home'>DASHBOARD</a>
                    <a className='meetTeamHeaderLinkNav' href='/meetteam'>MEET THE TEAM</a>
                    <a className='meetTeamHeaderLinkNav' href='/services'>OUR SERVICES</a>
                </div> : 
                <div className='headerLinks'>
                    <a className='meetTeamHeaderLinkNav' href='/home'>HOME</a>
                    <a className='meetTeamHeaderLinkNav' href='/calendar'>CALENDAR</a>
                    <a className='meetTeamHeaderLinkNav' href='/inventory'>INVENTORY</a>
                    <div>
                        {props.isStaff === "Staff" ? 
                            <a className='meetTeamHeaderLinkNav' href='/analytics'>ANALYTICS</a> : null
                        }
                    </div>
                </div> :
                <div className='headerLinks'>
                    <a className='meetTeamHeaderLinkNav' href='/meetteam'>MEET THE TEAM</a>
                    <a className='meetTeamHeaderLinkNav' href='/services'>OUR SERVICES</a>
                </div>
                    : ''}
                {(!loading && isLoad) ? (!user?.user ?
                <div className='myButtonLAN'>
                    <Link to='/signin' className='loginLAN'>LOG IN</Link>
                    <Link to='/signup'><button className='signupLAN' type='button'>SIGN UP</button></Link>
                </div> :
                <div className='showUsernameNAV'>
                    <Link to='/'>
                        <div className='testRel'>
                            <RoundedImage imageWidth='65' imageHeight='65' roundedColor='#CDAD5D' roundedSize='7' image={getImage()}/>
                        </div>
                    </Link>
                    <div className='dropdownHeaderSelect'>
                        <li className='ProfilePicDropdownList'><button className='HeaderDropdownProfilePicButton' onClick={handleProfileSettingsClick}><img className='settingsIconStyle' src={settingsIcon} alt='Settings'/>Profile settings</button></li>
                        <li className='ProfilePicDropdownList'><button className='HeaderDropdownProfilePicButton' onClick={handleLogOut}><img className='settingsIconStyle' src={logoutIcon} alt='Log out'/>Log out</button></li>
                    </div>
                </div>): null}
            </nav>
        </>
    )
}

export default Header