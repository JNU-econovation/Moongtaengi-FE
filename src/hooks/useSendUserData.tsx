import { useNavigate } from "react-router-dom";
import { useSaveToken } from "./useSaveToken";
import { useSendUserDataMutation } from "./mutations/useSendUserDataMutation";

interface SendData {
    verified: boolean;
    name: string;
}

export const useSendUserData = () => {
    const navigate = useNavigate();
    const { saveToken } = useSaveToken();
    const { mutate: sendUserDataMutate, isPending: isSendUserDataPending } = useSendUserDataMutation();

    const sendUserData = ({ verified, name }: SendData) => {
        if (!verified) return;

        saveToken();

        sendUserDataMutate(name, {
            onSuccess: () => {
                console.log('회원가입 성공');
                navigate('/signup/check', { replace: true });
            },
            onError: (error) => {
                console.log(error);
            }
        })
    }

    return { sendUserData, isSendUserDataPending };
};