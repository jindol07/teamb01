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
import { useNavigate } from 'react-router-dom';

// 🔹 분리한 공통 CustomSlider 컴포넌트 Import
import CustomSlider from './CustomSlider';

// Chart.js 등록
ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

// 파이 차트 옵션
export const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: true,
            position: 'right' as const,
            labels: {
                font: { size: 15, weight: '500' as const },
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
            font: { size: 16, weight: 'bold' as const },
            formatter: (value: number) => (value > 5 ? `${value}%` : ''),
        },
    },
};

const SPRING_SERVER_URL = process.env.REACT_APP_BACK_END_URL || "http://localhost:8080/dfsms";
const NO_IMAGE_PLACEHOLDER =
    "data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22200%22%20height%3D%22200%22%20viewBox%3D%220%200%20200%20200%22%3E%3Crect%20fill%3D%22%23f0f0f0%22%20width%3D%22200%22%20height%3D%22200%22%2F%3E%3Ctext%20fill%3D%22%23888888%22%20font-family%3D%22sans-serif%22%20font-size%3D%2216%22%20x%3D%2250%25%22%20y%3D%2250%25%22%20text-anchor%3D%22middle%22%20dy%3D%22.3em%22%3ENo%20Image%3C%2Ftext%3E%3C%2Fsvg%3E";

const getImageUrl = (rawImg?: string) => {
    if (!rawImg) return NO_IMAGE_PLACEHOLDER;
    if (
        rawImg.startsWith("http://") ||
        rawImg.startsWith("https://") ||
        rawImg.startsWith("data:")
    ) {
        return rawImg;
    }
    const fileName = rawImg.split(/[/\\]/).pop();
    return `${SPRING_SERVER_URL}/imgfile/gallery/${fileName}`;
};

interface RecommendProduct {
    productid?: number;
    PRODUCTID?: number;
    pnm?: string;
    PNM?: string;
    title?: string;
    TITLE?: string;
    price?: number;
    PRICE?: number;
    imgnm?: string;
    IMGNM?: string;
    pimg?: string;
    categoryid?: number;
    CATEGORYID?: number;
    qty?: number;
    QTY?: number;
    cont?: string;
    CONT?: string;
    categorynm?: string;
    [key: string]: any; // 기타 백엔드 필드 대응
}

interface CategoryChartData {
    categoryid?: number;
    categorynm?: string;
    ctgytotqty?: number;
    ctgyratio?: number;
}

export const PersonalChart: React.FC = () => {
    const navigate = useNavigate();
    const [chartDataList, setChartDataList] = useState<CategoryChartData[]>([]);
    const [recommendList, setRecommendList] = useState<RecommendProduct[]>([]);
    const [topCategoryName, setTopCategoryName] = useState<string>('');
    const backendUrl = process.env.REACT_APP_BACK_END_URL;

    const { loginNm } = JSON.parse(sessionStorage.getItem("loginInfo") || "{}");

    const fetchPersonalChartData = useCallback(async (controller?: AbortController) => {
        try {
            const url = `${backendUrl}/api/chart/list`;

            const response = await axios.get(url, {
                signal: controller?.signal,
                withCredentials: true,
            });

            console.log("차트 Response Data:", response.data);

            const chartData = response.data?.ctrydata || response.data?.categoryData || response.data?.chartList || [];
            const productSource = response.data?.recommendProducts || response.data?.bestdata || [];

            if (Array.isArray(chartData) && chartData.length > 0) {
                setChartDataList(chartData);
                setTopCategoryName(chartData[0]?.categorynm || '');
            } else {
                setChartDataList([]);
            }

            setRecommendList(productSource);
        } catch (error) {
            if (axios.isCancel(error)) {
                console.log("요청 취소됨");
            } else {
                console.error("개인화 차트 데이터 가져오기 실패:", error);
            }
        }
    }, [backendUrl]);

    useEffect(() => {
        const controller = new AbortController();
        fetchPersonalChartData(controller);

        return () => {
            controller.abort();
        };
    }, [fetchPersonalChartData]);

    const pieChartData = {
        labels: chartDataList.map((item) => item.categorynm || '기타'),
        datasets: [
            {
                data: chartDataList.map((item) => item.ctgyratio ?? 0),
                backgroundColor: [
                    '#6366F1', '#3B82F6', '#10B981', '#F59E0B', '#EC4899', '#8B5CF6'
                ],
                borderWidth: 2,
                borderColor: '#ffffff',
            },
        ],
    };

    const getCategoryName = (categoryId?: number | string) => {
        const id = String(categoryId);
        switch (id) {
            case "1": return "과일류";
            case "2": return "채소류";
            case "3": return "육류";
            case "4": return "어류";
            case "5": return "밀키트";
            default: return "Fresh Food";
        }
    };

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
                            📊 차트 데이터를 불러오는 중입니다.
                        </div>
                    )}
                </div>
            </div>

            {/* 2. 우측 : 추천 상품 슬라이드 영역 (45%) */}
            <div style={{ flex: '1 1 45%', backgroundColor: '#ffffff', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', minWidth: 0 }}>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '20px', color: '#1e293b' }}>
                    🎁 {loginNm}님이 가장 좋아할만한
                    {topCategoryName && <span style={{ color: '#10B981' }}> [{topCategoryName}] </span>}
                    추천 상품!
                </h3>

                {recommendList && recommendList.length > 0 ? (
                    <div style={{ padding: '0 10px' }}>
                        <CustomSlider<RecommendProduct>
                            data={recommendList}
                            settings={{
                                infinite: recommendList.length > 2,
                                slidesToShow: Math.min(recommendList.length || 1, 2),
                                slidesToScroll: 1,
                                autoplaySpeed: 3500,
                            }}
                            renderItem={(product, idx) => {
                                // 소문자/대문자 필드 모두 고려하여 추출
                                const name = product.pnm || product.PNM || product.title || product.TITLE || '상품명 없음';
                                const price = product.price ?? product.PRICE ?? 0;
                                const id = product.productid ?? product.PRODUCTID ?? idx;
                                const rawImg = product.imgnm || product.IMGNM || product.pimg;
                                const imageUrl = getImageUrl(rawImg);
                                const rawCategory = product.CATEGORYID ?? product.categoryid;
                                const categoryName = getCategoryName(rawCategory);
                                // 💡 재고량(qty) 및 상세설명(cont) 추출
                                const qty = product.qty ?? product.QTY ?? 0;
                                const cont = product.cont || product.CONT || '';
                                const categoryid = product.categoryid ?? product.CATEGORYID;
                               


                                return (
                                    <div
                                        style={{ padding: '0 14px', boxSizing: 'border-box' }}
                                        onClick={() => navigate(`/shopping/${id}`, {
                                            state: {
                                                ...product, // 원본 객체 전체 포함
                                                productid: id,
                                                pnm: name,
                                                price: price,
                                                image: imageUrl,
                                                qty: qty,       // 💡 재고 수량 명시
                                                cont: cont,     // 💡 상세 설명 명시
                                                categoryid: categoryid,
                                                categoryName: categoryName
                                            },
                                        })}
                                    >
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
                                                <img
                                                    src={imageUrl}
                                                    alt={name}
                                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                    onError={(e) => {
                                                        const target = e.target as HTMLImageElement;
                                                        target.onerror = null;
                                                        target.src = NO_IMAGE_PLACEHOLDER;
                                                    }}
                                                />
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
                            }}
                        />
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