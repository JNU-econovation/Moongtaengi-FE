import { useParams } from "react-router-dom";
import { getPresignedUrlApi } from "../utils/getPresignedUrlApi"
import { uploadFileToS3Api } from "../utils/uploadFileToS3Api";

export const useUploadFile = () => {
    const { studyId, processId } = useParams<"studyId" | "processId">();

    const uploadFile = async (file: File): Promise<string> => {
        const fileName = file.name;
        const fileSize = file.size;
        const contentType = file.type;

        try {
            const { uploadUrl, fileUrl } = await getPresignedUrlApi({ studyId, processId, fileName, fileSize, contentType });

            await uploadFileToS3Api({ uploadUrl, file, contentType });

            return fileUrl;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    return uploadFile;
}

