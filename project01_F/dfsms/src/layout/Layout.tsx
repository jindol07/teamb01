import React, {useEffect, useState} from 'react'
import Navbar from './Navbar';
import {Link, NavLink, useLocation} from 'react-router-dom';
import btnStyle from '../cont/components/btn.module.css';

interface LayoutProps {
    children?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({children}) => {

    const loc = useLocation();

    // const [loginNm, setLoginNm] = useState(
    //   sessionStorage.getItem("loginInfo")
    // );

    const saved = sessionStorage.getItem("loginInfo");
    const twoFactor = sessionStorage.getItem("twoFactor");

    const loginInfo = saved ? JSON.parse(saved) : null;

    const loginNm =
        loginInfo && twoFactor === "success" ? loginInfo.loginNm : null;

    const role =
        loginInfo && twoFactor === "success" ? loginInfo.role : null;

    // useEffect(() => {
    //   setLoginNm(sessionStorage.getItem("loginInfo"));
    // }, [loc.pathname]);

    return (
        //---------------------백업----------------------//
        // <div style={{ maxWidth: '1200px', margin: '0 auto',
        //   padding: '20px' }}>

        //   <header style={{
        //     display: 'flex',
        //     justifyContent: 'space-between',
        //     alignItems: 'center', //중앙 정렬
        //     backgroundColor: 'skyblue',
        //     color: 'white',
        //     padding: '10px 20px',
        //     borderRadius: '8px',
        //     }}>
        //         <h1>ICT Daily 구독</h1>
        //         <div>
        //             {
        //               loginNm ? ('환영합니다, '+loginNm+' 님')
        //                       : <>
        //                         <a href="/login" style={{marginRight:'10px',color:'white'}}> 로그인</a>
        //                         <Link to="/signup" style={{color:'white'}}>회원가입</Link>
        //                         </>
        //             }
        //         </div>
        //   </header>
        //   <Navbar/>
        //   <main>{children}</main>
        //   <footer style={{ backgroundColor: 'skyblue',
        //         color: 'white', padding: '10px',
        //         borderRadius: '0 0 8px 8px', textAlign:'center'
        //     }}>@ 2026 ICT Daily 구독</footer>
        // </div>
        //---------------------백업----------------------//
        <div className="bg-light min-vh-100 d-flex flex-column">

            {/* Header */}
            <header className="bg-white border-bottom sticky-top">

                <div className="container position-relative">

                    {/* Top Row */}
                    <div className="py-3 position-relative d-flex align-items-center">

                        {/* Left spacer (균형용) */}
                        <div style={{width: "120px"}}/>

                        {/* Center Logo */}
                        <div className="position-absolute top-50 start-50 translate-middle text-center">

                            <Link to="/" className="text-decoration-none">

                                <img
                                    src="images/dailyfood.png"
                                    alt="Fresh Meal"
                                    style={{
                                        height: "42px",
                                        objectFit: "contain"
                                    }}
                                />

                            </Link>

                        </div>

                        {/* Right Login */}
                        <div className="ms-auto">
                            {
                                loginNm ? (
                                    <div className="d-flex align-items-center gap-2">

                    <span className="fw-semibold text-secondary me-2">
                      👋 {loginNm}님
                    </span>

                                        {/* Cart */}
                                        {/* <Link
                      to="/cart"
                      className="btn btn-outline-success btn-sm rounded-pill d-flex align-items-center gap-1"
                    >
                      🛒 장바구니
                    </Link> */}
                                        <NavLink to="/cart"
                                                 className={({isActive}) =>
                                                     `btn btn-outline-success btn-sm rounded-pill d-flex align-items-center gap-1
                              ${isActive ? btnStyle.activeStyle : btnStyle.inactiveStyle
                                                     }`
                                                 }
                                        > 🛒 장바구니</NavLink>

                                        {/* My Page */}
                                        {/* <Link
                      to="/mypage"
                      className="btn btn-sm rounded-pill d-flex align-items-center gap-1"
                      style={{
                        backgroundColor: "rgba(25, 135, 84, 0.28)", // 진한 연두 + 투명
                        color: "#198754",
                        border: "1px solid rgba(25, 135, 84, 0.35)"
                      }}
                    >
                      👤 마이페이지
                    </Link> */}
                                        <NavLink to="/mypage"
                                                 className={({isActive}) =>
                                                     `btn btn-outline-success btn-sm rounded-pill d-flex align-items-center gap-1
                              ${isActive ? btnStyle.activeStyle : btnStyle.inactiveStyle
                                                     }`
                                                 }
                                        > 👤 마이페이지</NavLink>

                                    </div>
                                ) : (
                                    <>
                                        {/* <Link
                      to="/login"
                      className="btn btn-outline-success me-2 rounded-pill"
                    >
                      로그인
                    </Link> */}

                                        {/* <Link
                      to="/signup"
                      className="btn btn-success rounded-pill"
                    >
                      회원가입
                    </Link> */}

                                        <NavLink to="/login"
                                                 className={({isActive}) =>
                                                     `btn btn-outline-success me-2 rounded-pill ${isActive ? btnStyle.activeStyle : btnStyle.inactiveStyle
                                                     }`
                                                 }
                                        > 로그인</NavLink>

                                        <NavLink to="/signup"
                                                 className={({isActive}) =>
                                                     `btn btn-outline-success rounded-pill ${isActive ? btnStyle.activeStyle : btnStyle.inactiveStyle
                                                     }`
                                                 }
                                        > 회원가입</NavLink>

                                    </>
                                )
                            }
                        </div>

                    </div>

                    {/* Navigation */}
                    <div className="pb-3">
                        <Navbar loginNm={loginNm} role={role}/>
                    </div>

                </div>
            </header>

            {/* Main */}
            <main className="flex-grow-1 py-5">
                <div className="container">
                    {children}
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-dark text-white mt-auto">

                <div className="container py-5">

                    <div className="row">

                        <div className="col-md-4 mb-4">

                            {/* Logo */}
                            <div className="mb-3">
                                <img
                                    src="images/dailyfood.png"
                                    alt="Fresh Meal"
                                    style={{
                                        height: "50px",
                                        width: "auto",
                                        objectFit: "contain"
                                    }}
                                />
                            </div>

                            <p className="text-light mb-0">
                                건강한 식사를<br/>
                                정기배송으로 제공합니다.
                            </p>

                        </div>

                        <div className="col-md-4 mb-4">

                            <h6 className="fw-bold">
                                Customer
                            </h6>

                            <ul className="list-unstyled">
                                <li>공지사항</li>
                                <li>FAQ</li>
                                <li>1:1 문의</li>
                            </ul>

                        </div>

                        <div className="col-md-4 mb-4">

                            <h6 className="fw-bold">
                                Company
                            </h6>

                            <ul className="list-unstyled">
                                <li>회사소개</li>
                                <li>이용약관</li>
                                <li>개인정보처리방침</li>
                            </ul>

                        </div>

                    </div>

                    <hr className="border-secondary"/>

                    <div className="text-center text-secondary">
                        © 2026 Daily Food Subscribe. All Rights Reserved.
                    </div>

                </div>

            </footer>

        </div>

    )
}

export default Layout