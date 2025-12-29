import { useNavigate } from "react-router-dom"
import { useSaveToken } from "../hooks/useSaveToken";
import { useEffect } from "react";

export const AuthCallback = () => {
    const navigate = useNavigate();
    const {saveToken} = useSaveToken();

    useEffect(() => {
        saveToken();
        navigate('/tempMain', {replace: true});
    }, [])
        
    return (
        <span>로그인 중...</span>
    )
}