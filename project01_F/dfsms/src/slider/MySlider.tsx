import React, { useEffect, useState } from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// 데이터 인터페이스 : 문장별 스타일
interface Sentence {
    content: string;
    fontSize: string;
    fontWeight?: string;
    color?: string;
    marginBottom?: string;
}

interface MySliderInter {
    id: number;
    image: string;
    sentences: Sentence[]; // 문장들의 배열
}

const MySlider: React.FC = () => {

    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        arrows: true,
    };

    // 슬라이더 상태 관리를 위해서 useState 사용
    const [mySlider, setMySlider] = useState<MySliderInter[]>([]);

    // 서버에서(ex : axios) 데이터를 가져왔다고 가정, useEffect 사용
    useEffect(() => {
        const fetchMySlider = async () => {
            // 데이터 구성: 페이지마다, 문장마다 다르게 설정 가능
            const homeData: MySliderInter[] = [
                {
                    id: 1,
                    image: "images/3000food.jpg",
                    sentences: [
                        { content: "안녕하세요!", fontSize: "32px", fontWeight: "bold", marginBottom: "10px" },
                        { content: "방문을 환영합니다.", fontSize: "18px", color: "#666" },
                        { content: "3,000 종류 이상의 식품들", fontSize: "18px", color: "#666" },
                        { content: "고객 만족도 최상!", fontSize: "18px", color: "#ce2c2cda" }
                    ]
                },
                {
                    id: 2,
                    image: "images/self.avif",
                    sentences: [
                        { content: "직접 키운 농수산물", fontSize: "20px", fontWeight: "600", marginBottom: "5px" },
                        { content: "과정을 투명하게 공개합니다.", fontSize: "26px", fontWeight: "bold", color: "#2e7d32" },
                        { content: "자연의 맛을 그대로 전달해드려요.", fontSize: "16px", color: "#888", marginBottom: "0px" }
                    ]
                },
                {
                    id: 3,
                    image: "images/fish.jpg",
                    sentences: [
                        { content: "펄떡이는 제철의 신선함", fontSize: "20px", fontWeight: "600", marginBottom: "5px" },
                        { content: "바다가 선사하는 맛있는 보양식!", fontSize: "26px", fontWeight: "bold", color: "#1976d2" },
                        { content: "꼼꼼하게 엄선한 이달의 수산물을", fontSize: "16px", color: "#888", marginBottom: "0px" },
                        { content: "산지의 신선함 그대로 보내드립니다.", fontSize: "16px", color: "#888", marginBottom: "0px" },
                    ]
                },
                {
                    id: 4,
                    image: "images/augustfood.png",
                    sentences: [
                        { content: "이 달의 음식", fontSize: "32px", fontWeight: "bold", marginBottom: "10px", color: "#ffab7a" },
                        { content: "제철 음식을 확인하고 정기 구독을 신청하세요.", fontSize: "23px", color: "#494949", fontWeight: "bold" },
                        { content: "신선한 식품들을 일주일 내에 배송해 드립니다.", fontSize: "18px", color: "#666" },
                        { content: "(일부 지역 제외)", fontSize: "8px", color: "#666" }
                    ]
                }
            ]
            setMySlider(homeData);
        }
        fetchMySlider();
    }, [])

    return (
        <div>
            <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                <Slider {...settings}>
                    {
                        // 배열 map으로 출력
                        mySlider.map(hdata => (
                            <div key={hdata.id}>
                                <div style={{
                                    height: '350px',
                                    borderRadius: '10px',
                                    overflow: 'hidden',
                                    backgroundColor: '#f5f5f5',
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    padding: '0px',
                                    boxSizing: 'border-box'
                                }}>

                                    {/* 1. 좌측 사진 */}
                                    <img
                                        src={hdata.image}
                                        alt="슬라이드 이미지"
                                        style={{
                                            width: '530px',
                                            height: '100%',
                                            objectFit: 'cover',
                                            borderTopLeftRadius: '10px',
                                            borderBottomLeftRadius: '10px',
                                            flexShrink: 0
                                        }}
                                    />

                                    {/* 2. 우측 설명문: 문장 배열을 순회하며 렌더링 */}
                                    <div style={{
                                        textAlign: 'left',
                                        padding: '40px',
                                        flexGrow: 1,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center'
                                    }}>
                                        {hdata.sentences.map((line, index) => (
                                            <div
                                                key={index}
                                                style={{
                                                    fontSize: line.fontSize,
                                                    fontWeight: line.fontWeight || 'normal',
                                                    color: line.color || '#333',
                                                    marginBottom: line.marginBottom || '8px',
                                                    lineHeight: '1.4'
                                                }}
                                            >
                                                {line.content}
                                            </div>
                                        ))}
                                    </div>

                                </div>
                            </div>
                        ))
                    }
                </Slider>
            </div>
            
            {/* 홈페이지 소개글 */}
            <div style={{ maxWidth: '1200px', margin: '40px auto', padding: '0 20px', fontFamily: 'sans-serif' }}>

                <div style={{
                    backgroundColor: '#ffffff',
                    border: '7px solid #eef2f5',
                    borderRadius: '12px',
                    padding: '24px 30px',
                    marginBottom: '20px',
                    textAlign: 'left'
                }}>
                    <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#494949', margin: '0 0 12px 0' }}>
                        자연이 준 선물, 계절의 맛을 담다. ICT Daily
                    </h3>
                    <p style={{ fontSize: '15px', color: '#555555', lineHeight: '1.7', margin: 0 }}>
                        ICT Daily는 매월 우리 몸에 꼭 필요한 영양 가득한 제철 식재료를 엄선하여 소개합니다. 매달 새롭게 바뀌는 제철 음식들을 지금 확인해 보세요. 매주 신선함을 그대로 집 앞까지 배송해 드립니다. 지금 정기구독으로 건강한 식탁을 시작해 보세요!
                    </p>
                </div>

                <div style={{
                    backgroundColor: '#ffffff',
                    border: '7px solid #eef2f5',
                    borderRadius: '12px',
                    padding: '24px 30px',
                    marginBottom: '20px',
                    textAlign: 'left'
                }}>
                    <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#2e7d32', margin: '0 0 12px 0' }}>
                        매달 찾아오는 가장 건강한 식탁, ICT Daily
                    </h3>
                    <p style={{ fontSize: '15px', color: '#555555', lineHeight: '1.7', margin: 0 }}>
                        ICT Daily는 계절마다 가장 맛있는 제철 음식을 큐레이션하는 전문 정기구독 플랫폼입니다. 맛과 영양을 모두 잡은 이달의 엄선된 식재료를 일주일 내에 신선하게 배송해 드립니다. 고민 없이 간편하게, 매달 가장 신선한 제철 음식을 만나보세요.
                    </p>
                </div>

                <div style={{
                    backgroundColor: '#ffffff',
                    border: '7px solid #eef2f5',
                    borderRadius: '12px',
                    padding: '24px 30px',
                    marginBottom: '20px',
                    textAlign: 'left'
                }}>
                    <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1976d2', margin: '0 0 12px 0' }}>
                        오늘 뭐 먹지? 고민 끝! 제철 음식 정기구독 플랫폼, ICT Daily
                    </h3>
                    <p style={{ fontSize: '15px', color: '#555555', lineHeight: '1.7', margin: 0 }}>
                        지금 이 시기에 가장 맛있고 영양이 풍부한 제철 음식을 한눈에 확인하세요! ICT Daily가 꼼꼼하게 고른 건강한 식재료를 일주일 안에 신선하게 보내드립니다. 매달 새롭게 찾아오는 이달의 음식을 확인하고, 편리한 정기구독 서비스를 신청해 보세요.
                    </p>
                </div>

                <div style={{
                    backgroundColor: '#ffffff',
                    border: '7px solid #eef2f5',
                    borderRadius: '12px',
                    padding: '24px 30px',
                    marginBottom: '20px',
                    textAlign: 'left'
                }}>
                    <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#ffab7a', margin: '0 0 12px 0' }}>
                        몸이 먼저 반하는 계절의 에너지, ICT Daily
                    </h3>
                    <p style={{ fontSize: '15px', color: '#555555', lineHeight: '1.7', margin: 0 }}>
                        가장 좋은 영양소는 제철 음식에 숨어 있습니다. 인공적인 가공 없이, 대자연의 시간표대로 자라나 맛과 영양이 가장 정점에 오른 제철 식재료만을 선별해 보냅니다. 한 주 한 주, 내 몸을 채우는 건강한 변화를 직접 경험해 보세요.
                    </p>
                </div>

            </div>
        </div>
    )
}

export default MySlider;