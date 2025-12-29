import mainBg from "../assets/main/main-bg.png";
import mainMoong from "../assets/main/main-moong.png";

import mainMoongCompA from "../assets/main/main-moong-comp-a.png";
import MainButton from "./MainButton";

interface HeroProps {
    islogin: boolean;
    isStudy: boolean;
}

export default function MainHeroBeforeLogin({ islogin, isStudy }: HeroProps) {

    return (
        <div className="relative w-full flex flex-col md:flex-row md:h-[500px] 2xl:h-[600px]">

            {/* Left: Text Content */}
            <div className="flex-1 flex flex-col justify-center ml-16 z-10 text-white">
                <span className="font-semibold">로그인 후 이용해주세요</span>
                <h2 className="md:text-6xl 2xl:text-7xl font-semibold leading-tight mb-3">
                    뭉탱이<br />
                    플레이하기
                </h2>
                <p className="md:mb-8 2xl:mb-11 max-w-md leading-relaxed text-lg">
                    오늘, 가볍게 시작해보세요.<br />
                    작은 학습이 쌓여 큰 성장을 만드는 스터디 플랫폼
                </p>
                <MainButton islogin={islogin} isStudy={isStudy} />
            </div>

            {/* Right: Character Area */}
            <div className="absolute inset-0 static flex-1 md:mr-10 2xl:-mr-15">
                <div className="relative md:w-[110%] 2xl:w-[95%] h-full flex items-center justify-center">
                    <img src={mainMoongCompA} className="absolute w-full h-full mr-40 "></img>
                    
                    {/* <img src={mainBg} className="absolute w-full h-full mr-40 object-cover"></img>
                    <img src={mainMoong} className="absolute md:right-48 2xl:right-70 z-10 md:w-100 2xl:w-130 md:h-100 2xl:h-130 flex items-center justify-center"></img>
                    <div className="absolute inset-y-0 md:-left-20 2xl:-left-20 md:w-30 2xl:w-50 bg-gradient-to-r from-custom-bg 2xl:via-custom-bg/70 to-transparent z-20"></div>
                    <div className="absolute inset-y-0 md:left-113 2xl:left-160 md:w-30 2xl:w-50 bg-gradient-to-l from-custom-bg 2xl:via-custom-bg/70 to-transparent z-20"></div> */}
                </div>
            </div>

        </div>
    )
}