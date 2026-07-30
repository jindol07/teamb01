import React, { useEffect, useState } from 'react'
import style from './admin.module.css'
import { Link, useNavigate } from 'react-router-dom';
import btnStyle from '../components/btn.module.css'
import axios from 'axios';
import Confirm from '../components/Confirm'
import ToastMsg from '../components/ToastMsg'

interface Product {
    PRODUCTID?: number;
    productid?: number;
    id?: number;
    CATEGORYID?: number;
    categoryid?: number;
    PNM?: string;
    pnm?: string;
    pname?: string;
    PRICE?: number;
    price?: number;
    pprice?: number;
    QTY?: number;
    qty?: number;
    TITLE?: string;
    title?: string;
    CONT?: string;
    cont?: string;
    IMGNM?: string;
    imgnm?: string;
    PIMG?: string;
    pimg?: string;
    image?: string;
}

const ItemList: React.FC = () => {
    const [adminItem, setAdminItem] = useState<Product[]>([]);

    // confirm과 toastMsg
    const [showConfirm, setShowConfirm] = useState(false);
    const [delProductById, setDelProductById] = useState<number | null>(null);
    const [toastMsg, setToastMsg] = useState("");

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

    const navi = useNavigate();

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
            const url = `${backendUrl}/api/stock/list`
            const res = await axios.get(url, {
                params: {
                    cPage: page,
                    searchType: searchType,
                    searchValue: searchValue,
                }
            });
            console.log(res.data.data);
            //서버로부터 응답받은 데이터 useState에 바인딩
            setAdminItem(res.data.data)
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

    const delhandler = async (no: number) => {
        const url = `${backendUrl}/api/stock/delete?num=${no}`
        const res = await axios.get(url)
        showToast('삭제가 완료되었습니다.')
        fetchAItem(1)
        // setTimeout(() => {
        //     navi("/admin/itemlist");
        // }, 1000);
        navi("/admin/itemlist");
    }

    // 토스트메세지 공통 함수
    const showToast = (message: string) => {
        setToastMsg(message);
        setTimeout(() => {
            setToastMsg("");
        }, 2000);
    };

    return (
        <div className={style.container}>
            <h2>상품 현황</h2>
            <hr />
            <div style={{ marginBottom: '15px' }}>
                <select onChange={(e) => { setSearchType(e.target.value) }} style={{ marginRight: '15px' }}>
                    <option value="1">상품</option>
                    <option value="2">특이사항</option>
                </select>
                <input type="text" onChange={(e) => { setSearchValue(e.target.value) }} style={{ width: '70%' }} />
                <button className={btnStyle.button} onClick={searchFunction}>조회</button>
            </div>
            <table className={style.boardTable}>
                <thead>
                    <tr>
                        <th>상품</th>
                        <th>특이사항</th>
                        <th>등록일자</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        adminItem.map((e: any, idx: any) => (
                            <tr key={idx}>
                                <td>{e.PNM}</td>
                                <td>{e.TITLE}</td>
                                <td>{e.RDATE?.substring(0, 10)}</td>
                                <td>
                                    {/* <Link
                                        to={`/admin/itemdetail/${e.PRODUCTID}`}
                                        className={btnStyle.button}
                                    >
                                        삭제
                                    </Link> */}

                                    {/* <button className={btnStyle.button} onClick={() => delhandler(e.PRODUCTID)}>삭제</button> */}
                                    <button
                                        className={btnStyle.button}
                                        onClick={() => {
                                            setDelProductById(e.PRODUCTID);
                                            setShowConfirm(true);
                                        }}
                                    >
                                        삭제
                                    </button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan={5} style={{ textAlign: "center" }}>

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
            <div style={{
                marginTop: '15px',
                display: 'flex',
                justifyContent: 'flex-end',
            }}>
                <Link
                    to={`/admin/itemForm`}
                    className={btnStyle.button}
                >
                    상품 등록
                </Link>
            </div>

            {
                showConfirm && (
                    <Confirm
                        message="삭제하시겠습니까?"
                        onConfirm={() => {
                            if (delProductById !== null) {
                                delhandler(delProductById);
                            }
                            setShowConfirm(false);
                            setDelProductById(null);
                        }}
                        onCancel={() => {
                            setShowConfirm(false);
                            setDelProductById(null);
                        }}
                    />
                )
            }
            {toastMsg && <ToastMsg message={toastMsg} />}
        </div>
    )
}

export default ItemList