import { useMutation } from "@tanstack/react-query"
import axios from "axios";
import { getTokenFromSession } from "../utils/getTokenFromSession";

interface UserInfo {
    nickname: string;
    inviteCode?: string;
}

const sendUserDataApi = async (userInfo: UserInfo) => {
    const token = getTokenFromSession();
    console.log("전송 데이터:", userInfo);
    axios.post(import.meta.env.VITE_API_REGISTRATION,
        userInfo,
        {
            headers: { Authorization: `Bearer ${token}` },
        }
    )
}

export const useSendUserDataApi = () => {
    return useMutation({
        mutationFn: sendUserDataApi,
    })
}