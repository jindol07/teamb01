import React, { useEffect, useState } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { useNavigate } from 'react-router-dom';
import style from "./shopping.module.css";
import axios from 'axios';


ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    ChartDataLabels
);

export const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: { display: false },
        tooltip: {
            enabled: true,
            padding: 16,            // 툴팁 안쪽 여백 (크기 확장)
            boxPadding: 8,          // 컬러 박스와 텍스트 사이 간격
            titleFont: {
                size: 18,           // 제목 글씨 크기
                weight: 'bold' as const,
            },
            bodyFont: {
                size: 16,           // 본문 글씨 크기
            },
            boxWidth: 16,           // 주황색 범례 네모 박스 가로 크기
            boxHeight: 16,          // 주황색 범례 네모 박스 세로 크기
            callbacks: {
                label: (context: any) => ` ${context.raw}개 판매`,
            },
        },
        datalabels: {
            anchor: 'end' as const,
            align: 'end' as const,
            offset: 2,
            font: {
                size: 30,
            },
            formatter: (value: number, context: any) => {
                const rank = context.dataIndex + 1;
                if (rank === 1) return '🥇';
                if (rank === 2) return '🥈';
                if (rank === 3) return '🥉';
                return '';
            },
        },
    },
    scales: {
        x: {
            grid: { display: false },
            border: { display: false },
            ticks: {
                font: { size: 18, weight: '600' as const },
                color: '#475569',
            },
        },
        y: {
            display: false,
            beginAtZero: true,
            grace: '20%',
        },
    },
};

interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
}

const products: Product[] = [
    { id: 1, name: "사과(500g)", price: 5000, image: "image/사과.jpg" },
    { id: 2, name: "복숭아(500g)", price: 7000, image: "image/복숭아.jpg" },
    { id: 3, name: "배(500g)", price: 5000, image: "image/배.jpg" },
    { id: 4, name: "체리(500g)", price: 10000, image: "image/체리.jpg" },
    { id: 5, name: "샤인머스캣(2KG)", price: 8000, image: "image/샤인머스캣.jpg" }
];

const TopChart: React.FC = () => {
    const navigate = useNavigate();

    // 🥇 1~3등 메달 이모지 배열
    const medals = ['🥇', '🥈', '🥉'];

    interface TopChartData {
        PRODUCTID?: number;
        TITLE: String;
        BESTITEM?: number;
    }
    const [topProducts, setTopProducts] = useState<TopChartData[]>([]);

    const backendUrl = process.env.REACT_APP_BACK_END_URL;

    const fetchTopChartData = async () => {
        try {
            const url = `${backendUrl}/topchart/bestitem`
            const response = await axios.get(url);

            const resultList = response.data.data;
            setTopProducts(resultList);
        } catch (error) {
            console.error("데이터 가져오기 실패:" + error);
        }
    }
    useEffect(() => {
        fetchTopChartData()
    }, [])

    const chartData = {
        // labels: topProducts.map((item) => item.TITLE || `상품 ${item.PRODUCTID}`),
        labels: [1,2,3,4,5],
        datasets: [
            {
                // data: topProducts.map((item) => item.BESTITEM || 0),
                data: [5,4,3,2,1],
                backgroundColor: [
                    '#FFD700', // Gold
                    '#C0C0C0', // Silver
                    '#CD7F32', // Bronze
                    '#cbd5e1', // Gray
                    '#e2e8f0', // Light Gray
                ],
                borderRadius: 8,
                barPercentage: 0.45,
            },
        ],
    };

    return (
        <div className={style.container}>
            {/* 차트 섹션 */}
            <section className={style.chartSection}>
                <h3 className={style.sectionTitle}>🔥 인기 판매량 Top 5</h3>
                <div className={style.chartWrapper}>
                    <Bar options={options} data={chartData} />
                </div>
            </section>

            {/* 상품 리스트 섹션 */}
            <section className={style.productSection}>
                <h3 className={style.sectionTitle}>🛒 Top 5 상품</h3>
                <div className={style["img-container"]}>
                    {products.map((item, index) => (
                        <div
                            key={item.id}
                            className={style.productCard}
                            onClick={() => navigate(`../shopping/${item.id}`, { state: item })}
                        >
                            <div className={style.imgWrapper}>
                                {/* 1, 2, 3등일 때 메달 배지 표시 */}
                                {index < 3 && (
                                    <span className={style.badge}>
                                        {medals[index]}
                                    </span>
                                )}
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className={style.img}
                                />
                            </div>
                            <div className={style.productInfo}>
                                <span className={style.productName}>{item.name}</span>
                                <span className={style.productPrice}>{item.price.toLocaleString()}원</span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default TopChart;