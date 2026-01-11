import { useMutation, useQueryClient } from "@tanstack/react-query"
import { getTokenFromSession } from "../utils/getTokenFromSession"
import axios from "axios";

interface Params {
    studyId: string;
    sortedProcessSubmitData: {
        id: number | null;
        title: string;
        startDate: string;
        endDate: string;
        memo: string;
        assignmentDescription: string;
    }[]
}

const updateProcessApi = async ({ studyId, sortedProcessSubmitData }: Params) => {
    const token = getTokenFromSession();
    await axios.post(`${import.meta.env.VITE_API_CREATE_STUDY}/${studyId}/processes/batch`,
        {
            processes: sortedProcessSubmitData
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": 'application/json'
            },
        }
    )
}

export const useUpdateProcessMutation = (studyId: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateProcessApi,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['processInfo', studyId] });
            console.log("프로세스 업데이트가 성공함");
        },
        onError: (error) => {
                console.error(error);
        }
    })
}