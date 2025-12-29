import { useGetTokenFromUrl } from "../hooks/useGetTokenFromUrl";
import { checkCodeExist } from "../utils/checkCodeExist";

interface CheckCode {
    code: string;
    setCodeStatus: (arg: boolean) => void;
    setCodeAlert: (arg: string) => void;
}

// 초대코드 유효문자 확인
export const useCheckCode = () => {
    const token = useGetTokenFromUrl();

    const checkCode = ({ code, setCodeStatus, setCodeAlert }: CheckCode) => {
        const regex = /^[a-zA-Z0-9]+$/;

        // early return으로 수정하기
        if (regex.test(code)) {
            checkCodeExist({ token, code, setCodeStatus, setCodeAlert });
        } else {
            setCodeStatus(false);
            setCodeAlert("초대코드를 확인해주세요");
        }
    }

    return {checkCode};
};


