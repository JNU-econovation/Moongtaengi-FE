import { checkNamePolicy } from "../utils/checkNamePolicy";
import { useGetTokenFromUrl } from "../hooks/useGetTokenFromUrl";

interface CheckName {
    name: string;
    setVerified: (arg: boolean) => void;
    setNameAlert: (args: string) => void;
}

// 닉네임 유효문자 확인
export const useCheckName = () => {
    const token = useGetTokenFromUrl();

    const checkName = ({ name, setVerified, setNameAlert }: CheckName) => {
        const regex = /^[가-힣0-9]+$/;

        if (name.length <= 7 && regex.test(name)) {
            checkNamePolicy({ token, name, setVerified, setNameAlert });
        } else {
            setVerified(false);
            setNameAlert("닉네임을 확인해주세요");
        }
    }

    return {checkName};
};

