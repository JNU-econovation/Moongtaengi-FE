import { useNavigate } from "react-router-dom";

export const useLogout = (setIslogin: (login: boolean) => void) => {
    const navigate = useNavigate();

    const logout = () => {
        sessionStorage.removeItem('JWT');
        setIslogin(false);
        alert('로그아웃 되었습니다.');
        navigate('/', { replace: true });
    };

    return logout
}