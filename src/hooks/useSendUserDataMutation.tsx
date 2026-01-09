import { useMutation } from "@tanstack/react-query"
import axios from "axios";
import { getTokenFromSession } from "../utils/getTokenFromSession";

interface UserInfo {
    nickname: string;
    inviteCode?: string;
}

const sendUserDataApi = async (userInfo: UserInfo) => {
    const token = getTokenFromSession();
    axios.post(import.meta.env.VITE_API_REGISTRATION,
        userInfo,
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