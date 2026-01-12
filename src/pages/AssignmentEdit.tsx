import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image'
import { Markdown } from 'tiptap-markdown';
import { useState } from 'react';
import downArrow from "../assets/icons/common/down-arrow.svg";
import hamburgerBar from "../assets/icons/assignmentEdit/hamburgerBarIcon.svg";
import boldIcon from "../assets/icons/assignmentEdit/boldIcon.svg";
import italicIcon from "../assets/icons/assignmentEdit/italicIcon.svg";
import underlineIcon from "../assets/icons/assignmentEdit/underlineIcon.svg";
import strikeIcon from "../assets/icons/assignmentEdit/strikeIcon.svg";
import imageIcon from "../assets/icons/assignmentEdit/imageIcon.svg";
import fileIcon from "../assets/icons/assignmentEdit/fileIcon.svg";

export const AssignmentEdit = () => {
    const [_, forceUpdate] = useState(0);

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

    const handleDropImage = (e: React.DragEvent) => {
        e.preventDefault();

        const file = e.dataTransfer.files[0];
        if (!file) return;

        const url = URL.createObjectURL(file);

        const {clientX, clientY} = e;
        const pos = editor.view.posAtCoords({left: clientX, top: clientY});

        if (!pos) return;

        editor.chain().focus().insertContentAt(pos.pos, {
            type: "image",
            attrs: {src: url},
        }).run();
    }

    const handleLog = () => {
        console.log(editor.storage.markdown.getMarkdown());
    }


    // 툴바 버튼 스타일 클래스
    const buttonBaseClass = "flex items-center justify-center hover:opacity-70 transition-colors cursor-pointer";
    const activeClass = "bg-white py-1 rounded";

    return (
        <div className="flex-1 flex flex-col">
            {/* 뒤로가기, 댓글  */}
            <div className='relative w-full h-24 flex items-center mb-10'>
                <button className="absolute left-8 w-10 h-10 rounded-full bg-[#272727] flex items-center justify-center hover:opacity-70">
                    <img src={downArrow} className='invert rotate-90 w-[40%]' />
                </button>
                <button className="absolute right-8 w-10 h-10 rounded-full bg-[#2a2a2a] flex items-center justify-center hover:opacity-70">
                    <img src={hamburgerBar} className='w-[40%]' />
                </button>
            </div>

            {/* 에디터 영역 컨테이너 */}
            <div className="flex-1 flex items-center justify-center p-4">
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
                        <button className={`${buttonBaseClass}`}>
                            <img src={imageIcon} className='w-[70%]' />
                        </button>


                        {/* 구분선 */}
                        <div className="w-[1px] h-full bg-white mx-2"></div>


                        {/* 파일 임베드 */}
                        <button className="flex-1 text-[#5F5F5F] text-sm flex items-center">
                            <img src={fileIcon} className='w-[4%] mr-1'/>
                            <span>파일을 임베드 하세요(PDF, Google Docs...)</span>
                        </button>

                        {/* 등록 버튼 */}
                        <button
                            onClick={handleLog}
                            className="bg-white text-[#6D6D6D] px-4 py-1.5 rounded text-sm font-semibold hover:text-black transition-colors cursor-pointer">
                            등록
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};