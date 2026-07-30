import React, { useState, useEffect, ChangeEvent, useRef } from "react";
import axios from "axios";
import style from "./surveyclientdetail.module.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import btnStyle from '../components/btn.module.css';
import Confirm from '../components/Confirm'
import ToastMsg from "../components/ToastMsg";


interface Survey {
    surveyid: number,
    surveytitle: string,
    usrno: string,
    questionList: SurveyQuestion[],
    rdate: string,
    startdate?: string,
    enddate?: string,
    status?: string,
}
type QuestionType = "RADIO" | "TEXT" | "CHECKBOX";
interface SurveyQuestion {
    surveyid: number,
    questionid: number,
    questiontitle: string,
    questiontype: QuestionType,
    questionlist: SurveyQuestionList[],
    sort_order: number,
}
interface SurveyQuestionList {
    id: number,
    value: string,
    hasTextInput: boolean,
}
interface SurveyAnswer {
    userid: number,
    surveyid: number,
    questionid: number,
    answerdata: SurveyAnswerData[],
}
interface SurveyAnswerData {
    id: number,
    value: string,
    text: string,
}

const SurveyClientDetail: React.FC = () => {
    const { num } = useParams<{ num : string}>();
    const [loginInfo, setLoginInfo] = useState<{ role: string, usrno: number } | null>(null);
    const [survey, setSurvey] = useState<Survey | null>(null);
    // const [selectedsurveyType, setSelectedsurveyType] = useState<string | null>(null);
    // const [answerData, setAnswerData] = useState<SurveyAnswer[]>([]);
    // const [answerMapList, setAnswerMapList] = useState<SurveyAnswerData[]>([]);
    const [answerData, setAnswerData] = useState<Record<number, SurveyAnswer>>({});
    const [toastMsg, setToastMsg] = useState("");
    const [showConfirm, setShowConfirm] = useState(false);
    const navigate = useNavigate();
    const inputTypeMap = {
        RADIO: "radio",
        TEXT: "text",
        CHECKBOX: "checkbox",
    };
    let surveyId : number = Number(num);
    const fetchLatestSurvey = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACK_END_URL}/api/survey/detail/${num}`);
            if (response.status === 200) {
                setSurvey(response.data);
            } else {
                console.log("No survey data available.");
                return <div>현재 진행중인 설문조사가 없습니다.</div>;
            }
        } catch (error) {
            console.error("Failed to fetch survey:", error);
        }
    };
    const handleAnswerChange = (q:SurveyQuestion, e:SurveyQuestionList) => {
        if (!answerData[q.questionid]) {
            if (!loginInfo) {
                showToast("로그인 정보가 없습니다.");
                return;
            }
            answerData[q.questionid] = {
                userid: loginInfo.usrno,
                surveyid: surveyId,
                questionid: q.questionid,
                answerdata: [{
                    id: e.id,
                    value: e.value,
                    text: "",
                }],
            };
        } else {
            for (let f of answerData[q.questionid].answerdata) {
                if (f.id == e.id) {
                    f.value = e.value;
                } else {
                    if (q.questiontype == "CHECKBOX") {
                        // 작업 예정
                    }
                }
            }
        }
    }
    const submitSurvey = async (e: React.FormEvent) => {
        e.preventDefault(); // 폼 기본 동작 방지
        try {
            // 선택된 설문 항목을 서버로 전송
            console.log(answerData);
            Object.values(answerData)
            const answerDataToArray = Object.values(answerData);
            if (answerDataToArray.length !== survey?.questionList.length) {
                showToast("항목을 선택하지 않은 질문이 있습니다.");
                return;
            }
            console.log(answerDataToArray);
            const response = await axios.post(`${process.env.REACT_APP_BACK_END_URL}/api/survey/answers`, answerDataToArray);
            console.log(response);
            if (response.status === 200) {
                // showToast("설문이 성공적으로 제출되었습니다."); 
                setShowConfirm(true);
                
                ;  // 설문조사 이후 결과로 이동
            } else {
                showToast("설문 제출에 실패했습니다.");
            }
        } catch (error) {
            console.error("Failed to submit survey:", error);
            showToast("설문 제출 중 오류가 발생했습니다.");
        }
    };
    useEffect(() => {
        const userData = sessionStorage.getItem("loginInfo");
        if (userData != null) {
            const userDataJson = JSON.parse(userData);
            setLoginInfo(userDataJson)
        } else {
            setLoginInfo(null);
        }   
        //여기까지
        fetchLatestSurvey();
    }, []);
    // 토스트메세지 공통 함수
    const showToast = (message: string) => {
        setToastMsg(message);
        setTimeout(() => {
            setToastMsg("");
        }, 2000);
    };

    if (!survey) {
        return <div>설문 데이터를 불러오는 중...</div>;
    }
    return (
        <div className={`container ${style.surveyContainer}`}>
            <div className={`card ${style.surveyCard}`}>
                <div className="card-body">
                    <h2 className={style.title}>{survey.surveytitle}</h2>
                    {/* <h4 className={style.contt}>{survey.cont}</h4> */}
                    <p className={style.info}>총 {survey.questionList.length}문항</p>
                    <form onSubmit={submitSurvey}>
                        {survey.questionList.map((q, i) => (
                            <div key={i} className={style.questionItem} id={"question_" + q.questionid}>
                                <h4>{q.questiontitle}</h4>
                                {
                                    q.questionlist ? q.questionlist.map((e, j) => (
                                        <div key={j}>
                                            <input className={style.radio} type={inputTypeMap[q.questiontype]} 
                                                name={"surveyType_" + q.questionid} id={`question_${q.questiontype}`} 
                                                onChange={() => handleAnswerChange(q, e)}/>
                                            <label className={style.questionLabel} htmlFor={`survey-${i}`}>{(j + 1) + ". "} {e.value}</label>
                                        </div>
                                    )) : <div>보기가 존재하지 않습니다.</div>
                                }
                            </div>
                        ))}
                        {/* <div className={style.actionArea}> */}
                        <div className={`${style.actionArea} text-center`}>
                            {loginInfo?.role === 'U' && (
                                <button type="submit" className={`${btnStyle.submitBtn}`} style={{ marginBottom: 20 }}>
                                    제출하기
                                </button>
                            )}
                        </div>
                    </form>
                    <div className={`${style.actionArea} text-center`}>
                        <Link to={"/community/survey"} className={btnStyle.button}>목록</Link>
                        {loginInfo?.role === 'A' && (
                            <Link to={`/admin/surveyList`} className={btnStyle.button}>
                                수정
                            </Link>
                        )}
                    </div>
                </div>
            </div>
            {toastMsg && <ToastMsg message={toastMsg} />}
            {
                showConfirm && (
                    <Confirm
                        message="설문이 성공적으로 제출되었습니다."
                        onConfirm={() => {
                            setShowConfirm(false);
                            navigate(`/community/survey`);
                        }}
                    />
                )
            }
        </div>
    );
};

export default SurveyClientDetail;