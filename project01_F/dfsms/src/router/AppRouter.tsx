import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../cont/Home'
import GalleryList from '../cont/gallery/GalleryList'
import Signup from '../cont/member/Signup'
import SignupRslt from '../cont/member/SignupRslt'
import EmailVerify from '../cont/member/EmailVerify'
import Login from '../cont/member/Login'
import TwoFactor from '../cont/member/TwoFactor'
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
import MypageLayout from '../cont/mypage/MypageLayout'
import OrderList from '../cont/mypage/OrderList'


const AppRouter: React.FC = () => {
  const routeList = [
    { path: '/', element: <Home /> }
    , { path: '/gallery', element: <GalleryList /> }
    // 회원가입
    , { path: '/signup', element: <Signup /> }
    // 회원가입 결과
    , { path: '/signupRslt', element: <SignupRslt /> }
    // 이메일 인증
    , { path: '/emailVerify', element: <EmailVerify /> }
    // 로그인
    // , { path: '/login', element: <Login /> }
    , { path: '/login', element: <Login /> }
    // 2차 인증
    , { path: '/twofactor', element: <TwoFactor /> }
    //커뮤니티
    , { path: '/community/review', element: <ReviewList /> }
    , { path: '/community/qna', element: <Qna /> }
    //장바구니+(마이페이지)
    ,{path:'/cart', element:<Cart/>}
    ,{path:'/Payment', element:<Payment/>}
    ,{path:'/OrderStatus', element:<OrderStatus/>}
    //쇼핑(물건)
    ,{path:'/shoppingList', element:<ShoppingList/>}
    ,{path:'/shopping/:id', element:<ShoppingDetail/>}
    //설문조사
    , { path: '/community/surveyClient', element: <SurveyClient/> }
    , { path: '/community/surveyclientResult/:num', element: <SurveyClientResult/> }
    //게시판
    ,{path:'/community/notice', element:<Notice/>}
    ,{path:'/community/notice/write', element:<NoticeForm/>}
    ,{path:'/community/notice/:num', element:<NoticeDetail/>}
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

        {/* 마이 페이지 */}
        <Route path="/mypage" element={<MypageLayout />}>
          <Route path="orderList" element={<OrderList />} />
          <Route path="qna/:no" element={<StockDetail />} />
          <Route path="usrinfo" element={<ItemList />} />
        </Route>

      </Routes>
  )
}
export default AppRouter