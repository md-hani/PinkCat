import { Link } from "react-router-dom"

const Landing = () => {
    return (
        <div className="landing">
            <h2>Landing</h2>
            <h2><Link to='/signup'>Signup</Link></h2>
            <h2><Link to='/signin'>SignIn</Link></h2>
        </div>
    )
}

export default Landing