import axios from "axios";
import { useMutation } from "@tanstack/react-query";

interface CheckNameParams {
    token: string | null;
    name: string;
}

interface Data {
    nickname: string;
    isAvailable: boolean;
    message: string;
}

const fetchCheckName = async ({ token, name }: CheckNameParams) => {
    const { data } = await axios.get<Data>(import.meta.env.VITE_API_CHECK_NAME,
        {
            headers: { Authorization: `Bearer ${token}` },
            params: { nickname: name }
        }
    );
    return data;
}

export const useCheckNamePolicy = () => {
    return useMutation({
        mutationFn: fetchCheckName,
        onError: (error) => {
            console.error(error);
        }
    })
}