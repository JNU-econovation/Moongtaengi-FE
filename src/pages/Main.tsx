import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { useLogout } from "../hooks/useLogout";
import { useIslogin } from "../hooks/useIslogin";
import { useTokenSaveMain } from "../hooks/useTokenSaveMain";

const Main = () => {

    const navigate = useNavigate();
    const [islogin, setIslogin] = useState<boolean>(!!sessionStorage.getItem('JWT'));

    const logout = useLogout(setIslogin);

    useIslogin(setIslogin);

    useTokenSaveMain(setIslogin);

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