import { useMutation, useQueryClient } from "@tanstack/react-query"
import { getTokenFromSession } from "../../utils/getTokenFromSession"
import axios from "axios";

interface Params {
    studyId: string;
    studyData: {
        name: string;
        topic: string;
        startDate: string;
        endDate: string;
    };
}

const updateStudyApi = async ({ studyId, studyData }: Params) => {
    const token = getTokenFromSession();
    await axios.patch(`${import.meta.env.VITE_API_CREATE_STUDY}/${studyId}`,
        studyData,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": 'application/json'
            },
        }
    )
}

export const useUpdateStudyMutation = (studyId: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateStudyApi,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['studyInfo', studyId]});
            queryClient.invalidateQueries({queryKey: ['operatingStudyList']});
            console.log("스터디 업데이트가 성공함");
        },
        onError: (error) => {
            console.error(error)
            
        }
    })
}