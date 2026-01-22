import { useMutation, useQueryClient } from "@tanstack/react-query"
import { getTokenFromSession } from "../../utils/getTokenFromSession"
import axios from "axios";

const updateProcessApi = async (assignmentId: number) => {
    const token = getTokenFromSession();
    await axios.post(`${import.meta.env.VITE_API_APPROVE_ASSIGNMENT}/${assignmentId}/approve`, 
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    )
}

export const useApproveAssignmentMutation = (processId: number) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateProcessApi,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['assignmentList', processId] });
            console.log("과제 승인 성공");
        },
        onError: (error) => {
            console.error(error);
        }
    })
}