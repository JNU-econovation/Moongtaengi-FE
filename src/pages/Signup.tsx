import styles from './Signup.module.css'
import signupBg from '../assets/signup-bg.png'
import signupMoong from '../assets/signup-moong.png'
import { useNavigate } from 'react-router-dom'

const Signup = () => {

    const navigate = useNavigate();

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
                        <input type='text' placeholder='Ex. 뭉탱이' className={styles["input-box"]}></input>
                        <div className={styles["input-button"]}>중복확인</div>
                    </div>
                </div>
                <div className={styles["input-group"]}>
                    <p className={styles["input-label"]}>스터디 합류하기</p>
                    <p className={styles["input-helptext"]}>
                        초대 받은 경우 초대 코드를 입력 후 스터디를 바로 시작해보세요
                    </p>
                    <div className={styles["input-wrapper"]}>
                        <input type='text' placeholder='(선택) 초대코드를 입력해주세요' className={styles["input-box"]}></input>
                        <div className={styles["input-button"]}>스터디 등록</div>
                    </div>
                </div>

                <div className={styles["banner-card"]}>
                    <div className={styles["banner-text"]}>
                        <p className={styles["banner-label"]}>함께 공부할 친구가<br/>당신을 초대했어요</p>
                        <p className={styles["banner-helptext"]}>친구에게 받은 초대 코드를 입력하면<br/>
                        스터디 뭉탱이를 드려요</p>
                    </div>
                    <div className={styles["banner-image"]}>
                        <img src={signupBg} className={styles["moong-bg"]}></img>
                        <img src={signupMoong} className={styles["moong"]}></img>
                    </div>
                </div>

                <div onClick={() => {navigate('/signup/check')}} className={styles["signup-button"]}>회원가입 완료</div>
            </div>
        </div>
    )
}

export default Signup;