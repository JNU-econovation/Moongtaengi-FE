import axios from "axios"
import { getTokenFromSession } from "../../utils/getTokenFromSession"
import { useQuery } from "@tanstack/react-query";

interface DataType {
    assignmentId: number | null;
    submissionId: number | null;
    memberId: number;
    nickname: string;
    assignmentDescription: string;
    fileName: string;
    fileUrl: string;
    status: 'WAITING' | 'SUBMITTED' | 'APPROVED' | null;
    isLate: boolean;
    profileIconUrl: string;
}

const assignmentListApi = async (processId: number): Promise<DataType[]> => {
    const token = getTokenFromSession();

    const response = await axios.get<DataType[]>(import.meta.env.VITE_API_ASSIGNMENT_LIST,
        {
            headers: { Authorization: `Bearer ${token}` },
            params: { processId: processId }
        }
    )

    return response.data;
}

export const useAssignmentListQuery = (processId: number) => {
    return useQuery({
        queryKey: ['assignmentList', processId],
        queryFn: () => assignmentListApi(processId),
        enabled: !!getTokenFromSession()
    })
}