import { useParams } from "react-router-dom";
import { getPresignedUrlApi } from "../utils/api/getPresignedUrlApi"
import { uploadFileToS3Api } from "../utils/api/uploadFileToS3Api";

export const useUploadFile = () => {
    const { studyId, processId } = useParams<"studyId" | "processId">();

    const numStudyId = Number(studyId);
    const numProcessId = Number(processId);

    const uploadFile = async (file: File): Promise<string> => {
        const fileName = file.name;
        const fileSize = file.size;
        const contentType = file.type;

        try {
            const { uploadUrl, fileUrl } = await getPresignedUrlApi({ numStudyId, numProcessId, fileName, fileSize, contentType });

            await uploadFileToS3Api({ uploadUrl, file, contentType });

            return fileUrl;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    return uploadFile;
}

