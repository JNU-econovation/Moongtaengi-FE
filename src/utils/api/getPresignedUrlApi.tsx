import { getTokenFromSession } from "../getTokenFromSession";
import axios from "axios";

interface PresignedUrlParams {
    numStudyId: number;
    numProcessId: number;
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

export const getPresignedUrlApi = async ({ numStudyId, numProcessId, fileName, fileSize, contentType }: PresignedUrlParams): Promise<PresignedUrlResponse> => {
    const token = getTokenFromSession();

    const { data } = await axios.post<PresignedUrlResponse>(import.meta.env.VITE_API_PRESIGNED_URL,
        {
            studyId: numStudyId,
            processId: numProcessId,
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