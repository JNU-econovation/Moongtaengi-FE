import { useNavigate, type NavigateFunction } from "react-router-dom";

interface HeroProps {
    islogin: boolean;
    isStudy?: boolean;
}

interface ButtonProps {
    navigate: NavigateFunction
}

export default function MainButton({ islogin, isStudy }: HeroProps) {
    const navigate = useNavigate();

    if (!islogin) return <LoginButton navigate={navigate} />
    if (!isStudy) return <CreateStudyButton navigate={navigate} />
    return <ProgressButton navigate={navigate} />
}

const LoginButton = ({ navigate }: ButtonProps) => {
    return (
        <button className="w-80 px-10 md:py-3 2xl:py-4 text-2xl font-semibold text-black bg-gradient-to-b from-[#03C4FF] to-[#2BFFB8] rounded-full hover:opacity-70 transition border-2 border-white cursor-pointer"
            onClick={() => { navigate('/login') }}>
            로그인하기
        </button>
    )
}

const CreateStudyButton = ({ navigate }: ButtonProps) => {
    return (
        <button className="w-80 px-10 md:py-3 2xl:py-4 text-2xl font-semibold text-white bg-gradient-to-b from-[#03C4FF] to-[#2BFFB8] rounded-full hover:opacity-70 transition border-2 border-white cursor-pointer"
            onClick={() => { navigate('/createStudy') }}>
            스터디 생성하기
        </button>
    )
}

const ProgressButton = ({ navigate }: ButtonProps) => {
    return (
        <button className="w-80 px-10 md:py-3 2xl:py-4 text-2xl font-semibold text-white bg-gradient-to-b from-[#03C4FF] to-[#2BFFB8] rounded-full hover:opacity-70 transition border-2 border-white cursor-pointer"
            onClick={() => { navigate('/currentProject') }}>
            프로젝트 바로가기
        </button>
    )
}