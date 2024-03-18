import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const {dispatch} =useAuthContext()

    const signup = async (name, email, username, password, priv) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch('/api/createuser', {
            method: 'POST',
            body: JSON.stringify({name, email, username, password, priv}),
            headers: {
                'content-type': 'application/json'
            }
        })
        const json = await response.json()

        if(!response.ok){
            setIsLoading(false)
            setError(json.error)
        }
        if(response.ok){
            localStorage.setItem('user', JSON.stringify(json))

            dispatch({type: 'LOGIN', payload: json})

            setIsLoading(false)

            window.location.href='/home'
        }
    }

    return({signup, isLoading, error, setError})
}