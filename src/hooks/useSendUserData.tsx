import { useNavigate } from "react-router-dom";
import { useSaveToken } from "./useSaveToken";
import { useSendUserDataMutation } from "./useSendUserDataMutation";

interface SendData {
    verified: boolean;
    codeStatus: boolean;
    name: string;
    code: string;
}

export const useSendUserData = () => {
    const navigate = useNavigate();
    const {saveToken} = useSaveToken();
    const {mutate, isPending} = useSendUserDataMutation();

    const sendUserData = ({ verified, codeStatus, name, code }: SendData) => {
        if (!verified) return;

        saveToken();

        const userInfo = codeStatus
            ? { nickname: name, inviteCode: code }
            : { nickname: name };

        mutate(userInfo, {
            onSuccess: () => {
                navigate('/signup/check', {replace: true});
            },
            onError: (error) => {
                console.log(error);
            }
        })
    }

    return {sendUserData, isPending};
};