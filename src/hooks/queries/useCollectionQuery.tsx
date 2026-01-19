import axios from "axios"
import { getTokenFromSession } from "../../utils/getTokenFromSession";
import { useQuery } from "@tanstack/react-query";

interface CollectionItem {
    type: string;
    displayName: string;
    rarity: 'COMMON' | 'RARE' | 'EPIC' | 'UNIQUE';
    description: string;
    unlocked: boolean;
    unlockedAt: string | null;
    imageUrl: string;
}

interface CollectionData {
    equippedIcon: string;
    collections: CollectionItem[];
}

const collectionApi = async (): Promise<CollectionData> => {
    const token = getTokenFromSession();

    const response = await axios.get<CollectionData>(import.meta.env.VITE_API_COLLECTION,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        },
    )

    return response.data;
}

export const useCollectionQuery = () => {
    return useQuery({
        queryKey: ['collection'],
        queryFn: collectionApi,
        enabled: !!getTokenFromSession()
    })
}