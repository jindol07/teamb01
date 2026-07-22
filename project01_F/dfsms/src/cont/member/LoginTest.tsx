import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./login.module.css";
import btnStyle from "../components/btn.module.css";

const LoginTest: React.FC = () => {

    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");

    const [msg, setMsg] = useState<any>("");

    const navigate = useNavigate();

    // Toast MSG
    const [showToast, setShowToast] = useState(false);


    // 가입된 회원정보를 localStorage에서 가져옴
    useEffect(() => {
        setMsg(localStorage.getItem("memberList"));
    }, []);

    // 로그인 이벤트 발생 시 유효성 로직
    const handleLogin = () => {
        // memberList가 존재하지 않을 경우
        if (!msg) {
            alert("회원 정보가 없습니다.");

            return;
        }

        // localStorage의 회원정보를 JSON 배열로 변환
        const jsObject = JSON.parse(msg);

        let loginUserNm = null;

        // 회원정보 검색
        for (let i = 0; i < jsObject.length; i++) {
            // 아이디와 비밀번호가 모두 일치하는지 확인
            if (jsObject[i].usrid === userId && jsObject[i].pwd === password) {
                // 로그인한 회원의 이름 저장
                loginUserNm = jsObject[i].usrnm;

                break;
            }
        }

        // 로그인 정보가 맞을 경우
        if (loginUserNm) {
            // 2차 인증 페이지 이동을 위한 정보 저장
            sessionStorage.setItem(
                "authUser",
                JSON.stringify({
                    loginNm: loginUserNm,
                    role: userId === "admin" ? "ADMIN" : "USER"
                })
            );

            // 2차 인증 표시
            setShowToast(true);

            // 2초 뒤 2차 인증 창으로 이동
            setTimeout(() => {
                navigate("/twofactorTT");
            }, 2000);
        }

        else {
            // 로그인 정보 아이디/비밀번호 중 하나 이상이 틀린 경우
            alert("회원 정보가 올바르지 않습니다.\n아이디 및 비밀번호를 다시 확인해 주세요.");
        }
    };

    // 로그인 창 아래 "회원가입" 글자 클릭 시 이벤트 발생
    const goJoin = () => {navigate("/SignupTest");};
    return (
        <div className={style.login}>
            <h2 className={style.h2}>로그인</h2>
            <div>
                <label>아이디</label>
                <input type="text" className={style.input}
                       placeholder="아이디를 입력해주세요." value={userId}
                       onChange={(e) => setUserId(e.target.value)}
                />
            </div>
            <div>
                <label>비밀번호</label>
                <input type="password" className={style.input}
                    placeholder="비밀번호를 입력해주세요." value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button style={{marginBottom: "15px"}} type="button"  className={btnStyle.submitBtn} onClick={handleLogin}>
                로그인
            </button>
            <p style={{fontSize: "14px", textAlign: "center"}}>DFSMS가 처음이신가요?{" "}
                <span onClick={goJoin} className={style.joinText} style={{cursor: "pointer", color: "blue"}}>
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

export default LoginTest;