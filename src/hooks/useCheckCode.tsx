import { useCheckCodeMutation } from "./useCheckCodeMutation";

interface CheckCode {
    code: string;
    setCodeStatus: (arg: boolean) => void;
    setCodeAlert: (arg: string) => void;
}

export const useCheckCode = () => {
    const {mutate, isPending} = useCheckCodeMutation();

    const checkCode = ({ code, setCodeStatus, setCodeAlert }: CheckCode) => {
        const regex = /^[a-zA-Z0-9]+$/;

        // 초대코드 유효문자 확인
        if (!regex.test(code)) {
            setCodeStatus(false);
            setCodeAlert("초대코드를 확인해주세요");
            return;
        }

        // 초대코드 존재 여부 확인
        mutate(code, {
            onSuccess: () => {
                setCodeStatus(true);
                setCodeAlert("");
            },
            onError: (error) => {
                console.log(error);
            }
        })
    }

    return {checkCode, isPending};
};


