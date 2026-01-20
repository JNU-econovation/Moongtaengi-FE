import { useNavigate, type NavigateFunction } from 'react-router-dom'
import downArrow from "../assets/icons/common/down-arrow.svg";
import { useAuthStore } from '../stores/useAuthStore';
import { useModalModeStore } from '../stores/useModalModeStore';
import { useEffect, useRef, useState } from 'react';
import { useOperatingStudiesQuery } from '../hooks/queries/useOperatingStudiesQuery';
import { usePaticipatingStudiesQuery } from '../hooks/queries/useParticipatingStudiesQuery';
import { useNotificationQuery } from '../hooks/queries/useNotificationQuery';

type StudyMenu = "operating" | "participating";

interface StudyItem {
    studyId: number;
    studyName: string;
}

interface StudyList {
    operating: StudyItem[];
    participating: StudyItem[];
}

export default function Navbar() {

    const navigate = useNavigate();

    const { isLogin, setIsLogin, logout } = useAuthStore();

    const [myStudyMode, setMyStudyMode] = useState<boolean>(false);
    const [notificationMode, setNotificationMode] = useState<boolean>(false);

    const [studyMode, setStudyMode] = useState<StudyMenu>('operating');

    const { data: operatingStudyList = [] } = useOperatingStudiesQuery();

    const { data: participatingStudyList = [] } = usePaticipatingStudiesQuery();

    const { data: notification } = useNotificationQuery();

    // 스터디 생성 or 초대코드 입력
    const { setModalMode } = useModalModeStore();

    // 다른 곳 클릭 시 나의 스터디 ref
    const dropdownStudyRef = useRef<HTMLDivElement>(null);
    const dropdownNotiRef = useRef<HTMLDivElement>(null);


    const studyList: StudyList = {
        operating: operatingStudyList,
        participating: participatingStudyList
    }

    console.log(studyList);
    console.log(notification);

    useEffect(() => {
        setIsLogin();
    }, []);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownStudyRef.current && !dropdownStudyRef.current.contains(e.target as Node)) {
                setMyStudyMode(false);
            }

            if (dropdownNotiRef.current && !dropdownNotiRef.current.contains(e.target as Node)) {
                setNotificationMode(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [dropdownStudyRef, dropdownNotiRef]);

    return (
        // 위에 블러 효과
        <div className="sticky top-0 z-50 w-full backdrop-blur-md bg-black/50 rounded-full">
            <nav className="flex items-center justify-between px-6 md:py-2 2xl:py-3 bg-black sticky top-0 z-60 text-white rounded-full mt-7">

                {/* Left Side */}
                <div className="flex items-center gap-8 ml-10">

                    {/* Logo */}
                    <h1 onClick={() => { navigate('/') }}
                        className="md:text-4xl 2xl:text-5xl font-semibold tracking-tighter cursor-pointer">뭉탱이</h1>

                    {/* Menu Items */}
                    <div className="hidden md:flex gap-3">
                        <div ref={dropdownStudyRef}
                            className='relative group'
                        >
                            <button className="flex items-center px-3 py-1.5 text-sm bg-custom-gray rounded-full hover:bg-custom-hover-gray transition cursor-pointer"
                                onClick={() => { setMyStudyMode(!myStudyMode) }}>
                                나의 스터디
                                <img src={downArrow}
                                    className={`w-3.5 ml-1.5 mt-0.5 invert ${myStudyMode && 'rotate-180'}`} />
                            </button>

                            {myStudyMode && (
                                <div className='absolute flex top-10 left-0 w-70 h-38 bg-[#2C2C2C]/80 text-white text-[12px] border border-gray-600 rounded-xl overflow-hidden z-50'>
                                    {/* Left Menu */}
                                    <div className='flex flex-col gap-2 font-semibold border-r border-r-gray-600 p-1'>
                                        <button onClick={() => { setStudyMode('operating') }}
                                            className={`px-3 py-1 rounded-full mt-1 cursor-pointer 
                                        ${studyMode === "operating" ? 'bg-[#393939]' : 'text-[#A0A0A0]'}`}>
                                            운영 중인 스터디 &gt;
                                        </button>
                                        <button onClick={() => { setStudyMode('participating') }}
                                            className={`px-3 py-1 rounded-full cursor-pointer
                                        ${studyMode === "participating" ? 'bg-[#393939]' : 'text-[#A0A0A0]'}`}>
                                            참여 중인 스터디 &gt;
                                        </button>
                                    </div>

                                    {/* Right Items */}
                                    <div className='flex-1 p-1 flex flex-col h-full'>

                                        <p className='px-3 py-1 rounded-full mt-1 bg-[#393939] shrink-0'>스터디명</p>

                                        <div className='flex-1 min-h-0 mt-2 pr-0.5'>
                                            <div className='h-full flex flex-col gap-1 pr-1.5 overflow-y-auto
                                                [&::-webkit-scrollbar]:w-0.5
                                                [&::-webkit-scrollbar-track]:bg-transparent
                                                [&::-webkit-scrollbar-thumb]:bg-[#555]
                                                [&::-webkit-scrollbar-thumb]:rounded-full
                                                [&::-webkit-scrollbar-button]:hidden'
                                            >
                                                {
                                                    studyList[studyMode].map((study, index) => (
                                                        <div key={index}
                                                            onClick={() => { navigate(`/studies/${study["studyId"]}`) }}
                                                            className='px-3 py-1 rounded-md bg-[#2C2C2C] cursor-pointer shrink-0 hover:bg-[#393939] transition'>
                                                            {study["studyName"]}
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        </div>

                                        <div className='mt-2 shrink-0 flex justify-end'>
                                            <button
                                                onClick={() => { setModalMode("createStudy"); }}
                                                className='px-3 py-1 text-[10px] bg-[#393939] rounded-full hover:opacity-70 cursor-pointer'
                                            >
                                                스터디 생성
                                            </button>
                                        </div>

                                    </div>
                                </div>
                            )}
                        </div>

                        <button className="px-3 2xl:py-1.5 text-sm bg-custom-gray rounded-full hover:bg-custom-hover-gray transition cursor-pointer">
                            마이페이지
                        </button>

                        <button
                            onClick={() => { navigate('/collections') }}
                            className="px-3 py-1.5 text-sm bg-custom-gray rounded-full hover:bg-custom-hover-gray transition cursor-pointer">
                            컬렉션
                        </button>

                        <button onClick={() => { setModalMode("inviteCode") }}
                            className="px-3 py-1.5 text-sm bg-custom-gray rounded-full hover:bg-custom-hover-gray transition cursor-pointer">
                            초대코드 입력
                        </button>
                    </div>
                </div>

                {/* Right Side */}
                <div className="flex items-center gap-3 mr-10">
                    <RightMenu isLogin={isLogin} logout={logout} notificationMode={notificationMode} setNotificationMode={setNotificationMode} dropdownNotiRef={dropdownNotiRef} navigate={navigate} />
                </div>

            </nav>
        </div>
    )
}

interface RightProps {
    isLogin: boolean;
    logout: () => boolean;
    notificationMode: boolean;
    setNotificationMode: (arg: boolean) => void;
    dropdownNotiRef: React.RefObject<HTMLDivElement | null>;
    navigate: NavigateFunction;
}

const RightMenu = ({ isLogin, logout, notificationMode, setNotificationMode, dropdownNotiRef, navigate }: RightProps) => {
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
            <div
                ref={dropdownNotiRef}
                className='relative group'
            >
                <button
                    onClick={() => { setNotificationMode(!notificationMode) }}
                    className="px-3 py-1.5 text-sm bg-custom-gray rounded-full hover:bg-custom-hover-gray transition cursor-pointer">
                    새로운 알림
                </button>

                {notificationMode && (
                    <div className='absolute flex top-10 right-0 w-43 h-40 bg-[#2C2C2C]/80 text-white text-[12px] border border-gray-600 rounded-xl overflow-hidden'>
                        <div className='w-full py-2 pl-2 pr-1'>
                            <div className={`flex flex-col gap-1 w-full h-full pr-1 overflow-y-auto
                            [&::-webkit-scrollbar]:w-0.5
                            [&::-webkit-scrollbar-track]:bg-transparent
                            [&::-webkit-scrollbar-thumb]:bg-[#625E5E]
                            [&::-webkit-scrollbar-thumb]:rounded-full
                            [&::-webkit-scrollbar-button]:hidden`}
                            >
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((a, i) => (
                                    <div
                                        key={i}
                                        className='px-1 py-2 rounded bg-[#393939] shrink-0'>
                                        테스트
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <button className="px-3 py-1.5 text-sm bg-custom-gray rounded-full hover:bg-custom-hover-gray transition cursor-pointer"
                onClick={() => { logout() && navigate('/', { replace: true }); }}>
                로그아웃
            </button>
        </>
    )
}