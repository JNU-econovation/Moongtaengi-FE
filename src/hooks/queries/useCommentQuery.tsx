import axios from "axios"
import { getTokenFromSession } from "../../utils/getTokenFromSession"
import { useQuery } from "@tanstack/react-query";

interface DataType {
    commentId: number;
    nickname: string;
    profileImageUrl: string;
    content: string;
    createdAt: string;
    memberId: number;
    isMyComment: boolean;
}

const commentApi = async (submissionId: number): Promise<DataType[]> => {
    const token = getTokenFromSession();

    const response = await axios.get<DataType[]>(`${import.meta.env.VITE_API_ASSIGNMENT_COMMENT}/${submissionId}/comments`,
        {
            headers: { Authorization: `Bearer ${token}` }
        }
    )

    return response.data;
}

export const useCommentQuery = (submissionId: number) => {
    return useQuery({
        queryKey: ['comment'],
        queryFn: () => commentApi(submissionId),
        enabled: !!getTokenFromSession()
    })
}