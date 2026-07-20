import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import style from './surveyList.module.css'
import btnStyle from '../components/btn.module.css'

const backendUrl = process.env.REACT_APP_BACK_END_URL;

const SurveyList: React.FC = () => {
    const [myNotice, setMyNotice] = useState<any>([]);

    const [searchType, setSearchType] = useState('1');
    const [searchValue, setSearchValue] = useState('');

    const searchFunction = () => {
        //fetchUpboardList(1);
    }

    // 서버에서(ex : axios) 데이터를 가져왔다고 가정, useEffect 사용
    useEffect(() => {
        const fetchMyNotice = async () => {
            const notice = [
                { no: 1, title: "7월 쿠폰.", writer: "운영자", hit: 0, regdate: '2015-03-30', rank: 1 }
                , { no: 2, title: "6월 쿠폰", writer: "운영자", hit: 32353, regdate: '2020-01-01', rank: 2 }
                , { no: 3, title: "5월 쿠폰", writer: "운영자", hit: 3500, regdate: '2023-06-01', rank: 3 }
                , { no: 4, title: "4월 쿠폰", writer: "운영자", hit: 3000, regdate: '2015-03-30', rank: 4 }
                , { no: 5, title: "3월 쿠폰", writer: "운영자", hit: 1000, regdate: '2015-02-29', rank: 5 }
            ]
            setMyNotice(notice);
        }
        fetchMyNotice();
    }, [])

    const handleUpdate = (no: number) => {
        console.log("수정할 재고 번호 :", no);
        //to detail
    };

    return (
        <div className={style.container}>
            <h2>설문 조사</h2>
            <hr />
            <div style={{ marginBottom: '15px' }}>
                <select onChange={(e) => { setSearchType(e.target.value) }} style={{ marginRight: '15px' }}>
                    <option value="1">전체</option>
                    <option value="2">상품</option>
                    <option value="3">수량</option>
                    <option value="4">상태</option>
                </select>
                <input type="text" onChange={(e) => { setSearchValue(e.target.value) }} style={{ width: '75%' }} />
                <button className={btnStyle.button} onClick={searchFunction}>조회</button>
            </div>
            <table className={style.boardTable}>
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>제목</th>
                        <th>내용</th>
                        <th>작성날짜</th>
                        <th>삭제</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        myNotice.map((e: any, idx: any) => (
                            <tr key={idx}>
                                <td>{e.no}</td>
                                <td>{e.title}</td>
                                <td>{e.writer}</td>
                                <td>{e.hit}</td>
                                <td>
                                    <Link
                                        to={`/admin/stockdetail/${e.no}`}
                                        className={btnStyle.button}
                                    >
                                        삭제
                                    </Link>
                                </td>
                            </tr>


                        ))
                    }

                </tbody>
            </table>
            <div style={{
                marginTop: '15px',
                marginRight : '43px',
                display: 'flex',
                justifyContent: 'flex-end',
            }}>
                <Link
                    to={`/admin/surveyAdd`}
                    className={btnStyle.button}
                >
                    등록
                </Link>
            </div>
        </div>
    )
}

export default SurveyList