import React, { useEffect, useState } from 'react'
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
import Header from '../cont/member/Logout';

interface LayoutProps {
    children?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {

    // 로그인 상태 변경 감지용
    const [loginUpdate, setLoginUpdate] = useState(0);

    useEffect(() => {

        const changeLogin = () => {
            setLoginUpdate(prev => prev + 1);
        };

        window.addEventListener("loginChange", changeLogin);

        return () => {
            window.removeEventListener("loginChange", changeLogin);
        };

    }, []);


    const saved = sessionStorage.getItem("loginInfo");
    const twoFactor = sessionStorage.getItem("twoFactor");

    const loginInfo = saved ? JSON.parse(saved) : null;

    const loginNm =
        loginInfo && twoFactor === "success"
            ? loginInfo.loginNm
            : null;

    const role =
        loginInfo && twoFactor === "success"
            ? loginInfo.role
            : null;


    const [roleInfo, setRoleInfo] = useState<string | null>(
        loginInfo ? loginInfo.role : null
    );

    useEffect(() => {
        setRoleInfo(role);
    }, [role]);

    return (
        <div className="bg-light min-vh-100 d-flex flex-column">

            {/* Header */}
            <header className="bg-white border-bottom sticky-top">

                <div className="container position-relative">

                    {/* Top Row */}
                    <div className="py-3 position-relative d-flex align-items-center">

                        {/* Left spacer */}
                        <div style={{ width: "120px" }} />

                        {/* Center Logo */}
                        <div className="position-absolute top-50 start-50 translate-middle text-center">
                            <Link to="/" className="text-decoration-none">

                                <img src="images/dailyfood.png" alt="Fresh Meal"
                                     style={{
                                         height: "42px",
                                         objectFit: "contain"
                                     }}
                                />
                            </Link>
                        </div>

                        {/* 오른쪽 영역 - Header 컴포넌트 */}
                        <div className="ms-auto">
                            <Header loginNm={loginNm} role={role}/>
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
                            <div className="mb-3">
                                <img src="images/dailyfood.png" alt="Fresh Meal"
                                     style={{
                                         height: "50px",
                                         width: "auto",
                                         objectFit: "contain"
                                     }}
                                />
                            </div>
                            <p className="text-light mb-0">
                                건강한 식사를<br />
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

                    <hr className="border-secondary" />
                    <div className="text-center text-secondary">
                        © 2026 Daily Food Subscribe. All Rights Reserved.
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Layout