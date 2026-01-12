import { useMutation } from "@tanstack/react-query"
import { getTokenFromSession } from "../../utils/getTokenFromSession";
import axios from "axios";

const joinStudyApi = async (formData: string) => {
    const token = getTokenFromSession();
    await axios.post(import.meta.env.VITE_API_JOIN_STUDY,
        {
            inviteCode: formData
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": 'application/json',
            },
        }
    )
}

export const useJoinStudyMutation = () => {
    return useMutation({
        mutationFn: joinStudyApi,
    })
}