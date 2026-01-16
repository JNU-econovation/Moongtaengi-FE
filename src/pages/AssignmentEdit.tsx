import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image'
import { Markdown } from 'tiptap-markdown';
import { useRef, useState } from 'react';
import downArrow from "../assets/icons/common/down-arrow.svg";
import hamburgerBar from "../assets/icons/assignmentEdit/hamburgerBarIcon.svg";
import boldIcon from "../assets/icons/assignmentEdit/boldIcon.svg";
import italicIcon from "../assets/icons/assignmentEdit/italicIcon.svg";
import underlineIcon from "../assets/icons/assignmentEdit/underlineIcon.svg";
import strikeIcon from "../assets/icons/assignmentEdit/strikeIcon.svg";
import imageIcon from "../assets/icons/assignmentEdit/imageIcon.svg";
import fileIcon from "../assets/icons/assignmentEdit/fileIcon.svg";
import { useUploadFile } from '../hooks/useUploadFile';
import { useNavigate, useParams } from 'react-router-dom';


export const AssignmentEdit = () => {
    const navigate = useNavigate();
    const { studyId, processId, assignmentId } = useParams<"studyId" | "processId" | "assignmentId">();
    const uploadFile = useUploadFile();

    const [_, forceUpdate] = useState(0);

    const [commentOpen, setCommentOpen] = useState(false);
    const [commentInupt, setCommentInput] = useState('');

    const [fileName, setFileName] = useState('');

    // 파일 임베딩을 요청하기 위한 ref
    const imageInputRef = useRef<HTMLInputElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // 댓글 입력 박스 높이 조절을 위한 ref
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const editor = useEditor({
        extensions: [
            StarterKit,
            Markdown,
            Image,
        ],
        content: '',
        editorProps: {
            attributes: {
                class: 'max-w-none min-h-[400px] p-2 focus:outline-none',
            },
        },
        onTransaction: () => {
            forceUpdate((prev) => prev + 1);
        }
    });


    if (!editor) {
        return null;
    }

    const handleDropImage = async (e: React.DragEvent) => {
        e.preventDefault();

        const file = e.dataTransfer.files[0];
        if (!file) return;

        const { clientX, clientY } = e;
        const pos = editor.view.posAtCoords({ left: clientX, top: clientY });

        if (!pos) return;

        try {
            const url = await uploadFile(file);

            if (url) {
                editor.chain().focus().insertContentAt(pos.pos, {
                    type: "image",
                    attrs: { src: url }
                }).run();
            }
        } catch (error) {
            console.error(error);
            alert('이미지 업로드 오류. 다시 시도해 주세요');
        }
    }

    const handleImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            const url = await uploadFile(file);
            if (url) {
                editor.chain().focus().setImage({ src: url }).run();
            }
        } catch (error) {
            console.error(error);
            alert('이미지 업로드 오류');
        } finally {
            if (imageInputRef.current) imageInputRef.current.value = '';
        }
    }

    const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            const url = await uploadFile(file);

            if (url) {
                setFileName(file.name);
            }
        } catch (error) {
            console.error(error);
        } finally {
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    }

    // 댓글 입력 박스 높이 조절 핸들
    const handleResizeHeight = () => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto'; // 높이 초기화
            textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px' // 높이 조절
        }
    }

    // const handleLog = () => {
    //     console.log(editor.storage.markdown.getMarkdown());
    // }


    // 툴바 버튼 스타일 클래스
    const buttonBaseClass = "flex items-center justify-center hover:opacity-70 transition-colors cursor-pointer";
    const activeClass = "bg-white py-1 rounded";

    return (
        <div className="h-full flex flex-col relative">
            <input
                type='file'
                accept='image/*'
                ref={imageInputRef}
                onChange={handleImageSelect}
                className='hidden'
            />
            <input
                type='file'
                accept='.pdf'
                ref={fileInputRef}
                onChange={handleFileSelect}
                className='hidden'
            />

            {/* 뒤로가기, 댓글 */}
            <div className='relative w-full h-24 flex items-center md:mb-2 2xl:mb-10 z-50'>
                <button
                    onClick={() => { navigate(`/studies/${studyId}/processes/${processId}/assignments/${assignmentId}`) }}
                    className="absolute left-8 w-10 h-10 rounded-full bg-[#272727] flex items-center justify-center hover:opacity-70 cursor-pointer"
                >
                    <img src={downArrow} className='invert rotate-90 w-[40%]' />
                </button>
                <button
                    onClick={() => { setCommentOpen(!commentOpen) }}
                    className={`absolute right-8 w-10 h-10 rounded-full ${commentOpen ? 'bg-white' : 'bg-[#2a2a2a]'} flex items-center justify-center hover:opacity-70 cursor-pointer`}>
                    <img src={hamburgerBar} className='w-[40%]' />
                </button>
            </div>

            {/* 에디터 영역 컨테이너 */}
            <div className="flex-1 flex items-center justify-center md:scale-95 2xl:scale-100">
                <div className="w-full max-w-4xl h-130 overflow-hidden flex flex-col gap-2">

                    {/* 에디터 본문 */}
                    <div
                        onDrop={(e) => handleDropImage(e)}
                        onDragOver={(e) => e.preventDefault()}
                        className="flex-1 overflow-y-auto bg-[#272727] p-6 rounded-md
                        [&::-webkit-scrollbar]:w-1
                        hover:[&::-webkit-scrollbar]:w-2
                        [&::-webkit-scrollbar-track]:bg-transparent
                        [&::-webkit-scrollbar-thumb]:bg-[#555]
                        [&::-webkit-scrollbar-thumb]:rounded-full
                        [&::-webkit-scrollbar-button]:hidden"
                    >
                        <EditorContent editor={editor} />
                    </div>

                    {/* 하단 툴바 */}
                    <div className="bg-[#272727] px-4 py-3 flex items-center gap-2 rounded-md">

                        {/* Bold */}
                        <button
                            onClick={() => editor.chain().focus().toggleBold().run()}
                            className={`${buttonBaseClass} ${editor.isActive('bold') ? activeClass : ''} pl-1`}
                        >
                            <img src={boldIcon} className={`w-[60%] ${editor.isActive('bold') && 'invert'}`} />
                        </button>

                        {/* Italic */}
                        <button
                            onClick={() => editor.chain().focus().toggleItalic().run()}
                            className={`${buttonBaseClass} ${editor.isActive('italic') ? activeClass : ''}`}
                        >
                            <img src={italicIcon} className={`w-[60%] ${editor.isActive('italic') && 'invert'}`} />
                        </button>

                        {/* Underline */}
                        <button
                            onClick={() => editor.chain().focus().toggleUnderline().run()}
                            className={`${buttonBaseClass} ${editor.isActive('underline') ? activeClass : ''}`}
                        >
                            <img src={underlineIcon} className={`w-[60%] ${editor.isActive('underline') && 'invert'}`} />
                        </button>

                        {/* Strike */}
                        <button
                            onClick={() => editor.chain().focus().toggleStrike().run()}
                            className={`${buttonBaseClass} ${editor.isActive('strike') ? activeClass : ''}`}
                        >
                            <img src={strikeIcon} className={`w-[60%] ${editor.isActive('strike') && 'invert'}`} />
                        </button>

                        {/* H1 */}
                        {/* <button
                            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                            className={`${buttonBaseClass} ${editor.isActive('heading', { level: 1 }) ? activeClass : ''}`}
                        >
                            H1
                        </button> */}

                        {/* H2 */}
                        {/* <button
                            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                            className={`${buttonBaseClass} ${editor.isActive('heading', { level: 2 }) ? activeClass : ''}`}
                        >
                            H2
                        </button> */}

                        {/* 문단 구분 선 */}
                        {/* <button
                            onClick={() => {
                                const { state } = editor;
                                const { selection } = state;
                                const { $from } = selection;

                                if ($from.nodeBefore?.type.name === 'horizontalRule') return;

                                editor.chain().focus().setHorizontalRule().run()
                            }}
                            className={`${buttonBaseClass}`}
                        >
                            HR
                        </button> */}

                        {/* 이미지 선택 */}
                        <button
                            onClick={() => { imageInputRef.current?.click() }}
                            className={`${buttonBaseClass}`}>
                            <img src={imageIcon} className='w-[70%]' />
                        </button>


                        {/* 구분선 */}
                        <div className="w-[1px] h-full bg-white mx-2"></div>


                        {/* 파일 임베드 */}
                        <div className='flex-1'>
                            <button
                                onClick={() => { fileInputRef.current?.click() }}
                                className="text-[#5F5F5F] text-sm flex items-center cursor-pointer hover:opacity-70"
                            >
                                <img src={fileIcon} className='w-[8%] mr-1' />
                                <span>
                                    {fileName ? fileName : '파일을 임베드 하세요(PDF, Google Docs...)'}
                                </span>
                            </button>
                        </div>

                        {/* 등록 버튼 */}
                        <button
                            className="bg-white text-[#6D6D6D] px-4 py-1.5 rounded text-sm font-semibold hover:text-black transition-colors cursor-pointer">
                            등록
                        </button>
                    </div>
                </div>
            </div>

            {commentOpen && (
                <aside className='absolute top-0 right-0 md:w-60 2xl:w-90 h-full bg-[#272727] flex flex-col gap-2'>
                    <header className='p-6 pt-8'>
                        <div className='flex flex-col gap-1'>
                            <p className='text-3xl'>UI 개설</p>
                            <p>매코미통닭발</p>
                        </div>
                    </header>

                    <main className='flex-1 flex flex-col gap-2 p-6'>
                        <p className='text-white text-sm'>2개의 댓글들</p>
                        <div className={`flex-1 overflow-y-auto max-h-133 pr-1 flex flex-col items-center gap-2 
                                [&::-webkit-scrollbar]:w-1
                                [&::-webkit-scrollbar-track]:bg-transparent
                                [&::-webkit-scrollbar-thumb]:bg-[#555]
                                [&::-webkit-scrollbar-thumb]:rounded-full
                                [&::-webkit-scrollbar-button]:hidden `}
                        >
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((comment, index) => (
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
                                value={commentInupt}
                                onChange={(e) => {
                                    setCommentInput(e.target.value);
                                    handleResizeHeight();
                                }}
                                placeholder='여기에 내용을 입력하세요.'
                                className='w-[94%] max-h-27 min-h-10 resize-none bg-white rounded-[20px] text-black px-4 pr-10 py-2 placeholder:text-black mt-2 ml-3 mb-4 overflow-hidden'
                            />
                            <button className='absolute bottom-6 right-6 text-black cursor-pointer'>
                                d^
                            </button>
                        </div>
                    </footer>
                </aside>
            )}
        </div>
    );
};