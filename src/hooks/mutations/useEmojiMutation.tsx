import axios from "axios"
import { getTokenFromSession } from "../../utils/getTokenFromSession"
import { useMutation} from "@tanstack/react-query";

const emojiApi = async (emojiType: "HEART" | "CLAP" | "SURPRISED" | "SAD" | "EYES_HEART") => {
    const token = getTokenFromSession();

    await axios.post(`${import.meta.env.VITE_API_EMOJI}/${emojiType}/reactions`,
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

    return useMutation({
        mutationFn: emojiApi,
        onSuccess: () => {
            console.log('과제 제출 성공');
        },
        onError: (error) => {
            console.error(error);
        }
    })
}