import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { useLogout } from "../hooks/useLogout";
import { useIslogin } from "../hooks/useIslogin";
import { useTokenSaveMain } from "../hooks/useTokenSaveMain";
import Navbar from "../components/Navbar";
import MainHero from "../components/MainHero";
import MainBottom from "../components/MainBottom";

const Main = () => {

    const navigate = useNavigate();
    const [islogin, setIslogin] = useState<boolean>(!!sessionStorage.getItem('JWT'));

    const logout = useLogout(setIslogin);

    useIslogin(setIslogin);

    useTokenSaveMain(setIslogin);

    return (
        <>
            <div className="min-h-full bg-[#121212] text-white font-sans overflow-x-hidden">
                <Navbar />
                <MainHero />
                <MainBottom />
            </div>
        </>
    )
}

export default Main