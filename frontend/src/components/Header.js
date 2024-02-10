import logo from '../assets/AMC Logo Transparent.png'

const Header = () => {
    return (
        <nav>
            <a className='myLinkNav'href='/'><img className='logo' src={logo} alt="logo" /></a>
            <div className='headerLinks'>
                <a className='meetTeamHeaderLinkNav' href='/meetteam'>MEET THE TEAM</a>
            </div>
        </nav>
    )
}

export default Header