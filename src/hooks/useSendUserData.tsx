import { useNavigate } from "react-router-dom";
import { useSaveToken } from "./useSaveToken";
import { useSendUserDataMutation } from "./mutations/useSendUserDataMutation";
import { useJoinStudyMutation } from "./mutations/useJoinStudyMutation";

interface SendData {
    verified: boolean;
    codeStatus: boolean;
    name: string;
    code: string;
}

export const useSendUserData = () => {
    const navigate = useNavigate();
    const { saveToken } = useSaveToken();
    const { mutate: sendUserDataMutate, isPending: isSendUserDataPending } = useSendUserDataMutation();
    const { mutate: joinStudyMutate, isPending: isJoinStudyPending } = useJoinStudyMutation();

    const sendUserData = ({ verified, codeStatus, name, code }: SendData) => {
        if (!verified) return;

        saveToken();

        sendUserDataMutate(name, {
            onSuccess: () => {
                console.log('회원가입 성공')
                if (codeStatus) {
                    joinStudyMutate(code, {
                        onSuccess: () => {
                            console.log('스터디 가입 성공');
                        },
                        onError: (error) => {
                            console.log(error);
                        }
                    });
                }
                navigate('/signup/check', { replace: true });
            },
            onError: (error) => {
                console.log(error);
            }
        })
    }

    return { sendUserData, isSendUserDataPending, isJoinStudyPending };
};