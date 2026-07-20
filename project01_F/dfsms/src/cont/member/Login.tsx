import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./login.module.css";
import btnStyle from '../components/btn.module.css'

const Login: React.FC = () => {
    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const [msg, setMsg] = useState<any>('');

    //가입된 회원정보를 localStorage에서 가져옴
    useEffect(() => {
        setMsg(localStorage.getItem("memberList"));
    }, [])

    //로그인 이벤트 발생히 유효성 로직
    const handleLogin = () => {
        const jsObj = JSON.parse(msg);

        let userNm = null;

        for (let i = 0; i < jsObj.length; i++) {
            if (jsObj[i].id === userId && jsObj[i].pwd === password) {
                userNm = jsObj[i].name;
                break;
            }
        }

        if (userNm) {
            alert("로그인이 완료되었습니다.");
            //0706 s
            const userInfo = {
                loginNm: userNm,
                role: userNm === "admin" ? "ADMIN" : "USER"
            };
            //0706 e
            sessionStorage.setItem("loginInfo", JSON.stringify(userInfo));
            navigate("/");  // 로그인 성공 시 Home 이동
        } else {
            alert("회원 정보가 올바르지 않습니다. id 및 pw를 다시 확인해 주세요!");
        }
    };

    return (
        <div className={style.login}>
            <h2 className={style.h2}>로그인</h2>
            <div>
                <label>아이디</label>
                <input type="text" className={style.input} placeholder="아이디를 입력해주세요." value={userId} onChange={(e) => setUserId(e.target.value)} />
            </div>
            <div>
                <label>비밀번호</label>
                <input type="password" className={style.input} placeholder="비밀번호를 입력해주세요." value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button type="submit" className={btnStyle.submitBtn} onClick={handleLogin}>로그인</button>
        </div>
    );
};
export default Login;