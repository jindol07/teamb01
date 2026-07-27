import React from 'react'
import MySlider from '../slider/MySlider'
import TopChart from './chart/TopChart'
// import SimpleSlider from '../slider/SimpleSlider'
// import MySlider from '../slider/MySlider'

const Home: React.FC = () => {
  return (
    <div>
      <h1 style={{textAlign:'center'}}>What we are ?</h1>
      <MySlider/>
      <TopChart/>
    </div>
  )
}

export default Home