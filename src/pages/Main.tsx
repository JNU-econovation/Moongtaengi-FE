import { useState } from "react";
import { useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar";
import MainBottom from "../components/MainBottom";
import { QuickCreateStudy } from "../components/QuickCreateStudy";
import MainHeroAfterLogin from "../components/MainHeroAfterLogin";
import MainHeroBeforeLogin from "../components/MainHeroBeforeLogin";
import { InviteCode } from "../components/InviteCode";
import { useAuthStore } from "../stores/useAuthStore";
import { useModalModeStore } from "../stores/useModalModeStore";

const Main = () => {

    const navigate = useNavigate();
    const {isLogin} = useAuthStore();
    const [isStudy, setIsStudy] = useState<boolean>(true);
    const {modalMode} = useModalModeStore();

    return (
        <>
            <div className="min-h-full bg-custom-bg text-white font-sans overflow-x-hidden">
                <Navbar/>
                {isLogin 
                ? <MainHeroAfterLogin isLogin={isLogin} isStudy={isStudy} />
                : <MainHeroBeforeLogin isLogin={isLogin} isStudy={isStudy} />}
                <MainBottom />
                {modalMode === "createStudy" && <QuickCreateStudy />}
                {modalMode === "inviteCode" && <InviteCode />}
            </div>
        </>
    )
}

export default Main