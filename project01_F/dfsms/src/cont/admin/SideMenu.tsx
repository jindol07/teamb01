import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import btnStyle from '../components/btn.module.css'

const SideMenu: React.FC = () => {

    return (
        <div className="d-flex flex-column flex-shrink-0 p-3 bg-light" style={{ width: '280px', minHeight: '100%' }}>
            <div className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
                <span className="fs-4">상품관리</span>
            </div>
            <hr />
            <ul className="nav flex-column mb-auto">
                <li className="nav-item">
                    <NavLink to="/admin/stocklist"
                        className={({ isActive }) =>
                            `nav-link link-dark ${isActive ? btnStyle.activeStyle : btnStyle.inactiveStyle
                            }`
                        }
                    >📦 재고 현황</NavLink>
                </li>
                <li>
                    <NavLink to="/admin/itemlist"
                        className={({ isActive }) =>
                            `nav-link active aria-current="page" ${isActive ? btnStyle.activeStyle : btnStyle.inactiveStyle
                            }`
                        }
                    >🛍 상품</NavLink>
                </li>
                {/* <li>
                    <NavLink to="/admin/surveyList"
                        className={({ isActive }) =>
                            `nav-link link-dark ${isActive ? btnStyle.activeStyle : btnStyle.inactiveStyle
                            }`
                        }
                    >📋 설문조사</NavLink>
                </li> */}
            </ul>
        </div>
    )
}

export default SideMenu