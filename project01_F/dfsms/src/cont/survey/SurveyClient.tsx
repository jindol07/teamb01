import React, { useState, useEffect } from "react";
import axios from "axios";
import style from "./surveyclient.module.css";
import { Link, useNavigate } from "react-router-dom";

interface Survey {
  surveyid: number;
  surveytitle: string;
  usrno: string;
  status?: string;
  questionList?: any[];
}

const SurveyClient: React.FC = () => {
  const [loginInfo, setLoginInfo] = useState<string | null>(null);
  const [surveys, setSurveys] = useState<Survey[] | null>(null);
  const navigate = useNavigate();

  const fetchLatestSurvey = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACK_END_URL}/api/survey/allList`
      );
      if (response.status === 200) {
        setSurveys(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch survey:", error);
      setSurveys([]); // 에러 시 빈 배열로 설정하여 로딩 상태 해제
    }
  };

  useEffect(() => {
    if (sessionStorage.getItem("loginInfo")) {
      setLoginInfo(JSON.parse(sessionStorage.getItem("loginInfo") ?? "").role);
    } else {
      setLoginInfo(null);
    }
    fetchLatestSurvey();
  }, []);

  if (!surveys) {
    return (
      <div className={style.loadingContainer}>
        <div className={style.spinner}></div>
        <p>설문 데이터를 불러오는 중...</p>
      </div>
    );
  }

  // 문항(questionList)이 있는 설문조사만 필터링
  const validSurveys = surveys.filter((s) => s.questionList && s.questionList.length > 0);

  return (
    <div className={style.surveyContainer}>
      <div className={style.headerSection}>
        <h2 className={style.title}>📋 설문조사 목록</h2>
        <p className={style.subtitle}>
          여러분의 소중한 의견을 들려주세요. 참여해 주신 의견은 서비스 개선에 반영됩니다.
        </p>
      </div>

      {validSurveys.length > 0 ? (
        <div className={style.surveyGrid}>
          {validSurveys.map((survey) => (
            <div
              key={survey.surveyid}
              className={style.surveyCard}
              onClick={() => navigate(`/community/survey/${survey.surveyid}`)}
            >
              <div className={style.badgeGroup}>
                <span className={style.statusBadge}>진행중</span>
                <span className={style.questionCount}>
                  {survey.questionList?.length}개 문항
                </span>
              </div>
              <h3 className={style.cardTitle}>{survey.surveytitle}</h3>
              <div className={style.cardFooter}>
                <span className={style.actionText}>설문 참여하기 →</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={style.emptyState}>
          <p>🔍 현재 진행 중인 설문조사가 없습니다.</p>
        </div>
      )}
    </div>
  );
};

export default SurveyClient;