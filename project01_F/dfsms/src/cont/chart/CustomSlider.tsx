import React from 'react';
import Slider, { Settings, CustomArrowProps } from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// 1. 문장 스타일링 인터페이스
export interface Sentence {
    content: string;
    fontSize: string;
    fontWeight?: string;
    color?: string;
    marginBottom?: string;
}

// 2. 이미지 + 문장 배열 슬라이드용 데이터 타입
export interface ImageTextSlideItem {
    id: number | string;
    image: string;
    sentences: Sentence[];
}

// 3. CustomSlider Props 정의
interface CustomSliderProps<T> {
    data: T[];
    settings?: Settings;
    renderItem?: (item: T, index: number) => React.ReactNode;
    containerStyle?: React.CSSProperties;
}

// 🔹 커스텀 이전 버튼 (<)
const PrevArrow: React.FC<CustomArrowProps> = ({ onClick, currentSlide }) => {
    // 첫 슬라이드에서 버튼 숨김 처리 (infinite 옵션이 false일 때)
    if (currentSlide === 0) return null;

    return (
        <button
            onClick={onClick}
            type="button"
            aria-label="이전 슬라이드"
            style={{
                position: 'absolute',
                left: '-15px',
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 10,
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: '#ffffff',
                border: '1px solid #e2e8f0',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '16px',
                fontWeight: 'bold',
                color: '#334155',
                transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#f8fafc';
                e.currentTarget.style.scale = '1.05';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#ffffff';
                e.currentTarget.style.scale = '1';
            }}
        >
            &#10094;
        </button>
    );
};

// 🔹 커스텀 다음 버튼 (>)
const NextArrow: React.FC<CustomArrowProps> = ({ onClick, currentSlide, slideCount }) => {
    // 마지막 슬라이드에서 버튼 숨김 처리 (infinite 옵션이 false일 때)
    if (slideCount && currentSlide === slideCount - 1) return null;

    return (
        <button
            onClick={onClick}
            type="button"
            aria-label="다음 슬라이드"
            style={{
                position: 'absolute',
                right: '-15px',
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 10,
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: '#ffffff',
                border: '1px solid #e2e8f0',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '16px',
                fontWeight: 'bold',
                color: '#334155',
                transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#f8fafc';
                e.currentTarget.style.scale = '1.05';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#ffffff';
                e.currentTarget.style.scale = '1';
            }}
        >
            &#10095;
        </button>
    );
};

export function CustomSlider<T>({
    data,
    settings,
    renderItem,
    containerStyle
}: CustomSliderProps<T>) {

    const defaultSettings: Settings = {
        infinite: data.length > 1,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3500,
        arrows: true,
        prevArrow: <PrevArrow />, // 커스텀 버튼 연결
        nextArrow: <NextArrow />, // 커스텀 버튼 연결
        dots: false,
        ...settings,
    };

    if (!data || data.length === 0) {
        return null;
    }

    return (
        <div style={{ position: 'relative', textAlign: 'center', marginBottom: '30px', ...containerStyle }}>
            <Slider {...defaultSettings}>
                {data.map((item, index) => {
                    // CASE A: 커스텀 renderItem 함수 사용 (PersonalChart 등)
                    if (renderItem) {
                        return <div key={(item as any).id || (item as any).productid || index}>{renderItem(item, index)}</div>;
                    }

                    // CASE B: 기본 이미지 + 텍스트 배열 슬라이더
                    const slide = item as unknown as ImageTextSlideItem;
                    return (
                        <div key={slide.id || index}>
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
                                <img
                                    src={slide.image}
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

                                <div style={{
                                    textAlign: 'left',
                                    padding: '40px',
                                    flexGrow: 1,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center'
                                }}>
                                    {slide.sentences?.map((line, idx) => (
                                        <div
                                            key={idx}
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
                    );
                })}
            </Slider>
        </div>
    );
}

export default CustomSlider;