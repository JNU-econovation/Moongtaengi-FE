import styles from './SignupCheck.module.css'
import signupCheck from '../assets/signup-check.png'
import { useNavigate } from 'react-router-dom'

const SignupCheck = () => {

    const navigate = useNavigate();

    return (
        <div className={styles["container"]}>
            <div className={styles["content-wrapper"]}>
                <div className={styles["header"]}>
                    <p className={styles["title"]}>뭉탱이</p>
                    <p className={styles["subtitle"]}>작은 루틴이<br />큰 성장을 만듭니다</p>
                </div>
                <div className={styles["check-group"]}>
                    <img src={signupCheck} className={styles["check-image"]}></img>
                    <p className={styles["check-confirm"]}>회원가입이 완료되었습니다.</p>
                    <p className={styles["check-welcome"]}>
                        xxxxxx님, 뭉탱이의 회원이 되신 것을 환영합니다.<br/>
                        이제 뭉탱이와 함께 한 걸음씩 성장해요.
                    </p>
                </div>
                <div onClick={() => {navigate('/')}} className={styles["start-button"]}>회원가입 완료</div>
            </div>
        </div>
    )
}

export default SignupCheck;