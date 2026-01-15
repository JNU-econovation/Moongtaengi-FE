import signupCheck from '../assets/icons/signup/signup-check.png'
import { useNavigate } from 'react-router-dom'

const SignupCheck = () => {

    const navigate = useNavigate();

    return (
        <div className='w-full min-h-screen flex items-center justify-center bg-custom-bg '>
            <div className='flex flex-col items-center justify-center w-full max-w-[500px] md:scale-85 2xl:scale-100'>

                <div className='self-start text-white mb-25'>
                    <p className='font-semibold text-6xl mb-1'>뭉탱이</p>
                    <p className='text-3xl'>
                        작은 루틴이<br />
                        큰 성장을 만듭니다
                    </p>
                </div>

                <div className='flex flex-col items-center justify-center text-white mb-20'>
                    <img src={signupCheck} className='w-30 mb-15'></img>
                    <p className='text-4xl mb-10'>회원가입이 완료되었습니다.</p>
                    <p className='text-center text-xl'>
                        xxxxxx님, 뭉탱이의 회원이 되신 것을 환영합니다.<br/>
                        이제 뭉탱이와 함께 한 걸음씩 성장해요.
                    </p>
                </div>
                
                <button className='w-full h-14 rounded-md flex items-center justify-center bg-gradient-to-r from-custom-gradient-blue to-custom-gradient-green hover:opacity-70 cursor-pointer'
                    onClick={() => {navigate('/', {replace: true})}}>
                    뭉탱이 시작하기
                </button>

            </div>
        </div>
    )
}

export default SignupCheck;