import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import style from "./logout.module.css";
import Confirm from "../components/Confirm";

interface LogoutProps {
    loginNm: string | null;
    role: string | null;
}

const Logout: React.FC<LogoutProps> = ({ loginNm, role }) => {

    const navigate = useNavigate();

    const [showConfirm, setShowConfirm] = useState(false);
    const [logoutComplete, setLogoutComplete] = useState(false);

    const openConfirm = () => {
        setShowConfirm(true);
    };

    const logout = () => {
        setShowConfirm(false);

        sessionStorage.removeItem("loginInfo");
        sessionStorage.removeItem("twoFactor");

        window.dispatchEvent(new Event("loginChange"));

        // 로그아웃 완료 메시지 출력
        setLogoutComplete(true);

        setTimeout(() => {
            setLogoutComplete(false);
            navigate("/");
        }, 2500);
    };

    return (
        <div className={style.logout}>
            {
                loginNm ? (
                    <>
                        <span className={style.user} onClick={openConfirm}>
                            👋 {loginNm}님
                        </span>

                        {
                            role === "U" && (
                                <>
                                    <NavLink to="/cart" className={style.btn}>
                                        🛒 장바구니
                                    </NavLink>

                                    <NavLink to="/mypage" className={style.btn}>
                                        👤 마이페이지
                                    </NavLink>
                                </>
                            )
                        }
                    </>
                ) : (
                    <>
                        <NavLink to="/login" className={style.btn}>
                            로그인
                        </NavLink>

                        <NavLink to="/signup" className={style.btn}>
                            회원가입
                        </NavLink>
                    </>
                )
            }

            {showConfirm && (
                <Confirm
                    message="로그아웃 하시겠습니까?"
                    onConfirm={logout}
                    onCancel={() => setShowConfirm(false)}
                />
            )}


            {logoutComplete && (
                <div className={style.logoutMsg}>
                    로그아웃 되었습니다.
                </div>
                )
            }
        </div>
    );
};

export default Logout;