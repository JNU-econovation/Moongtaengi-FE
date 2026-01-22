import axios from "axios"
import { getTokenFromSession } from "../../utils/getTokenFromSession"
import { useMutation, useQueryClient} from "@tanstack/react-query";

interface Params {
    submissionId: number;
    emojiType: "HEART" | "CLAP" | "SURPRISED" | "SAD" | "EYES_HEART";
}

const emojiApi = async ({submissionId, emojiType}: Params) => {
    const token = getTokenFromSession();

    await axios.post(`${import.meta.env.VITE_API_EMOJI}/${submissionId}/reactions`,
        {
            emojiType: emojiType
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": 'application/json'
            },
        },
    )
}

export const useEmojiMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: emojiApi,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['comment']});
            console.log('과제 제출 성공');
        },
        onError: (error) => {
            console.error(error);
        }
    })
}