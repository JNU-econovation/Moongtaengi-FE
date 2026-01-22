import { useNavigate } from "react-router-dom";
import { useModalModeStore } from "../stores/useModalModeStore";

interface HeroProps {
    islogin: boolean;
    shortcutStudyId?: number | null;
    totalExperience?: number;
}

export default function MainButton({ islogin, shortcutStudyId, totalExperience }: HeroProps) {

    if (!islogin) return <LoginButton />

    if (!shortcutStudyId) return <CreateStudyButton  />

    return <ProgressButton totalExperience={totalExperience} />
}


const LoginButton = () => {
    const navigate = useNavigate();

    return (
        <button className="w-80 px-10 md:py-3 2xl:py-4 text-2xl font-semibold text-black bg-gradient-to-b from-custom-gradient-blue to-custom-gradient-green rounded-full hover:opacity-70 transition md:border-1 2xl:border-2 border-white cursor-pointer"
            onClick={() => { navigate('/login') }}>
            로그인하기
        </button>
    )
}

const CreateStudyButton = () => {
    const setModalMode = useModalModeStore((s) => s.setModalMode);

    return (
        <button
            onClick={() => { setModalMode('createStudy') }}
            className="w-80 px-10 md:py-3 2xl:py-4 text-2xl font-semibold text-white bg-gradient-to-b from-custom-gradient-blue to-custom-gradient-green rounded-full hover:opacity-70 transition md:border-1 2xl:border-2 border-white cursor-pointer"
        >
            스터디 생성하기
        </button>
    )
}

interface ProgressButton {
    totalExperience: number;
}

const ProgressButton = ({ totalExperience }: ProgressButton) => {
    const navigate = useNavigate();
    const progress = totalExperience / 300 * 100;

    return (
        <button
            onClick={() => { navigate('/currentProject') }}
            className="relative w-80 rounded-full md:border-1 2xl:border-2 border-white cursor-pointer overflow-hidden bg-custom-bg hover:opacity-70 transition group"
        >
            <div
                className="absolute top-0 left-0 h-full bg-gradient-to-b from-custom-gradient-blue to-custom-gradient-green transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
            />
            <span className="relative z-10 w-full h-full flex items-center justify-center px-10 md:py-3 2xl:py-4 text-2xl font-semibold text-white">
                스터디 바로가기
            </span>
        </button>
    )
}