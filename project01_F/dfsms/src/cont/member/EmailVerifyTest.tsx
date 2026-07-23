import React, { useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const EmailVerifyTest: React.FC = () => {
    const [code, setCode] = useState<string>("");

    // SignupTest에서 전달받은 이메일 정보 가져오기
    const location = useLocation();
    const email = location.state?.email;

    // 페이지 이동 함수
    const navi = useNavigate();

    // 인증번호 확인 버튼 클릭
    const verifyCode = async () => {

        if (!code) {
            alert("인증번호를 입력해주세요.");
            return;
        }
        try {
            await axios.post(
                "http://192.168.0.250/dfsms/member/emailVerify",
                {
                    email: email,
                    code: code
                }
            );

            alert("회원가입 완료");

            // 로그인 페이지 이동
            navi("/loginTest");

        }
        catch (error) {
            if (axios.isAxiosError(error)) {
                console.log(error.response);
                alert(
                    error.response?.data?.message ??
                    "인증번호가 틀렸습니다."
                );
            } else {
                alert(
                    "알 수 없는 오류"
                );
            }
        }
    }

    return (
        <div>
            <h2>이메일 인증</h2>
            <p>인증번호를 보낸 이메일 : {email}</p>
            <input
                type="text"
                placeholder="6자리 인증번호 입력"
                maxLength={6}
                value={code}
                onChange={
                    (e) => setCode(e.target.value)
                }
            />
            <button onClick={verifyCode}>인증하기</button>
        </div>
    );
}
export default EmailVerifyTest;