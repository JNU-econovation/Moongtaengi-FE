import { useTopRunnerQuery } from "../hooks/queries/useTopRunnerQuery";

export default function MainBottom() {

    const { data } = useTopRunnerQuery();

    console.log('top runners', data);

    if (!data) return <>로딩 중...</>;

    return (
        <div className="px-8 py-4 bg-[#272727]">

            <div className="mb-6 ml-10 text-white">
                <h3 className="text-xl font-semibold">함께 성장 중인 뭉탱이들</h3>
                <p className="text-sm mt-1">이번 주 전체 Top Learners</p>
            </div>

            {/* Scrollable Square List */}
            <div className={`flex md:gap-3 2xl:gap-6 overflow-x-auto pb-6 
                [&::-webkit-scrollbar]:w-0.5
                [&::-webkit-scrollbar-track]:bg-transparent
                [&::-webkit-scrollbar-thumb]:bg-[#625E5E]
                [&::-webkit-scrollbar-thumb]:rounded-full
                [&::-webkit-scrollbar-button]:hidden`}
            >
                {data.topRunners.map((item, index) => (
                    <div
                        key={index}
                        className="flex flex-col items-center gap-3 ml-10"
                    >
                        <div className="relative shrink-0 md:w-64 md:h-64 2xl:w-80 2xl:h-80 rounded-2xl transition-colors group">
                            {/* Badge */}
                            <div className="absolute top-4 left-4 px-3 py-1 bg-gradient-to-b from-custom-gradient-blue to-custom-gradient-green text-black text-xs font-semibold rounded-full z-10">
                                TOP {index + 1}
                            </div>

                            {/* Content Placeholder inside black card */}
                            <div className="w-full h-full flex items-center justify-center">
                                <div className="w-full h-full rounded-xl flex items-center justify-center transition-colors">
                                    <img
                                        src={item.profileIconUrl}
                                        alt="Top Runner"
                                        className="object-contain"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="text-lg">
                            {item.nickname}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}