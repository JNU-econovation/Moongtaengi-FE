import axios from "axios";
import { getTokenFromSession } from "../utils/getTokenFromSession";
import { useMutation } from "@tanstack/react-query";

interface Params {
    studyId: string;
    recommendProcess: string;
}

const createProcessApi = async ({studyId, recommendProcess}: Params) => {
    const token = getTokenFromSession();
    await axios.post(`${import.meta.env.VITE_API_CREATE_STUDY}/${studyId}/processes/generate`,
        {
            additionalDescription: recommendProcess
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": 'application/json'
            },
        },
    )
}

export const useCreateProcessMutation = () => {
    return useMutation({
        mutationFn: createProcessApi,
        onSuccess: () => {
            console.log("스터디 생성이 성공함");
        },
        onError: (error) => {
            console.log(error);
        }
    })
}