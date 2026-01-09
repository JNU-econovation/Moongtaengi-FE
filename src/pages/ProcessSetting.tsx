import { useState } from 'react';
import { tempData } from './tempStudyData';
import { formatDateToDot } from '../utils/formatDateToDot';
import { getTokenFromSession } from '../utils/getTokenFromSession';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';

// 데이터 타입 정의
interface StudyProcess {
    id: number;
    processOrder: number;
    title: string;
    startDate: string;
    endDate: string;
    durationDays: number;
    memo: string;
    assignmentDescription: string;
    status: 'complete' | 'active' | 'todo' | string;
}

const ProcessSetting = () => {

    const [rdProcess, setRdProcess] = useState('');


    const [scheduleList, setScheduleList] = useState<StudyProcess[]>(tempData);


    const handleAddRow = () => {
        const newId = scheduleList.length + 1;
        const newRow: StudyProcess = {
            id: newId,
            processOrder: newId,
            title: "새로운 프로세스",
            startDate: "2025-01-01",
            endDate: "2025-01-01",
            durationDays: 1,
            memo: "",
            assignmentDescription: "",
            status: 'todo'
        };
        setScheduleList([...scheduleList, newRow]);
    };

    const createProcessApi = async () => {
        const token = getTokenFromSession();
        await axios.post(`${import.meta.env.VITE_API_CREATE_STUDY}/14/processes/generate`,
            {
                additionalDescription: rdProcess
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": 'application/json'
                },
            },
        )
    }

    const { mutate, isPending: isRdProcessPending } = useMutation({
        mutationFn: createProcessApi,
        onSuccess: () => {
            console.log("성공적으로 스터디가 생성되었습니다.")
        },
        onError: (error) => {
            console.log(error);
        }
    })

    const createProcess = () => {
        mutate();
    }

    return (
        <div className="max-w-[1400px] w-full mx-auto md:mt-0 2xl:mt-8 md:p-0 2xl:p-8 flex-1 md:scale-85 2xl:scale-100">

            {/* Header Section */}
            <div className="flex justify-between items-center font-semibold mb-4">
                <h1 className="text-4xl">스터디명 입력</h1>
                <button className="bg-[#272727] hover:opacity-70 text-white px-5 py-1.5 rounded text-md transition-colors cursor-pointer">
                    수정 완료
                </button>
            </div>

            {/* Content Section */}
            <div className="grid grid-cols-12 gap-8 items-start">

                {/* Left Column */}
                <div className="col-span-4 bg-[#272727] p-5 rounded-sm flex flex-col gap-8">

                    {/* Section 1: Study Intro */}
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <h2 className="text-2xl font-semibold">스터디 소개</h2>
                            <button className="text-xs font-semibold bg-[#393939] px-4 py-1 rounded hover:opacity-70">
                                등록하기
                            </button>
                        </div>
                        <div className="bg-[#393939] p-4 rounded text-sm h-40 flex flex-col justify-center gap-6">
                            <p>[ 스터디명 ]</p>
                            <p>[ 주제 ]</p>
                            <p>[ 기간 ]</p>
                        </div>
                    </div>

                    {/* Section 2: Recommended Process */}
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <h2 className="text-2xl font-semibold">추천 프로세스</h2>
                            <button
                                onClick={createProcess}
                                disabled={isRdProcessPending}
                                className={`text-xs px-3 py-1 rounded bg-[#393939]
                                    ${isRdProcessPending 
                                        ? 'opacity-70'
                                        : 'hover:opacity-70 cursor-pointer'}`}
                            >
                                {isRdProcessPending ? '등록 중...' : '등록하기'}
                            </button>
                        </div>
                        <input
                            type='text'
                            value={rdProcess}
                            onChange={(e) => {
                                setRdProcess(e.target.value);
                            }}
                            placeholder='스터디 주제를 상세히 입력해주세요.'
                            className="bg-[#393939] h-60 w-full p-4 pb-50 rounded text-sm placeholder:text-[#A1A1A1]">
                        </input>
                    </div>
                </div>

                {/* Right Column (Merged into 1 Box) */}
                <div className="col-span-8 bg-[#272727] p-5 rounded-sm flex flex-col gap-10">

                    {/* 1. Invite Code Section */}
                    <div className='font-semibold'>
                        <h2 className="text-2xl mb-2">초대코드</h2>
                        <div className="relative flex gap-4 text-2xl">
                            <div className="flex-4 bg-[#393939] h-12 flex items-center justify-center rounded">
                                스터디장 닉네임
                            </div>
                            <div className="flex-7 bg-[#393939] h-12 flex items-center justify-center px-6 rounded">
                                <span>초대코드: 23423</span>
                                <div className="absolute right-5 w-5 h-5 border-2 border-gray-500 rounded-sm cursor-pointer hover:opacity-70" title="copy"></div>
                            </div>
                        </div>
                    </div>

                    {/* 2. Scheduler Section */}
                    <div className="flex-1 flex flex-col">
                        <div className="flex font-semibold justify-between items-end mb-1">
                            <div>
                                <h2 className="text-2xl">스터디 스케줄러</h2>
                                <p className="text-xs">~를 눌러서 수정</p>
                            </div>
                            <button className="text-xs bg-[#393939] px-3 py-1 rounded hover:opacity-70">
                                저장하기
                            </button>
                        </div>

                        {/* Table Header */}
                        <div className="grid grid-cols-17 gap-2 text-center py-2 text-2xl">
                            <div className="col-span-2 bg-[#393939] flex items-center justify-center rounded ">상태</div>
                            <div className="col-span-4 bg-[#393939] flex items-center justify-center rounded">날짜</div>
                            <div className="col-span-6 bg-[#393939] flex items-center justify-center rounded">프로세스</div>
                            <div className="col-span-5 bg-[#393939] flex items-center justify-center rounded">메모</div>
                        </div>

                        {/* Table Body (Scrollable Area) */}
                        <div className={`overflow-y-auto h-[235px] space-y-2
                                [&::-webkit-scrollbar]:w-1
                                hover:[&::-webkit-scrollbar]:w-2
                                [&::-webkit-scrollbar-track]:bg-transparent
                                [&::-webkit-scrollbar-thumb]:bg-[#555]
                                [&::-webkit-scrollbar-thumb]:rounded-full
                                [&::-webkit-scrollbar-button]:hidden    
                            `}>
                            {scheduleList.map((item) => (

                                <div key={item.id} className="grid grid-cols-17 gap-2 text-sm h-10 shrink-0">

                                    {/* Status Badge */}
                                    <div className="col-span-2 bg-[#393939] flex items-center justify-center text-lg rounded">
                                        {item.status === 'complete' && (
                                            <span>완료</span>
                                        )}
                                        {item.status === 'active' && (
                                            <span>진행 중</span>
                                        )}

                                    </div>

                                    {/* Date */}
                                    <div className="col-span-4 bg-[#393939] font-semibold flex items-center justify-center rounded">
                                        {formatDateToDot(item.startDate)} - {formatDateToDot(item.endDate)}
                                    </div>

                                    {/* Process (Track + Title) */}
                                    <div className="col-span-6 bg-[#393939] font-semibold flex items-center px-4 rounded">
                                        <span className="text-black text-[10px] px-2 py-0.5 rounded-full mr-2 min-w-fit bg-gradient-to-r from-custom-gradient-blue to-custom-gradient-green">
                                            Track {item.processOrder}
                                        </span>
                                        <span className="truncate">{item.title}</span>
                                    </div>

                                    {/* Memo */}
                                    <div className="col-span-5 bg-[#393939] font-semibold flex items-center px-2 rounded">
                                        <span className="truncate text-xs">{item.memo}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Add Button */}
                        <button
                            onClick={handleAddRow}
                            className="w-full bg-[#393939] hover:opacity-70 h-10 mt-1.5 rounded flex items-center justify-center transition-colors text-4xl shrink-0"
                        >
                            +
                        </button>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProcessSetting;