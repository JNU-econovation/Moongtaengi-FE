import { useNavigate, type NavigateFunction } from 'react-router-dom'
import downArrow from "../assets/icons/down-arrow.svg";
import { getTokenFromSession } from '../utils/getTokenFromSession';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { useAuthStore } from '../stores/useAuthStore';
import { useModalModeStore } from '../stores/useModalModeStore';
import { useEffect, useRef, useState } from 'react';

type DropdownMode = "myStudy" | "Notification" | null;

type StudyMode = "operating" | "participating";

export default function Navbar() {

    const navigate = useNavigate();

    const { isLogin, setIsLogin, logout } = useAuthStore();

    const [dropdownMode, setDropdownMode] = useState<DropdownMode>(null);
    const [studyMode, setStudyMode] = useState<StudyMode>('operating');

    const { setModalMode } = useModalModeStore();

    const dropdownRef = useRef<HTMLDivElement>(null);

    // 임시 데이터
    const studyList = {
        operating: [
            {
                "studyId": 1,
                "studyName": "스프링부트 정복"
            },
            {
                "studyId": 2,
                "studyName": "스프링부트 정복2"
            }
        ],
        participating: [
            {
                "studyId": 1,
                "studyName": "리액트 정복"
            },
            {
                "studyId": 2,
                "studyName": "리액트 정복2"
            }
        ],
    }

    useEffect(() => {
        setIsLogin();
    }, [isLogin]);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setDropdownMode(null);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [dropdownRef]);

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

    const { mutate, isPending } = useMutation({
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
                    <div className='relative group'>
                        <button className="flex items-center px-3 py-1.5 text-sm bg-custom-gray rounded-full hover:bg-custom-hover-gray transition cursor-pointer"
                            onClick={() => {
                                setDropdownMode("myStudy");
                            }}>
                            나의 스터디
                            <img src={downArrow} className='w-3.5 ml-1.5 mt-0.5 invert' />
                        </button>

                        {dropdownMode === "myStudy" && (
                            <div ref={dropdownRef}
                                className='absolute flex top-10 left-0 w-70 h-42 bg-[#2C2C2C]/80 text-white text-[12px] border border-gray-600 rounded-xl overflow-hidden z-50'>
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
                                <div className='relative flex-1 p-1'>
                                    <p className='px-3 py-1 rounded-full mt-1 bg-[#393939]'>스터디명</p>
                                    <div className='flex flex-col gap-1 mt-2'>
                                        {
                                            studyList[studyMode].map((study, index) => (
                                                <div key={index} className='px-3 py-1 rounded-md bg-[#2C2C2C] cursor-pointer'>
                                                    {study["studyName"]}
                                                </div>
                                            ))
                                        }
                                    </div>
                                    <button
                                        onClick={() => { setModalMode("createStudy"); }}
                                        className='absolute bottom-1 right-1 px-3 py-1 text-[10px] bg-[#393939] rounded-full hover:opacity-70 cursor-pointer'
                                    >
                                        스터디 생성
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    <button className="px-3 2xl:py-1.5 text-sm bg-custom-gray rounded-full hover:bg-custom-hover-gray transition cursor-pointer">
                        마이페이지
                    </button>

                    <button className="px-3 py-1.5 text-sm bg-custom-gray rounded-full hover:bg-custom-hover-gray transition cursor-pointer"
                        onClick={createProcess}>
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
                <RightMenu isLogin={isLogin} logout={logout} navigate={navigate} />
            </div>

        </nav>
    )
}

interface RightProps {
    isLogin: boolean;
    logout: () => boolean;
    navigate: NavigateFunction;
}

const RightMenu = ({ isLogin, logout, navigate }: RightProps) => {
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
                onClick={() => { logout() && navigate('/', { replace: true }); }}>
                로그아웃
            </button>
        </>
    )
}