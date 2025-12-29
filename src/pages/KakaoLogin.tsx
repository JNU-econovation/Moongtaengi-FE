import loginBg from '../assets/login/login-bg.png'
import loginMoong from '../assets/login/login-moong.png'
import loginMoongShadow from '../assets/login/login-moong-shadow.png'
import kakaoLogo from '../assets/login/kakao-logo.svg'

const KakaoLogin = () => {

    const CLIENT_ID = import.meta.env.VITE_AUTH_KAKAO_REST_API_KEY;
    const REDIRECT_URI = import.meta.env.VITE_AUTH_KAKAO_REDIRECT_URI;
    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

    return (
        <div className="bg-custom-bg flex justify-center items-center w-full h-screen font-sans">
            <div className="flex flex-col justify-center items-center md:w-[28rem] 2xl:w-[35rem]">

                {/* 헤더 */}
                <div className="self-start text-white mb-[2.1rem]">
                    <p className="font-semibold md:text-[3.3rem] 2xl:text-[3.5rem]">뭉탱이</p>
                    <p className="md:text-[1.5rem] 2xl:text-[1.7rem]">작은 루틴이<br />큰 성장을 만듭니다</p>
                </div>

                {/* 배너 이미지 (그림자 효과는 after: 클래스로 구현) */}
                <div className="bg-white relative w-full aspect-[13/9] md:mb-[3.1rem] 2xl:mb-[3.5rem] after:content-[''] after:absolute after:z-[4] after:inset-0 after:shadow-[inset_80px_0_45px_-25px_#121212,inset_-80px_0_45px_-25px_#121212]">
                    <img src={loginBg} className="absolute w-full h-full object-cover z-[1]" alt="bg" />
                    <img src={loginMoong} className="absolute top-[10%] left-[25%] w-[50%] z-[3]" alt="moong" />
                    <img src={loginMoongShadow} className="absolute top-[78%] left-[20%] w-[60%] z-[2]" alt="shadow" />
                </div>

                {/* 로그인 버튼 */}
                <button className="flex justify-center items-center text-black font-semibold md:text-[1rem] 2xl:text-[1.1rem] bg-[#FEE500] w-full md:h-[3.1rem] 2xl:h-[3.5rem] rounded-[0.6rem] cursor-pointer hover:bg-[#fee500c5]"
                    onClick={() => {
                        window.location.href = KAKAO_AUTH_URL;
                    }}>
                    <img src={kakaoLogo} className="w-[1.2rem] mr-[0.5rem]" alt="kakao" />
                    카카오로 시작하기
                </button>
                
            </div>
        </div>
    )
}

export default KakaoLogin;