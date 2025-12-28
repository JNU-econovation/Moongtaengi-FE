import { useNavigate, type NavigateFunction } from "react-router-dom";

interface HeroProps {
    islogin: boolean;
    isStudy: boolean;
}

export default function MainButton({ islogin, isStudy }: HeroProps) {
    const navigate = useNavigate();

    if (!islogin) return <LoginButton navigate={navigate} />
    if (!isStudy) return <CreateStudyButton navigate={navigate} />
    return <ProgressButton navigate={navigate} progress={20} />
}


interface ButtonProps {
    navigate: NavigateFunction
}

const LoginButton = ({ navigate }: ButtonProps) => {
    return (
        <button className="w-80 px-10 md:py-3 2xl:py-4 text-2xl font-semibold text-black bg-gradient-to-b from-custom-gradient-blue to-custom-gradient-green rounded-full hover:opacity-70 transition md:border-1 2xl:border-2 border-white cursor-pointer"
            onClick={() => { navigate('/login') }}>
            로그인하기
        </button>
    )
}

const CreateStudyButton = ({ navigate }: ButtonProps) => {
    return (
        <button className="w-80 px-10 md:py-3 2xl:py-4 text-2xl font-semibold text-white bg-gradient-to-b from-custom-gradient-blue to-custom-gradient-green rounded-full hover:opacity-70 transition md:border-1 2xl:border-2 border-white cursor-pointer"
            onClick={() => { navigate('/createStudy') }}>
            스터디 생성하기
        </button>
    )
}

interface ProgressButton extends ButtonProps {
    progress: number;
}

const ProgressButton = ({ navigate, progress }: ProgressButton) => {
    return (
        <button className="relative w-80 rounded-full md:border-1 2xl:border-2 border-white cursor-pointer overflow-hidden bg-custom-bg hover:opacity-70 transition group"
            onClick={() => { navigate('/currentProject') }}>
            <div
                className="absolute top-0 left-0 h-full bg-gradient-to-b from-custom-gradient-blue to-custom-gradient-green transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
            ></div>
            <span className="relative z-10 w-full h-full flex items-center justify-center px-10 md:py-3 2xl:py-4 text-2xl font-semibold text-white">
                프로젝트 바로가기
            </span>
        </button>
    )
}