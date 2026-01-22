import { useNavigate, useParams } from "react-router-dom"
import heroBg from '../assets/images/assignment/hero-bg.png'
import heroMoong from "../assets/images/assignment/hero-moong.png"
import downArrow from "../assets/icons/common/down-arrow.svg";
import hamburgerBar from "../assets/icons/assignmentEdit/hamburgerBarIcon.svg";
import { useState } from "react";
import { Comment } from "../components/Comment";
import { useAssignmentSingleQuery } from "../hooks/queries/useAssignmentSingleQuery";

export const Assignment = () => {
    const navigate = useNavigate();

    const { studyId, processId, assignmentId } = useParams<"studyId" | "processId" | "assignmentId">();

    const { data: assignmentData } = useAssignmentSingleQuery(Number(assignmentId));
    console.log(assignmentData);

    const [commentOpen, setCommentOpen] = useState(false);

    return (
        <div className="relative w-full h-full overflow-hidden">

            <div className="absolute inset-0 z-0">
                <img
                    src={heroBg}
                    className="w-full h-full object-cover"
                    style={{
                        WebkitMaskImage: `
                            linear-gradient(to top, black 60%, transparent 100%),
                            linear-gradient(to bottom, black 60%, transparent 100%),
                            linear-gradient(to left, black 70%, transparent 100%),
                            linear-gradient(to right, black 70%, transparent 100%)
                            `,
                        maskImage: `
                            linear-gradient(to top, black 60%, transparent 100%),
                            linear_gradient(to bottom, black 60%, transparent 100%),
                            linear-gradient(to left, black 70%, transparent 100%),
                            linear-gradient(to right, black 70%, transparent 100%)
                            `,
                        WebkitMaskComposite: 'source-in',
                        maskComposite: 'intersect'
                    }}
                />
            </div>

            <main className="relative w-full h-full flex flex-col">

                <div className='relative w-full py-12 flex items-center z-50'>
                    {/* 뒤로가기, 댓글 버튼 */}
                    <button
                        onClick={() => { navigate(`/studies/${studyId}`) }}
                        className="absolute left-8 w-10 h-10 rounded-full bg-[#272727] flex items-center justify-center cursor-pointer hover:opacity-70">
                        <img src={downArrow} className='invert rotate-90 w-[40%]' />
                    </button>
                    <button
                        onClick={() => { setCommentOpen(!commentOpen) }}
                        className={`absolute right-8 w-10 h-10 rounded-full ${commentOpen ? 'bg-white' : 'bg-[#2a2a2a]'} flex items-center justify-center hover:opacity-70 cursor-pointer`}>
                        <img src={hamburgerBar} className='w-[40%] invert' />
                    </button>
                </div>

                <div className="flex items-center w-full md:px-40 2xl:px-60 md:py-0 2xl:py-20 md:scale-85 2xl:scale-100 z-10">

                    {/* 텍스트 영역 */}
                    <div className="flex-1 flex flex-col items-start" >
                        <div className="flex flex-col gap-4 mb-20">
                            <p className="text-custom-gradient-blue text-4xl">
                                {assignmentData?.studyName}
                            </p>
                            <p className="text-7xl">
                                {assignmentData?.assignmentDescription}
                            </p>
                        </div>

                        <p className="font-semibold mb-4">
                            현재 레벨: {assignmentData?.memberTitle}
                        </p>

                        <div className="flex items-center justify-center gap-3">
                            <div className="border rounded-full w-15 h-15 flex items-center justify-center">
                                이미지
                            </div>
                            <div className="font-semibold text-lg">
                                <p>{assignmentData?.nickname}</p>
                                <p className="text-[#A0A0A0]">{assignmentData?.submitTime}</p>
                            </div>
                        </div>
                    </div>

                    {/* 캐릭터 영역 */}
                    <div className="flex-1 flex justify-end">
                        <div className="w-100">
                            <img
                                src={heroMoong}
                                className="w-full h-full object-contain"
                            />
                        </div>
                    </div>
                </div>

                {/* 이동 버튼 */}
                <div className="pt-6 w-full flex justify-center">
                    <button
                        onClick={() => { 
                            assignmentData?.isOwner
                            ? navigate(`/studies/${studyId}/processes/${processId}/assignments/${assignmentId}/edit`) 
                            : assignmentData?.submissionId
                                ? navigate(`/studies/${studyId}/processes/${processId}/assignments/${assignmentId}/view`)
                                : alert('아직 한 번도 작성되지 않은 과제입니다.');
                        }}
                        className="bg-white text-[#6D6D6D] font-semibold px-6 py-4 rounded-full hover:opacity-70 cursor-pointer"
                    >
                        {assignmentData?.isOwner ? '스터디 과제 작성하기' : '과제 확인하기'}
                    </button>
                </div>
            </main>

            {commentOpen && (
                <Comment />
            )}
        </div>
    )
}