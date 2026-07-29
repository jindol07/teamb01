import React, { useState, useEffect, ChangeEvent } from "react";
import axios from "axios";
import style from "./surveyclient.module.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import btnStyle from '../components/btn.module.css';

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
    quetionid: number,
    answerdata: SurveyAnswerData[],
}
interface SurveyAnswerData {
    id: number,
    value: string,
    text: string,
}

const SurveyClientDetail: React.FC = () => {
    const { num } = useParams<{ num : string}>();
    const [loginInfo, setLoginInfo] = useState<string | null>(null);
    const [survey, setSurvey] = useState<Survey | null>(null);
    const [questionCount, setQuestionCount] = useState(0);
    // const [selectedsurveyType, setSelectedsurveyType] = useState<string | null>(null);
    const [answerData, setAnswerData] = useState<SurveyAnswer[]>([]);
    const navigate = useNavigate();
    const inputTypeMap = {
        RADIO: "radio",
        TEXT: "text",
        CHECKBOX: "checkbox",
    };
    let userId : number = 0;
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
        answerData[q.questionid] = {
            userid: userId,
            surveyid: surveyId,
            quetionid: q.questionid,
            answerdata: [],
        }
    }
    const submitSurvey = async (e: React.FormEvent) => {
        e.preventDefault(); // 폼 기본 동작 방지
        // if (!selectedsurveyType || !survey) {
        //     alert("항목을 선택해주세요.");
        //     return;
        // }
        try {
            
            //answerData.answerdata.push();

            // 선택된 설문 항목을 서버로 전송
            const response = await axios.post(`${process.env.REACT_APP_BACK_END_URL}/api/survey/answer`, answerData);
            console.log(response);
            if (response.status === 200) {
                alert("설문이 성공적으로 제출되었습니다.");
                //fetchLatestSurvey(); // 제출 후 설문 데이터 다시 로드
                // navigate(`/community/surveyclientResult/${survey.surveyid}`);  // 설문조사 이후 결과로 이동
            } else {
                alert("설문 제출에 실패했습니다.");
            }
        } catch (error) {
            console.error("Failed to submit survey:", error);
            alert("설문 제출 중 오류가 발생했습니다.");
        }
    };
    useEffect(() => {
        const userData = sessionStorage.getItem("loginInfo");
        if (userData != null) {
            const userDataJson = JSON.parse(userData);
            setLoginInfo(userDataJson.role)
            userId = userDataJson.usmo;
        } else {
            setLoginInfo(null);
        }
        //여기까지
        fetchLatestSurvey();
        if (survey != null) {
            setQuestionCount(survey.questionList.length);
        }
    }, [survey]);
    if (!survey) {
        return <div>설문 데이터를 불러오는 중...</div>;
    }
    return (
        <div className={`container ${style.surveyContainer}`}>
            <div className={`card ${style.surveyCard}`}>
                <div className="card-body">
                    <h2 className={style.title}>{survey.surveytitle}</h2>
                    {/* <h4 className={style.contt}>{survey.cont}</h4> */}
                    <p className={style.info}>총 {questionCount}문항</p>
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
                            {loginInfo === 'U' && (
                                <button type="submit" className={`${btnStyle.submitBtn}`} style={{ marginBottom: 20 }}>
                                    제출하기
                                </button>
                            )}
                        </div>
                    </form>
                    <div className={`${style.actionArea} text-center`}>
                        <Link to={"/community/survey"} className={btnStyle.button}>목록</Link>
                        {loginInfo === 'A' && (
                            <Link to={`/admin/surveyList`} className={btnStyle.button}>
                                수정
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SurveyClientDetail;