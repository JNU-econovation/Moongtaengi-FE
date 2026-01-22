import axios from "axios"
import { getTokenFromSession } from "../../utils/getTokenFromSession"
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface Params {
    assignmentId: number;
    description: string;
}

const updateAssignmentApi = async ({ assignmentId, description }: Params) => {
    const token = getTokenFromSession();

    await axios.patch(`${import.meta.env.VITE_API_UPDATE_ASSIGNMENT}/${assignmentId}`,
        {
            description: description
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": 'application/json'
            },
        },
    )
}

export const useUpdateAssignmentMutation = (processId: number) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateAssignmentApi,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['assignmentList', processId]})
            console.log('과제 수정 성공');
        },
        onError: (error) => {
            console.error(error);
        }
    })
}