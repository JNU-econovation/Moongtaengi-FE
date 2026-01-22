import { useRef, useState } from "react";
import { useSendCommentMutation } from "../hooks/mutations/useSendCommetMutation";

interface Params {
    submissionId: number;
}

export const Comment = ({submissionId}: Params) => {

    const { mutate } = useSendCommentMutation();

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

        mutate({submissionId, commentInput}, {
            onSuccess: () => {
                setCommentInput('');
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
                    <p className='text-3xl'>UI 개설</p>
                    <p>매코미통닭발</p>
                </div>
            </header>

            <main className='flex-1 min-h-0 flex flex-col gap-2 md:p-4 2xl:p-6'>
                <p className='text-white text-sm'>2개의 댓글들</p>
                <div className={`flex-1 overflow-y-auto md:max-h-100 2xl:max-h-133 pr-1 flex flex-col items-center md:gap-1 2xl:gap-2 
                                [&::-webkit-scrollbar]:w-1
                                [&::-webkit-scrollbar-track]:bg-transparent
                                [&::-webkit-scrollbar-thumb]:bg-[#555]
                                [&::-webkit-scrollbar-thumb]:rounded-full
                                [&::-webkit-scrollbar-button]:hidden `}
                >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(() => (
                        <div className='w-full p-2 bg-[#393939] rounded'>
                            <div className='flex'>
                                <div className='shrink-0 border w-10 h-10 rounded-full'>
                                    아이콘
                                </div>
                                <div className='flex-1 bg-black'>
                                    dfasfasdfadsf
                                </div>
                                <div className='shrink-0'>
                                    ❤️
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
                        onChange={(e) => {
                            setCommentInput(e.target.value);
                            handleResizeHeight();
                        }}
                        placeholder='여기에 내용을 입력하세요.'
                        className='md:w-[90%] 2xl:w-[94%] max-h-27 md:min-h-6 2xl:min-h-10 resize-none bg-white rounded-[20px] text-black px-4 md:pr-6 2xl:pr-10 md:py-1 2xl:py-2 placeholder:text-black mt-2 ml-3 mb-4 overflow-hidden'
                    />
                    <button
                        onClick={handleSubmit}
                        className='absolute md:bottom-5 2xl:bottom-6 right-6 text-black cursor-pointer'>
                        d^
                    </button>
                </div>
            </footer>
        </aside>
    )
}