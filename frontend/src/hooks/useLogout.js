import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
    const {dispatch} = useAuthContext()

    const logout = () =>{
        localStorage.removeItem('user')
        localStorage.removeItem("selectedItem")

        dispatch({type: 'LOGOUT'})
    }

    return {logout}
}