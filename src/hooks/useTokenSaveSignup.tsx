import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export const useTokenSaveSignup = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        const token = searchParams.get('token');

        if (token) {
            sessionStorage.setItem('JWT', token);
        } else {
            navigate('/', { replace: true });
            alert('로그인 실패');
        }
    }, [searchParams]);
}