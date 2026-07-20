import React, { FormEvent, useEffect, useState } from 'react'
import style from './signup.module.css'
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import btnStyle from '../components/btn.module.css'

// 회원 객체의 정보 데이터 정의
interface sighform {
    id: string;
    pwd: string;
    name: string;
    email: string;
    addr: string;
    gender: string;
    date: string;
}

const Signup: React.FC = () => {
    // 각 입력창의 값을 실시간으로 저장할 상태(State) 변수들
    const [id, setId] = useState<string>("");
    const [pwd, setPwd] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [addr, setAddr] = useState<string>("");
    const [gender, setGender] = useState<string>("남자"); // 성별 초기값은 "남자"로 설정
    const [date, setDate] = useState<string>("");

    // 회원 목록을 배열로 관리할 상태(State)
    const [member, setMember] = useState<any[]>([]);
    // 다른 페이지로 이동시켜 주는 함수 생성
    const navi = useNavigate();

    // 가입하기 버튼을 눌렀을 때 작동하는 함수
    const addmember = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); //가입하기 버튼을 눌렀을 때 브라우저가 새로고침되는 기본 동작 막기

        // 필수 항목들이 모두 입력되었는지 조건문으로 검사
        if (id && pwd && name && email && gender && date) {

            // 상태에 저장된 값들을 모아서 newmember 회원 정보 객체로 생성
            const newmember: sighform = {
                id: id,
                pwd: pwd,
                name: name,
                email: email,
                addr: addr,
                gender: gender,
                date: date
            }

            // 기존 회원 배열에 새 회원 객체를 추가하여 상태 업데이트
            setMember([...member, newmember]);

            // localStorage에서 기존 'memberList' 가져오기
            const memberList = localStorage.getItem('memberList');

            // 빈 배열 변수 선언
            let newlist = [];

            // 기존 목록이 존재하면 JSON 객체로 변환하고, 없으면 빈 배열 사용
            newlist = memberList ? JSON.parse(memberList) : [];

            // 불러온 회원 목록 배열에 신규 회원 추가
            newlist.push(newmember);

            // 로컬 스토리지는 문자열만 저장 가능하므로, JSON 배열을 문자열로 변환하여 저장
            localStorage.setItem("memberList", JSON.stringify(newlist));

            // 가입 완료 페이지('/SignupRslt')로 이동하면서 새 회원 데이터를 state로 전달
            navi("/SignupRslt", {
                state: { newmember: newmember }
            })

            // 가입이 끝난 후 모든 입력창 상태를 빈 값으로 초기화
            setId("");
            setPwd("");
            setName("");
            setEmail("");
            setAddr("");
            setGender("");
            setDate("");
        }
    }

    // 화면에 보여질 HTML 구조
    return (
        <div className={style.signupContainer}>
            <h2 style={{ textAlign: 'center' }}>회원가입</h2>
            {/* 폼이 제출되면 addmember 함수가 실행되도록 연결 */}
            <form className={style.form} onSubmit={addmember}>

                <label>아이디 </label>
                <div className={style.inputRow}>
                    {/* onChange를 사용하여 value(id)값에 사용자가 입력한 데이터를 useState setId함수를 사용하여 저장 */}
                    <input type="text" name="id" id="id" placeholder='아이디를 입력해주세요' className={style.input} onChange={e => setId(e.target.value)} value={id} />
                </div>

                <label>비밀번호</label>
                {/* 입력 작동 방식 위와 동일 */}
                <input type="password" name="pwd" id="pwd" placeholder='비밀번호를 입력해주세요' className={style.input} value={pwd} onChange={e => setPwd(e.target.value)} />

                <label>이름</label>
                <input type="text" name="name" id="name" placeholder='이름을 입력해주세요' className={style.input} value={name} onChange={e => setName(e.target.value)} />

                <label>이메일</label>
                <input type="email" name='email' id='email' placeholder='현재 사용하시는 이메일을 입력해주세요' className={style.input} value={email} onChange={e => setEmail(e.target.value)} />

                <label>주소</label>
                <input type="text" name="addr" id="addr" placeholder='상품을 받으실 주소를 입력해주세요' className={style.input} value={addr} onChange={e => setAddr(e.target.value)} />

                <label>성별</label>
                <div className={style.gender}>
                    <label><input type="radio" name="gender" id="gender1" value="남자" checked={gender === "남자"}
                        onChange={e => setGender(e.target.value)} />남자</label>

                    <label><input type="radio" name="gender" id="gender2" value="여자" checked={gender === "여자"}
                        onChange={e => setGender(e.target.value)}
                    />여자</label>
                </div>

                <label>가입 날짜</label>
                <input type="date" name="date" id="date" value={date} onChange={e => setDate(e.target.value)} />

                {/* 클릭하면 form의 onSubmit(addmember)가 사용되도록 함 */}
                <button type='submit' className={btnStyle.submitBtn}>가입하기</button>
            </form>

        </div>
    )
}

export default Signup