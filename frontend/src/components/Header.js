import logo from '../assets/StMarys_AcademicMediaCenter_SideBySideLogo_White.png'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext';
import { React, useState, useEffect } from 'react';
import { useLogout } from '../hooks/useLogout';

const Header = () => {
    const [loading, setLoading] = useState(true)
    const {logout} = useLogout()

    const user = useAuthContext()

    useEffect(() => {
        setLoading(false)
    }, [user])

    const handleLogOut = () =>{
        logout()
    }

    return (
        <nav>
            <a className='myLinkNav'href='/'><img className='logo' src={logo} alt="logo" /></a>
            {!loading ? (user?.user ? 
            <div className='headerLinks'>
                <a className='meetTeamHeaderLinkNav' href='/studenthome'>DASHBOARD</a>
                <a className='meetTeamHeaderLinkNav' href='/meetteam'>MEET THE TEAM</a>
                <a className='meetTeamHeaderLinkNav' href='/services'>OUR SERVICES</a>
            </div> : 
            <div className='headerLinks'>
                <a className='meetTeamHeaderLinkNav' href='/meetteam'>MEET THE TEAM</a>
                <a className='meetTeamHeaderLinkNav' href='/services'>OUR SERVICES</a>
            </div> 
                ) : ''}
            {!loading ? (!user?.user ?
            <div className='myButtonLAN'>
                <Link to='/signin' className='loginLAN'>LOG IN</Link>
                <Link to='/signup'><button className='signupLAN' type='button'>SIGN UP</button></Link>
            </div> :
            <div className='showUsernameNAV'>
                Signed in as: {user?.user?.username}
                <button className='logoutLAN' type='button' onClick={handleLogOut}>LOG OUT</button>
            </div>): null}
        </nav>
    )
}

export default Header