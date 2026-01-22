import axios from "axios"
import { getTokenFromSession } from "../../utils/getTokenFromSession"
import { useMutation } from "@tanstack/react-query";

interface Params{
    submissionId: number;
    commentInput: string;
}

const sendAssignmentApi = async ({submissionId, commentInput}: Params) => {
    const token = getTokenFromSession();

    await axios.post(`${import.meta.env.VITE_API_ASSIGNMENT_COMMENT}/${submissionId}/comments`,
        {
            content: commentInput
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": 'application/json'
            },
        },
    )
}

export const useSendCommentMutation = () => {

    return useMutation({
        mutationFn: sendAssignmentApi,
    })
}