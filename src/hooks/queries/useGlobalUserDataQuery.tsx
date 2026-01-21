import axios from "axios";
import { getTokenFromSession } from "../../utils/getTokenFromSession"
import { useQuery } from "@tanstack/react-query";

interface UserData {
    id: number;
    nickname: string;
}

const globalUserDataApi = async (): Promise<UserData> => {
    const token = getTokenFromSession();

    const response = await axios.get<UserData>(import.meta.env.VITE_API_AUTH_ME,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    )

    return response.data;
}

export const useGlobalUserDataQuery = () => {
    return useQuery({
        queryKey: ['userGlobalData'],
        queryFn: globalUserDataApi,
        enabled: !!getTokenFromSession()
    })
}