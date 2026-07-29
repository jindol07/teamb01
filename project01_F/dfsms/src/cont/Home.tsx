import React from 'react'
import MySlider from '../slider/MySlider'
import TopChart from './chart/TopChart'
import PersonalChart from './chart/PersonalChart'

const Home: React.FC = () => {
   const loginNm = sessionStorage.getItem("loginInfo");
  //const { loginNm } = JSON.parse(sessionStorage.getItem("loginInfo") || "{}");
  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>What we are ?</h1>
      <MySlider />
      <TopChart />
      {/* loginNm이 존재(truthy)할 때만 PersonalChart 렌더링 */}
      {loginNm && <PersonalChart /> || <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '250px', color: '#94a3b8', fontSize: '20px' }}>
        🔒 로그인 후 맞춤 추천 상품을 확인하세요.</div>}
    </div>
  )
}

export default Home