import { useEffect, useMemo, useState } from 'react';
import { replace, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useStudyQuery } from '../hooks/useStudyQuery';
import { useProcessQuery } from '../hooks/useProcessQuery';
import { useCreateProcessMutation } from '../hooks/useCreateProcessMutation';
import { useUpdateStudyMutation } from '../hooks/useUpdateStudyMutation';

interface StudyData {
    name: string;
    topic: string;
    startDate: string;
    endDate: string;
}

interface ProcessData {
    id: number | null;
    processOrder: number;
    title: string;
    startDate: string;
    endDate: string;
    durationDays: number;
    memo: string;
    assignmentDescription: string;
    status: 'COMPLETED' | 'IN_PROGRESS' | 'NOT_STARTED';
}

// interface ProcessFormData {
//     id: number | null;
//     title: string;
//     startDate: string;
//     endDate: string;
//     memo: string;
//     assignmentDescription: string;
// }

const ProcessSetting = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const { studyId } = useParams<{ studyId: string }>();

    const { data: studySourceData, isLoading: isStudyLoading } = useStudyQuery(studyId ?? '');
    const { data: processSourceData, isLoading: isProcessLoading } = useProcessQuery(studyId ?? '');

    const [studyData, setStudyData] = useState<StudyData>({
        name: '',
        topic: '',
        startDate: '',
        endDate: ''
    })
    const [processForm, setProcessForm] = useState('');
    const [processData, setProcessData] = useState<ProcessData[]>();

    const { mutate: updateStudyMutate, isPending: isUpdateStudyPending } = useUpdateStudyMutation(studyId ?? '');
    const { mutate: createProcessMutate, isPending: isCreateProcessPending } = useCreateProcessMutation(studyId ?? '');


    const isEditMode = location.state?.isEdit || (processSourceData && processSourceData.length > 0);


    // 맨 위 버튼
    const handleTopButton = () => {
        if (isEditMode) {
            navigate(`/studies/${studyId}`, { replace: true });
        } else {
            if (processSourceData && processSourceData.length === 0) {
                alert("프로세스를 최소 하나 등록해주세요.");
                return;
            }
            navigate(`/studies/${studyId}`, { replace: true });
        }
    }

    const handleStudyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setStudyData((prev) => ({ ...prev, [name]: value }));
        console.log(studyData)
    }

    // 스터디 소개 제출 버튼
    const handleUpdateStudy = () => {
        const regex = /^[가-힣a-zA-Z0-9\s]+$/;

        if (!regex.test(studyData.name) || !regex.test(studyData.topic)) {
            alert("한글, 영문, 숫자만 가능");
            return;
        }

        updateStudyMutate({ studyId, studyData });
    }

    const handleProcessChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const { name, value } = e.target;
        setProcessData((prev) =>
        (prev?.map((process, i) =>
            (i === index ? { ...process, [name]: value } : process)
        ))
        );
    }

    // 추천 프로세스 제출 버튼
    const handleCreateProcess = () => {
        createProcessMutate({ studyId, processForm });
    }

    // 스케줄 추가 버튼
    const handleAddSchedule = () => {
        if (!processData) return;

        const prevOrder: number = processData.length;

        const newSchdule: ProcessData = {
            id: null,
            processOrder: (prevOrder + 1),
            title: '',
            startDate: '',
            endDate: '',
            durationDays: 0,
            memo: '',
            assignmentDescription: '',
            status: 'NOT_STARTED'
        }

        setProcessData((prev) => [...prev, newSchdule]);
    }

    // 스터디 스케줄러 제출 버튼
    const handleUpdateProcess = () => {

    }


    // 데이터 없으면 메인 화면으로 이동
    useEffect(() => {
        if (isStudyLoading || isProcessLoading) return;

        if (!studyData) {
            navigate('/', { replace: true });
        }
    }, [isStudyLoading, isProcessLoading, studyData, processSourceData]);

    // 데이터 state에 저장
    useEffect(() => {
        if (!studySourceData) return;
        if (!processSourceData) return;

        setStudyData({
            name: studySourceData.studyName,
            topic: studySourceData.studyTopic,
            startDate: studySourceData.studyPeriod.startDate,
            endDate: studySourceData.studyPeriod.endDate
        })
        setProcessData(processSourceData);
    }, [studySourceData, processSourceData]);


    if (isStudyLoading || isProcessLoading) return <div>로딩 중...</div>
    if (!studyData || !processSourceData) return null

    return (
        <div className="max-w-[1400px] w-full mx-auto md:mt-0 2xl:mt-8 md:p-0 2xl:p-8 flex-1 md:scale-85 2xl:scale-100">

            {/* Header Section */}
            <div className="flex justify-between items-center font-semibold mb-4">
                <h1 className="text-4xl">스터디명 입력</h1>
                <button
                    onClick={handleTopButton}
                    className="bg-[#272727] hover:opacity-70 text-white px-5 py-1.5 rounded text-md transition-colors cursor-pointer">
                    {isEditMode ? '나가기' : '스터디 생성'}
                </button>
            </div>

            {/* Content Section */}
            <div className="grid grid-cols-12 gap-8">

                {/* Left Column */}
                <div className="col-span-4 bg-[#272727] p-5 rounded-sm flex flex-col gap-8">

                    {/* Section 1: Study Intro */}
                    <form>
                        <div className="flex justify-between items-center mb-2">
                            <h2 className="text-2xl font-semibold">스터디 소개</h2>
                            <button
                                type='button'
                                onClick={handleUpdateStudy}
                                className="text-xs font-semibold bg-[#393939] px-4 py-1 rounded hover:opacity-70 cursor-pointer"
                            >
                                {isUpdateStudyPending
                                ? isEditMode
                                    ? '수정 중...'
                                    : '등록 중...'
                                : isEditMode
                                    ? '수정하기'
                                    : '등록하기'}
                            </button>
                        </div>
                        <div className="bg-[#393939] h-40 p-3 rounded text-sm flex flex-col justify-center gap-2">
                            <div className='flex flex-col gap-1'>
                                <label htmlFor='name' className='text-[#4AFFFC]'>[ 스터디명 ]</label>
                                <input
                                    type='text'
                                    id='name'
                                    name='name'
                                    value={studyData.name}
                                    onChange={handleStudyChange}
                                    className='w-full'
                                />
                            </div>
                            <div className='flex flex-col gap-1'>
                                <label htmlFor='topic' className='text-[#4AFFFC]'>[ 주제 ]</label>
                                <input
                                    type='text'
                                    id='topic'
                                    name='topic'
                                    value={studyData.topic}
                                    onChange={handleStudyChange}
                                    className='w-full'
                                />
                            </div>
                            <div className='flex flex-col gap-1'>
                                <label htmlFor='startDate' className='text-[#4AFFFC]'>[ 기간 ]</label>
                                <div className='flex gap-2'>
                                    <input
                                        type='date'
                                        id='startDate'
                                        name='startDate'
                                        value={studyData.startDate}
                                        onChange={handleStudyChange}
                                    />
                                    ~
                                    <input
                                        type='date'
                                        name='endDate'
                                        value={studyData.endDate}
                                        onChange={handleStudyChange}
                                    />
                                </div>
                            </div>
                        </div>
                    </form>

                    {/* Section 2: Recommended Process */}
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <h2 className="text-2xl font-semibold">추천 프로세스</h2>
                            <button
                                onClick={handleCreateProcess}
                                disabled={isCreateProcessPending}
                                className={`text-xs px-4 py-1 rounded bg-[#393939]
                                    ${isCreateProcessPending
                                        ? 'opacity-70'
                                        : 'hover:opacity-70 cursor-pointer'}`}
                            >
                                {isCreateProcessPending ? '등록 중...' : '등록하기'}
                            </button>
                        </div>
                        <input
                            type='text'
                            value={processForm}
                            onChange={(e) => {
                                setProcessForm(e.target.value);
                            }}
                            placeholder='스터디 주제를 상세히 입력해주세요.'
                            className="bg-[#393939] h-60 w-full p-4 pb-50 rounded text-sm placeholder:text-white">
                        </input>
                    </div>
                </div>

                {/* Right Column (Merged into 1 Box) */}
                <div className="col-span-8 bg-[#272727] p-5 rounded-sm flex flex-col gap-10">

                    {/* 1. Invite Code Section */}
                    <div className='font-semibold px-1'>
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

                        <div className='px-1'>
                            <div className='flex font-semibold justify-between items-end'>
                                <h2 className="text-2xl">스터디 스케줄러</h2>
                                <button
                                    onClick={handleUpdateProcess}
                                    className="text-xs bg-[#393939] px-4 py-1 rounded hover:opacity-70 cursor-pointer">
                                    {isEditMode ? '저장하기' : '등록하기'}
                                </button>
                            </div>
                            <p className="text-xs">~를 눌러서 수정</p>
                        </div>

                        {/* Table Header */}
                        <div className="grid grid-cols-20 gap-2 text-center px-1 py-2 text-2xl">
                            <div className="col-span-2 bg-[#393939] flex items-center justify-center rounded ">상태</div>
                            <div className="col-span-6 bg-[#393939] flex items-center justify-center rounded">날짜</div>
                            <div className="col-span-7 bg-[#393939] flex items-center justify-center rounded">프로세스</div>
                            <div className="col-span-5 bg-[#393939] flex items-center justify-center rounded">메모</div>
                        </div>

                        {/* Table Body (Scrollable Area) */}
                        <div className={`overflow-y-auto h-[235px] space-y-2
                                [&::-webkit-scrollbar]:w-1
                                [&::-webkit-scrollbar-track]:bg-transparent
                                [&::-webkit-scrollbar-thumb]:bg-[#555]
                                [&::-webkit-scrollbar-thumb]:rounded-full
                                [&::-webkit-scrollbar-button]:hidden    
                            `}>
                            {processData?.map((process, index) => (

                                <div key={process.processOrder} className="grid grid-cols-20 gap-2 px-1 text-sm h-10 shrink-0">

                                    {/* Status Badge */}
                                    <div className="col-span-2 bg-[#393939] flex items-center justify-center text-lg rounded">
                                        {process.status === 'COMPLETED' && (
                                            <span>완료</span>
                                        )}
                                        {process.status === 'IN_PROGRESS' && (
                                            <span>진행 중</span>
                                        )}

                                    </div>

                                    {/* Date */}
                                    <div className="col-span-6 bg-[#393939] font-semibold flex gap-1 items-center justify-center rounded">
                                        <input
                                            type='date'
                                            name='startDate'
                                            value={process.startDate}
                                            onChange={(e) => { handleProcessChange(e, index) }}
                                            className='w-[43%]'
                                        />
                                        ~
                                        <input
                                            type='date'
                                            name='endDate'
                                            value={process.endDate}
                                            onChange={(e) => { handleProcessChange(e, index) }}
                                            className='w-[43%]'
                                        />
                                    </div>

                                    {/* Process (Track + Title) */}
                                    <div className="col-span-7 bg-[#393939] font-semibold flex items-center px-2 rounded">
                                        <label htmlFor={`title${process.id}`} className="text-black text-[10px] px-2 py-0.5 mr-2 min-w-fit rounded-full bg-gradient-to-r from-custom-gradient-blue to-custom-gradient-green">
                                            Track {process.processOrder}
                                        </label>
                                        <input
                                            type='text'
                                            id={`title${process.id}`}
                                            name='title'
                                            value={process.title}
                                            onChange={(e) => { handleProcessChange(e, index) }}
                                            className='truncate'
                                        />
                                    </div>

                                    {/* Memo */}
                                    <div className="col-span-5 bg-[#393939] font-semibold flex items-center px-2 rounded">
                                        <input
                                            type='text'
                                            name='memo'
                                            value={process.memo}
                                            onChange={(e) => { handleProcessChange(e, index) }}
                                            className='truncate max-w-full'
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Add Button */}
                        <button
                            onClick={handleAddSchedule}
                            className="w-full bg-[#393939] hover:opacity-70 h-10 mt-1.5 rounded flex items-center justify-center transition-colors text-4xl shrink-0 cursor-pointer"
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