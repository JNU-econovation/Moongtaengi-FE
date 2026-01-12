import axios from "axios";
import { getTokenFromSession } from "../../utils/getTokenFromSession";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface Params {
    studyId: string;
    processForm: string;
}

const createProcessApi = async ({studyId, processForm}: Params) => {
    const token = getTokenFromSession();
    
    await axios.post(`${import.meta.env.VITE_API_CREATE_STUDY}/${studyId}/processes/generate`,
        {
            additionalDescription: processForm
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": 'application/json'
            },
        },
    )
}

export const useCreateProcessMutation = (studyId: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createProcessApi,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['processInfo', studyId]})
            console.log("스터디 생성이 성공함");
        },
        onError: (error) => {
            console.log(error);
        }
    })
}