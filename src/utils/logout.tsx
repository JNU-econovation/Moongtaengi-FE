import { deleteToken } from "./deleteToken";

export const logout = (setIslogin: (login: boolean) => void) => {
    deleteToken();
    setIslogin(false);
    alert('로그아웃 되었습니다.');
    return true;
};
