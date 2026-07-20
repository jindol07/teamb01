import React from 'react'
// 책을 넘기는 듯한 효과를 주는 react-pageflip 라이브러리 임포트
import HTMLFlipBook from 'react-pageflip';

// 각 월별 데이터(이미지 경로 및 텍스트)의 타입을 정의하는 인터페이스
interface pageType {
  image: string;       // 이미지 파일 경로
  text: React.ReactNode; // HTML 태그를 포함할 수 있는 React 노드 타입
}

const GalleryList: React.FC = () => {
  
  // 1월부터 12월까지의 제철음식 정보를 담은 배열 데이터
  let myData: pageType[] = [
    {
      image: "image/ex1.png",
      text: <p><h2 style={{ color: 'blue' }}>1월</h2> <b>「겨울의 깊은 맛과 영양을 가득 담은 식재료」</b> <br />매서운 추위 속에서 바다의 영양을 품은 굴, 방어, 꼬막이 나란히 찾아옵니다. 여기에 새콤달콤하게 과즙이 가득 찬 한라봉과 아삭한 식감으로 장 건강을 지켜주는 우엉이 겨울철 밥상을 풍성하고 건강하게 채워줍니다.</p>
    },
    {
      image: "image/ex2.png",
      text: <p><h2 style={{ color: 'red' }}>2월</h2> <b>「추위를 이겨내고 봄을 준비하는 식재료」</b> <br />겨울의 끝자락, 싱그러운 비타민C를 가득 충전해 줄 딸기가 입맛을 돋웁니다. 땅속에서 봄을 기획해 온 향긋한 냉이와 달래, 시원한 국물 맛을 내는 바지락과 부드럽고 담백한 도다리가 다가올 봄의 기운을 먼저 전합니다.</p>
    },
    {
      image: "image/ex3.png",
      text: <p><h2 style={{ color: 'green' }}>3월</h2> <b>「봄기운 가득한 나물과 해산물이 풍성한 시기」</b> <br />진정한 봄의 시작을 알리며 쫄깃한 주꾸미와 봄 도다리가 바다에서 반갑게 찾아옵니다. 대지에서는 특유의 향이 매력적인 쑥, 미나리, 취나물이 파릇파릇 돋아나 나른해지기 쉬운 봄날의 우리 몸에 싱그러운 활력을 불어넣어 줍니다.</p>
    },
    {
      image: "image/ex4.png",
      text: <p><h2 style={{ color: 'purple' }}>4월</h2> <b>「바다와 봄의 맛이 가득한 식재료」</b> <br />크고 쫄깃한 식감이 일품인 키조개와 고소하고 담백한 참다랑어가 봄철 입맛을 사로잡습니다. 여기에 아삭한 식감의 아스파라거스, 봄의 전령사 죽순, 그리고 씹는 맛이 좋은 조개류가 어우러져 완연한 봄의 식탁을 완성합니다.</p>
    },
    {
      image: "image/ex5.png",
      text: <p><h2 style={{ color: 'orange' }}>5월</h2> <b>「초여름의 맛과 건강을 챙기는 식재료」</b> <br />초여름으로 넘어가는 길목, 피로 해소와 소화에 탁월한 초록빛 매실과 시원하고 달콤한 참외가 눈과 입을 즐겁게 합니다. 기력을 보충해 줄 보양식 장어와 면역력 강화에 좋은 알싸한 마늘이 더해져 다가올 무더위를 든든하게 대비하게 해줍니다.</p>
    },
    {
      image: "image/ex6.png",
      text: <p><h2 style={{ color: 'skyblue' }}>6월</h2> <b>「더위를 이기는 싱그러운 여름 식재료」</b> <br />여름의 문턱에서 포슬포슬하고 고소한 감자와 달콤한 옥수수가 대표 간식으로 찾아옵니다. 안토시아닌이 풍부해 활력을 주는 복분자와 새콤달콤하고 부드러운 복숭아가 지치기 쉬운 계절에 상큼한 에너지를 가득 채워줍니다.</p>
    },
    {
      image: "image/ex7.png",
      text: <p><h2 style={{ color: 'gold' }}>7월</h2> <b>「무더위를 이겨내는 영양 가득한 식재료」</b> <br />본격적인 무더위 속에서 수분이 가득하고 달콤한 복숭아와 자두, 라이코펜이 풍부한 토마토가 갈증을 시원하게 해소해 줍니다. 바다에서는 여름철 최고의 보양식인 담백한 민어와 부드러운 전복이 지친 몸을 든든하게 받쳐줍니다.</p>
    },
    {
      image: "image/ex8.png",
      text: <p><h2 style={{ color: 'green' }}>8월</h2> <b>「여름의 끝자락을 풍성하게 채우는 식재료」</b> <br />달콤한 과즙이 뚝뚝 떨어지는 포도와 수박이 여름의 대미를 장식합니다. 고소한 맛이 일품인 가을의 전령사 전어, 달콤하고 든든한 고구마, 그리고 비타민이 가득한 아삭한 고추가 식탁을 풍성하게 채웁니다.</p>
    },
    {
      image: "image/ex9.png",
      text: <p><h2 style={{ color: 'brown' }}>9월</h2> <b>「가을의 풍요로움을 느낄 수 있는 식재료」</b> <br />하늘이 높아지는 가을, 아삭하고 시원한 배와 사과, 달콤함이 입안 가득 퍼지는 무화과가 수확의 기쁨을 줍니다. 고소한 기름기가 오른 고등어와 향긋하고 영양이 풍부한 다양한 버섯이 식탁 위를 풍성한 가을빛으로 물들입니다.</p>
    },
    {
      image: "image/ex10.png",
      text: <p><h2 style={{ color: 'orange' }}>10월</h2> <b>「가을의 깊은 맛을 느낄 수 있는 식재료」</b> <br />가을 바다의 주인공인 살이 꽉 찬 꽃게와 탱글탱글한 대하, 고소함이 절정에 달한 전어가 미식가들을 설레게 합니다. 가을 햇살을 받고 자란 아삭한 단감과 영양 가득한 고소한 밤은 깊어가는 가을의 풍미를 더해줍니다.</p>
    },
    {
      image: "image/ex11.png",
      text: <p><h2 style={{ color: 'purple' }}>11월</h2> <b>「겨울을 준비하는 건강한 식재료」</b> <br />찬 바람이 불기 시작하면 겨울 별미인 과메기와 쫄깃한 꼬막이 다시 반갑게 찾아옵니다. 김장철 필수 재료인 아삭한 배추와 무, 그리고 향긋함과 비타민C가 가득한 유자가 다가올 추위를 이겨낼 면역력을 길러줍니다.</p>
    },
    {
      image: "image/ex12.png",
      text: <p><h2 style={{ color: 'skyblue' }}>12월</h2> <b>「겨울의 진한 맛과 향을 즐길 수 있는 식재료」</b> <br />한 해를 마무리하는 겨울의 중심에서 바다의 보물인 영양 가득한 굴, 살이 꽉 찬 대게, 고소한 방어가 최고의 성찬을 이룹니다. 겨울 추위 속에서 당도가 더 높아진 달콤한 감귤과 철분이 풍부한 파릇파릇한 시금치가 겨울 식탁을 채워줍니다.</p>
    }
  ];

  return (
    <div>
      {/* 화면 중앙 정렬 및 상단 여백 설정 */}
      <div style={{ textAlign: 'center', marginTop: '30px' }}>
        <h2>Seasonal Food Calender</h2>
        
        {/* 플립북을 감싸는 컨테이너: 크기 제한, 중앙 정렬, 그림자 효과 처리 */}
        <div style={{ width: 620, marginTop: 30, margin: '0 auto', overflow: 'hidden', borderRadius: 10, boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)' }}>
          
          {/* 플립북 컴포넌트 설정 */}
          <HTMLFlipBook 
            width={300}                  // 한 페이지의 기본 너비 (px)
            height={400}                 // 한 페이지의 기본 높이 (px)
            showCover={false}            // 첫 페이지를 책 표지 형태로 두껍게 처리할지 여부
            {...({ style: {}, usePortrait: true } as any)} // 타입스크립트 에러 방지용 우회 속성 및 세로 모드 강제 적용
            autoSize={true}              // 부모 컨테이너에 맞춰 크기 자동 조절
            mobileScrollSupport={true}   // 모바일 환경에서 터치 스크롤 지원
            maxShadowOpacity={0.2}       // 페이지가 넘어갈 때 생기는 그림자의 최대 투명도
            usePortrait={true}           // 단일 페이지(세로 모드) 형태로 표시 설정
          >
            {
              // IIFE (즉시 실행 함수)를 사용하여 JSX 내부에서 로직 수행
              (() => myData.flatMap((entry, idx) => [
                
                // 1. 이미지 페이지 생성 (각 월 데이터마다 첫 번째 페이지가 됨)
                <div key={`img-${idx}`} style={{
                  width: '100%',
                  height: '100%',
                  backgroundColor: '#fff',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  overflow: 'hidden',
                }}>
                  {/* 이미지가 구역에 가득 차도록 objectFit: 'cover' 설정 */}
                  <img src={entry.image} alt={`Diary Image ${idx + 1}`} style={{ width: '100%', objectFit: 'cover' }} />
                </div>,
                
                // 2. 텍스트 페이지 생성 (각 월 데이터마다 두 번째 페이지가 됨)
                // flatMap을 사용했기 때문에 [이미지, 텍스트, 이미지, 텍스트...] 순서로 1차원 배열로 펼쳐짐
                <div key={`txt-${idx}`} style={{
                  width: '100%',
                  height: '100%',
                  backgroundColor: '#fff',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: '20px',
                  fontSize: '18px',
                }}>
                  {/* 실제 제철음식 설명 글이 바인딩되는 부분 */}
                  <p style={{ margin: 0, padding: 30 }}>{entry.text}</p>
                </div>
              ]))() // 함수 정의 후 즉시 실행
            }
          </HTMLFlipBook>
        </div>
      </div>
    </div>
  )
}

export default GalleryList