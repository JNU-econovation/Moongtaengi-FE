import { createPortal } from "react-dom";
import econoMoong from "../assets/images/econo/econo-moong.png";
import { useModalModeStore } from "../stores/useModalModeStore";

export const EconoGift = () => {
    const {setModalMode} = useModalModeStore()

    return createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
            <div className="relative w-full max-w-[500px] flex flex-col items-center rounded-3xl bg-[#1E1E1E] px-10 py-12 text-white shadow-2xl md:scale-90 2xl:scale-100">
                
                {/* 1. 상단 타이틀 */}
                <div className="text-3xl font-semibold mb-8 tracking-tight">
                    <span className="text-[#4AFFFC]">새로운 뭉탱이</span>
                    <span>를 획득 하였습니다.</span>
                    
                </div>

                {/* 2. 중앙 이미지 영역 (카드 + 반짝이 효과) */}
                <div className="relative mb-6 group">
                    {/* 반짝이 장식 (Sparkles) - 위치는 absolute로 조정 */}
                    <Sparkle className="absolute -top-4 -left-6 w-6 h-6 text-[#2FE9FD] animate-pulse" />
                    <Sparkle className="absolute top-1/2 -right-8 w-5 h-5 text-[#2FE9FD] animate-pulse delay-75" />
                    <Sparkle className="absolute -bottom-2 -left-4 w-4 h-4 text-[#2FE9FD] animate-pulse delay-150" />
                    <Sparkle className="absolute top-0 right-[-10px] w-3 h-3 text-white opacity-70" />

                    {/* 메인 이미지 컨테이너 */}
                    <div className="relative w-48 h-48 rounded-2xl overflow-hidden border-2 border-[#2FE9FD] shadow-[0_0_20px_rgba(47,233,253,0.4)] bg-[#2a2a2a]">
                        {/* Common 뱃지 */}
                        <div className="absolute top-2 left-2 z-10 bg-[#2FE9FD] text-black text-[10px] font-semibold px-1 rounded-full">
                            Common
                        </div>
                        
                        {/* 뭉탱이 이미지 */}
                        <img 
                            src={econoMoong} 
                            alt="에코노 뭉탱이" 
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>

                {/* 3. 캐릭터 이름 */}
                <h3 className="text-3xl font-semibold text-[#2FE9FD] mb-3">
                    에코노 뭉탱이
                </h3>

                {/* 4. 설명 텍스트 */}
                <div className="text-[#A1A1A1] text-center text-lg mb-8">
                    <p>에코노베이션 데브 참석 후</p>
                    <p>'에코노베이션' 초대코드 입력</p>
                </div>

                {/* 5. 확인 버튼 */}
                <button 
                    onClick={() => {setModalMode(null)}}
                    className="w-32 py-1.5 bg-white text-[#6D6D6D] rounded-full hover:opacity-70 cursor-pointer transition-colors"
                >
                    확인
                </button>
            </div>
        </div>,
        document.getElementById('modal-root')!
    )
}

// 반짝이 아이콘 컴포넌트 (SVG)
const Sparkle = ({ className }: { className?: string }) => (
    <svg 
        viewBox="0 0 24 24" 
        fill="currentColor" 
        className={className}
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
    </svg>
);