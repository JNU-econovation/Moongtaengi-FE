import { useCheckNameMutation } from "./useCheckNameMutation";

interface CheckName {
    name: string;
    setVerified: (arg: boolean) => void;
    setNameAlert: (args: string) => void;
}

export const useCheckName = () => {
    const { mutate, isPending } = useCheckNameMutation();

    const checkName = ({ name, setVerified, setNameAlert }: CheckName) => {
        const regex = /^[가-힣0-9]+$/;

        // 닉네임 유효문자 확인
        if (name.length > 7 || !regex.test(name)) {
            setVerified(false);
            setNameAlert("닉네임을 확인해주세요");
            return;
        }
        
        // 닉네임 중복, 비속어 확인
        mutate(name, {
            onSuccess: (data) => {
                if (!data.isAvailable) {
                    setVerified(false);
                    setNameAlert(data.message);
                    return;
                }
                setVerified(true);
                setNameAlert("");
            },
            onError: (error) => {
                console.log(error);
            }
        })
    }

    return { checkName, isPending };
};

