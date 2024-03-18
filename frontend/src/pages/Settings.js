import Header from "../components/Header";
import { useAuthContext } from "../hooks/useAuthContext";
import { useState } from "react";
import { useEffect } from "react";

const Settings = () => {
    const [currentUser, setCurrentUser] = useState('');
    const [isLoad, setIsLoad] = useState(false);

    const user = useAuthContext()

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
    }, [user])

    return(
        <div>
            {isLoad &&
            <Header atDashboard={true} isStaff={currentUser.priv}></Header>}
        </div>
    )
}

export default Settings