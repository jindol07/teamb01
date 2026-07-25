import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import style from "./login.module.css";
import btnStyle from "../components/btn.module.css";

const Login: React.FC = () => {

    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    // Toast Message
    const [showToast, setShowToast] = useState(false);

    // 로그인 이벤트 발생 시 유효성 로직
    const handleLogin = async () => {
        try {
            const response = await axios.post(
                "http://localhost/dfsms/member/login",
                {
                    usrid: userId,
                    pwd: password
                }
            );

            // 로그인 성공한 회원 정보
            const loginUser = response.data;

            // 2차 인증 페이지 이동을 위한 정보 저장
            sessionStorage.setItem(
                "loginInfo",
                JSON.stringify({
                    loginNm: loginUser.usrnm,
                    role: loginUser.role
                })
            );

            // 2차 인증 표시
            setShowToast(true);

            // 2초 뒤 2차 인증 창으로 이동
            setTimeout(() => {
                navigate("/twofactor");
            }, 2000);
        } catch (error) {

            // 로그인 정보 아이디/비밀번호 중 하나 이상이 틀린 경우
            alert("회원 정보가 올바르지 않습니다.\n아이디 및 비밀번호를 다시 확인해 주세요.");
        }
    };

    // 로그인 창 아래 "회원가입" 글자 클릭 시 이벤트 발생
    const goJoin = () => {navigate("/Signup");};

    return (
        <div className={style.login}>
            <h2 className={style.h2}>로그인</h2>

            <div>
                <label>아이디</label>
                <input type="text" className={style.input}
                    placeholder="아이디를 입력해주세요." value={userId}
                    onChange={(e) => setUserId(e.target.value)}/>
            </div>

            <div>
                <label>비밀번호</label>
                <input type="password" className={style.input}
                    placeholder="비밀번호를 입력해주세요." value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            <button style={{marginBottom: "15px"}} type="button"
                className={btnStyle.submitBtn} onClick={handleLogin}>
                로그인
            </button>

            <p style={{fontSize: "14px", textAlign: "center"}}>
                DFSMS가 처음이신가요?{" "}
                <span
                    onClick={goJoin}
                    className={style.joinText}
                    style={{cursor: "pointer", color: "blue"}}>
                     회원가입
                </span>
            </p>
            {
                showToast && (
                    <div className={style.toast}>
                        I'm not a robot. For real.
                        <br />
                        I mean it. I'm not a robot.
                    </div>
                )
            }
        </div>
    );
};

export default Login;