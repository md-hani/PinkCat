import logo from '../assets/AMC Logo Transparent.png'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext';
import { React, useState, useEffect } from 'react';

const Header = () => {
    const [loading, setLoading] = useState(true)

  const user = useAuthContext()

  useEffect(() => {
    setLoading(false)
  }, [user])

    return (
        <nav>
            <a className='myLinkNav'href='/'><img className='logo' src={logo} alt="logo" /></a>
            <div className='headerLinks'>
                <a className='meetTeamHeaderLinkNav' href='/meetteam'>MEET THE TEAM</a>
            </div>
            {!loading ? (!user?.user ?
            <div className='myButtonLAN'>
                <Link to='/signin' className='loginLAN'>LOG IN</Link>
                <Link to='/signup'><button className='signupLAN' type='button'>SIGN UP</button></Link>
            </div> :
            <div className='showUsernameNAV'>
                Signed in as: {user?.user?.username}
            </div>): null}
        </nav>
    )
}

export default Header