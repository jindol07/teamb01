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
type ConfirmState = "save" | "tempsave" | "";

const SurveyClientDetail: React.FC = () => {
    const { num } = useParams<{ num : string}>();
    const [loginInfo, setLoginInfo] = useState<{ role: string, usrno: number } | null>(null);
    const [survey, setSurvey] = useState<Survey | null>(null);
    const [answerData, setAnswerData] = useState<Record<number, SurveyAnswer>>({});
    // const [surveyAnswer, setSurveyAnswer] = useState<SurveyAnswer[] | null>(null);
    const [toastMsg, setToastMsg] = useState("");
    const [showConfirm, setShowConfirm] = useState("");
    const navigate = useNavigate();
    const inputTypeMap = {
        RADIO: "radio",
        TEXT: "text",
        CHECKBOX: "checkbox",
    };
    let surveyId : number = Number(num);
    const fetchLatestSurvey = async () => {
        const userData = await sessionStorage.getItem("loginInfo");
        if (userData != null) {
            const userDataJson = JSON.parse(userData);
            setLoginInfo(userDataJson);
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
            try {
                const res = await axios.get(`${process.env.REACT_APP_BACK_END_URL}/api/survey/userAnswer?userid=${userDataJson.usrno}&surveyid=${num}`);        
                if (res.status === 200) {
                    console.log(res.data);
                    const answerMap:SurveyAnswer[] = [];
                    res.data.map((e : SurveyAnswer) => {
                        answerMap[e.questionid] = e;
                    });
                    console.log(answerMap);
                    setAnswerData(answerMap);
                    // console.log(answerMap);
                } else {
                    console.log(res);   
                }
            } catch (error) {
                console.error("Failed to fetch survey2:", error);
            }
        } else {
            setShowConfirm("3"); // 3
            console.log(showConfirm);
            setLoginInfo(null);
        }
    };
    // const handleAnswerChange = (q:SurveyQuestion, e:SurveyQuestionList) => {
    //     if (!answerData[q.questionid]) {
    //         if (!loginInfo) {
                
    //             showToast("로그인 정보가 없습니다.");
    //             return;
    //         }
    //         console.log(4444);
    //         setAnswerData({...answerData,
    //             [q.questionid]: {
    //                 userid: loginInfo.usrno,
    //                 surveyid: surveyId,
    //                 questionid: q.questionid,
    //                 answerdata: [{ 
    //                     id: e.id,
    //                     value: e.value,
    //                     text: "",
    //                 }],
    //             }
    //         });
    //     } else {
    //         console.log(23124124);

    //         for (let f of answerData[q.questionid].answerdata) {
    //             if (f.id == e.id) {
    //                 f.value = e.value;
    //             } else {
    //                 if (q.questiontype == "CHECKBOX") {
    //                     // 작업 예정
    //                 }
    //             }
    //         }
    //     }
    // };
    const handleAnswerChange = (q:SurveyQuestion, e:SurveyQuestionList) => {
        if (!loginInfo) {
            showToast("로그인 정보가 없습니다.");
            return;
        } else {
            console.log(4444);
            setAnswerData({...answerData,
                [q.questionid]: {
                    userid: loginInfo.usrno,
                    surveyid: surveyId,
                    questionid: q.questionid,
                    answerdata: [{ 
                        id: e.id,
                        value: e.value,
                        text: "",
                    }],
                }
            });
        }
    };
    const submitSurvey = async (e: React.FormEvent) => {
        e.preventDefault(); // 폼 기본 동작 방지
        try {
            // 선택된 설문 항목을 서버로 전송
            Object.values(answerData)
            const answerDataToArray = Object.values(answerData);
            if (answerDataToArray.length !== survey?.questionList.length) {
                // showToast("항목을 선택하지 않은 질문이 있습니다.");
                setShowConfirm("2"); // 2
                return
            }

            const response = await axios.post(`${process.env.REACT_APP_BACK_END_URL}/api/survey/answers`, answerDataToArray);
            if (response.status === 200) {
                console.log(234234);
                // showToast("설문이 성공적으로 제출되었습니다."); 
                setShowConfirm("1"); // 1
                  // 설문조사 이후 결과로 이동
            } else {
                showToast("설문 제출에 실패했습니다.");
            }
        } catch (error) {
            console.error("Failed to submit survey:", error);
            showToast("설문 제출 중 오류가 발생했습니다.");
        }
    };
    useEffect(() => {
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
        return (
            <>
                {showConfirm == "3" && (
                    <Confirm
                        message={"로그인 정보가 없습니다."}
                        onConfirm={() => {
                            setShowConfirm("");
                            navigate(`/community/survey`);
                        }}
                    />)
                }
                <div>설문 데이터를 불러오는 중...</div>
            </>
        );
    }
    return (
        <div className={`container ${style.surveyContainer}`}>
            <div className={`card ${style.surveyCard}`}>
                <div className="card-body">
                    <h2 className={style.title}>{survey.surveytitle}</h2>
                    {/* <h4 className={style.contt}>{survey.cont}</h4> */}
                    <p className={style.info}>총 {survey.questionList.length} 문항</p>
                    <form onSubmit={submitSurvey}>
                        {survey.questionList.map((q, i) => (
                            <div key={i} className={style.questionItem} id={"question_" + q.questionid}>
                                <h4>{q.questiontitle}</h4>
                                {
                                    q.questionlist ? q.questionlist.map((e, j) => {
                                        let checked = answerData[q.questionid]?.answerdata[0]?.id == e.id;
                                        console.log(checked, answerData);
                                        return (<div key={j}>
                                            <input className={style.radio} type={inputTypeMap[q.questiontype]} 
                                                name={"surveyType_" + q.questionid} id={`question_${q.questiontype}`} 
                                                onChange={() => handleAnswerChange(q, e)}
                                                checked={checked}
                                            />
                                            <label className={style.questionLabel} htmlFor={`survey-${i}`}>{(j + 1) + ". "} {e.value}</label>
                                        </div>)
                                    }) : <div>보기가 존재하지 않습니다.</div>
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
            {showConfirm == "1" && (
                    <Confirm
                        message={"설문이 성공적으로 제출되었습니다."}
                        onConfirm={() => {
                            setShowConfirm("");
                            navigate(`/community/survey`);
                        }}
                    />
                )
            }
            {showConfirm == "2" && (
                    <Confirm
                        message={"항목을 선택하지 않은 질문이 있습니다. 임시저장 하시겠습니까?"}
                        onConfirm={async () => {
                            try {
                                Object.values(answerData)
                                const answerDataToArray = Object.values(answerData);
                                const response = await axios.post(`${process.env.REACT_APP_BACK_END_URL}/api/survey/answers`, answerDataToArray);
                                if (response.status === 200) {
                                    setShowConfirm("tempsave");
                                } else {
                                    showToast("설문 제출에 실패했습니다.");
                                }
                            } catch (error) {
                                console.error("Failed to submit survey:", error);
                                showToast("설문 제출 중 오류가 발생했습니다.");
                            }
                        }}
                        onCancel={() => {
                            setShowConfirm("");
                            navigate(`/community/survey`);
                        }}
                    />
                )
            }
            {showConfirm == "tempsave" && (
                <Confirm
                    message={"임시 저장되었습니다."}
                    onConfirm={() => {
                        navigate(`/community/survey`);
                        setShowConfirm("");
                    }}
                />
            )}
        </div>
    );
};

export default SurveyClientDetail;