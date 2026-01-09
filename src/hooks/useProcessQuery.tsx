import axios from "axios";
import { getTokenFromSession } from "../utils/getTokenFromSession";
import { useQuery } from "@tanstack/react-query";

interface ProcessItem {
  id: number;
  processOrder: number;
  title: string;
  startDate: string;
  endDate: string;
  durationDays: number;
  memo: string;
  assignmentDescription: string;
  status: 'COMPLETED' | 'IN_PROGRESS' | 'NOT_STARTED';
}

const getProcessApi = async (studyId: string) => {
    const token = getTokenFromSession();

    const response = await axios.get(`${import.meta.env.VITE_API_CREATE_STUDY}/${studyId}/processes`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        },
    )

    return response.data;
}

export const useProcessQuery = (studyId: string) => {
    return useQuery<ProcessItem[]>({
        queryKey: ['processInfo', studyId],
        queryFn: () => getProcessApi(studyId),
        enabled: !!studyId && !!getTokenFromSession()
    })
}