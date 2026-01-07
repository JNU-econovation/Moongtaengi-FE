import { useNavigate, type NavigateFunction } from 'react-router-dom'
import downArrow from "../assets/icons/down-arrow.svg";
import { getTokenFromSession } from '../utils/getTokenFromSession';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { useAuthStore } from '../stores/useAuthStore';
import { useModalModeStore } from '../stores/useModalModeStore';

export default function Navbar() {

    const navigate = useNavigate();
    const {isLogin, setIsLogin, logout} = useAuthStore();
    const {setModalMode} = useModalModeStore();

    const token = getTokenFromSession();

    const createProcessApi = async () => {
        await axios.post(`${import.meta.env.VITE_API_CREATE_STUDY}/1/processes/generate`,
            {
                additionalDescription: "장난전화의 역사"
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": 'application/json'
                },
            },
        )
    }

    const {mutate, isPending} = useMutation({
        mutationFn: createProcessApi,
        onSuccess: () => {
            console.log(`${import.meta.env.VITE_API_CREATE_STUDY}/1/processes/generate}`)
        },
        onError: (error) => {
            console.log(error);
        }
    })

    const createProcess = () => {
        mutate();
    }

    return (
        <nav className="flex items-center justify-between px-6 md:py-2 2xl:py-3 bg-black sticky top-0 z-50 text-white rounded-full mt-7">

            {/* Left Side */}
            <div className="flex items-center gap-8 ml-10">

                {/* Logo */}
                <h1 onClick={() => { navigate('/') }}
                    className="md:text-4xl 2xl:text-5xl font-semibold tracking-tighter cursor-pointer">뭉탱이</h1>

                {/* Menu Items */}
                <div className="hidden md:flex gap-3">
                    <button className="flex items-center px-3 py-1.5 text-sm bg-custom-gray rounded-full hover:bg-custom-hover-gray transition cursor-pointer"
                        onClick={() => { setModalMode("createStudy") }}>
                        나의 스터디
                        <img src={downArrow} className='w-3.5 ml-1.5 mt-0.5 invert' />
                    </button>
                    <button className="px-3 2xl:py-1.5 text-sm bg-custom-gray rounded-full hover:bg-custom-hover-gray transition cursor-pointer">
                        마이페이지
                    </button>
                    <button className="px-3 py-1.5 text-sm bg-custom-gray rounded-full hover:bg-custom-hover-gray transition cursor-pointer"
                        onClick={ createProcess }>
                        {isPending ? '생성 중...' : '컬렉션'}
                    </button>
                    <button onClick={() => { setModalMode("inviteCode") }}
                        className="px-3 py-1.5 text-sm bg-custom-gray rounded-full hover:bg-custom-hover-gray transition cursor-pointer">
                        초대코드 입력
                    </button>
                </div>
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-3 mr-10">
                <RightMenu isLogin={isLogin} setIsLogin={setIsLogin} logout={logout} navigate={navigate} />
            </div>

        </nav>
    )
}

interface RightProps {
    isLogin: boolean;
    setIsLogin: (arg: boolean) => void;
    logout: (arg: (arg: boolean) => void) => boolean;
    navigate: NavigateFunction;
}

const RightMenu = ({ isLogin, setIsLogin, logout, navigate }: RightProps) => {
    if (!isLogin) {
        return (
            <button className="px-3 py-1.5 text-sm text-black bg-white rounded-full hover:opacity-80 transition cursor-pointer"
                onClick={() => { navigate('/login') }}>
                로그인
            </button>
        )
    }

    return (
        <>
            <button className="px-3 py-1.5 text-sm bg-custom-gray rounded-full hover:bg-custom-hover-gray transition cursor-pointer">
                새로운 알림
            </button>
            <button className="px-3 py-1.5 text-sm bg-custom-gray rounded-full hover:bg-custom-hover-gray transition cursor-pointer"
                onClick={() => { logout(setIsLogin) && navigate('/', { replace: true }); }}>
                로그아웃
            </button>
        </>
    )
}