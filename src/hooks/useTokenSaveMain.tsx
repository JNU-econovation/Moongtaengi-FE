import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export const useTokenSaveMain = (setIslogin: (login: boolean) => void) => {
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const token = searchParams.get('token');

        if (token) {
            sessionStorage.setItem('JWT', token);
            setIslogin(true);
        }
    }, [searchParams]);
}