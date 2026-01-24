import { useRef, useState } from "react";
import { useSendCommentMutation } from "../hooks/mutations/useSendCommetMutation";
import { useCommentQuery } from "../hooks/queries/useCommentQuery";
import { useQueryClient } from "@tanstack/react-query";
import upArrow from '../assets/icons/comment/up-arrow.svg';
import { formatDateToDot } from "../utils/formatDateToDot";
import { useParams } from "react-router-dom";
import { useAssignmentSingleQuery } from "../hooks/queries/useAssignmentSingleQuery";

interface Params {
    submissionId: number;
}

export const Comment = ({ submissionId }: Params) => {

    const { assignmentId } = useParams<"assignmentId">();
    const {data: assignmentData} = useAssignmentSingleQuery(Number(assignmentId));
    const { data: commentList = [] } = useCommentQuery(submissionId);
    const { mutate } = useSendCommentMutation();

    const queryClient = useQueryClient();

    console.log(commentList);

    const [commentInput, setCommentInput] = useState('');

    // 댓글 입력 박스 높이 조절을 위한 ref
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // 댓글 입력 박스 높이 조절 핸들
    const handleResizeHeight = () => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto'; // 높이 초기화
            textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px' // 높이 조절
        }
    }

    const handleSubmit = () => {
        if (!commentInput.trim()) return;

        console.log(commentInput)

        mutate({ submissionId, commentInput }, {
            onSuccess: () => {
                setCommentInput('');
                queryClient.invalidateQueries({ queryKey: ['comment'] })
                console.log('댓글 업로드 성공');
            },
            onError: (error) => {
                console.error(error);
            }
        });
    }

    return (
        <aside className='absolute top-0 right-0 md:w-66 2xl:w-90 h-full bg-[#272727] flex flex-col gap-2 z-30'>

            <header className='md:px-4 md:py-6 2xl:p-6 pt-8 shrink-0'>
                <div className='flex flex-col gap-1'>
                    <p className='text-3xl'>{assignmentData?.assignmentDescription}</p>
                    <p>{assignmentData?.nickname}</p>
                </div>
            </header>

            <main className='flex-1 min-h-0 flex flex-col gap-2 md:p-4 2xl:p-6'>
                <p className='text-white text-sm'>
                    {commentList?.length}개의 댓글들
                </p>
                <div className={`flex-1 overflow-y-auto md:max-h-100 2xl:max-h-154 pr-1 flex flex-col items-center md:gap-1 2xl:gap-2 
                                [&::-webkit-scrollbar]:w-1
                                [&::-webkit-scrollbar-track]:bg-transparent
                                [&::-webkit-scrollbar-thumb]:bg-[#555]
                                [&::-webkit-scrollbar-thumb]:rounded-full
                                [&::-webkit-scrollbar-button]:hidden `}
                >
                    {commentList.map((comment, index) => (
                        <div
                            key={index}
                            className='w-full p-2 bg-[#393939] rounded'
                        >
                            <div className='flex gap-2'>
                                <div className="max-w-10 max-h-10 rounded-full overflow-hidden relative">
                                    <img
                                        src={comment.profileImageUrl}
                                        className='w-full h-full object-cover object-center'
                                        alt="profile"
                                    />
                                </div>
                                <div className='flex-1 flex flex-col'>
                                    <div className="flex gap-2">
                                        <div className="font-semibold">
                                            {comment.nickname}
                                        </div>
                                        <div className="text-[#6D6D6D]">
                                            {formatDateToDot(comment.createdAt.split("T")[0])}
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        {comment.content}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            <footer className='bg-[#393939]'>
                <div className='relative flex items-end'>
                    <textarea
                        ref={textareaRef}
                        rows={1}
                        value={commentInput}
                        onKeyDown={(e) => {
                            if (e.nativeEvent.isComposing) return;
                            if (e.key === 'Enter') {
                                handleSubmit();
                                e.currentTarget.blur();
                            }
                        }}
                        onChange={(e) => {
                            setCommentInput(e.target.value);
                            handleResizeHeight();
                        }}
                        placeholder='여기에 내용을 입력하세요.'
                        className='md:w-[90%] 2xl:w-[94%] max-h-27 md:min-h-6 2xl:min-h-10 resize-none bg-white rounded-[20px] text-black px-4 md:pr-6 2xl:pr-10 md:py-1 2xl:py-2 placeholder:text-black mt-2 ml-3 mb-4 overflow-hidden'
                    />
                    <button
                        onClick={handleSubmit}
                        className='absolute md:bottom-5 2xl:bottom-6 right-5 text-black cursor-pointer'
                    >
                        <img
                            src={upArrow}
                            className="object-contain"
                        />
                    </button>
                </div>
            </footer>
        </aside>
    )
}