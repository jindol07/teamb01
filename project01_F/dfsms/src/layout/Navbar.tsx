import React, { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
//외부 스타일을 ts 모듈로 불러오기
import style from './navbar.module.css'
import DropDownNav from './DropDownNav'
//네비게이션 공통으로 활성화 되는 유무에 따라서 스타일을 변경하는 조건
//isActive === true => className = 'link active' 적용
const commonLinkClass = ({ isActive }: { isActive: boolean }) => {
  return isActive ? `${style.link} ${style.active}` : style.link
}

interface NavbarProps {
  loginNm: string | null;
  role: string | null;
}

//설치한 라우터의 경로에 맞게 링크(Link) 네비게이션(메뉴)를 설정한다.
//Layout.tsx에서 사용될 메뉴
const Navbar: React.FC<NavbarProps> = ({ loginNm, role }) => {
  //const loginNm = sessionStorage.getItem("loginInfo");

  //console.log("loginNm:", loginNm);
  return (
    <nav className={style.navbar}>
      <div className={style.menu}>
        {/*NavLink가 제공하는 방식 */}
        <NavLink to="/" className={commonLinkClass}>홈</NavLink>
        <NavLink to="/shoppingList" className={commonLinkClass}>Daily Food(상품)</NavLink>
        {/*커뮤니티*/}
        <DropDownNav />
        {
          role === 'ADMIN' && (
            <NavLink to="/admin" className={commonLinkClass}>상품 관리(관리자)</NavLink>
          )
        }
      </div>
    </nav>
  )
}

export default Navbar