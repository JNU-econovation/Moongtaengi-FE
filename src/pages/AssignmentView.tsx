import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown"; // 마크다운 렌더링용 라이브러리
import downArrow from "../assets/icons/common/down-arrow.svg";
import hamburgerBar from "../assets/icons/assignmentEdit/hamburgerBarIcon.svg";
import fileIcon from "../assets/icons/assignmentEdit/fileIcon.svg";
import { useAssignmentSingleQuery } from "../hooks/queries/useAssignmentSingleQuery";
import { useEmojiMutation } from "../hooks/mutations/useEmojiMutation";

// 목데이터: 마크다운 문자열
const MOCK_MARKDOWN = `
## 필요 없는 UI를 제거하여
# 가시성을 높이려고 했습니다

전체적인 느낌을 보라색으로 가져가서 작업했어요. 
사용자가 집중할 수 있도록 불필요한 요소를 배제하고, 핵심 콘텐츠가 돋보이도록 레이아웃을 구성했습니다.

![예시 이미지](https://via.placeholder.com/600x300/5f4b8b/ffffff?text=Example+Image)

---
===

- **심플한 디자인**: 복잡한 메뉴 제거
- **컬러 팔레트**: 다크 모드 기반의 퍼플 포인트
`;

// 목데이터: 리액션 정보
const EMOJI_LIST = [
    { type: "HEART", icon: "❤️" },
    { type: "CLAP", icon: "👏" },
    { type: "SURPRISED", icon: "😮" },
    { type: "SAD", icon: "😢" },
    { type: "EYES_HEART", icon: "😍" },
] as const;


export const AssignmentView = () => {
    const navigate = useNavigate();
    const { studyId, processId, assignmentId } = useParams<"studyId" | "processId" | "assignmentId">();
    const { data: assignmentData } = useAssignmentSingleQuery(Number(assignmentId));
    const { mutate: emojiMutate } = useEmojiMutation();

    console.log(assignmentData);

    const [commentOpen, setCommentOpen] = useState(false);

    return (
        <div className="h-full flex flex-col relative bg-[#121212]">
            {/* 뒤로가기, 댓글 */}
            <div className='relative w-full h-24 flex items-center shrink-0 md:mb-2 2xl:mb-10 z-40 px-8'>
                <button
                    onClick={() => { navigate(`/studies/${studyId}/processes/${processId}/assignments/${assignmentId}`) }}
                    className="absolute left-8 w-10 h-10 rounded-full bg-[#272727] flex items-center justify-center hover:opacity-70 cursor-pointer"
                >
                    <img src={downArrow} className='invert rotate-90 w-[40%]' alt="back" />
                </button>
                <button
                    onClick={() => { setCommentOpen(!commentOpen) }}
                    className={`absolute right-8 w-10 h-10 rounded-full ${commentOpen ? 'bg-white' : 'bg-[#2a2a2a]'} flex items-center justify-center hover:opacity-70 cursor-pointer`}
                    disabled={!assignmentData?.submissionId}
                >
                    <img src={hamburgerBar} className='w-[40%]' alt="menu" />
                </button>
            </div>

            {/* 메인 콘텐츠 영역 (중앙 정렬 + 마크다운 렌더링) */}
            <div className="flex-1 flex flex-col justify-center items-center overflow-hidden pb-24 px-4">
                <div className="p-2 w-full max-w-5xl">

                    {/* 1. 배경 및 외관 담당 */}
                    <div className="w-full min-h-[46vh] max-h-[60vh] bg-[#1E1E1E] rounded-xl shadow-2xl pr-2 py-2 flex flex-col">

                        {/* 2. 실제 스크롤 담당 영역 */}
                        <div className={`w-full h-full overflow-y-auto md:pl-8 md:pr-6 2xl:pl-10 2xl:pr-8
                            [&::-webkit-scrollbar]:w-1.5
                            [&::-webkit-scrollbar-track]:bg-transparent
                            [&::-webkit-scrollbar-thumb]:bg-[#625E5E]
                            [&::-webkit-scrollbar-thumb]:rounded-full
                            [&::-webkit-scrollbar-thumb]:bg-clip-padding 
                            [&::-webkit-scrollbar-button]:hidden`}>

                            <article className="prose prose-invert prose-lg max-w-none py-6">
                                <ReactMarkdown>
                                    {assignmentData?.submissionContent}
                                </ReactMarkdown>
                            </article>
                        </div>
                    </div>
                </div>
                <div className="bg-[#272727] w-[53.5%] px-5 py-2 flex items-center rounded-xl text-[#5F5F5F] text-lg">
                    <img
                        src={fileIcon}
                        className='w-[3%] mr-2'
                    />
                    {assignmentData?.submissionFileUrl
                        ? (
                            <a
                                href={assignmentData.submissionFileUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                download={assignmentData.submissionFileName}
                                className="cursor-pointer hover:text-[#D5D5D5] transition-colors underline-offset-4 hover:underline"
                            >
                                {assignmentData.submissionFileName}
                            </a>
                        )
                        : (
                            <span>파일이 없습니다.</span>
                        )
                    }
                </div>
            </div>

            {/* 하단 리액션 바 (플로팅) */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-50">
                <div className="bg-[#272727] px-6 py-1 rounded-full flex gap-4 items-center shadow-lg border border-[#333]">
                    {EMOJI_LIST.map(({ type, icon }) => {
                        const data = assignmentData?.reactions?.find((r) => r.emojiType === type);
                        const count = data?.count ?? 0;
                        const isClicked = data?.isClicked ?? false;

                        return (
                            <button
                                key={type}
                                onClick={() => { emojiMutate(type) }}
                                className={`flex flex-col items-center justify-center hover:scale-110 transition-transform cursor-pointer ${isClicked ? 'opacity-100 scale-110' : 'opacity-70'}`}
                            >
                                <span className="text-2xl">{icon}</span>
                                <span className="text-sm text-[#D5D5D5]">{count}</span>
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};