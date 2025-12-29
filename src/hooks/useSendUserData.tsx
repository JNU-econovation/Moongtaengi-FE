import axios from "axios";
import { getTokenFromSession } from "../utils/getTokenFromSession";
import { useSaveToken } from "./useSaveToken";

interface SendData {
    verified: boolean;
    codeStatus: boolean;
    name: string;
    code: string;
}

// 최종 유저 데이터 전송
export const useSendUserData = () => {
    const {saveToken} = useSaveToken();

    const sendData = ({ verified, codeStatus, name, code }: SendData) => {

        if (!verified) return;

        saveToken();

        const userInfo = codeStatus
            ? { nickname: name, inviteCode: code }
            : { nickname: name };

        console.log("전송 데이터:", userInfo);
        
        const token = getTokenFromSession();

        axios.post(import.meta.env.VITE_API_REGISTRATION, 
            userInfo,
            { 
                headers: {Authorization: `Bearer ${token}`}
            }
        );
    }

    return {sendData};
};