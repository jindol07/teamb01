import React, { useState, useEffect } from "react";

import axios from "axios";

import style from "./surveyclient.module.css"

import { Link, useNavigate } from "react-router-dom";

import btnStyle from '../components/btn.module.css'




interface SurveyContent {

    surveytype: string;

    surveytitle: string;

    surveyCnt: number;

}



interface Survey {

    num: number;

    sub: string;

    cont: string;

    code: number;

    contents: SurveyContent[];

}



const SurveyClient: React.FC = () => {

    const [loginInfo, setLoginInfo] = useState<string | null>(null);

    const [survey, setSurvey] = useState<Survey | null>(null);

    const [selectedSurveyType, setSelectedSurveyType] = useState<string | null>(null);

    const navigate = useNavigate();

    // 서버에서 최신 설문 데이터를 가져오는 함수

    const fetchLatestSurvey = async () => {

        try {

            const response = await axios.get(`${process.env.REACT_APP_BACK_END_URL}/api/survey/latest`);

            if (response.status === 200) {

                console.log(response.data);

                setSurvey(response.data);

            } else {

                console.log("No survey data available.");

            }

        } catch (error) {

            console.error("Failed to fetch survey:", error);

        }

    };



    const submitSurvey = async (e: React.FormEvent) => {

        e.preventDefault(); // 폼 기본 동작 방지

        if (!selectedSurveyType || !survey) {

            alert("항목을 선택해주세요.");

            return;

        }



        try {

            // 선택된 설문 항목을 서버로 전송

            const response = await axios.post(`${process.env.REACT_APP_BACK_END_URL}/api/survey/updateCount`, {

                subcode: survey.num, // 설문 번호

                surveytype: selectedSurveyType, // 선택된 설문 유형

            });



            if (response.status === 200) {

                alert("설문이 성공적으로 제출되었습니다.");

                //fetchLatestSurvey(); // 제출 후 설문 데이터 다시 로드

                navigate(`/community/surveyclientResult/${survey.num}`);  // 설문조사 이후 결과로 이동

            } else {

                alert("설문 제출에 실패했습니다.");

            }

        } catch (error) {

            console.error("Failed to submit survey:", error);

            alert("설문 제출 중 오류가 발생했습니다.");

        }

    };



    useEffect(() => {

        //백단 들어갈때 수정할거
        if (sessionStorage.getItem("loginInfo")) {
            setLoginInfo(JSON.parse(sessionStorage.getItem("loginInfo") ?? "").role)
        } else {
            setLoginInfo(null);
        }
        //여기까지

        fetchLatestSurvey();

    }, []);



    if (!survey) {

        return <div>설문 데이터를 불러오는 중...</div>;

    }



    return (
        <div className={`container ${style.surveyContainer}`}>
            <div className={`card ${style.surveyCard}`}>
                <div className="card-body">
                    <h2 className={style.title}>{survey.sub}</h2>
                    {/* <h4 className={style.contt}>{survey.cont}</h4> */}
                    <h6 className={style.contt}>7월맞이 쿠폰 이벤트 진행중입니다! 원하시는 항목에 투표해주세요.</h6>
                    <p className={style.info}>총 {survey.code}문항</p>

                    <form onSubmit={submitSurvey}>
                        {survey.contents.map((content, index) => (
                            <div
                                key={index}
                                className={style.questionItem}
                            >
                                <input
                                    className={style.radio}
                                    type="radio"
                                    name="surveytype"
                                    value={content.surveytype}
                                    id={`survey-${index}`}
                                    onChange={(e) => setSelectedSurveyType(e.target.value)}
                                />

                                <label
                                    className={style.questionLabel}
                                    htmlFor={`survey-${index}`}
                                >
                                    {content.surveytitle}
                                </label>
                            </div>
                        ))}

                        {/* <div className={style.actionArea}> */}
                        <div className={`${style.actionArea} text-center`}>
                            {loginInfo === 'USER' && (
                                <button type="submit" className={`${btnStyle.submitBtn}`}>
                                    제출하기
                                </button>
                            )}
                        </div>
                    </form>

                    <div className={`${style.actionArea} text-center`}>
                        {loginInfo === 'ADMIN' && (
                            <Link to={`/admin/surveyList`} className={btnStyle.button}>
                                확인 (관리자)
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </div>

    );

};



export default SurveyClient;