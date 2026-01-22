import axios from "axios";
import { useQuery } from "@tanstack/react-query";

interface RunnerData {
    topRunners: {
        nickname: string;
        profileIconUrl: string;
    }[];
}

const topRunnerApi = async (): Promise<RunnerData> => {
    const response = await axios.get<RunnerData>(import.meta.env.VITE_API_TOP_RUNNER)

    return response.data;
}

export const useTopRunnerQuery = () => {
    return useQuery({
        queryKey: ['topRunner'],
        queryFn: topRunnerApi
    })
}