import axios from "axios";

interface FileToS3Params {
    uploadUrl: string;
    file: File;
    contentType: string;
}

export const uploadFileToS3Api = async ({ uploadUrl, file, contentType }: FileToS3Params) => {
    await axios.put(uploadUrl, file,
        {
            headers: {
                "Content-Type": contentType
            },
        }
    )
}