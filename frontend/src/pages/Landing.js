import React from 'react'
import { Link } from "react-router-dom"

const Landing = () => {
    const [data, setData] = React.useState('');

    React.useEffect(() => {
        fetch("/api")
        .then((res) => res.json())
        .then((data) => setData(data.message));
    }, []);

    return (
        <div className="landing">
            <h2>{data}</h2>
            <h2><Link to='/signup'>Signup</Link></h2>
            <h2><Link to='/signin'>SignIn</Link></h2>
        </div>
    )
}

export default Landing