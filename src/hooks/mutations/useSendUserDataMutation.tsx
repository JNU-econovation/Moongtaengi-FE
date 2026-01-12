import { useMutation } from "@tanstack/react-query"
import axios from "axios";
import { getTokenFromSession } from "../../utils/getTokenFromSession";

const sendUserDataApi = async (userInfo: string) => {
    const token = getTokenFromSession();
    await axios.post(import.meta.env.VITE_API_REGISTRATION,
        {
            nickname: userInfo
        },
        {
            headers: { Authorization: `Bearer ${token}` },
        }
    )
}

export const useSendUserDataMutation = () => {
    return useMutation({
        mutationFn: sendUserDataApi,
    })
}