import React, { useEffect, useState, useCallback } from 'react';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from 'chart.js';
import { Pie } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import axios from 'axios';
import Slider from "react-slick";

// Slick Carousel CSS Import
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from 'react-router-dom';

// Chart.js 등록
ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

// 파이 차트 옵션 (폰트 크기 변경 영역)
export const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: true,
            position: 'right' as const,
            labels: {
                font: { size: 15, weight: '500' as const }, // 범례 폰트도 시원하게 15px로 지정
                padding: 18,
                color: '#334155',
            },
        },
        tooltip: {
            enabled: true,
            callbacks: {
                label: (context: any) => ` ${context.label}: ${context.raw}%`,
            },
        },
        datalabels: {
            color: '#ffffff',
            // 💡 [여기서 숫자의 글자 크기를 키웠습니다!]
            font: { size: 16, weight: 'bold' as const }, // 기존 13 -> 16으로 증가
            formatter: (value: number) => (value > 5 ? `${value}%` : ''),
        },
    },
};

interface RecommendProduct {
    productid?: number;
    pnm?: string;
    price?: number;
    imgnm?: string;
    categoryid?: number;
}

interface CategoryChartData {
    categoryid?: number;
    categorynm?: string;
    ctgytotqty: number;
    ctgyratio: number;
}

export const PersonalChart: React.FC = () => {
    const [chartDataList, setChartDataList] = useState<CategoryChartData[]>([]);
    const [recommendList, setRecommendList] = useState<RecommendProduct[]>([]);
    const [topCategoryName, setTopCategoryName] = useState<string>('');
    const [userName, setUserName] = useState<string>('고객');
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);

    const backendUrl = process.env.REACT_APP_BACK_END_URL || '';
    const navigate = useNavigate();
    // Slick Slider 옵션
    const sliderSettings = {
        infinite: recommendList.length > 2,
        speed: 500,
        slidesToShow: Math.min(recommendList.length || 1, 2),
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3500,
        arrows: true,
        dots: false,
    };

    // 데이터 조회
    const fetchData = useCallback(async (controller?: AbortController) => {
        try {
            const url = `${backendUrl}/api/chart/list`;
            const response = await axios.get(url, {
                signal: controller?.signal,
                withCredentials: true,
            });

            const { ctrydata, recommendProducts, bestdata, user, loginUser } = response.data;
            const productSource = recommendProducts || bestdata || [];

            const currentUser = user || loginUser;
            if (currentUser && (currentUser.name || currentUser.username)) {
                setUserName(currentUser.name || currentUser.username);
            }

            if (ctrydata && ctrydata.length > 0) {
                setChartDataList(ctrydata);
                setIsLoggedIn(true);

                const topCategory = ctrydata[0];
                const topCatName = topCategory.categorynm || '';
                setTopCategoryName(topCatName);

                setRecommendList(productSource);
            } else {
                setChartDataList([]);
                setRecommendList([]);
            }
        } catch (error) {
            if (!axios.isCancel(error)) {
                console.error("데이터 조회 실패:", error);
            }
        }
    }, [backendUrl]);

    useEffect(() => {
        const controller = new AbortController();
        fetchData(controller);
        return () => controller.abort();
    }, [fetchData]);

    const pieChartData = {
        labels: chartDataList.map((item) => item.categorynm || '기타'),
        datasets: [
            {
                data: chartDataList.map((item) => item.ctgyratio || 0),
                backgroundColor: [
                    '#6366F1', '#3B82F6', '#10B981', '#F59E0B', '#EC4899', '#8B5CF6'
                ],
                borderWidth: 2,
                borderColor: '#ffffff',
            },
        ],
    };

    const { loginNm } = JSON.parse(sessionStorage.getItem("loginInfo") || "{}");

    return (
        <div style={{
            display: 'flex',
            gap: '24px',
            maxWidth: '1200px',
            margin: '30px auto 0',
            padding: '0 20px',
            boxSizing: 'border-box'
        }}>
            {/* 1. 좌측 : 차트 영역 (55%) */}
            <div style={{ flex: '1 1 55%', backgroundColor: '#ffffff', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '20px', color: '#1e293b' }}>
                    🎯 연령/성별 맞춤 선호 카테고리
                </h3>
                <div style={{ height: '300px', position: 'relative' }}>
                    {chartDataList && chartDataList.length > 0 ? (
                        <Pie options={pieOptions} data={pieChartData} />
                    ) : (
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', color: '#94a3b8', fontSize: '14px' }}>
                            {!isLoggedIn ? "🔒 로그인 후 맞춤 차트를 확인하세요." : "📊 구매 내역 데이터 수집 중입니다."}
                        </div>
                    )}
                </div>
            </div>

            {/* 2. 우측 : 추천 상품 슬라이드 영역 (45%) */}
            <div style={{ flex: '1 1 45%', backgroundColor: '#ffffff', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', minWidth: 0 }}>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '20px', color: '#1e293b' }}>
                    🎁 <span style={{ color: '#4F46E5' }}>{loginNm}</span>님이 가장 좋아할만한
                    {topCategoryName && <span style={{ color: '#10B981' }}> [{topCategoryName}] </span>}
                    추천 상품!
                </h3>

                {recommendList && recommendList.length > 0 ? (
                    <div style={{ padding: '0 10px' }}>
                        <Slider {...sliderSettings}>
                            {recommendList.map((product, idx) => {
                                const name = product.pnm || '상품명 없음';
                                const price = product.price || 0;
                                const img = product.imgnm;
                                const id = product.productid || idx;

                                return (
                                    <div key={id} style={{ padding: '0 14px', boxSizing: 'border-box' }} 
                                    onClick={() => navigate(`/shopping/${id}`)}>
                                        <div style={{ textAlign: 'center', cursor: 'pointer' }}>
                                            {/* 이미지 박스 */}
                                            <div style={{
                                                width: '100%',
                                                aspectRatio: '1 / 1',
                                                backgroundColor: '#f1f5f9',
                                                borderRadius: '8px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                overflow: 'hidden'
                                            }}>
                                                {img ? (
                                                    <img src={img} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                ) : (
                                                    <span style={{ color: '#94a3b8', fontSize: '14px', fontWeight: '500' }}>No Image</span>
                                                )}
                                            </div>

                                            {/* 상품 정보 */}
                                            <div style={{ marginTop: '12px' }}>
                                                <div style={{
                                                    fontSize: '13px',
                                                    color: '#475569',
                                                    whiteSpace: 'nowrap',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    marginBottom: '4px'
                                                }}>
                                                    {name}
                                                </div>
                                                <div style={{ fontSize: '15px', fontWeight: 'bold', color: '#0f172a' }}>
                                                    {price ? `${price.toLocaleString()}원` : '가격 문의'}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </Slider>
                    </div>
                ) : (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '250px', color: '#94a3b8', fontSize: '14px' }}>
                        추천 상품 목록이 없거나 불러오는 중입니다.
                    </div>
                )}
            </div>
        </div>
    );
};

export default PersonalChart;