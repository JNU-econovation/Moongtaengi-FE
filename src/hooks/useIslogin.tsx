import { getTokenFromSession } from "../utils/getTokenFromSession";

export const useIslogin = () => {
    const Islogin = (setIslogin: (login: boolean) => void) => {        
        const token = getTokenFromSession();

        if (token) {
            setIslogin(true);
        }
    }

    return { Islogin };
}