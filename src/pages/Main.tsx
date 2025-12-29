import { useState } from "react";
import { useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar";
import MainBottom from "../components/MainBottom";
import { logout } from "../utils/logout";
import { QuickCreateStudy } from "../components/QuickCreateStudy";
import MainHeroAfterLogin from "../components/MainHeroAfterLogin";
import MainHeroBeforeLogin from "../components/MainHeroBeforeLogin";
import { InviteCode } from "../components/InviteCode";
import { useCheckIsLogin } from "../hooks/useCheckIslogin";

type ModalMode = "createStudy" | "inviteCode" | null;

const Main = () => {

    const navigate = useNavigate();

    const {islogin, setIslogin} = useCheckIsLogin();
    const [isStudy, setIsStudy] = useState<boolean>(true);

    const [modalMode, setModalMode] = useState<ModalMode>(null);

    return (
        <>
            <div className="min-h-full bg-custom-bg text-white font-sans overflow-x-hidden">
                <Navbar islogin={islogin} setIslogin={setIslogin} logout={logout} setModalMode={setModalMode} />
                {islogin 
                ? <MainHeroAfterLogin islogin={islogin} isStudy={isStudy} />
                : <MainHeroBeforeLogin islogin={islogin} isStudy={isStudy} />}
                <MainBottom />
                {modalMode === "createStudy" && <QuickCreateStudy setModalMode={setModalMode} />}
                {modalMode === "inviteCode" && <InviteCode setModalMode={setModalMode} />}
            </div>
        </>
    )
}

export default Main