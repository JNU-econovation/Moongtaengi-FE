import { useEffect } from "react";

export const useIslogin = (setIslogin: (login: boolean) => void) => {
    useEffect(() => {
        const token = sessionStorage.getItem('JWT');

        if (token) {
            setIslogin(true);
        }
    }, []);
}