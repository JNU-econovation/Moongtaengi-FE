import { useGetTokenFromUrl } from "./useGetTokenFromUrl";

export const useSaveToken = () => {
    const token = useGetTokenFromUrl();

    const saveToken = () => {
        if (token) {
            sessionStorage.setItem('JWT', token);
        }
    }

    return { saveToken };
}