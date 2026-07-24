import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../cont/Home'
import GalleryList from '../cont/gallery/GalleryList'
// import Signup from '../cont/member/Signup'
import SignupTest from '../cont/member/SignupTest' 
// import SignupRslt from '../cont/member/SignupRslt'
import SignupRsltTest from '../cont/member/SignupRsltTest'
import EmailVerifyTest from '../cont/member/EmailVerifyTest'
// import Login from '../cont/member/Login'
import LoginTest from '../cont/member/LoginTest'
import TwoFactorTT from '../cont/member/TwoFactorTT'
import Qna from '../cont/community/Qna'
import Layout from '../layout/Layout'
import ReviewList from '../cont/community/ReviewList'

//관리자
import AdminLayout from "../cont/admin/AdminLayout";
import StockList from "../cont/admin/StockList";
import StockDetail from '../cont/admin/StockDetail'
import ItemList from '../cont/admin/ItemList'
// import ItemDetail from '../cont/admin/ItemDetail'

//장바구니
import Payment from '../cont/cart/Payment'
import OrderStatus from '../cont/cart/OrderStatus'
import Cart from '../cont/cart/Cart'

//쇼핑
import ShoppingDetail from '../cont/shopping/ShoppingDetail'
import ShoppingList from '../cont/shopping/ShopingList'

//설문조사
import SurveyClient from '../cont/survey/SurveyClient'
import SurveyClientResult from '../cont/survey/SurveyClientResult'
import SurveyAddForm from '../cont/survey/SurveyAddForm'
import SurveyList from '../cont/survey/SurveyList'

//공지사항
import Notice from '../cont/community/Notice'
import NoticeForm from '../cont/community/NoticeForm'
import NoticeDetail from '../cont/community/NoticeDetail'


const AppRouter: React.FC = () => {
  const routeList = [
    { path: '/', element: <Home /> }
    // , { path: '/gallery', element: <GalleryList /> }
    // 회원가입
    // , { path: '/signup', element: <Signup /> }
    , { path: '/signupTest', element: <SignupTest /> }
    // 회원가입 결과
    // , { path: '/signupRslt', element: <SignupRslt /> }
    , { path: '/signupRsltTest', element: <SignupRsltTest /> }
    // 이메일 인증
    , { path: '/emailVerifyTest', element: <EmailVerifyTest /> }
    // 로그인
    // , { path: '/login', element: <Login /> }
    , { path: '/loginTest', element: <LoginTest /> }
    // 2차 인증
    , { path: '/twofactorTT', element: <TwoFactorTT /> }
    //커뮤니티
    // , { path: '/community/review', element: <ReviewList /> }
    // , { path: '/community/qna', element: <Qna /> }
    //장바구니+(마이페이지)
    // ,{path:'/cart', element:<Cart/>}
    // ,{path:'/Payment', element:<Payment/>}
    // ,{path:'/OrderStatus', element:<OrderStatus/>}
    //쇼핑(물건)
    // ,{path:'/shoppingList', element:<ShoppingList/>}
    // ,{path:'/shopping/:id', element:<ShoppingDetail/>}
    //설문조사
    // , { path: '/community/surveyClient', element: <SurveyClient/> }
    // , { path: '/community/surveyclientResult/:num', element: <SurveyClientResult/> }
    //게시판
    // ,{path:'/community/notice', element:<Notice/>}
    // ,{path:'/community/notice/write', element:<NoticeForm/>}
    // ,{path:'/community/notice/:num', element:<NoticeDetail/>}
  ]

  return (
    <Routes>
      {
        routeList.map((route, idx) => (
          <Route
            key={idx}
            {...route}
          />
        ))
      }

      {/* 관리자 페이지 */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="stocklist" element={<StockList />} />
        <Route path="stockdetail/:no" element={<StockDetail />} />
        <Route path="itemlist" element={<ItemList />} />
        {/* <Route path="itemdetail" element={<ItemDetail />} /> */}
        <Route path="surveyList" element={<SurveyList />} />
        <Route path="surveyAdd" element={<SurveyAddForm />} />
        <Route path="surveyClient" element={<SurveyClient />} />
      </Route>
    </Routes>
  )
}

export default AppRouter