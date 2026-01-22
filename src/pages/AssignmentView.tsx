import { useState, useEffect } from "react"; // useEffect 추가
import { useNavigate, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import downArrow from "../assets/icons/common/down-arrow.svg";
import hamburgerBar from "../assets/icons/assignmentEdit/hamburgerBarIcon.svg";
import fileIcon from "../assets/icons/assignmentEdit/fileIcon.svg";
import { useAssignmentSingleQuery } from "../hooks/queries/useAssignmentSingleQuery";
import { useEmojiMutation } from "../hooks/mutations/useEmojiMutation";
import { Comment } from "../components/Comment";

const EMOJI_LIST = [
    { emojiType: "HEART", icon: "❤️" },
    { emojiType: "CLAP", icon: "👏" },
    { emojiType: "SURPRISED", icon: "😮" },
    { emojiType: "SAD", icon: "😢" },
    { emojiType: "EYES_HEART", icon: "😍" },
] as const;

export const AssignmentView = () => {
    const navigate = useNavigate();
    const { studyId, processId, assignmentId } = useParams<"studyId" | "processId" | "assignmentId">();
    const { data: assignmentData } = useAssignmentSingleQuery(Number(assignmentId));
    const { mutate: emojiMutate } = useEmojiMutation();

    const [commentOpen, setCommentOpen] = useState(false);

    // 1. 리액션 상태를 로컬 state로 관리 (초기값은 서버 데이터 혹은 빈 배열)
    const [reactions, setReactions] = useState(assignmentData?.reactions || []);

    // 2. 서버에서 새로운 assignmentData가 오면(재요청 완료 시) state 동기화
    useEffect(() => {
        if (assignmentData?.reactions) {
            setReactions(assignmentData.reactions);
        }
    }, [assignmentData]);

    // 3. 클릭 핸들러: UI를 먼저 업데이트하고(Optimistic), 서버 요청 보냄
    const handleEmojiClick = (selectedEmoji: string) => {
        // UI 즉시 업데이트
        setReactions((prev) => {
            const exists = prev.find((r) => r.emojiType === selectedEmoji);

            // 이미 리액션 데이터가 있는 경우 (count 증감)
            if (exists) {
                return prev.map((r) => {
                    if (r.emojiType === selectedEmoji) {
                        return {
                            ...r,
                            isClicked: !r.isClicked,
                            count: r.isClicked ? r.count - 1 : r.count + 1,
                        };
                    }
                    return r;
                });
            }
            // 리액션 데이터가 아예 없는 경우 (새로 추가)
            else {
                return [
                    ...prev,
                    { emojiType: selectedEmoji as any, count: 1, isClicked: true }
                ];
            }
        });

        // 서버 요청
        emojiMutate({
            submissionId: assignmentData?.submissionId ?? 0,
            emojiType: selectedEmoji as any
        });
    };

    return (
        <div className="h-full flex flex-col relative">
            {/* 뒤로가기, 댓글 버튼 영역 */}
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

            {/* 메인 콘텐츠 영역 */}
            <div className="flex-1 flex flex-col justify-center items-center overflow-hidden pb-24 px-4">
                <div className="p-2 w-full max-w-5xl">
                    <div className="w-full min-h-[46vh] max-h-[60vh] bg-[#1E1E1E] rounded-xl shadow-2xl pr-2 py-2 flex flex-col">
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
                    <img src={fileIcon} className='w-[3%] mr-2' alt="file" />
                    {assignmentData?.submissionFileUrl ? (
                        <a
                            href={assignmentData.submissionFileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            download={assignmentData.submissionFileName}
                            className="cursor-pointer hover:text-[#D5D5D5] transition-colors underline-offset-4 hover:underline"
                        >
                            {assignmentData.submissionFileName}
                        </a>
                    ) : (
                        <span>파일이 없습니다.</span>
                    )}
                </div>
            </div>

            {/* 하단 리액션 바 (수정됨: state 사용) */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-50">
                <div className="bg-[#272727] px-6 py-1 rounded-full flex gap-4 items-center shadow-lg border border-[#333]">
                    {EMOJI_LIST.map(({ emojiType, icon }) => {
                        // assignmentData 대신 local state인 reactions를 바라봄
                        const data = reactions.find((r) => r.emojiType === emojiType);
                        const count = data?.count ?? 0;
                        const isClicked = data?.isClicked ?? false;

                        return (
                            <button
                                key={emojiType}
                                onClick={() => handleEmojiClick(emojiType)}
                                className={`flex flex-col items-center justify-center hover:scale-110 transition-transform cursor-pointer ${isClicked ? 'opacity-100 scale-110' : 'opacity-70'}`}
                            >
                                <span className="text-2xl">{icon}</span>
                                <span className="text-sm text-[#D5D5D5]">{count}</span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {commentOpen && assignmentData?.submissionId && (
                <Comment submissionId={assignmentData.submissionId} />
            )}
        </div>
    );
};