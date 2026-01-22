import { useState } from 'react';
import bannerBg from '../assets/images/signup/banner-bg.png';
import bannerMoong from '../assets/images/signup/banner-moong.png';
import { useSendUserData } from '../hooks/useSendUserData';
import { useCheckName } from '../hooks/useCheckName';

export default function Signup() {

    const { checkName, isPending: isCheckNameLoading } = useCheckName();
    const { sendUserData, isSendUserDataPending} = useSendUserData();

    const [name, setName] = useState<string>("");
    const [verified, setVerified] = useState<boolean>(false);

    const [nameAlert, setNameAlert] = useState<string>("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (verified) {
            sendUserData({ verified, name });
        }
    }

    return (
        <div className="flex min-h-screen w-full items-center justify-center bg-custom-bg p-4">
            <div className="flex w-full max-w-[500px] flex-col justify-center md:scale-85 2xl:scale-100">

                {/* 헤더 영역 */}
                <div className="mb-14 text-left text-white">
                    <h1 className="mb-2 text-6xl font-semibold">뭉탱이</h1>
                    <p className="text-3xl">
                        작은 루틴이<br />
                        큰 성장을 만듭니다
                    </p>
                </div>

                <form onSubmit={handleSubmit} className='flex w-full flex-col'>
                    {/* 닉네임 입력 그룹 */}
                    <div className="mb-10 flex flex-col">
                        <label className="text-[15px] text-white">닉네임</label>
                        <p className="mb-1 text-[11px] text-[#A1A1A1]">
                            최대 한글 7자 이내로 등록해주세요 (특수기호 입력 불가능)
                        </p>
                        <div className="flex w-full gap-2">
                            <input
                                type="text"
                                value={name}
                                placeholder="Ex. 뭉탱이"
                                onChange={(e) => {
                                    setVerified(false);
                                    setName(e.target.value);
                                }}
                                className={`h-11 w-full rounded bg-[#2C2C2C] px-2 text-sm text-white outline-none placeholder:text-[#A1A1A1] hover:border-b hover:border-b-[#0CD1EF] focus:border focus:border-[#0CD1EF] transition-colors
                                ${nameAlert && !verified ? 'border border-[#C6343C]' : 'border border-transparent'}`}
                            />
                            <button
                                type='button'
                                onClick={() => { checkName({ name, setVerified, setNameAlert }) }}
                                className={`h-11 w-40 whitespace-nowrap rounded text-xs transition-colors flex items-center justify-center cursor-pointer
                                ${verified
                                        ? 'bg-white text-[#2C2C2C]'
                                        : 'bg-[#2C2C2C] text-white hover:bg-white hover:text-[#2C2C2C]'
                                    }`}>
                                {isCheckNameLoading  ? '확인 중...' : '중복확인'}
                            </button>
                        </div>
                        {nameAlert && <p className="mt-1 text-[11px] text-[#C6343C]">{nameAlert}</p>}
                    </div>

                    {/* 배너 카드 */}
                    <div className="relative mb-10 flex h-50 w-full overflow-hidden rounded-lg bg-[#F7F7F7]">
                        {/* 텍스트 영역 */}
                        <div className="z-20 flex flex-col justify-center pl-3">
                            <p className="mb-1 text-2xl font-bold leading-tight text-[#212121]">
                                귀여운 스터디<br /> 친구 뭉탱이와 함께 하세요
                            </p>
                            <p className="text-[11px] text-[#A1A1A1]">
                                닉네임은 과제 업로드, 게시글 등<br /> 커뮤니티 활동에 사용됩니다
                            </p>
                        </div>

                        {/* 이미지 영역 (그라데이션 페이드 효과 포함) */}
                        <div className="absolute bottom-0 right-0 h-[100%] w-[50%]">
                            {/* 배경 이미지 */}
                            <img
                                src={bannerBg}
                                alt="Background"
                                className="absolute inset-0 h-full w-full object-cover scale-90"
                            />
                            {/* 캐릭터 이미지 */}
                            <img
                                src={bannerMoong}
                                alt="Moong"
                                className="absolute bottom-2 right-7 h-[95%] object-contain z-10"
                            />
                            {/* 그라데이션 */}
                            <div className="absolute inset-y-0 left-3 w-12 bg-gradient-to-r from-[#F7F7F7] via-[#F7F7F7]/80 to-transparent z-20"></div>
                            <div className="absolute inset-y-0 left-50 w-12 bg-gradient-to-l from-[#F7F7F7] via-[#F7F7F7]/80 to-transparent z-20"></div>
                        </div>
                    </div>

                    {/* 회원가입 완료 버튼 */}
                    <button
                        type='submit'
                        disabled={!verified}
                        className={`h-14 w-full rounded-lg text-[18px] text-[#191919] transition-all
                            ${verified
                                ? 'bg-gradient-to-r from-custom-gradient-blue to-custom-gradient-green hover:opacity-70 cursor-pointer'
                                : 'bg-gray-600 text-gray-400'
                            }`}
                    >
                        {isSendUserDataPending ? '가입 중...' : '회원가입 완료'}
                    </button>
                </form>
            </div>
        </div>
    );
}