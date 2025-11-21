import styles from './KakaoLogin.module.css'
import loginBg from '../assets/login-bg.png'
import loginMoong from '../assets/login-moong.png'
import moongShadow from '../assets/moong-shadow.png'
import kakaoLogo from '../assets/kakao-logo.svg'
import { useNavigate } from 'react-router-dom'

const KakaoLogin = () => {

    const navigate = useNavigate();

    return (
        <div className={styles["container"]}>
            <div className={styles["content-wrapper"]}>

                <div className={styles["header"]}>
                    <p className={styles["title"]}>뭉탱이</p>
                    <p className={styles["subtitle"]}>작은 루틴이<br />큰 성장을 만듭니다</p>
                </div>

                <div className={styles["banner-image"]}>
                    <img src={loginBg} className={styles["moong-bg"]}></img>
                    <img src={loginMoong} className={styles["moong"]}></img>
                    <img src={moongShadow} className={styles["moong-shadow"]}></img>
                </div>

                <div onClick={() => {navigate('/signup')}} className={styles["login-button"]}>
                    <img src={kakaoLogo} className={styles["kakao-logo"]}></img>
                    카카오로 시작하기</div>
            </div>
        </div>
    )
}

export default KakaoLogin;