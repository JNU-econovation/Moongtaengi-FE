import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom"

const Main = () => {

    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const [islogin, setIslogin] = useState<boolean>(false);

    const logout = () => {
        sessionStorage.removeItem('JWT');
        setIslogin(false);
        alert('로그아웃 되었습니다.');
        navigate('/', {replace: true});
    };

    // 페이지 접속 시 로그인 확인
    useEffect(() => {
        let jwt: string | null = sessionStorage.getItem('JWT');

        if (jwt) {
            setIslogin(true);
        }
    }, []);

    // 로그인 후 이동 시 토큰 저장 (기존 회원)
    useEffect(() => {
        const token: string | null = searchParams.get('token');

        if (token) {
            sessionStorage.setItem('JWT', token);
            setIslogin(true);
        }
    }, [searchParams]);

    return (
        <>
            <p style={{ color: "white" }}>메인 화면임</p>
            {
                islogin
                    ? <button onClick={() => { logout() }}>로그아웃 하기</button>
                    : <button onClick={() => { navigate('/login') }}>로그인 하기</button>
            }
        </>
    )
}

export default Main