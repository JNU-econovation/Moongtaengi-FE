import axios from "axios"
import { getTokenFromSession } from "../../utils/getTokenFromSession"
import { useQuery } from "@tanstack/react-query";

interface DataType {
    studyId: number;
    studyName: string;
    submissionId: number | null;
    assignmentDescription: string;
    memberTitle: string;
    nickname: string;
    submitTime: string | null;
    isOwner: boolean;
}

const assignmentSingleGetApi = async (assignmentId: number): Promise<DataType> => {
    const token = getTokenFromSession();

    const response = await axios.get<DataType>(`${import.meta.env.VITE_API_ASSIGNMENT_SINGLE}/${assignmentId}`,
        {
            headers: { Authorization: `Bearer ${token}` }
        }
    )

    return response.data;
}

export const useAssignmentSingleQuery = (assignmentId: number) => {
    return useQuery({
        queryKey: ['assignment', assignmentId],
        queryFn: () => assignmentSingleGetApi(assignmentId),
        enabled: !!getTokenFromSession()
    })
}