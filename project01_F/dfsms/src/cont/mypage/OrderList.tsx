import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import style from './mypage.module.css'
import btnStyle from '../components/btn.module.css'
import axios from 'axios'

const OrderList: React.FC = () => {
    //http://192.168.0.39/dfsms/api/mypage/orderList?cPage=1&searchType=1&searchValue=
    // ㄴ 서버에서 받아온 JSON 데이터를 JSOjbect 배열로 저장할 useState
    const [myNotice, setMyNotice] = useState<any>([]);
    //페이징 useState
    const [totalItems, setTotalItems] = useState(0); //count
    const [totalPages, setTotalPages] = useState(0); //전체페이지 수
    const [currentPage, setCurrentPage] = useState(1); //cPate(현재페이지)의 기본 1값을 초기화
    const [startPage, setStartPage] = useState(1);
    const [endPage, setEndPage] = useState(1);
    //<검색>을 위한 useState
    const [searchType, setSearchType] = useState('1');
    const [searchValue, setSearchValue] = useState('');
    //http://192.168.0.39/dfsms
    const backendUrl = process.env.REACT_APP_BACK_END_URL;

    //서버측에 데이터 요청시(by axios : 비동기) 조건(params)도 같이 넘김
    const fetchMyNotice = async (page: number) => {
        try {
            const url = `${backendUrl}/api/mypage/orderList`
            const res = await axios.get(url, {
                withCredentials: true
                ,params: {
                    cPage: page,
                    searchType: searchType,
                    searchValue: searchValue
                }
            });
            console.log(res.data.data); //mypageService.orderHistory(pMap)
            //서버로부터 응답받은 데이터 useState에 바인딩
            setMyNotice(res.data.data)
            setTotalItems(res.data.totalItems)
            setTotalPages(res.data.totalPages)
            setCurrentPage(res.data.currentPage)
            setStartPage(res.data.startPage)
            setEndPage(res.data.endPage)

        } catch (error) {
            console.error("데이터 가져오기 실패:" + error);
        }
    }

    //useEffect를 사용해 페이지가 변경될 때마다 서버로 데이터 요청
    useEffect(() => {
        fetchMyNotice(currentPage)
    }, [currentPage])

    //page Handler
    const pageChange = (page: number) => {
        setCurrentPage(page);
    }
    //검색 버튼 클릭시에 1페이지 부터 검색!
    const searchFunction = () => {
        fetchMyNotice(1);
    }

    return (
    <div className="container mt-4">

        <h3 className="mb-4">🛒 주문내역</h3>

        {myNotice.length === 0 ? (
            <div className="alert alert-secondary text-center">
                주문 내역이 없습니다.
            </div>
        ) : (
            myNotice.map((order: any) => (
                <div
                    key={order.ORDERID}
                    className="card shadow-sm mb-4"
                >
                    <div className="card-header bg-light">
                        <div className="d-flex justify-content-between">
                            <div>
                                <strong>
                                    주문번호 #{order.ORDERID}
                                </strong>
                                <br />
                                <small>
                                    {new Date(order.RDATE).toLocaleDateString("ko-KR")}
                                </small>
                            </div>

                            <div>
                                <strong>
                                    {Number(order.TOTPRICE).toLocaleString()}원
                                </strong>
                            </div>
                        </div>
                    </div>


                    <div className="card-body">

                        {order.items.map((item: any) => (
                            <div
                                key={item.PRODUCTID}
                                className="border rounded p-3 mb-3"
                            >
                                <div>
                                    <h5>{item.TITLE}</h5>
                                    <p>{item.PNM}</p>
                                    <p>
                                        수량 : {item.QTY}개
                                    </p>

                                    <strong>
                                        {Number(item.SUBTOT).toLocaleString()}원
                                    </strong>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))
        )}

        {/* 검색 영역 */}
        <div className="text-center mt-4">
            <select
                value={searchType}
                onChange={(e) => setSearchType(e.target.value)}
            >
                <option value="1">상품명</option>
                <option value="2">카테고리</option>
            </select>
            <input
                type="text"
                className="ms-2"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
            />
            <button
                className="btn btn-warning ms-2"
                onClick={searchFunction}
            >
                검색
            </button>
        </div>
        {/* 페이징 */}
        <nav className="mt-4">
            <ul className="pagination justify-content-center">
                {/* 이전 */}
                {
                    startPage > 1 && (
                        <li className="page-item">
                            <button
                                className="page-link"
                                onClick={() => pageChange(startPage - 1)}
                            >
                                이전
                            </button>
                        </li>
                    )
                }
                {/* 페이지 번호 */}
                {
                    Array.from(
                        {
                            length: endPage - startPage + 1
                        },
                        (_, i) => i + startPage
                    )
                    .map((page) => (
                        <li
                            key={page}
                            className={`page-item ${
                                page === currentPage ? "active" : ""
                            }`}
                        >
                            <button
                                className="page-link"
                                onClick={() => pageChange(page)}
                            >
                                {page}
                            </button>
                        </li>
                    ))
                }
                {/* 다음 */}
                {
                    endPage < totalPages && (
                        <li className="page-item">
                            <button
                                className="page-link"
                                onClick={() => pageChange(endPage + 1)}
                            >
                                다음
                            </button>
                        </li>
                    )
                }
            </ul>
        </nav>
    </div>
);

}

export default OrderList