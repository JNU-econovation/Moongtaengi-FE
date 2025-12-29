import axios from "axios";

interface CheckName {
    token: string | null;
    name: string;
    setVerified: (arg: boolean) => void;
    setNameAlert: (args: string) => void;
}

// 닉네임 중복, 비속어 확인
export const checkNamePolicy = ({token, name, setVerified, setNameAlert}: CheckName) => {
    console.log(token);

    axios.get(import.meta.env.VITE_API_CHECK_NAME, {
        headers: { Authorization: `Bearer ${token}` },
        params: { nickname: name }
    })
        .then(res => {
            if (res.data["isAvailable"]) {
                setVerified(true);
                setNameAlert("");
            } else {
                setVerified(false);
                setNameAlert(res.data["message"]);
            }
        })
        .catch(err => console.error(err));
};