import { useNavigate } from 'react-router-dom';
import heroBg from '../assets/images/error/hero-bg.png';
import heroMoong from '../assets/images/error/hero-moong.png';

export const Error = () => {
    const navigate = useNavigate();

    return (
        <div className="relative w-full h-screen bg-custom-bg">

            <div className="absolute inset-0 z-0">
                <img
                    src={heroBg}
                    className='w-full h-full object-cover'
                    style={{
                        WebkitMaskImage: `
                            linear-gradient(to top, black 60%, transparent 100%),
                            linear-gradient(to bottom, black 60%, transparent 100%),
                            linear-gradient(to left, black 70%, transparent 100%),
                            linear-gradient(to right, black 70%, transparent 100%)
                            `,
                        maskImage: `
                            linear-gradient(to top, black 60%, transparent 100%),
                            linear_gradient(to bottom, black 60%, transparent 100%),
                            linear-gradient(to left, black 70%, transparent 100%),
                            linear-gradient(to right, black 70%, transparent 100%)
                            `,
                        WebkitMaskComposite: 'source-in',
                        maskComposite: 'intersect'
                    }}
                />
            </div>

            <main className='relative w-full h-full flex flex-col justify-center md:gap-14 2xl:gap-30 z-50'>

                <div className='flex w-full md:px-26 2xl:px-60 md:pt-28 2xl:pt-40'>

                    {/* 캐릭터 영역 */}
                    <div className='flex-1 flex justify-start'>
                        <div className='w-100'>
                            <img
                                src={heroMoong}
                                className='w-full h-full object-contain'
                            />
                        </div>
                    </div>

                    {/* 텍스트 영역 */}
                    <div className='flex-1 flex justify-end text-white '>
                        <div className='flex flex-col justify-center items-center gap-10'>
                            <p className='font-semibold text-7xl'>스터디..하고 싶은데...</p>
                            <p className='text-center text-lg'>
                                페이지가 존재하지 않거나, 사용할 수 없는 페이지입니다.
                                <br /> 입력하신 주소가 정확한지 다시 한 번 확인해주세요.
                            </p>
                        </div>
                    </div>

                </div>


                {/* 이동 버튼 */}
                <div className="w-full flex justify-center">
                    <button
                        onClick={() => { navigate('/', { replace: true }) }}
                        className="bg-white text-[#6D6D6D] font-semibold px-6 py-2 rounded-full hover:opacity-70 cursor-pointer"
                    >
                        메인 페이지로 이동
                    </button>
                </div>

            </main>
        </div>
    )
}