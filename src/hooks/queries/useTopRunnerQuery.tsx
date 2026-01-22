import axios from "axios";
import { getTokenFromSession } from "../../utils/getTokenFromSession"
import { useQuery } from "@tanstack/react-query";

interface RunnerData {
    topRunners: {
        nickname: string;
        profileIconUrl: string;
    }[];
}

const topRunnerApi = async (): Promise<RunnerData> => {
    const token = getTokenFromSession();

    const response = await axios.get<RunnerData>(import.meta.env.VITE_API_TOP_RUNNER,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    )

    return response.data;
}

export const useTopRunnerQuery = () => {
    return useQuery({
        queryKey: ['topRunner'],
        queryFn: topRunnerApi,
        enabled: !!getTokenFromSession()
    })
}