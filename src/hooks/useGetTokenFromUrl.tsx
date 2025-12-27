import { useSearchParams } from "react-router-dom"

export const useGetTokenFromUrl = () => {
    const [searchParams] = useSearchParams();

    const token = searchParams.get('token');

    return token;
}