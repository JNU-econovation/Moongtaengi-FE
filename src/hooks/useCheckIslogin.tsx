import { useEffect, useState } from "react";
import { getTokenFromSession } from "../utils/getTokenFromSession";

export const useCheckIsLogin = () => {
    const [islogin, setIslogin] = useState<boolean>(!!sessionStorage.getItem('JWT'));

    useEffect(() => {
        const token = getTokenFromSession();
        if (token) setIslogin(true)
    }, []);

    return { islogin, setIslogin };
}