import axios from "axios";
import { getTokenFromSession } from "../../utils/getTokenFromSession";

export const studyListApi = async (arg: string) => {
    const token = getTokenFromSession();

    const response = await axios.get(`${import.meta.env.VITE_API_STUDY}${arg}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        },
    )

    return response.data;
}