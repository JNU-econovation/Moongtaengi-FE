import { useNavigate } from "react-router-dom"

const Main = () => {

    const navigate = useNavigate();

    return (
        <>
            <p style={{color: "white"}}>메인 화면임</p>
            <button onClick={() => {navigate('/login')}}>로그인 하기</button>
        </>
    )
}

export default Main