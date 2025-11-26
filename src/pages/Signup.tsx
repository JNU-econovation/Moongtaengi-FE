import styles from './Signup.module.css'
import signupBg from '../assets/signup-bg.png'
import signupMoong from '../assets/signup-moong.png'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'

const Signup = () => {

    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    const [name, setName] = useState<string>("");
    const [verified, setVerified] = useState<boolean>(false);
    const [code, setCode] = useState<string>("");
    const [codeStatus, setCodeStatus] = useState<boolean>(false);

    const [nameBoxStyle, setNameBoxStyle] = useState<object>({});
    const [nameButtonStyle, setNameButtonStyle] = useState<object>({});
    const [codeBoxStyle, setCodeBoxStyle] = useState<object>({});
    const [codeButtonStyle, setCodeButtonStyle] = useState<object>({});

    const [nameAlert, setNameAlert] = useState<string>("");
    const [codeAlert, setCodeAlert] = useState<string>("");

    // 닉네임 검사
    const checkName = () => {
        const regex = /^[가-힣]+$/;

        if (name.length <= 7 && regex.test(name)) {
            checkNameDuplicate();
            return;
        } else {
            setVerified(false);
            setNameBoxStyle({
                border: "0.8px solid #C6343C",
            });
            setNameButtonStyle({});
            setNameAlert("닉네임을 확인해주세요");
            return;
        }
    };

    const checkNameDuplicate = () => {
        const token = sessionStorage.getItem('JWT');

        axios.post('http://localhost:8080/api/members/check-nickname',
            name,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
        .then(res => {
            if (res.data["status"] == "success") {
                setVerified(true);
                setNameBoxStyle({});
                setNameButtonStyle({
                    color: "#2C2C2C",
                    backgroundColor: "white",
                })
                setNameAlert("");
            } else if (res.data["status"] == "fail") {
                setVerified(false);
                setNameBoxStyle({
                    border: "0.8px solid #C6343C",
                });
                setNameButtonStyle({});
                setNameAlert("이미 사용 중인 닉네임 입니다");
            }
        })
    }

    // 초대코드 검사
    const checkCode = () => {
        const regex = /^[a-zA-Z0-9]+$/;

        if (regex.test(code)) {
            checkCodeExist();
            return;
        } else {
            setCodeStatus(false);
            setCodeBoxStyle({
                border: "0.8px solid #C6343C",
            });
            setCodeButtonStyle({});
            setCodeAlert("초대코드를 확인해주세요");
            return;
        }
    };

    const checkCodeExist = () => {
        const token = sessionStorage.getItem('JWT');

        axios.post('http://localhost:8080/api/members/check-code',
            code,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
        .then(res => {
            if(res.data["status"] == "success") {
                setCodeStatus(true);
                setCodeBoxStyle({});
                setCodeButtonStyle({
                    color: "#2C2C2C",
                    backgroundColor: "white",
                })
                setCodeAlert("");
            } else if (res.data["status"] == "fail") {
                setCodeStatus(false);
                setCodeBoxStyle({
                    border: "0.8px solid #C6343C",
                });
                setCodeButtonStyle({});
                setCodeAlert("유효하지 않은 초대코드 입니다");
            }
        })
    }

    // 최종 유저 데이터 전송
    const sendDate = () => {
        if (!verified) return;

        const token = sessionStorage.getItem('JWT')

        interface User {
            nickname: string,
            inviteCode?: string,
        }

        let userInfo: User;

        if (codeStatus) {
            userInfo = {
                nickname: name,
                inviteCode: code,
            }
        } else {
            userInfo = {
                nickname: name,
            }
        }

        axios.post('http://localhost:8080/auth/signUp',
            userInfo,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
            .then(res => console.log("회원가입 완료: ", res.data));

        navigate('/signup/check');
    };

    // 카카오 로그인 후 토큰 저장 (신규 회원)
    useEffect(() => {
        const token: string | null = searchParams.get('token');

        if (token) {
            sessionStorage.setItem('JWT', token);
        } else {
            navigate('/', { replace: true });
            alert('로그인 실패');
        }
    }, [searchParams]);

    return (
        <div className={styles["container"]}>
            <div className={styles["content-wrapper"]}>

                <div className={styles["header"]}>
                    <p className={styles["title"]}>뭉탱이</p>
                    <p className={styles["subtitle"]}>작은 루틴이<br />큰 성장을 만듭니다</p>
                </div>

                <div className={styles["input-group"]}>
                    <p className={styles["input-label"]}>닉네임</p>
                    <p className={styles["input-helptext"]}>
                        최대 한글 7자 이내로 등록해주세요 (특수기호 입력 불가능)
                    </p>
                    <div className={styles["input-wrapper"]}>
                        <input type='text' value={name} placeholder='Ex. 뭉탱이' onChange={(e) => {
                            setVerified(false);
                            setName(e.target.value);
                            setNameButtonStyle({});
                        }} className={styles["input-box"]} style={nameBoxStyle}></input>
                        <button onClick={checkName} className={styles["input-button"]} style={nameButtonStyle}>중복확인</button>
                    </div>
                    <p className={styles["input-alert"]}>{nameAlert}</p>
                </div>
                <div className={styles["input-group"]}>
                    <p className={styles["input-label"]}>스터디 합류하기</p>
                    <p className={styles["input-helptext"]}>
                        초대 받은 경우 초대 코드를 입력 후 스터디를 바로 시작해보세요
                    </p>
                    <div className={styles["input-wrapper"]}>
                        <input type='text' value={code} placeholder='(선택) 초대코드를 입력해주세요' onChange={(e) => {
                            setCodeStatus(false);
                            setCode(e.target.value);
                            setCodeButtonStyle({});
                        }} className={styles["input-box"]} style={codeBoxStyle}></input>
                        <button onClick={checkCode} className={styles["input-button"]} style={codeButtonStyle}>초대코드 확인</button>
                    </div>
                    <p className={styles["input-alert"]}>{codeAlert}</p>
                </div>

                <div className={styles["banner-card"]}>
                    <div className={styles["banner-text"]}>
                        <p className={styles["banner-label"]}>함께 공부할 친구가<br />당신을 초대했어요</p>
                        <p className={styles["banner-helptext"]}>친구에게 받은 초대 코드를 입력하면<br />
                            스터디 뭉탱이를 드려요</p>
                    </div>
                    <div className={styles["banner-image"]}>
                        <img src={signupBg} className={styles["moong-bg"]}></img>
                        <img src={signupMoong} className={styles["moong"]}></img>
                    </div>
                </div>

                <button onClick={sendDate} disabled={!verified} className={styles["signup-button"]}>회원가입 완료</button>
            </div>
        </div>
    )
}

export default Signup;