import React, {useState} from 'react'
import style from './signup.module.css'
import {useNavigate} from "react-router-dom";
import btnStyle from '../components/btn.module.css'
import axios from "axios";
import ToastMsg from "../components/ToastMsg";

// 주소 검색 interface
interface DaumPostcodeData {
    sido: string;
    sigungu: string;
    address: string;
}

declare global {
    interface Window {
        daum: any;
    }
}

// 회원 객체의 정보 데이터 정의
interface sighform {
    usrid: string;
    pwd: string;
    usrnm: string;
    email: string;
    addr: string;
    gender: string;
    birth: number;
    tel: string;
}

const Signup: React.FC = () => {
    // 각 입력창의 값을 실시간으로 저장할 상태(State) 변수들
    const [id, setId] = useState<string>("");
    const [pwd, setPwd] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [gender, setGender] = useState<string>("M"); // 성별 초기값은 "M"으로 설정
    const [addr, setAddr] = useState<string>("");
    const [birth, setBirth] = useState<string>("");
    const [telFirst, setTelFirst] = useState<string>("");
    const [telMiddle, setTelMiddle] = useState<string>("");
    const [telLast, setTelLast] = useState<string>("");
    const [telOpen, setTelOpen] = useState<boolean>(false); // 첫 번째 선택 목록 열림 여부
    // 날짜 선택 사항 제거 => 가입 시 해당 정보 기반으로 저장될 예정

    const backendUrl = process.env.REACT_APP_BACK_END_URL;

    const [toast, setToast] = useState("");

    const telList = [
        "010", "011", "016", "017", "018", "019"
    ]

    // 주소 검색 버튼 클릭 이벤트 생성
    const addressSearch = () => {
        new window.daum.Postcode({
            oncomplete: (data: DaumPostcodeData) => {
                let sido = data.sido;
                let sigungu = data.sigungu;

                // 서울 → 서울시
                if (sido === "서울") {
                    sido = "서울시";
                }
                // 경기 → 경기도
                else if (sido === "경기") {
                    sido = "경기도";
                    sigungu = sigungu.split(" ")[0];
                } else if (sido === "부산") {
                    sido = "부산시";
                } else if (sido === "대구") {
                    sido = "대구시";
                } else if (sido === "인천") {
                    sido = "인천시";
                } else if (sido === "광주") {
                    sido = "광주시";
                } else if (sido === "대전") {
                    sido = "대전시";
                } else if (sido === "울산") {
                    sido = "울산시";
                } else if (sido === "세종") {
                    sido = "세종시";
                }

                // 시/도 + 시/군/구까지만 저장
                const shortAddr = `${sido} ${sigungu}`;
                console.log("최종 저장 주소:", shortAddr);

                setAddr(shortAddr);
            }
        }).open();
    }

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
    const idDuplicateCheck = async () => {

        if (!id) {
            setIdCheckMsg("아이디를 입력해주세요.");
            setIdCheck(false);
            return;
        }

        try {
            const response = await axios.get(
                `${backendUrl}/api/member/checkId`,
                {
                    params: {
                        usrid: id
                    }
                }
            );

            console.log("아이디 중복 확인 결과:", response.data);

            // DB COUNT(*) 결과는 숫자(0 또는 1 이상)
            if (Number(response.data) > 0) {
                setIdCheckMsg("이미 사용 중인 아이디입니다.");
                setIdCheck(false);
            } else {
                setIdCheckMsg("사용 가능한 아이디입니다.");
                setIdCheck(true);
            }

        } catch (error) {
            console.log("아이디 중복 확인 오류:", error);

            if (axios.isAxiosError(error)) {
                console.log("오류 상태 코드:", error.response?.status);
                console.log("오류 응답:", error.response?.data);
            }

            setIdCheckMsg("아이디 중복 확인 중 오류가 발생했습니다.");
            setIdCheck(false);
        }
    }


    // 가입하기 버튼을 눌렀을 때 작동하는 함수
    const addmember = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // 가입하기 버튼을 눌렀을 때 브라우저가 새로고침되는 기본 동작 막기

        // 아이디 중복 확인을 하지 않았을 경우
        if (!idCheck) {
            setToast("아이디 중복 확인을 해주세요.");
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
                birth: Number(birth),
                tel: telFirst && telMiddle && telLast
                    ? `${telFirst}-${telMiddle}-${telLast}`
                    : ""
            }

            try {
                console.log("회원가입 전송 데이터:", newmember);

                await axios.post(
                    //"http://localhost/dfsms/member/signup",
                    `${backendUrl}/api/member/signup`,
                    newmember
                );

                setToast("이메일 인증번호를 전송했습니다.");

                setTimeout(() => {
                    navi("/emailVerify", {
                        state: {email: email}
                    });
                }, 1500);

                // 가입이 끝난 후 모든 입력창 상태를 빈 값으로 초기화
                setId("");
                setPwd("");
                setName("");
                setEmail("");
                setGender("M");
                setAddr("");
                setBirth("");
                setTelFirst("");
                setTelMiddle("");
                setTelLast("");
                setTelOpen(false);
                setIdCheck(false);
                setIdCheckMsg("");
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    console.log(error.response);

                    setToast(
                        error.response?.data?.message ??
                        "회원가입 실패"
                    );
                } else {
                    setToast("알 수 없는 오류");
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
                    placeholder='YYYY'
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
                        placeholder="주소 검색"
                        className={`${style.input} ${style.addrInput}`}
                        value={addr}
                        readOnly
                        onClick={addressSearch}
                    />
                </div>

                <label>전화번호</label>
                <div className={style.telBox}>

                    {/* 전화번호 앞자리 선택 */}
                    <div className={style.telFirstBox}>

                        <input
                            type="text"
                            name="telFirst"
                            id="telFirst"
                            placeholder="선택"
                            className={`${style.input} ${style.telFirstInput}`}
                            value={telFirst}
                            readOnly
                            onClick={() => setTelOpen(!telOpen)}
                        />


                        {/* 전화번호 앞자리 선택 목록 */}
                        {telOpen && (
                            <div className={style.telList}>
                                {
                                    telList.map((item, idx) => (
                                        <p
                                            key={idx}
                                            className={style.telItem}
                                            onClick={() => {
                                                setTelFirst(item);
                                                setTelOpen(false);
                                            }}
                                        >
                                            {item}
                                        </p>
                                    ))
                                }
                            </div>
                        )}

                    </div>


                    <span>-</span>


                    {/* 전화번호 중간자리 */}
                    <input
                        type="text"
                        name="telMiddle"
                        id="telMiddle"
                        placeholder="4자리"
                        className={`${style.input} ${style.telInput}`}
                        value={telMiddle}
                        maxLength={4}
                        onChange={e => {
                            const value = e.target.value.replace(/[^0-9]/g, "");
                            setTelMiddle(value);
                        }}
                    />


                    <span>-</span>


                    {/* 전화번호 뒷자리 */}
                    <input
                        type="text"
                        name="telLast"
                        id="telLast"
                        placeholder="4자리"
                        className={`${style.input} ${style.telInput}`}
                        value={telLast}
                        maxLength={4}
                        onChange={e => {
                            const value = e.target.value.replace(/[^0-9]/g, "");
                            setTelLast(value);
                        }}
                    />

                </div>


                {/* 클릭하면 form의 onSubmit(addmember)가 사용되도록 함 */}
                <button
                    type='submit'
                    className={btnStyle.submitBtn}>
                    가입하기
                </button>

            </form>
            {toast && (
                <ToastMsg
                    message={toast}
                />
            )}
        </div>
    )
}

export default Signup;