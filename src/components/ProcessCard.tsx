import { useNavigate } from 'react-router-dom';
import cardPrimaryMoong from '../assets/images/process/card-primary-moong.png';
import { formatDateToWord } from "../utils/formatDateToWord";
import { useAssignmentListQuery } from '../hooks/queries/useAssignmentListQuery';
import { useAuthStore } from '../stores/useAuthStore';
import { useEffect, useState } from 'react';
import { useAssignAssignmentMutation } from '../hooks/mutations/useAssignAssignmentMutation';
import { useUpdateAssignmentMutation } from '../hooks/mutations/useUpdateAssignmentMutation';

interface ProcessType {
    id: number;
    processOrder: number;
    title: string;
    startDate: string;
    endDate: string;
    durationDays: number;
    memo: string;
    assignmentDescription: string;
    status: 'COMPLETED' | 'IN_PROGRESS' | 'NOT_STARTED';
}

interface AssignmentType {
    assignmentId: number | null;
    submissionId: number | null;
    memberId: number;
    nickname: string;
    assignmentDescription: string;
    fileName: string;
    fileUrl: string;
    status: 'WAITING' | 'SUBMITTED' | 'APPROVED' | null;
    isLate: boolean;
}

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
    processData: ProcessType[];
    process: ProcessType;
    scrollRefs: React.MutableRefObject<{
        [key: number]: HTMLDivElement | null;
    }>;
    itemRefs: React.MutableRefObject<{
        [key: number]: HTMLDivElement | null;
    }>;
    handleScroll: (arg1: number, arg2: 'left' | 'right') => void;
}

export const ProcessCard = ({ studyData, processData, process, scrollRefs, itemRefs, handleScroll }: Params) => {

    const navigate = useNavigate();
    const userId = useAuthStore((s) => s.userId);
    const nickname = useAuthStore((s) => s.userNickname);
    const { data: assignmentList = [] } = useAssignmentListQuery(process.id);
    
    console.log('과제 리스트', assignmentList);

    if (!userId) return null;

    const myAssignment: AssignmentType =
        assignmentList.find((assignment) => (assignment.memberId === userId)) ||
        {
            assignmentId: null,
            submissionId: null,
            memberId: userId,
            nickname: nickname || '나',
            assignmentDescription: '',
            fileName: '',
            fileUrl: '',
            status: null,
            isLate: false,
        }

    const otherAssignmentList: AssignmentType[] = assignmentList.filter((assignment) => (assignment.memberId !== userId));

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
                        <button 
                            onClick={() => { navigate(`/studies/${studyData.studyId}/setting`, { state: { idEdit: true } }) }}
                            className="bg-[#272727] px-3 py-1 rounded-full hover:opacity-70 cursor-pointer"
                        >
                            수정하기
                        </button>
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
                    <div
                        onClick={() => {
                            console.log('과제 리스트', assignmentList);
                            myAssignment.assignmentId
                                ? navigate(`/studies/${studyData.studyId}/processes/${process.id}/assignments/${myAssignment.assignmentId}`)
                                : alert('아직 할당되지 않은 과제입니다.')
                        }}
                        className="md:w-80 md:shrink-0 aspect-square bg-[#272727] rounded-2xl p-6 flex flex-col justify-between hover:opacity-70 transition-colors cursor-pointer">
                        <div className='flex flex-col items-start gap-2'>
                            <AssignmentInput
                                processId={process.id}
                                memberId={userId}
                                initialDescription={myAssignment.assignmentDescription}
                                assignmentId={myAssignment.assignmentId}
                                myRole={studyData.myRole}
                            />
                            <div className={`bg-[#3E3E3E] px-2 text-sm rounded-full text-white
                                ${AssignmentStatus(myAssignment) === '기간초과' && 'text-[#FF2935]'}
                                ${AssignmentStatus(myAssignment) === '제출완료' && 'text-[#2FE9FD]'}`}
                            >
                                {AssignmentStatus(myAssignment)}
                            </div>
                        </div>
                        <div
                            ref={(el) => { itemRefs.current[process.processOrder] = el; }}
                            className="flex items-center gap-2 mt-4 pt-4"
                        >
                            <div className="w-10 h-10 bg-[#AFAEAE] rounded-full flex items-center justify-center">
                                Me
                            </div>
                            <div className="flex flex-col">
                                <span className="font-semibold">(나) {myAssignment.nickname}</span>
                                <span className="text-sm text-[#F9F9F9]">{myAssignment.fileName}일단 아무거나</span>
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
                        {
                            otherAssignmentList.map((assignment, index) => (
                                <div
                                    key={index}
                                    onClick={() => {
                                        console.log('과제 리스트', assignmentList);
                                        assignment.assignmentId
                                            ? navigate(`/studies/${studyData.studyId}/processes/${process.id}/assignments/${assignment.assignmentId}`)
                                            : alert('아직 할당되지 않은 과제입니다.')
                                    }}
                                    className="shrink-0 w-80 aspect-square bg-[#272727] rounded-2xl p-6 flex flex-col justify-between hover:opacity-70 transition-colors cursor-pointer"
                                >
                                    <div className='flex flex-col items-start gap-2'>
                                        <AssignmentInput
                                            processId={process.id}
                                            memberId={assignment.memberId}
                                            initialDescription={assignment.assignmentDescription}
                                            assignmentId={assignment.assignmentId}
                                            myRole={studyData.myRole}
                                        />
                                        <div className={`bg-[#3E3E3E] px-2 text-sm rounded-full text-white
                                            ${AssignmentStatus(assignment) === '기간초과' && 'text-[#FF2935]'}
                                            ${AssignmentStatus(assignment) === '제출완료' && 'text-[#2FE9FD]'}`}
                                        >
                                            {AssignmentStatus(assignment)}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 mt-4 pt-4">
                                        <div className="w-10 h-10 bg-[#AFAEAE] rounded-full flex items-center justify-center">
                                            Me
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="font-semibold">{assignment.nickname}</span>
                                            <span className="text-sm text-[#F9F9F9]">{assignment.fileName} 일단 아무거나</span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
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

const AssignmentStatus = (myAssignment: AssignmentType) => {
    if (myAssignment.status === null) return '미제출';

    if (myAssignment.status !== 'WAITING') return '제출완료';

    return myAssignment.isLate ? '기간초과' : '미제출';
}


interface AssignmentInputProps {
    processId: number;
    memberId: number;
    initialDescription: string;
    assignmentId: number | null;
    myRole: 'HOST' | 'GUEST';
}

const AssignmentInput = ({ processId, memberId, initialDescription, assignmentId, myRole }: AssignmentInputProps) => {
    const [description, setDescription] = useState(initialDescription || '');

    useEffect(() => {
        setDescription(initialDescription || '');
    }, [initialDescription]);

    const { mutate: assignMutate } = useAssignAssignmentMutation(processId);
    const { mutate: updateMutate } = useUpdateAssignmentMutation(processId); 

    const handleSave = () => {
        // 변경 사항이 없거나 내용이 비어있으면 API 호출 스킵
        if (description === initialDescription) return;


        // API 호출 로직
        console.log("API Call Triggered:", { processId, assigneeId: memberId, description });

        if (!assignmentId) {
            assignMutate({
                processId,
                assigneeId: memberId,
                description
            });
            return;
        }

        updateMutate({
            assignmentId,
            description
        })
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.nativeEvent.isComposing) return; // 한글 조합 중 중복 이벤트 방지

        if (e.key === 'Enter') {
            e.currentTarget.blur(); // 포커스를 해제하여 onBlur 이벤트를 트리거함
        }
    };

    return (
        <input
            type='text'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            onBlur={handleSave}
            onKeyDown={handleKeyDown}
            onClick={(e) => e.stopPropagation()}
            disabled={myRole === 'GUEST'}
            className="text-3xl font-semibold mt-6 placeholder:text-white bg-transparent outline-none w-full text-white"
            placeholder="눌러서 과제 할당"
        />
    );
};