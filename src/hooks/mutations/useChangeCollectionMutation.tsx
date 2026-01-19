import axios from "axios"
import { getTokenFromSession } from "../../utils/getTokenFromSession"
import { useMutation, useQueryClient } from "@tanstack/react-query";

const changeCollectionApi = async (type: string) => {
    const token = getTokenFromSession();

    await axios.post(import.meta.env.VITE_API_COLLECTION_EQUIP,
        {
            collectionType: type
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": 'application/json'
            },
        },
    )
}

export const useChangeCollectionMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: changeCollectionApi,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['collection']})
        },
        onError: (error) => {
            console.error(error);
        }
    })
}