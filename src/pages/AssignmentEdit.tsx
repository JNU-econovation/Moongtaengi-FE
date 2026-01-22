import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image'
import { Markdown } from 'tiptap-markdown';
import { useEffect, useRef, useState } from 'react'; // useEffect 추가
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
import { Comment } from '../components/Comment';
import { useSendAssignmentMutation } from '../hooks/mutations/useSendAssignmentMutation';
import { useAssignmentSingleQuery } from '../hooks/queries/useAssignmentSingleQuery';


export const AssignmentEdit = () => {
    const navigate = useNavigate();
    const { studyId, processId, assignmentId } = useParams<"studyId" | "processId" | "assignmentId">();

    // 1. 데이터 조회 훅 (최상단)
    const { data: assignmentData } = useAssignmentSingleQuery(Number(assignmentId));

    const [_, forceUpdate] = useState(0);
    const [commentOpen, setCommentOpen] = useState(false);
    const [fileName, setFileName] = useState('');
    const [fileUrl, setFileUrl] = useState('');

    // 2. 뮤테이션 훅 (조건문보다 위에 있어야 함)
    // 데이터가 아직 없으면 null을 넘겨서 안전하게 처리
    const { mutate: submitMutate, isPending: isSubmitPending } = useSendAssignmentMutation(
        assignmentData?.submissionId ?? null,
        Number(assignmentId)
    );

    const uploadFile = useUploadFile();
    const imageInputRef = useRef<HTMLInputElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // 3. 에디터 훅 (조건문보다 위에 있어야 함)
    const editor = useEditor({
        extensions: [
            StarterKit,
            Markdown,
            Image,
        ],
        // 초기 로딩 시엔 undefined일 수 있음. 아래 useEffect에서 데이터 동기화 처리
        content: assignmentData?.submissionContent || '',
        editorProps: {
            attributes: {
                class: 'max-w-none min-h-[400px] p-2 focus:outline-none',
            },
        },
        onTransaction: () => {
            forceUpdate((prev) => prev + 1);
        }
    });

    // 4. [중요] 데이터가 로딩되면 에디터 내용과 state 업데이트
    useEffect(() => {
        if (assignmentData && editor) {
            // 에디터 내용 설정 (이미 내용이 있다면 덮어쓰지 않도록 주의하거나, 로딩 직후 한 번만 실행되게 제어)
            // 여기서는 단순하게 데이터가 있고 에디터가 비어있을 때만 채우는 예시입니다.
            if (editor.isEmpty) {
                editor.commands.setContent(assignmentData.submissionContent);
            }

            // 파일 정보 state 동기화
            if (assignmentData.submissionFileName) setFileName(assignmentData.submissionFileName);
            if (assignmentData.submissionFileUrl) setFileUrl(assignmentData.submissionFileUrl);
        }
    }, [assignmentData, editor]);


    // 5. Hooks 호출이 끝난 후에 조건부 렌더링 (Loading 처리)
    // 에디터가 초기화되지 않았거나 데이터가 아직 없으면 로딩 중 표시
    if (!editor || !assignmentData) {
        return <div className="h-full flex items-center justify-center text-white">로딩 중...</div>;
    }

    // --- 핸들러 함수들 ---
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

        setFileName(file.name);

        try {
            const url = await uploadFile(file);

            if (url) {
                setFileUrl(url);
            } else {
                throw new Error("Upload failed");
            }
        } catch (error) {
            console.error(error);
            setFileName('');
            setFileUrl('');
        } finally {
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    }

    const handleSubmit = () => {
        if (!editor || !assignmentId) return;

        const content = (editor.storage as any).markdown.getMarkdown();

        if (!content.trim()) {
            alert('내용을 입력해주세요.');
            return;
        }

        submitMutate({
            assignmentId: Number(assignmentId),
            content: content,
            fileName: fileName,
            fileUrl: fileUrl
        });
    }

    // 툴바 버튼 스타일 클래스
    const buttonBaseClass = "flex items-center justify-center text-2xl hover:opacity-70 transition-colors cursor-pointer";
    const activeTextClass = "bg-white text-black rounded";
    const activeIconClass = "bg-white py-1 rounded";

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
            <div className='relative w-full h-24 flex items-center md:mb-2 2xl:mb-10 z-40'>
                <button
                    onClick={() => { navigate(`/studies/${studyId}/processes/${processId}/assignments/${assignmentId}`) }}
                    className="absolute left-8 w-10 h-10 rounded-full bg-[#272727] flex items-center justify-center hover:opacity-70 cursor-pointer"
                >
                    <img src={downArrow} className='invert rotate-90 w-[40%]' />
                </button>
                <button
                    onClick={() => { setCommentOpen(!commentOpen) }}
                    className={`absolute right-8 w-10 h-10 rounded-full ${commentOpen ? 'bg-white' : 'bg-[#2a2a2a]'} flex items-center justify-center hover:opacity-70 cursor-pointer`}
                    disabled={!assignmentData?.submissionId}
                >
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

                        {/* H1 */}
                        <button
                            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                            className={`${buttonBaseClass} font-bold ${editor.isActive('heading', { level: 1 }) ? activeTextClass : ''}`}
                        >
                            H1
                        </button>

                        {/* H2 */}
                        <button
                            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                            className={`${buttonBaseClass} font-bold ${editor.isActive('heading', { level: 2 }) ? activeTextClass : ''}`}
                        >
                            H2
                        </button>

                        {/* Bold */}
                        <button
                            onClick={() => editor.chain().focus().toggleBold().run()}
                            className={`${buttonBaseClass} ${editor.isActive('bold') ? activeIconClass : ''} pl-1`}
                        >
                            <img src={boldIcon} className={`w-[60%] ${editor.isActive('bold') && 'invert'}`} />
                        </button>

                        {/* 문단 구분 선 */}
                        <button
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
                        </button>

                        {/* Italic */}
                        <button
                            onClick={() => editor.chain().focus().toggleItalic().run()}
                            className={`${buttonBaseClass} ${editor.isActive('italic') ? activeIconClass : ''}`}
                        >
                            <img src={italicIcon} className={`w-[60%] ${editor.isActive('italic') && 'invert'}`} />
                        </button>

                        {/* Underline */}
                        <button
                            onClick={() => editor.chain().focus().toggleUnderline().run()}
                            className={`${buttonBaseClass} ${editor.isActive('underline') ? activeIconClass : ''}`}
                        >
                            <img src={underlineIcon} className={`w-[60%] ${editor.isActive('underline') && 'invert'}`} />
                        </button>

                        {/* Strike */}
                        <button
                            onClick={() => editor.chain().focus().toggleStrike().run()}
                            className={`${buttonBaseClass} ${editor.isActive('strike') ? activeIconClass : ''}`}
                        >
                            <img src={strikeIcon} className={`w-[60%] ${editor.isActive('strike') && 'invert'}`} />
                        </button>

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
                                    {fileName ? fileName : '파일을 임베드 하세요(PDF 등...)'}
                                </span>
                            </button>
                        </div>

                        {/* 등록 버튼 */}
                        <button
                            onClick={handleSubmit}
                            className="bg-white text-[#6D6D6D] px-4 py-1.5 rounded text-sm font-semibold hover:text-black transition-colors cursor-pointer"
                        >
                            {isSubmitPending ? '등록 중...' : '등록'}
                        </button>
                    </div>
                </div>
            </div>

            {commentOpen && assignmentData?.submissionId && (
                <Comment submissionId={assignmentData.submissionId} />
            )}
        </div>
    );
};