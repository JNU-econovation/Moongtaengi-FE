import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { useIslogin } from "../hooks/useIslogin";
import { useSaveToken } from "../hooks/useSaveToken";
import Navbar from "../components/Navbar";
import MainHero from "../components/MainHero";
import MainBottom from "../components/MainBottom";
import { logout } from "../utils/logout";

const Main = () => {

    const navigate = useNavigate();
    const {saveToken} = useSaveToken();
    const {Islogin} = useIslogin();

    const [islogin, setIslogin] = useState<boolean>(!!sessionStorage.getItem('JWT'));
    const [isStudy, setIsStudy] = useState<boolean>(true);

    useEffect(() => {
        saveToken();
    }, [])

    useEffect(() => {
        Islogin(setIslogin);
    }, [])

    return (
        <>
            <div className="min-h-full bg-custom-bg text-white font-sans overflow-x-hidden">
                <Navbar islogin={islogin} setIslogin={setIslogin} logout={logout} />
                <MainHero islogin={islogin} isStudy={isStudy} />
                <MainBottom />
            </div>
        </>
    )
}

export default Main