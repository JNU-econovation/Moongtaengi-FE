import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { useGetTokenFromUrl } from "./useGetTokenFromUrl";

interface Data {
    nickname: string;
    isAvailable: boolean;
    message: string;
}

const checkNameApi = async (name: string): Promise<Data> => {
    const token = useGetTokenFromUrl();
    const { data } = await axios.get<Data>(import.meta.env.VITE_API_CHECK_NAME,
        {
            headers: { Authorization: `Bearer ${token}` },
            params: { nickname: name }
        }
    );
    return data;
}

export const useCheckNameMutation = () => {
    return useMutation({
        mutationFn: checkNameApi,
    })
}