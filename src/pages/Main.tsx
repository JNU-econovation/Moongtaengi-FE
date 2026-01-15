import { useState } from "react";
import MainBottom from "../components/MainBottom";
import MainHeroAfterLogin from "../components/MainHeroAfterLogin";
import MainHeroBeforeLogin from "../components/MainHeroBeforeLogin";
import { useAuthStore } from "../stores/useAuthStore";

const Main = () => {

    const { isLogin } = useAuthStore();
    const [isStudy] = useState<boolean>(true);

    return (
        <>
            {isLogin
                ? <MainHeroAfterLogin isLogin={isLogin} isStudy={isStudy} />
                : <MainHeroBeforeLogin isLogin={isLogin} isStudy={isStudy} />}
            <MainBottom />

        </>
    )
}

export default Main