import MainBottom from "../components/MainBottom";
import MainHeroAfterLogin from "../components/MainHeroAfterLogin";
import MainHeroBeforeLogin from "../components/MainHeroBeforeLogin";
import { useAuthStore } from "../stores/useAuthStore";

const Main = () => {

    const { isLogin } = useAuthStore();

    return (
        <>
            {isLogin
                ? <MainHeroAfterLogin isLogin={isLogin} />
                : <MainHeroBeforeLogin isLogin={isLogin} />
            }
            
            <MainBottom />
        </>
    )
}

export default Main