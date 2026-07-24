import React from 'react'
import style from './signup.module.css'
import { useLocation } from "react-router-dom";

const SignupRslt: React.FC = () => {

    //useNavigate와 연동처리할 useLocation 선언
    const loc = useLocation();
    //useNavigate으로 이동시 함께 넘긴 정보를 가져옴
    const newmember = loc.state?.newmember;

    // 전화번호를 3칸으로 나누어 표시
    const tel = newmember?.tel || "";
    const telParts = tel.split("-");

    return (
        <div className={style.signupContainer}>
            <h1 style={{ textAlign: 'center' }}>회원 정보</h1>
            <table>
                <thead>
                <tr style={{ border: '1px solid black', backgroundColor: '#f2f2f2', textAlign: 'center' }}>
                    <th style={{ border: '1px solid black', padding: '8px' }}>아이디</th>
                    <th style={{ border: '1px solid black', padding: '8px' }}>비밀번호</th>
                    <th style={{ border: '1px solid black', padding: '8px' }}>이름</th>
                    <th style={{ border: '1px solid black', padding: '8px' }}>이메일</th>
                    <th style={{ border: '1px solid black', padding: '8px' }}>주소</th>
                    <th style={{ border: '1px solid black', padding: '8px' }}>성별</th>
                    <th style={{ border: '1px solid black', padding: '8px' }}>전화번호</th>
                </tr>
                </thead>
                <tbody>
                {
                    newmember && (
                        <tr style={{
                            backgroundColor: newmember.gender === "여자" ? '#ffc2b3' : 'skyblue',
                            textAlign: 'center',
                            border: '1px solid black'
                        }}>
                            <td style={{ border: '1px solid black', padding: '8px' }}>{newmember.usrid}</td>
                            <td style={{ border: '1px solid black', padding: '8px' }}>********</td>
                            <td style={{ border: '1px solid black', padding: '8px' }}>{newmember.usrnm}</td>
                            <td style={{ border: '1px solid black', padding: '8px' }}>{newmember.email}</td>
                            <td style={{ border: '1px solid black', padding: '8px' }}>{newmember.addr}</td>
                            <td style={{ border: '1px solid black', padding: '8px' }}>{newmember.gender}</td>
                            <td style={{ border: '1px solid black', padding: '8px' }}>
                                {
                                    newmember.tel ? (
                                        <>
                                            <span>{telParts[0]}</span>
                                            <span> - </span>
                                            <span>{telParts[1]}</span>
                                            <span> - </span>
                                            <span>{telParts[2]}</span>
                                        </>
                                    ) : ("")
                                }
                            </td>
                        </tr>
                    )
                }
                </tbody>
            </table>
        </div>
    )
}

export default SignupRslt