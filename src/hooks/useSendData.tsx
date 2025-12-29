import { getTokenFromSession } from "../utils/getTokenFromSession";
import { useSaveToken } from "./useSaveToken";

interface SendData {
    verified: boolean;
    codeStatus: boolean;
    name: string;
    code: string;
}

// 최종 유저 데이터 전송
export const useSendData = () => {
    const {saveToken} = useSaveToken();

    const sendData = ({ verified, codeStatus, name, code }: SendData) => {

        if (!verified) return;

        const userInfo = codeStatus
            ? { nickname: name, inviteCode: code }
            : { nickname: name };


        console.log("전송 데이터:", userInfo);
        saveToken();
        // axios.post(...)
        // 구현 전엔 회원가입 성공으로 가정
        const token = getTokenFromSession();
        if (token) {
            sessionStorage.setItem('JWT', token);
            return true;
        }
    }

    return {sendData};
};