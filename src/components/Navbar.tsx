import { useNavigate, type NavigateFunction } from 'react-router-dom'

interface NavbarProps {
    islogin: boolean;
    setIslogin: (arg: boolean) => void;
    logout: (arg: (arg: boolean) => void) => boolean;
}

export default function Navbar({ islogin, setIslogin, logout }: NavbarProps) {
    const navigate = useNavigate()

    return (
        <nav className="flex items-center justify-between px-6 md:py-2 2xl:py-3 bg-black sticky top-0 z-50 text-white rounded-full mt-7">

            {/* Left Side */}
            <div className="flex items-center gap-8 ml-10">

                {/* Logo */}
                <h1 className="md:text-4xl 2xl:text-5xl font-semibold tracking-tighter cursor-pointer">뭉탱이</h1>

                {/* Menu Items */}
                <div className="hidden md:flex gap-3">
                    <button className="flex items-center px-3 py-1.5 text-sm bg-custom-gray rounded-full hover:bg-custom-hover-gray transition cursor-pointer">
                        나의 스터디
                        <svg className="w-3.5 h-3.5 ml-1 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                    <button className="px-3 2xl:py-1.5 text-sm bg-custom-gray rounded-full hover:bg-custom-hover-gray transition cursor-pointer">
                        마이페이지
                    </button>
                    <button className="px-3 py-1.5 text-sm bg-custom-gray rounded-full hover:bg-custom-hover-gray transition cursor-pointer">
                        컬렉션
                    </button>
                    <button className="px-3 py-1.5 text-sm bg-custom-gray rounded-full hover:bg-custom-hover-gray transition cursor-pointer">
                        초대코드 입력
                    </button>
                </div>
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-3 mr-10">
                <RightMenu islogin={islogin} setIslogin={setIslogin} logout={logout} navigate={navigate} />
            </div>
            
        </nav>
    )
}

interface RightProps extends NavbarProps{
    navigate: NavigateFunction;
}

const RightMenu = ({ islogin, setIslogin, logout, navigate }: RightProps) => {
    if (!islogin) {
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
                onClick={() => {logout(setIslogin) && navigate('/', { replace: true });}}>
                로그아웃
            </button>
        </>
    )        
}