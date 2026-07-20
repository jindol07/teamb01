import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Style from "./surveyclientresult.module.css";

interface SurveyContent {
    surveytype: string;
    surveytitle: string;
    surveycnt: number;
}

interface Survey {
    num: number;
    sub: string;
    code: number;
    contents: SurveyContent[];
}

const SurveyClientResult: React.FC = () => {
    const { num } = useParams<{ num: string }>();
    const [survey, setSurvey] = useState<Survey | null>(null);
    const [ChartComponents, setChartComponents] = useState<any>(null);

    const backendUrl = process.env.REACT_APP_BACK_END_URL;

    // 1. 설문조사 데이터 가져오기
    useEffect(() => {
        const fetchLatestSurvey = async () => {
            try {
                const response = await axios.get(`${backendUrl}/api/survey/result/${num}`);
                if (response.status === 200) {
                    setSurvey(response.data);
                }
            } catch (error) {
                console.error("Failed to fetch survey results:", error);
            }
        };

        fetchLatestSurvey();
    }, [num, backendUrl]);

    // 2. ⭐ Pie 차트 라이브러리 동적 로드 (BarElement -> ArcElement로 변경)
    // useEffect(() => {
    //     Promise.all([
    //         import('react-chartjs-2'),
    //         import('chart.js')
    //     ]).then(([reactChartJS, chartJS]) => {
    //         chartJS.Chart.register(
    //             chartJS.CategoryScale,
    //             chartJS.LinearScale,
    //             chartJS.ArcElement, // 👈 원형 차트를 그리기 위한 필수 요소
    //             chartJS.Title,
    //             chartJS.Tooltip,
    //             chartJS.Legend
    //         );
    //         // 상태에 Pie 컴포넌트 저장
    //         setChartComponents({ Pie: reactChartJS.Pie });
    //     });
    // }, []);

    // 3. 조기 리턴(Early Return) 처리 구역
    if (!survey) {
        return <div className={Style.loading}>결과를 불러오는 중...</div>;
    }

    // if (!ChartComponents) {
    //     return <div className={Style.loading}>차트 로딩 중...</div>;
    // }

    // 4. 동적 로드 완료된 Pie 컴포넌트 꺼내기
    // const { Pie } = ChartComponents;

    // 5. 총 투표 수 계산
    const totalVotes = survey.contents.reduce((sum, content) => sum + content.surveycnt, 0);

    // 6. Pie 차트 데이터 설정
    // const chartData = {
    //     labels: survey.contents.map((content) => content.surveytitle),
    //     datasets: [
    //         {
    //             label: '득표 수',
    //             data: survey.contents.map((content) => content.surveycnt),
    //             // 원형 차트는 구역별로 색상이 달라야 예쁘므로 대비되는 이쁜 파스텔톤 컬러 배열을 배치했습니다.
    //             backgroundColor: [
    //                 'rgba(54, 162, 235, 0.6)',   // 블루
    //                 'rgba(255, 99, 132, 0.6)',   // 레드
    //                 'rgba(255, 206, 86, 0.6)',   // 옐로우
    //                 'rgba(75, 192, 192, 0.6)',   // 민트
    //                 'rgba(153, 102, 255, 0.6)',  // 퍼플
    //             ],
    //             borderColor: [
    //                 'rgba(54, 162, 235, 1)',
    //                 'rgba(255, 99, 132, 1)',
    //                 'rgba(255, 206, 86, 1)',
    //                 'rgba(75, 192, 192, 1)',
    //                 'rgba(153, 102, 255, 1)',
    //             ],
    //             borderWidth: 1,
    //         },
    //     ],
    // };

    // 7. Pie 차트 옵션 설정
    // const chartOptions = {
    //     responsive: true,
    //     plugins: {
    //         legend: {
    //             display: true,
    //             position: 'bottom' as const // 각 항목 레이블(범례)을 차트 아래에 깔끔하게 표시
    //         },
    //         title: {
    //             display: true,
    //             text: `실시간 투표 비율 (총 ${totalVotes}표)`,
    //             font: { size: 16 }
    //         },
    //     },
    // };

    return (
        <div className={Style["result-container"]}>
            <h2>{survey.sub} - 투표 결과</h2>


            <div style={{ width: '100%', maxWidth: '380px', margin: '40px auto 10px' }}>
                {/* <Pie data={chartData} options={chartOptions} /> */}
                <br />
                <h5 style={{textAlign : "center"}}>총 투표 수: {totalVotes}</h5>
            </div>


            <div className={Style.results}>
                {survey.contents.map((content, index) => {
                    const percentage = totalVotes > 0 ? Math.round((content.surveycnt / totalVotes) * 100) : 0;

                    return (
                        <div key={index} className={Style["result-item"]}>
                            <div className={Style["result-label"]}>
                                {content.surveytitle} ({content.surveycnt}표)
                            </div>
                            <div className={Style["progress-bar"]}>
                                <div
                                    className={Style["progress-fill"]}
                                    style={{ width: `${percentage}%` }}
                                />
                            </div>
                            <div className={Style.percentage}>{percentage}%</div>
                        </div>
                    );
                })}
            </div>




        </div>

    );
};

export default SurveyClientResult;