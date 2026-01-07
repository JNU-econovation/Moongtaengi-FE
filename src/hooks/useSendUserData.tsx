import { useSaveToken } from "./useSaveToken";
import { useSendUserDataApi } from "./useSendUserDataApi";

interface SendData {
    verified: boolean;
    codeStatus: boolean;
    name: string;
    code: string;
}

// 최종 유저 데이터 전송
export const useSendUserData = () => {
    const {saveToken} = useSaveToken();
    const {mutate, isPending} = useSendUserDataApi();

    const sendUserData = ({ verified, codeStatus, name, code }: SendData) => {

        if (!verified) return;

        saveToken();

        const userInfo = codeStatus
            ? { nickname: name, inviteCode: code }
            : { nickname: name };

        mutate(userInfo, {
            onError: (error) => {
                console.log(error);
            }
        })
    }

    return {sendUserData, isPending};
};