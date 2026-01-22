import axios from "axios"
import { getTokenFromSession } from "../../utils/getTokenFromSession"
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface Params {
    assignmentId: number;
    content: string;
    fileName: string;
    fileUrl: string;
}

const sendAssignmentApi = async ({ assignmentId, content, fileName, fileUrl }: Params) => {
    const token = getTokenFromSession();

    await axios.post(import.meta.env.VITE_API_ASSIGNMENT_SUBMIT,
        {
            assignmentId: assignmentId,
            content: content,
            fileName: fileName,
            fileUrl: fileUrl
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": 'application/json'
            },
        },
    )
}

export const useSendAssignmentMutation = (assignmentId: number) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: sendAssignmentApi,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['assignment', assignmentId]})
            console.log('과제 제출 성공');
        },
        onError: (error) => {
            console.error(error);
        }
    })
}