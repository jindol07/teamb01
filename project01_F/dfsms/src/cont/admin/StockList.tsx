import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import style from './admin.module.css'
import btnStyle from '../components/btn.module.css'
import axios from 'axios';

interface History {
    HISTORYID: number;
    PRODUCTID: number;
    USRNO: number;
    USRNM: string;
    PNM:string;
    QTY:number;
    BFRPNM: string;
    UPDNM: string;
    BFRPRICE: number;
    UPDPRICE: number;
    BFRTITLE: string;
    UPDTITLE: string;
    BFRCONT: string;
    UPDTCONT: string;
    BFRQTY: number;
    UPDTQTY: number;
    GBN: string;
    RDATE: string;
}

const StockList: React.FC = () => {
    const [myNotice, setMyNotice] = useState<History[]>([]);

    //0727
    //http://192.168.0.39/dfsms
    const backendUrl = process.env.REACT_APP_BACK_END_URL;
    //페이징 useState
    const [totalItems, setTotalItems] = useState(0); //count
    const [totalPages, setTotalPages] = useState(0); //전체페이지 수
    const [currentPage, setCurrentPage] = useState(1); //cPate(현재페이지)의 기본 1값을 초기화
    const [startPage, setStartPage] = useState(1);
    const [endPage, setEndPage] = useState(1);
    //<검색>을 위한 useState
    const [searchType, setSearchType] = useState('1');
    const [searchValue, setSearchValue] = useState('');

    //page Handler
    const pageChange = (page: number) => {
        setCurrentPage(page);
    }

    //검색 버튼 클릭시에 1페이지 부터 검색!
    const searchFunction = () => {
        fetchAItem(1);
    }

    const fetchAItem = async (page: number) => {
        try {
            const url = `${backendUrl}/api/stock/historylist`
            const res = await axios.get(url, {
                params: {
                    cPage: page,
                    searchType: searchType,
                    searchValue: searchValue,
                }
            });
            console.log(res.data)
            console.log(res.data.data);
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

    // 서버에서(ex : axios) 데이터를 가져왔다고 가정, useEffect 사용
    useEffect(() => {
        fetchAItem(currentPage)
    }, [currentPage])

    const handleUpdate = (no: number) => {
        console.log("수정할 재고 번호 :", no);
        //to detail
    };

    return (
        <div className={style.container}>
            <h2>재고 현황</h2>
            <hr />
            <div style={{ marginBottom: '15px' }}>
                <select onChange={(e) => { setSearchType(e.target.value) }} style={{ marginRight: '15px' }}>
                    <option value="1">구분</option>
                    <option value="2">처리자</option>
                </select>
                <input type="text" onChange={(e) => { setSearchValue(e.target.value) }} style={{ width: '75%' }} />
                <button className={btnStyle.button} onClick={searchFunction}>조회</button>
            </div>
            <table className={style.boardTable}>
                <thead>
                    <tr>
                        <th>상품</th>
                        <th>남은수량</th>
                        <th>상태</th>
                        <th>갱신일자</th>
                        {/* <th>재고구분</th> */}
                        <th>처리자</th>
                        <th>관리</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        myNotice.map((e: any, idx: any) => (
                            <tr key={idx}>
                                <td>{e.pnm}</td>
                                <td>{e.qty}</td>
                                <td>
                                    {e.qty === 0
                                        ? "없음"
                                        : e.qty <= 100
                                            ? "부족"
                                            : "충분"}
                                </td>
                                <td>{e.rdate?.substring(0, 10)}</td>
                                {/* <td>{e.GBN === "o" ? "주문" : "상품"}</td> */}
                                <td>{e.usrnm}</td>
                                <td>
                                    <Link
                                        to={`/admin/stockdetail/${e.historyid}`}
                                        className={btnStyle.button}
                                    >
                                        수정
                                    </Link>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan={7} style={{ textAlign: "center" }}>

                            <nav>
                                <ul className="pagination justify-content-center">
                                    {startPage > 1 && (
                                        <li className="page-item">
                                            <button className="page-link"
                                                onClick={() => { pageChange(startPage - 1) }}>
                                                이전</button>
                                        </li>
                                    )}
                                    {/* 페이지 출력하기 */}

                                    {
                                        // startPage = 1 , endPage=3 => [1,2,3]이란 배열을 만들어 준다.
                                        Array.from({ length: endPage - startPage + 1 }, (_, i) => i + startPage)
                                            .map((page) => (
                                                <li key={page} className={`page-item ${page === currentPage ? 'active' : ''}`}>
                                                    <button className="page-link" onClick={() => { pageChange(page) }}>{page}</button>
                                                </li>
                                            ))
                                    }


                                    {/*
                                                    NextPage 출력하기 : totalPage 보다 endPage 적을 때 다음페이지가
                                                    있는 것으로 계산        
                                                    */}
                                    {endPage < totalPages && (
                                        <li className="page-item">
                                            <button className="page-link" onClick={() => { pageChange(endPage + 1) }}>
                                                다음</button>
                                        </li>
                                    )}
                                </ul>
                            </nav>
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    )
}

export default StockList