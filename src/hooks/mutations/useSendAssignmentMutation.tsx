import axios from "axios"
import { getTokenFromSession } from "../../utils/getTokenFromSession"
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface Params {
    assignmentId: number;
    content: string;
    fileName: string;
    fileUrl: string;
}

const sendAssignmentPostApi = async ({ assignmentId, content, fileName, fileUrl }: Params) => {
    const token = getTokenFromSession();

    await axios.post(import.meta.env.VITE_API_SUBMIT_ASSIGNMENT,
        {
            assignmentId,
            content,
            fileName,
            fileUrl
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": 'application/json'
            },
        },
    )
}

const sendAssignmentPatchApi = async (params: Params, submissionId: number) => {
    const token = getTokenFromSession();
    
    const { content, fileName, fileUrl } = params;

    await axios.patch(`${import.meta.env.VITE_API_SUBMIT_ASSIGNMENT}/${submissionId}`,
        {
            content,
            fileName: fileName || null,
            fileUrl: fileUrl || null
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": 'application/json'
            },
        },
    )
}

export const useSendAssignmentMutation = (submissionId: number | null, assignmentId: number) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (params: Params) => {
            // 훅의 인자로 받은 submissionId가 존재하면 수정(PATCH), 없으면 생성(POST)
            if (submissionId) {
                return sendAssignmentPatchApi(params, submissionId);
            } else {
                return sendAssignmentPostApi(params);
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['assignment', assignmentId] });
            alert('과제 제출 성공');
            console.log('과제 제출 성공');
        },
        onError: (error) => {
            console.error(error);
            alert('과제 제출 실패');
        }
    });
};