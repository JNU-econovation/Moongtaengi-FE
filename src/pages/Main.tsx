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
    }

    useEffect(() => {
        let jwt: string | null = sessionStorage.getItem('JWT');

        if (jwt) {
            setIslogin(true);
            alert('로그인 되었습니다.');
        }
    }, [])

    useEffect(() => {
        const token: string | null = searchParams.get('token');

        if (token) {
            sessionStorage.setItem('JWT', token);
            setIslogin(true);
            alert('회원가입 완료 후 토큰 저장 되었습니다.');

            navigate('/', {replace: true});
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