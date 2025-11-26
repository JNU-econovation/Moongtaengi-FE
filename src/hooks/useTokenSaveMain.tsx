import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useTokenSaveMain = (setIslogin: (login: boolean) => void, searchParams: URLSearchParams) => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = searchParams.get('token');

        if (token) {
            sessionStorage.setItem('JWT', token);
            setIslogin(true);
        }
    }, [searchParams]);
}