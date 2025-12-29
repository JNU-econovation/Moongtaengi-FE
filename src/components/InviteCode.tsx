import { useState } from "react";
import { createPortal } from "react-dom"
import cross from "../assets/icons/cross.svg";

interface InviteCode {
    setModalMode: (arg: "createStudy" | "inviteCode" | null) => void;
}

export const InviteCode = ({ setModalMode }: InviteCode) => {
    const [formData, setFormData] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('저장된 데이터:', formData);
        // 저장 로직 추가
        setModalMode(null);
    };

    return createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
            <div className="relative w-full max-w-xl rounded-lg bg-custom-bg px-16 py-10 text-white shadow-xl md:scale-90 2xl:scale-100">
                {/* 닫기 버튼 */}
                <button
                    onClick={() => { setModalMode(null) }}
                    className="absolute right-3 top-3 text-white transition-colors hover:opacity-70 cursor-pointer"
                    type="button"
                >
                    <img src={cross} className="w-3.5 mt-1 mr-1 invert" />
                </button>

                {/* 타이틀 */}
                <h2 className="mt-2 mb-4 text-center text-4xl font-semibold">초대코드 입력하기</h2>

                {/* 설명 */}
                <span className="flex items-center justify-center text-md text-[#0CD1EF] mb-10">
                    *초대 받은 경우 초대 코드를 입력 후 스터디를 바로 시작해보세요.
                </span>

                <form onSubmit={handleSubmit} className="flex flex-col">
                    <input
                        type="text"
                        value={formData}
                        onChange={handleChange}
                        placeholder="초대 코드 입력"
                        className="w-full rounded bg-custom-gray px-4 py-4 text-white placeholder-gray-500 outline-none focus:ring-1 focus:ring-[#0CD1EF]"
                    />

                    {/* 저장 버튼 */}
                    <div className="mt-8 flex justify-center">
                        <button
                            type="submit"
                            className="w-30 rounded-full bg-white py-1 text-lg text-gray-500 transition-colors hover:opacity-70 cursor-pointer"
                        >
                            저장
                        </button>
                    </div>
                </form>
            </div>
        </div>,
        document.getElementById('modal-root')!
    )
}