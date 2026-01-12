import { getTokenFromSession } from "../getTokenFromSession";
import axios from "axios";

interface PresignedUrlParams {
    studyId: string;
    processId: string;
    fileName: string;
    fileSize: number;
    contentType: string;
}

interface PresignedUrlResponse {
    uploadUrl: string;
    fileUrl: string;
    fileName: string;
    expiresIn: number;
}

export const getPresignedUrlApi = async ({ studyId, processId, fileName, fileSize, contentType }: PresignedUrlParams): Promise<PresignedUrlResponse> => {
    const token = getTokenFromSession();

    const { data } = await axios.post<PresignedUrlResponse>(import.meta.env.VITE_API_PRESIGNED_URL,
        {
            studyId: studyId,
            processId: processId,
            fileName: fileName,
            fileSize: fileSize,
            contentType: contentType
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": 'application/json',
            },
        },
    )

    return data;
}