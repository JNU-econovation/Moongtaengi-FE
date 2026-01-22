// import mainBg from "../assets/images/main/main-bg.png";
// import mainMoongs from "../assets/images/main/main-moongs.png";

import { useMainQuery } from "../hooks/queries/useMainQuery";
import MainButton from "./MainButton";

interface HeroProps {
    isLogin: boolean;
}

export default function MainHeroAfterLogin({ isLogin }: HeroProps) {

    const { data } = useMainQuery();

    if (!data) return null;

    return (
        <div className="relative w-full flex flex-col md:flex-row md:h-[500px] 2xl:h-[600px]">

            {/* Left: Text Content */}
            <div className="flex-1 flex flex-col justify-center md:ml-20 2xl:ml-34 z-10 text-white md:scale-100 2xl:scale-110">
                <span className="font-semibold text-lg">{data.nickname} 님, 안녕하세요.</span>
                <p className="md:text-6xl 2xl:text-7xl font-semibold leading-tight mb-8">
                    {data.equippedCollectionName}
                </p>

                <div className="flex items-center mb-10">
                    <img src={data.equippedCollectionIconUrl}
                        alt="study thumbnail"
                        className="w-14 h-14 rounded-lg mr-6 object-cover"
                    />
                    <div className="flex flex-col">
                        <span className="font-semibold">오늘의 한마디</span>
                        <span className="text-sm text-white">{data.cheeringMessage}</span>
                    </div>
                </div>

                <div className="flex gap-12 mb-6 ml-4">
                    <div className="flex flex-col text-center">
                        <span className="text-xl font-semibold">{data.activityTitle}</span>
                        <span className="text-sm text-white/70 mt-1">활동 레벨</span>
                    </div>
                    <div className="flex flex-col text-center">
                        <span className="text-xl font-semibold">{data.collectionCount}개</span>
                        <span className="text-sm text-white/70 mt-1">획득 한 뭉탱이 수</span>
                    </div>
                    <div className="flex flex-col text-center">
                        <span className="text-xl font-semibold">{data.commentCount}회</span>
                        <span className="text-sm text-white/70 mt-1">댓글 개수</span>
                    </div>
                </div>

                <MainButton islogin={isLogin} shortcutStudyId={data.shortcutStudyId} totalExperience={data.totalExperience} />
            </div>

            {/* Right: Character Area */}
            <div className="absolute inset-0 static flex-1">
                <div className="relative md:w-[110%] 2xl:w-full h-full flex items-center justify-center">
                    <img src={data.equippedCollectionBackgroundUrl} className="absolute w-full h-full mr-60"></img>

                    {/* <img src={mainBg} className="absolute w-full h-full mr-40 object-cover"></img>
                    <img src={mainMoongs} className="absolute md:right-48 2xl:right-70 z-10 md:w-100 2xl:w-130 md:h-100 2xl:h-130 flex items-center justify-center"></img>
                    <div className="absolute inset-y-0 md:-left-20 2xl:-left-20 md:w-30 2xl:w-50 bg-gradient-to-r from-custom-bg 2xl:via-custom-bg/70 to-transparent z-20"></div>
                    <div className="absolute inset-y-0 md:left-113 2xl:left-160 md:w-30 2xl:w-50 bg-gradient-to-l from-custom-bg 2xl:via-custom-bg/70 to-transparent z-20"></div> */}
                </div>
            </div>

        </div>
    )
}