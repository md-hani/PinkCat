import logo from '../assets/AMC Logo Transparent.png'
import { Link } from "react-router-dom"

const Header = () => {
    return (
        <nav>
            <div className="logo">
                <Link to='/'><img src={logo} alt="logo" /></Link>
            </div>
        </nav>
    )
}

export default Header