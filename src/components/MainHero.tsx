import mainBg from "../assets/main-bg.png";
import mainMoong from "../assets/main-moong.png";
import MainButton from "./MainButton";

interface HeroProps {
    islogin: boolean;
    isStudy: boolean;
}

export default function MainHero({ islogin, isStudy }: HeroProps) {

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
            <div className="absolute inset-0 md:static md:flex-1">
                <div className="w-full h-full relative flex items-center justify-center">
                    <img className="absolute w-full h-full mr-40 object-cover" src={mainBg}></img>
                    <img className="absolute md:right-48 2xl:right-55 z-10 md:w-100 md:h-100 2xl:w-130 2xl:h-130 flex items-center justify-center" src={mainMoong}></img>
                </div>
            </div>
            
        </div>
    )
}