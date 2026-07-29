import React, { useState, useEffect } from "react";
import axios from "axios";
import style from "./surveyclient.module.css"
import { Link, useNavigate } from "react-router-dom";
import btnStyle from '../components/btn.module.css'

interface Survey {
    surveyid: number,
    surveytitle: string,
    usrno: string,
    status?: string,
    questionList?: [],
}

const SurveyClient: React.FC = () => {
    const [loginInfo, setLoginInfo] = useState<string | null>(null);
    const [surveys, setSurveys] = useState<Survey[] | null>(null);
    const [contentsLength, setContentsLength] = useState(2);
    const [selectedsurveyType, setSelectedsurveyType] = useState<string | null>(null);
    const navigate = useNavigate();
    // 서버에서 최신 설문 데이터를 가져오는 함수
    const fetchLatestSurvey = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACK_END_URL}/api/survey/allList`);
            if (response.status === 200) {
                console.log(response.data);
                setSurveys(response.data);
            } else {
                console.log("No survey data available.");
                return <div>현재 진행중인 설문조사가 없습니다.</div>;
            }
        } catch (error) {
            console.error("Failed to fetch survey:", error);
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
        setContentsLength(surveys ? surveys.length : 0);
    }, []);
    if (!surveys) {
        return <div>설문 데이터를 불러오는 중...</div>;
    }
    return (
        <div className={`container ${style.surveyContainer}`}>
            <div className={`card ${style.surveyCard}`}>
                <div className="card-body">
                    <h2 className={style.title}>설문 조사 리스트</h2>
                    {surveys.map((e, i) => e.questionList?.length && (
                        <div key={i}>
                            <Link to={`/community/survey/${e.surveyid}`}>{e.surveytitle}</Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SurveyClient;