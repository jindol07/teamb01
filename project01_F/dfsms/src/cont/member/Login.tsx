import React, {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import style from "./login.module.css";
import btnStyle from "../components/btn.module.css";
import ToastMsg from "../components/ToastMsg";

const Login: React.FC = () => {

    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const [showToast, setShowToast] = useState(false);

    const backendUrl = process.env.REACT_APP_BACK_END_URL;

    const handleLogin = async () => {

        console.log("===== 로그인 시작 =====");
        console.log("BACKEND URL :", backendUrl);
        console.log("아이디 :", userId);

        if (!backendUrl) {
            console.error("BACKEND URL이 없습니다.");
            alert("백엔드 주소 설정을 확인해주세요.");
            return;
        }

        try {
            const response = await axios.post(
                `${backendUrl}/api/member/login`,
                {
                    usrid: userId,
                    pwd: password
                },
                {withCredentials: true}
            );

            console.log("===== 로그인 성공 =====");
            console.log("서버 응답 :", response.data);

            const loginUser = response.data;

            sessionStorage.setItem(
                "loginInfo",
                JSON.stringify({
                    loginNm: loginUser.usrnm,
                    role: loginUser.role,
                    usrno: loginUser.usrno
                })
            );

            // 관리자 admin 2차 인증 생략
            if (userId === "admin") {
                sessionStorage.setItem("twoFactor", "success");
                window.dispatchEvent(new Event("loginChange"));

                setShowToast(true);

                setTimeout(() => {
                    navigate("/");
                }, 1000);

                return;
            }

            window.dispatchEvent(new Event("loginChange"));

            // 일반 사용자는 2차 인증 진행
            setShowToast(true);

            setTimeout(() => {
                console.log("2차 인증 이동");
                navigate("/twofactor");
            }, 1500);
        } catch (error: any) {

            console.log("===== 로그인 실패 =====");
            console.log(error);

            if (error.response) {

                console.log("상태 코드 :", error.response.status);
                console.log("서버 응답 :", error.response.data);

                if (error.response.status === 400) {
                    alert("아이디 또는 비밀번호가 올바르지 않습니다.");
                } else if (error.response.status === 404) {
                    alert("로그인 주소를 찾을 수 없습니다.");
                } else if (error.response.status === 500) {
                    alert("서버 오류가 발생했습니다.");
                } else {
                    alert("로그인 실패");
                }

            } else {
                console.log("서버 연결 실패");
                alert("백엔드 서버 연결을 확인해주세요.");

            }
        }
    };

    const goJoin = () => {
        navigate("/Signup");
    };

    return (
        <div className={style.login}>
            <h2 className={style.h2}>
                로그인
            </h2>

            <div>
                <label>아이디</label>
                <input type="text" className={style.input} placeholder="아이디를 입력해주세요."
                       value={userId} onChange={(e) => setUserId(e.target.value)}
                />
            </div>

            <div>
                <label>비밀번호</label>
                <input type="password" className={style.input} placeholder="비밀번호를 입력해주세요."
                       value={password} onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            <button type="button" className={btnStyle.submitBtn} onClick={handleLogin}>
                로그인
            </button>

            <p style={{fontSize: "14px", textAlign: "center"}}>
                해당 사이트가 처음이신가요?{" "}
                <span onClick={goJoin} className={style.joinText} style={{cursor: "pointer", color: "blue"}}>
                    회원가입
                </span>
            </p>

            {showToast && (
                    <ToastMsg message="I'm not a robot. For real." />
            )}
        </div>
    );
};

export default Login;