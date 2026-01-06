import { useNavigate, type NavigateFunction } from 'react-router-dom'
import downArrow from "../assets/icons/down-arrow.svg";

export default function NavbarPure() {
    const navigate = useNavigate()

    return (
        <nav className="w-full flex items-center justify-between px-6 md:py-2 2xl:py-3 bg-black sticky top-7 z-50 text-white rounded-full mt-7">

            {/* Left Side */}
            <div className="flex items-center gap-8 ml-10">

                {/* Logo */}
                <h1 onClick={() => {navigate('/')}}
                    className="md:text-4xl 2xl:text-5xl font-semibold tracking-tighter cursor-pointer">뭉탱이</h1>

                {/* Menu Items */}
                <div className="hidden md:flex gap-3">
                    <button className="flex items-center px-3 py-1.5 text-sm bg-custom-gray rounded-full hover:bg-custom-hover-gray transition cursor-pointer"
                        >
                        나의 스터디
                        <img src={downArrow} className='w-3.5 ml-1.5 mt-0.5 invert' />
                    </button>
                    <button className="px-3 2xl:py-1.5 text-sm bg-custom-gray rounded-full hover:bg-custom-hover-gray transition cursor-pointer">
                        마이페이지
                    </button>
                    <button className="px-3 py-1.5 text-sm bg-custom-gray rounded-full hover:bg-custom-hover-gray transition cursor-pointer">
                        컬렉션
                    </button>
                    <button
                        className="px-3 py-1.5 text-sm bg-custom-gray rounded-full hover:bg-custom-hover-gray transition cursor-pointer">
                        초대코드 입력
                    </button>
                </div>
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-3 mr-10">
                <RightMenu navigate={navigate} />
            </div>
            
        </nav>
    )
}

interface RightProps {
    navigate: NavigateFunction;
}

const RightMenu = ({ navigate }: RightProps) => {
    if (true) {
        return (
            <button className="px-3 py-1.5 text-sm text-black bg-white rounded-full hover:opacity-80 transition cursor-pointer"
                onClick={() => {navigate('/login')}}>
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
                >
                로그아웃
            </button>
        </>
    )        
}