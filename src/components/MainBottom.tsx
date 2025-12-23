import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function MainBottom() {
    const navigate = useNavigate;

    const [studyList, setStudyList] = useState([1,2,3,4,5]);

    return (
        <div className="px-8 py-8 bg-[#272727]">

            <div className="mb-8 ml-10 text-white">
                <h3 className="text-xl font-semibold">함께 성장 중인 뭉탱이들</h3>
                <p className="text-sm mt-1">이번 주 전체 Top Learners</p>
            </div>

            {/* Scrollable Square List */}
            <div className="flex md:gap-3 2xl:gap-6 overflow-x-auto pb-6 scrollbar-hide">
                {studyList.map((item) => (
                    <div key={item}
                         className="flex-shrink-0 ml-10 md:w-64 md:h-64 2xl:w-80 2xl:h-80 bg-black rounded-2xl relative transition-colors cursor-pointer group">

                        {/* Badge */}
                        <div className="absolute top-4 left-4 px-3 py-1 bg-gradient-to-b from-[#03C4FF] to-[#2BFFB8] text-black text-xs font-semibold rounded-full z-10">
                            TOP {item}
                        </div>

                        {/* Content Placeholder inside black card */}
                        <div className="w-full h-full flex items-center justify-center">
                            <div className="w-full h-full bg-black rounded-xl flex items-center justify-center group-hover:bg-[#121212] transition-colors">
                                <span className="text-zinc-700">No Content</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}