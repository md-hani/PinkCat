import logo from '../assets/AMC Logo Transparent.png'

const Header = () => {
    return (
        <nav>
            <a className='myLinkNav'href='/'><img className='logo' src={logo} alt="logo" /></a>
        </nav>
    )
}

export default Header