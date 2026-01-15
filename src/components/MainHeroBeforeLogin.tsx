import mainBg from "../assets/images/main/main-bg.png";
import mainMoong from "../assets/images/main/main-moong.png";

import heroBgBefore from "../assets/images/main/hero-bg-before.png";
import MainButton from "./MainButton";


interface HeroProps {
    isLogin: boolean;
    isStudy: boolean;
}

export default function MainHeroBeforeLogin({ isLogin, isStudy }: HeroProps) {

    return (
        <div className="relative w-full flex flex-col md:flex-row md:h-[500px] 2xl:h-[600px]">

            {/* Left: Text Content */}
            <div className="flex-1 flex flex-col justify-center md:ml-20 2xl:ml-34 z-10 text-white md:scale-100 2xl:scale-110">
                <span className="font-semibold">로그인 후 이용해주세요</span>
                <h2 className="md:text-6xl 2xl:text-7xl font-semibold leading-tight mb-3">
                    뭉탱이<br />
                    플레이하기
                </h2>
                <p className="md:mb-8 2xl:mb-11 max-w-md leading-relaxed text-lg">
                    오늘, 가볍게 시작해보세요.<br />
                    작은 학습이 쌓여 큰 성장을 만드는 스터디 플랫폼
                </p>
                <MainButton islogin={isLogin} isStudy={isStudy} />
            </div>

            {/* Right: Character Area */}
            <div className="absolute inset-0 static flex-1">
                <div className="relative md:w-[110%] 2xl:w-full h-full flex items-center justify-center">
                    <img src={heroBgBefore} className="absolute w-full h-full mr-60"></img>
                </div>
            </div>

            {/* <div className="absolute inset-0 static flex-1 md:mr-20 2xl:mr-40">
                <div className="relative w-full h-full flex items-center justify-center">
                    <img src={mainBg} className="absolute w-full h-full object-cover"></img>
                    <img src={mainMoong} className="absolute right-[15%] z-10 md:w-110 2xl:w-130 flex items-center justify-center"></img>
                    <div className="absolute inset-y-0 left-0 md:w-40 2xl:w-30 bg-gradient-to-r from-custom-bg via-custom-bg/10 to-transparent z-20"></div>
                    <div className="absolute inset-y-0 right-0 md:w-40 2xl:w-30 bg-gradient-to-l from-custom-bg via-custom-bg/10 to-transparent z-20"></div>
                </div>
            </div> */}

        </div>
    )
}