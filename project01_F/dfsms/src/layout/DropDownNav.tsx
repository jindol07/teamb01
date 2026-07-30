import React, { useRef, useState } from 'react'
import style from './navbar.module.css'
import { NavLink } from 'react-router-dom';

const DropDownNav: React.FC = () => {
  //참 거짓에 따라 드랍다운 여부를 결정하기 위한 상태값
  const [isOpen, setIsOpen] = useState(false);
  //DOM 요소에 접근할 useRef
  const dropdownRef = useRef<HTMLDivElement>(null);
  //토글드랍다운 클릭이 될 때 useState 값에 대한 토글 처리를 한다.
  const toggleDropdown = () => {setIsOpen(prev => !prev)} //토글 참 => 거짓 !부정연산
  //드랍다운에서 메뉴를 선택시 닫아줘야 한다.
  const closeDropdown = () => {setIsOpen(false)} // 무조건 닫는다.

  const linkClass = ({isActive}:{isActive:boolean}) => 
        //활성화가 된 상태면 style.active를 추가한다.
        isActive ? `${style.link} ${style.active}` : style.link;
  

  return (
    <div ref={dropdownRef} className={style.dropdown}>
      <div className={style.dropdownTrigger} onClick={toggleDropdown}>
         커뮤니티<span className={style.arrow}>{isOpen? '▲' : '▼'}</span>
      </div>
      {
        isOpen && (<div className={style.dropdownContent}> 
                    <NavLink to ="/community/notice" onClick={closeDropdown} className={linkClass}>공지사항</NavLink>
                    <NavLink to ="/community/survey" onClick={closeDropdown} className={linkClass}>설문조사</NavLink>
                    <NavLink to ="/community/poem" onClick={closeDropdown} className={linkClass}>우농(愚農) 시인</NavLink>
                  </div> )
      }
    </div>
  )
}

export default DropDownNav