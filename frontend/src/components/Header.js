import logo from '../assets/AMC Logo Transparent.png'

const Header = () => {
    return (
        <nav>
            <div className="logo">
                <img src={logo} alt="logo" />
            </div>
        </nav>
    )
}

export default Header