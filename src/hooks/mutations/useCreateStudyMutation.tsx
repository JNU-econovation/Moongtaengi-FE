import axios from "axios";
import { getTokenFromSession } from "../../utils/getTokenFromSession";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

interface FormData {
    name: string;
    topic: string;
    startDate: string;
    endDate: string;
}

const createStudyApi = async (formData: FormData) => {
    const token = getTokenFromSession();
    const response = await axios.post(import.meta.env.VITE_API_CREATE_STUDY, formData,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": 'application/json',
            },
        }
    )

    return response;
}

export const useCreateStudyMutation = (setModalMode: (status: "createStudy" | "inviteCode" | null) => void) => {
    const navigate = useNavigate();
    
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createStudyApi,
        onSuccess: (response) => {
            const location = response.headers['location'];

            queryClient.invalidateQueries({ queryKey: ['operatingStudyList'] });
            queryClient.invalidateQueries({ queryKey: ['participatingStudyList'] });
            queryClient.invalidateQueries({ queryKey: ['mainData'] });

            setModalMode(null);

            if (location) {
                navigate(location.replace(/^\/api/, ''));
            }
        },
        onError: (error) => {
            console.log(error);
        }
    })
}