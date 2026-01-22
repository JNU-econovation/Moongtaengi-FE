import axios from "axios"
import { getTokenFromSession } from "../../utils/getTokenFromSession"
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface Params {
    processId: number;
    assigneeId: number;
    description: string;
}

const assignAssignmentApi = async ({ processId, assigneeId, description }: Params) => {
    const token = getTokenFromSession();

    await axios.post(import.meta.env.VITE_API_ASSIGN_ASSIGNMENT,
        {
            processId: processId,
            assigneeId: assigneeId,
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

export const useAssignAssignmentMutation = (processId: number) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: assignAssignmentApi,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['assignmentList', processId]})
            console.log('과제 할당 성공');
        },
        onError: (error) => {
            console.error(error);
        }
    })
}