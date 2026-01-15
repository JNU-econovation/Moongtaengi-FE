import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { useGetTokenFromUrl } from "../useGetTokenFromUrl";

interface Data {
    nickname: string;
    isAvailable: boolean;
    message: string;
}

const checkNameApi = async (token: string, name: string): Promise<Data> => {

    const { data } = await axios.get<Data>(import.meta.env.VITE_API_CHECK_NAME,
        {
            headers: { Authorization: `Bearer ${token}` },
            params: { nickname: name }
        }
    );
    return data;
}

interface ApiError {
    message: string;
}

export const useCheckNameMutation = () => {
    const token = useGetTokenFromUrl();
    
    return useMutation<Data, ApiError, string>({
        mutationFn: (name) => {
            if (!token) {
                return Promise.reject(new Error("No token"));
            }
            return checkNameApi(token, name);
        },
    })
}