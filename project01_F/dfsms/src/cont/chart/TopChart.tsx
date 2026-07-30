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
            padding: 16,
            boxPadding: 8,
            titleFont: {
                size: 18,
                weight: 'bold' as const,
            },
            bodyFont: {
                size: 16,
            },
            boxWidth: 16,
            boxHeight: 16,
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
                font: { size: 14, weight: '600' as const },
                color: '#475569',
                maxRotation: 0,
                minRotation: 0,
            },
        },
        y: {
            display: false,
            beginAtZero: true,
            grace: '20%',
        },
    },
};

const SPRING_SERVER_URL = "http://localhost";
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
    return `${SPRING_SERVER_URL}/dfsms/imgfile/gallery/${fileName}`;
};

interface TopChartData {
    productid: number;
    pnm: string;
    price: number;
    imgnm: string;
    totqty: number;
    qty: number;
    cont: string;
    categoryid: number;
    title: string;
    categorynm: string;
}

const TopChart: React.FC = () => {
    const navigate = useNavigate();
    const medals = ['🥇', '🥈', '🥉'];
    const [topProducts, setTopProducts] = useState<TopChartData[]>([]);

    const backendUrl = process.env.REACT_APP_BACK_END_URL;

    useEffect(() => {
        const controller = new AbortController();

        const fetchTopChartData = async () => {
            try {
                const url = `${backendUrl}/api/chart/list`;
                const response = await axios.get(url, { signal: controller.signal, withCredentials: true });

                const resultList: TopChartData[] = response.data.bestdata || [];
                setTopProducts(resultList);
            } catch (error) {
                if (axios.isCancel(error)) {
                    console.log("요청 취소됨");
                } else {
                    console.error("데이터 가져오기 실패:", error);
                }
            }
        };

        fetchTopChartData();

        return () => {
            controller.abort();
        };
    }, [backendUrl]);

    const chartData = {
        labels: topProducts.map((item) => item.pnm || `상품 ${item.productid}`),
        datasets: [
            {
                data: topProducts.map((item) => Number(item.totqty || 0)),
                backgroundColor: [
                    '#FFD700',
                    '#C0C0C0',
                    '#CD7F32',
                    '#cbd5e1',
                    '#e2e8f0',
                ],
                borderRadius: 8,
                barPercentage: 0.45,
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
        <div className={style.container}>
            <section className={style.chartSection}>
                <h3 className={style.sectionTitle}>🔥 인기 판매량 Top 5</h3>
                <div className={style.chartWrapper}>
                    <Bar options={options} data={chartData} />
                </div>
            </section>

            <section className={style.productSection}>
                <h3 className={style.sectionTitle}>🛒 Top 5 상품</h3>
                <div className={style["img-container"]}>
                    {topProducts && topProducts.length > 0 ? (
                        topProducts.map((item, index) => {
                            const imageUrl = getImageUrl(item.imgnm);
                            const price = item.price;
                            const id = item.productid;
                            const name = item.pnm;
                            const qty = item.qty;
                            const cont = item.cont;
                            const title = item.title;
                            const categoryid = item.categoryid;
                            const rawCategory = item.categoryid ?? item.categoryid;
                            const categoryName = getCategoryName(rawCategory);

                            return (
                                <div
                                    key={`top-${item.productid}-${index}`}
                                    className={style.productCard}
                                    onClick={() =>
                                        navigate(`/shopping/${item.productid}`, {
                                            state: {
                                                ...item,
                                                productid: id,
                                                pnm: name,
                                                price: price,
                                                image: imageUrl,
                                                qty: qty,
                                                cont: cont,
                                                title: title,
                                                categoryid: categoryid,
                                                categoryName: categoryName
                                            },
                                        })
                                    }
                                >
                                    <div className={style.imgWrapper}>
                                        {index < 3 && (
                                            <span className={style.badge}>
                                                {medals[index]}
                                            </span>
                                        )}
                                        <img
                                            src={imageUrl}
                                            alt={item.pnm}
                                            className={style.img}
                                            onError={(e) => {
                                                const target = e.target as HTMLImageElement;
                                                target.onerror = null;
                                                target.src = NO_IMAGE_PLACEHOLDER;
                                            }}
                                        />
                                    </div>
                                    <div className={style.productInfo}>
                                        <span className={style.productName}>{item.pnm}</span>
                                        <span className={style.productPrice}>
                                            {(item.price || 0).toLocaleString()}원
                                        </span>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <p style={{ textAlign: "center", width: "100%", color: "#888" }}>
                            불러올 상품 데이터가 없습니다.
                        </p>
                    )}
                </div>
            </section>
        </div>
    );
};

export default TopChart;