import logo from '../assets/AMC Logo Transparent.png'

const Header = () => {
    return (
        <header>
            <div className="logo">
                <img src={logo} alt="logo" />
            </div>
        </header>
    )
}

export default Header