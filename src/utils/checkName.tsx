import axios from "axios";

interface CheckName {
    name: string;
    setVerified: (arg: boolean) => void;
    setNameAlert: (args: string) => void;
}

// 닉네임 유효문자 확인
export const checkName = ({name, setVerified, setNameAlert}: CheckName) => {
    const regex = /^[가-힣0-9]+$/;

    if (name.length <= 7 && regex.test(name)) {
        checkNamePolicy({ name, setVerified, setNameAlert });
    } else {
        setVerified(false);
        setNameAlert("닉네임을 확인해주세요");
    }
};

// 닉네임 중복, 비속어 확인
const checkNamePolicy = ({name, setVerified, setNameAlert}: CheckName) => {
    const token = sessionStorage.getItem('JWT');

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