import axios from "axios";

interface CheckCode {
    token: string | null;
    code: string;
    setCodeStatus: (arg: boolean) => void;
    setCodeAlert: (arg: string) => void;
}

// 초대코드 존재 여부 확인
export const checkCodeExist = ({token, code, setCodeStatus, setCodeAlert}: CheckCode) => {
    console.log(token);

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