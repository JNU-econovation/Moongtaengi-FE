import axios from "axios";
import { useGetTokenFromUrl } from "../useGetTokenFromUrl";
import { useMutation } from "@tanstack/react-query";

const checkCodeApi = async (code: string) => {
    const token = useGetTokenFromUrl();
    const { data } = await axios.get(import.meta.env.VITE_API_CHECK_NAME,
        {
            headers: { Authorization: `Bearer ${token}` },
            params: { nickname: code }
        }
    );
    return data;
}

export const useCheckCodeMutation = () => {
    return useMutation({
        mutationFn: checkCodeApi,
    })
}
