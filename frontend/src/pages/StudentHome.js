import { useLogout } from "../hooks/useLogout"

const StudentHome = () => {
    const {logout} = useLogout()

    const handleClick = () => {
        logout()
    }

    return (
        <div>
            <button onClick={handleClick}>click</button>
        </div>
    )
}

export default StudentHome