import axios from "axios";

interface CheckCode {
    code: string;
    setCodeStatus: (arg: boolean) => void;
    setCodeAlert: (arg: string) => void;
}

// 초대코드 유효문자 확인
export const checkCode = ({code, setCodeStatus, setCodeAlert}: CheckCode) => {
    const regex = /^[a-zA-Z0-9]+$/;

    // early return으로 수정하기
    if (regex.test(code)) {
        checkCodeExist({code, setCodeStatus, setCodeAlert});
    } else {
        setCodeStatus(false);
        setCodeAlert("초대코드를 확인해주세요");
    }
};

// 초대코드 존재 여부 확인
const checkCodeExist = ({code, setCodeStatus, setCodeAlert}: CheckCode) => {
    const token = sessionStorage.getItem('JWT');

    axios.post(import.meta.env.VITE_API_CHECK_CODE, code, {
        headers: { Authorization: `Bearer ${token}` }
    })
        .then(res => {
            // early return으로 수정하기
            if (res.data["status"] === "success") {
                setCodeStatus(true);
                setCodeAlert("");
            } else {
                setCodeStatus(false);
                setCodeAlert("유효하지 않은 초대코드 입니다");
            }
        });

    // UI 테스트용
    setCodeStatus(true);
    setCodeAlert("");
};
