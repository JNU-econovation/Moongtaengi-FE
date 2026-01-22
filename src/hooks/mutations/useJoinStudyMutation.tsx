import { useMutation } from "@tanstack/react-query"
import { getTokenFromSession } from "../../utils/getTokenFromSession";
import axios from "axios";

interface JoinData {
    codeType: 'STUDY' | 'ECONO' | 'SPECIAL';
    message: string;
}

const joinStudyApi = async (formData: string): Promise<JoinData> => {
    const token = getTokenFromSession();

    const response = await axios.post<JoinData>(import.meta.env.VITE_API_JOIN_STUDY,
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

    return response.data;
}

export const useJoinStudyMutation = () => {

    return useMutation({
        mutationFn: joinStudyApi,
    })
}