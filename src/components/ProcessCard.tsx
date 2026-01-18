import { useNavigate } from 'react-router-dom';
import cardPrimaryMoong from '../assets/images/process/card-primary-moong.png';
import { formatDateToWord } from "../utils/formatDateToWord";

interface Params {
    studyData: {
        studyId: number;
        studyName: string;
        studyPeriod: {
            startDate: string;
            endDate: string;
        };
        studyTopic: string;
        studyInviteCode: string;
        myRole: 'HOST' | 'GUEST';
    };
    studyId: string;
    processData: {
        id: number;
        processOrder: number;
        title: string;
        startDate: string;
        endDate: string;
        durationDays: number;
        memo: string;
        assignmentDescription: string;
        status: 'COMPLETED' | 'IN_PROGRESS' | 'NOT_STARTED';
    }[];
    process: {
        id: number;
        processOrder: number;
        title: string;
        startDate: string;
        endDate: string;
        durationDays: number;
        memo: string;
        assignmentDescription: string;
        status: 'COMPLETED' | 'IN_PROGRESS' | 'NOT_STARTED';
    };
    scrollRefs: React.MutableRefObject<{
        [key: number]: HTMLDivElement | null;
    }>;
    itemRefs: React.MutableRefObject<{
        [key: number]: HTMLDivElement | null;
    }>;
    handleScroll: (arg1: number, arg2: 'left' | 'right') => void;
}

export const ProcessCard = ({ studyData, studyId, processData, process, scrollRefs, itemRefs, handleScroll }: Params) => {
    const navigate = useNavigate();

    return (
        <div
            key={process.id}

            className={`w-full md:mb-10 2xl:mb-20 md:scale-85 2xl:scale-100 transition-opacity duration-500 ${process.status === 'NOT_STARTED' ? 'opacity-50 hover:opacity-100' : 'opacity-100'
                }`}
        >

            {/* 상단 정보 */}
            <div className="flex justify-between items-end mb-4 px-2">
                <div className="flex flex-col">
                    <h2 className="text-4xl font-semibold">
                        {formatDateToWord(process.startDate)} / {formatDateToWord(process.endDate)}
                    </h2>
                </div>

                <div className="flex gap-2 text-sm text-white font-semibold">
                    {studyData.myRole === 'HOST' && (
                        <button onClick={() => { navigate(`/studies/${studyId}/setting`, { state: { idEdit: true } }) }}
                            className="bg-[#272727] px-3 py-1 rounded-full hover:opacity-70 cursor-pointer">수정하기</button>
                    )}
                    <button onClick={() => { }}
                        className="bg-[#272727] px-3 py-1 rounded-full hover:opacity-70 cursor-pointer">나의 과제 모아보기</button>
                </div>
            </div>

            <div className="flex flex-col gap-4">
                {/* 프로세스 위 라인 */}
                <div className="flex flex-col md:flex-row gap-4 h-auto md:h-80">
                    <div className="flex-1 bg-[#272727] text-white rounded-2xl p-6 relative flex flex-col justify-between overflow-hidden group">
                        {/* 메인 주제와 캐릭터 */}
                        <div className="z-10 relative h-full flex flex-col">
                            <div className='shrink-0'>
                                <span className="text-black text-xs font-semibold px-2 py-1 rounded-full bg-gradient-to-b from-custom-gradient-blue to-custom-gradient-green">
                                    Week {process.processOrder}
                                </span>
                            </div>

                            <div className='flex-1 flex flex-col justify-center z-10'>
                                <div>
                                    <p className="text-sm">AI 추천</p>
                                    <h3 className="text-5xl max-w-130 font-semibold mt-1 mb-2 leading-tight">{process.title}</h3>
                                    <p className="text-lg font-semibold mt-2">{process.memo || "메모가 없습니다."}</p>
                                </div>
                            </div>

                            <div className='flex items-end justify-center absolute top-10 right-1 bg-white rounded-2xl w-50 h-50 '>
                                <img src={cardPrimaryMoong} className='w-[90%]' />
                            </div>
                        </div>

                        {/* 진행바 */}
                        <div className="absolute bottom-6 left-6 right-6 max-w-full flex gap-1 mt-6 h-3 z-10">
                            {processData.map((p, i) => (
                                <div
                                    key={p.id}
                                    className={`flex-1 rounded h-full mt-2 transition-colors ${(i + 1) === process.processOrder ? 'bg-gradient-to-r from-custom-gradient-blue to-custom-gradient-green' : 'bg-white'}`}
                                ></div>
                            ))}
                        </div>
                    </div>

                    {/* 나의 과제 제출 카드 */}
                    <div className="md:w-80 md:shrink-0 aspect-square bg-[#272727] rounded-2xl p-6 flex flex-col justify-between hover:opacity-70 transition-colors cursor-pointer">
                        <div className='flex flex-col items-start gap-2'>
                            <h4 className="text-3xl font-semibold mt-6">
                                이번 주<br /> 부여 받은 과제
                            </h4>
                            <div className='bg-[#3E3E3E] px-2 text-sm rounded-full'>
                                테스트
                            </div>
                        </div>
                        <div ref={(el) => { itemRefs.current[process.processOrder] = el; }}
                            className="flex items-center gap-3 mt-4 pt-4">
                            <div className="w-10 h-10 bg-[#AFAEAE] rounded-full flex items-center justify-center">Me</div>
                            <div className="flex flex-col">
                                <span className="text-sm font-semibold">나</span>
                                <span className="text-xs text-[#F9F9F9]">이번 주 과제 파일명</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 프로세스 아래 라인 */}
                <div className="relative group/list">
                    {/* 왼쪽 스크롤 버튼 */}
                    <button
                        onClick={() => handleScroll(process.id, 'left')}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 w-10 h-10 bg-black/80 rounded-full flex items-center justify-center text-white opacity-0 group-hover/list:opacity-100 transition-opacity hover:bg-gray-700"
                    >
                        &lt;
                    </button>

                    {/* 스크롤 컨테이너 */}
                    <div
                        ref={(el) => { scrollRefs.current[process.id] = el; }}
                        className="flex gap-4 overflow-x-hidden scroll-smooth"
                    >
                        {/* 다른 사람의 과제 제출 카드 */}
                        {[1, 2, 3, 4, 5, 6].map((idx) => (
                            <div
                                key={idx}
                                className="shrink-0 w-80 aspect-square bg-[#272727] rounded-2xl p-6 flex flex-col justify-between hover:opacity-70 transition-colors cursor-pointer"
                            >
                                <div>
                                    <h4 className="text-3xl font-semibold mt-6">
                                        이번 주<br /> 부여 받은 과제
                                    </h4>
                                </div>
                                <div className="flex items-center gap-3 mt-4 pt-4">
                                    <div className="w-10 h-10 bg-[#AFAEAE] rounded-full flex items-center justify-center">Me</div>
                                    <div className="flex flex-col">
                                        <span className="text-sm font-semibold">닉네임</span>
                                        <span className="text-xs text-[#F9F9F9]">이번 주 과제 파일명</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* 오른쪽 그라데이션 */}
                    <div className="absolute inset-y-0 right-0 md:w-30 2xl:w-50 bg-gradient-to-l from-custom-bg 2xl:via-custom-bg/70 to-transparent z-20"></div>

                    {/* 오른쪽 스크롤 버튼 */}
                    <button
                        onClick={() => handleScroll(process.id, 'right')}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 w-10 h-10 bg-black/80 rounded-full flex items-center justify-center text-white opacity-0 group-hover/list:opacity-100 transition-opacity hover:bg-gray-700"
                    >
                        &gt;
                    </button>
                </div>

            </div>
        </div>
    )

}