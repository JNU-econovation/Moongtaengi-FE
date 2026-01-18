import { useState } from "react";
import { createPortal } from "react-dom"
import cross from "../assets/icons/common/cross.svg";
import { useModalModeStore } from "../stores/useModalModeStore";
import { useCreateStudyMutation } from "../hooks/mutations/useCreateStudyMutation";

export const QuickCreateStudy = () => {

    const {setModalMode} = useModalModeStore();

    const [formData, setFormData] = useState({
        name: '',
        topic: '',
        startDate: '',
        endDate: ''
    });

    const {mutate, isPending} = useCreateStudyMutation(setModalMode);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('저장된 데이터:', formData);
        mutate(formData);
    };

    return createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
            <div className="relative w-full max-w-3xl rounded-lg bg-custom-bg px-36 py-14 text-white shadow-xl md:scale-90 2xl:scale-100">
                <button
                    onClick={() => { setModalMode(null) }}
                    className="absolute right-4 top-4 text-white transition-colors hover:opacity-70 cursor-pointer"
                    type="button"
                >
                    <img src={cross} className="w-3.5 mt-1 mr-1 invert" />
                </button>

                <h2 className="mt-5 mb-12 text-center text-4xl font-semibold">스터디 생성하기</h2>

                <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="name" className="text-lg text-white">
                            스터디명
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Ex. 퍼스트커밋"
                            className="w-full rounded bg-custom-gray px-4 py-3 text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-gray-500"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="topic" className="text-lg text-white">
                            스터디 주제
                        </label>
                        <input
                            type="text"
                            id="topic"
                            name="topic"
                            value={formData.topic}
                            onChange={handleChange}
                            placeholder="Ex. 스터디 플랫폼 개발"
                            className="w-full rounded bg-custom-gray px-4 py-3 text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-gray-500"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="startDate" className="text-lg text-white">
                            스터디 기간
                        </label>
                        <div className="flex gap-2 items-center justify-center" >
                            <input
                                type="date"
                                id="startDate"
                                name="startDate"
                                value={formData.startDate}
                                onChange={handleChange}
                                className="w-full rounded bg-custom-gray px-4 py-3 text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-gray-500"
                            />
                            ~
                            <input
                                type="date"
                                id="endDate"
                                name="endDate"
                                value={formData.endDate}
                                onChange={handleChange}
                                className="w-full rounded bg-custom-gray px-4 py-3 text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-gray-500"
                            />
                        </div>
                    </div>

                    <div className="mt-8 flex justify-center">
                        <button
                            type="submit"
                            className="w-40 rounded-full bg-white py-2 text-lg text-gray-500 transition-colors hover:opacity-70 cursor-pointer"
                        >
                            {isPending ? '생성 중...' : '저장'}
                        </button>
                    </div>
                </form>
            </div>
        </div>,
        document.getElementById("modal-root")!
    )
}