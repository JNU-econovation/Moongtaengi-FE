import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import { Markdown } from 'tiptap-markdown';

export const AssignmentEdit = () => {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            Markdown,
        ],
        content: `
      <h1>| 이전 UI 수정</h1>
      <p></p>
    `,
        editorProps: {
            attributes: {
                class: 'max-w-none min-h-[400px] p-2 focus:outline-none',
            },
        },
    });

    if (!editor) {
        return null;
    }

    // 툴바 버튼 스타일 클래스
    const buttonBaseClass = "px-2 py-1 text-gray-400 hover:text-white text-lg font-serif font-bold transition-colors";
    const activeClass = "text-white bg-gray-700 rounded";

    return (
        <div className="flex-1 flex flex-col">
            {/* 뒤로가기, 댓글  */}
            <div className='relative w-full h-24 flex items-center mb-10'>
                <button className="absolute left-8 w-10 h-10 rounded-full bg-[#272727] flex items-center justify-center hover:opacity-70">
                    &lt;
                </button>
                <button className="absolute right-8 w-10 h-10 rounded-full bg-[#2a2a2a] flex items-center justify-center hover:opacity-70">
                    ≡
                </button>
            </div>

            {/* 에디터 영역 컨테이너 */}
            <div className="flex-1 flex items-center justify-center p-4">
                <div className="w-full max-w-4xl h-130 overflow-hidden flex flex-col gap-2">

                    {/* 에디터 본문 */}
                    <div className="flex-1 overflow-y-auto bg-[#272727] px-2 py-6 rounded-md">
                        <EditorContent editor={editor} />
                    </div>

                    {/* 하단 툴바 */}
                    <div className="bg-[#272727] px-4 py-3 flex items-center gap-2 rounded-md">

                        {/* Bold */}
                        <button
                            onClick={() => editor.chain().focus().toggleBold().run()}
                            className={`${buttonBaseClass} ${editor.isActive('bold') ? activeClass : ''}`}
                        >
                            B
                        </button>

                        {/* Italic */}
                        <button
                            onClick={() => editor.chain().focus().toggleItalic().run()}
                            className={`${buttonBaseClass} ${editor.isActive('italic') ? activeClass : ''}`}
                        >
                            I
                        </button>

                        {/* Underline */}
                        <button
                            onClick={() => editor.chain().focus().toggleUnderline().run()}
                            className={`${buttonBaseClass} ${editor.isActive('underline') ? activeClass : ''} underline`}
                        >
                            U
                        </button>

                        {/* Strike */}
                        <button
                            onClick={() => editor.chain().focus().toggleStrike().run()}
                            className={`${buttonBaseClass} ${editor.isActive('strike') ? activeClass : ''} line-through`}
                        >
                            T
                        </button>

                        {/* 이미지 (로직 없음, 화면만) */}
                        <button className={`${buttonBaseClass} border border-gray-500 rounded px-1 ml-1 text-sm`}>
                            IMG
                        </button>

                        {/* 구분선 */}
                        <div className="w-[1px] h-6 bg-gray-600 mx-2"></div>

                        {/* H1 */}
                        <button
                            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                            className={`${buttonBaseClass} ${editor.isActive('heading', { level: 1 }) ? activeClass : ''} text-sm`}
                        >
                            H1
                        </button>

                        {/* H2 */}
                        <button
                            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                            className={`${buttonBaseClass} ${editor.isActive('heading', { level: 2 }) ? activeClass : ''} text-sm`}
                        >
                            H2
                        </button>

                        {/* 문단 나누는 선 (Horizontal Rule) */}
                        <button
                            onClick={() => editor.chain().focus().setHorizontalRule().run()}
                            className={`${buttonBaseClass} text-sm`}
                        >
                            HR
                        </button>


                        {/* 파일 임베드 */}
                        <div className="flex-1 ml-4 text-gray-500 text-sm flex items-center">
                            <span className="opacity-50">파일을 임베드 하세요(PDF, Google Docs...)</span>
                        </div>

                        {/* 등록 버튼 */}
                        <button className="bg-white text-[#6D6D6D] px-4 py-1.5 rounded text-sm font-semibold hover:text-black transition-colors cursor-pointer">
                            등록
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};