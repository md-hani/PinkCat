import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const {dispatch} =useAuthContext()

    const login = async (username, password) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch('/api/loginuser', {
            method: 'POST',
            body: JSON.stringify({username, password}),
            headers: {
                'content-type': 'application/json'
            }
        })
        const json = await response.json()

        if(!response.ok)
        {
            setIsLoading(false)
            setError(json.error)
        }
        if(response.ok)
        {
            localStorage.setItem('user', JSON.stringify(json))

            dispatch({type: 'LOGIN', payload: json})

            setIsLoading(false)
            if(json.priv === "Staff")
            {
                window.location.href='/home'
            }
            else{
                window.location.href='/calendar'
            }
        }
    }

    return({login, isLoading, error, setError})
}