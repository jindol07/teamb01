import React, {useState} from 'react'
import style from './signup.module.css'
import {useNavigate} from "react-router-dom";
import btnStyle from '../components/btn.module.css'
import axios from "axios";

// 회원 객체의 정보 데이터 정의
interface sighform {
    usrid: string;
    pwd: string;
    usrnm: string;
    email: string;
    addr: string;
    gender: string;
    birth: number;
}

const SignupTest: React.FC = () => {
    // 각 입력창의 값을 실시간으로 저장할 상태(State) 변수들
    const [id, setId] = useState<string>("");
    const [pwd, setPwd] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [gender, setGender] = useState<string>("M"); // 성별 초기값은 "M"으로 설정
    const [addr, setAddr] = useState<string>("");
    const [birth, setBirth] = useState<string>("");
    const [addrOpen, setAddrOpen] = useState<boolean>(false);
    // 날짜 선택 사항 제거 => 가입 시 해당 정보 기반으로 저장될 예정

    const addrList = [
        "서울",
        "경기도",
        "강원도",
        "충청도",
        "전라도",
        "경상도",
        "제주도"
    ]

    // 아이디 중복 확인 여부를 저장하는 상태(State)
    const [idCheck, setIdCheck] = useState<boolean>(false);

    // 아이디 중복 확인 결과 메시지를 저장하는 상태(State)
    const [idCheckMsg, setIdCheckMsg] = useState<string>("");

    // 다른 페이지로 이동시켜 주는 함수 생성
    const navi = useNavigate();

    // 아이디 입력값이 변경되었을 때 작동하는 함수
    const idChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setId(e.target.value);

        // 아이디가 변경되면 기존 중복 확인 결과 초기화
        setIdCheck(false);
        setIdCheckMsg("");
    }

    // 아이디 중복 확인 버튼을 눌렀을 때 작동하는 함수
    const idDuplicateCheck = () => {

        // 아이디가 입력되지 않았을 경우
        if (!id) {
            setIdCheckMsg("아이디를 입력해주세요.");
            setIdCheck(false);
            return;
        }

        // 기존 회원 중복 확인은 DB에서 처리 예정
        setIdCheckMsg("사용 가능한 아이디입니다.");
        setIdCheck(true);
    }

    // 가입하기 버튼을 눌렀을 때 작동하는 함수
    const addmember = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // 가입하기 버튼을 눌렀을 때 브라우저가 새로고침되는 기본 동작 막기

        // 아이디 중복 확인을 하지 않았을 경우
        if (!idCheck) {
            alert("아이디 중복 확인을 해주세요.");
            return;
        }

        // 필수 항목들이 모두 입력되었는지 조건문으로 검사
        if (id && pwd && name && email && gender && birth) {

            // 상태에 저장된 값들을 모아서 newmember 회원 정보 객체로 생성
            const newmember: sighform = {
                usrid: id,
                pwd: pwd,
                usrnm: name,
                email: email,
                addr: addr,
                gender: gender,
                birth: Number(birth)
            }

            try {
                console.log("회원가입 전송 데이터:", newmember);

                await axios.post(
                    "http://192.168.0.250/dfsms/member/signup",
                    newmember
                );

                alert("이메일 인증번호를 전송했습니다.");

                // 이메일 인증 페이지 이동
                // 이메일 인증 페이지로 이동하면서 이메일 전달
                navi("/emailVerifyTest", {
                    state: {email: email}
                });

                // 가입이 끝난 후 모든 입력창 상태를 빈 값으로 초기화
                setId("");
                setPwd("");
                setName("");
                setEmail("");
                setGender("M");
                setAddr("");
                setBirth("");
                setIdCheck(false);
                setIdCheckMsg("");
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    console.log(error.response);
                    alert(
                        error.response?.data?.message ??
                        "회원가입 실패"
                    );
                } else {
                    alert("알 수 없는 오류")
                }
            }
        }
    }

    // 화면에 보여질 HTML 구조
    return (
        <div className={style.signupContainer}>
            <h2 style={{textAlign: 'center'}}>회원가입</h2>

            {/* 폼이 제출되면 addmember 함수가 실행되도록 연결 */}
            <form className={style.form} onSubmit={addmember}>

                <label>아이디</label>

                <div className={style.inputRow}>
                    {/* onChange를 사용하여 value(id)값에 사용자가 입력한 데이터를 useState setId함수를 사용하여 저장 */}
                    <input
                        type="text"
                        name="id"
                        id="id"
                        placeholder='아이디를 입력해주세요'
                        className={style.input}
                        onChange={idChange}
                        value={id}
                    />

                    <button type="button" onClick={idDuplicateCheck}>
                        중복 확인
                    </button>
                </div>

                {/* 아이디 중복 확인 결과 메시지 출력 */}
                {idCheckMsg && <p>{idCheckMsg}</p>}


                <label>비밀번호</label>

                {/* 입력 작동 방식 위와 동일 */}
                <input
                    type="password"
                    name="pwd"
                    id="pwd"
                    placeholder='비밀번호를 입력해주세요'
                    className={style.input}
                    value={pwd}
                    onChange={e => setPwd(e.target.value)}
                />


                <label>이름</label>

                <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder='이름을 입력해주세요'
                    className={style.input}
                    value={name}
                    onChange={e => setName(e.target.value)}
                />


                <label>생년월일</label>

                <input
                    type="text"
                    name="birth"
                    id="birth"
                    placeholder='YYYYMMDD'
                    className={style.input}
                    value={birth}
                    onChange={e => setBirth(e.target.value)}
                />


                <label>이메일</label>

                <input
                    type="email"
                    name='email'
                    id='email'
                    placeholder='현재 사용하시는 이메일을 입력해주세요'
                    className={style.input}
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />


                <label>성별</label>

                <div className={style.gender}>

                    <label>
                        <input
                            type="radio"
                            name="gender"
                            id="gender1"
                            value="M"
                            checked={gender === "M"}
                            onChange={e => setGender(e.target.value)}
                        />
                        남자
                    </label>


                    <label>
                        <input
                            type="radio"
                            name="gender"
                            id="gender2"
                            value="F"
                            checked={gender === "F"}
                            onChange={e => setGender(e.target.value)}
                        />
                        여자
                    </label>

                </div>


                <label>주소</label>

                <div className={style.addrBox}>

                    <input
                        type="text"
                        name="addr"
                        id="addr"
                        placeholder="주소 입력"
                        className={`${style.input} ${style.addrInput}`}
                        value={addr}
                        readOnly
                        onClick={() => setAddrOpen(!addrOpen)}
                    />


                    {addrOpen && (
                        <div className={style.addrList}>
                            {
                                addrList.map((item, idx) => (
                                    <p
                                        key={idx}
                                        className={style.addrItem}
                                        onClick={() => {
                                            setAddr(item);
                                            setAddrOpen(false);
                                        }}
                                    >
                                        {item}
                                    </p>
                                ))
                            }
                        </div>
                    )}

                </div>

                {/* 클릭하면 form의 onSubmit(addmember)가 사용되도록 함 */}
                <button
                    type='submit'
                    className={btnStyle.submitBtn}
                >
                    가입하기
                </button>

            </form>
        </div>
    )
}

export default SignupTest