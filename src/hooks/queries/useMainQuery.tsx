import axios from "axios";
import { getTokenFromSession } from "../../utils/getTokenFromSession"
import { useQuery } from "@tanstack/react-query";

interface MainData {
    nickname: string;
    equippedCollectionName: string;
    equippedCollectionIconUrl: string;
    cheeringMessage: string;
    commentCount: number;
    activityTitle: string;
    collectionCount: number;
    totalExperience: number;
    shortcutStudyId: number | null;

    equippedCollectionBackgroundUrl: string;
}

const mainDataApi = async (): Promise<MainData> => {
    const token = getTokenFromSession();

    const response = await axios.get<MainData>(import.meta.env.VITE_API_HOME,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    )

    return response.data;
}

export const useMainQuery = () => {
    return useQuery({
        queryKey: ['mainData'],
        queryFn: mainDataApi,
        enabled: !!getTokenFromSession()
    })
}