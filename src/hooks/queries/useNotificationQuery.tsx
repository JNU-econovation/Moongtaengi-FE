import { useQuery } from "@tanstack/react-query"
import axios, { AxiosError } from "axios"
import { getTokenFromSession } from "../../utils/getTokenFromSession"

interface Data {
    onboarding: {
        message: string;
        order: number;
        totalMissions: number;
        status: string;
    };
    dailyQuests: {
        message: string;
        current: number;
        max: number;
    }[];
    notifications: {
        id: number;
        message: string;
    }[];
}

const notificationApi = async (): Promise<Data> => {
    const token = getTokenFromSession();

    try {
        const response = await axios.get<Data>(import.meta.env.VITE_API_NOTIFICATION, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        // 서버에서 보낸 에러 메시지가 있는지 확인 (디버깅 용도)
        if (axios.isAxiosError(error)) {
            console.error("Server 500 Error Body:", error.response?.data);
            console.error("Status Code:", error.response?.status);
        }
        throw error;
    }
}

export const useNotificationQuery = () => {
    return useQuery<Data, AxiosError>({
        queryKey: ['notification'],
        queryFn: notificationApi,
        enabled: !!getTokenFromSession(),
        retry: 0, // 에러 확인을 위해 재시도 비활성화
    })
}