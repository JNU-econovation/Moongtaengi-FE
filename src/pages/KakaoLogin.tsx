import styles from "./KakaoLogin.module.css";
import loginBg from "../assets/login-bg.png";
import loginMoong from "../assets/login-moong.png"
import moongShadow from "../assets/moong-shadow.png"
import kakaoLogo from "../assets/kakao-logo.svg"

const KakaoLogin = () => {
    return (
        <div className={styles.container}>
            <div className={styles["content-wrapper"]}>
                <div className={styles["text-group"]}>
                    <h1>뭉탱이</h1>
                    <p>작은 루틴이<br/>큰 성장을 만듭니다.</p>
                </div>
                <div className={styles["img-box"]}>
                    <img src={loginBg} className={styles["login-bg"]}></img>
                    <img src={loginMoong} className={styles["login-moong"]}></img>
                    <img src={moongShadow} className={styles["moong-shadow"]}></img>
                </div>
                <div className={styles["login-button"]}>
                    <img src={kakaoLogo} className={styles["kakao-logo"]}></img>
                    카카오로 시작하기</div>
            </div>
        </div>
    )
}

export default KakaoLogin;