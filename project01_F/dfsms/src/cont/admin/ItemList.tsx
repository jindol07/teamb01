import React, { useEffect, useState } from 'react'
import style from './admin.module.css'
import { Link } from 'react-router-dom';
import btnStyle from '../components/btn.module.css'

const ItemList: React.FC = () => {
    const [adminItem, setAdminItem] = useState<any>([]);

    const [searchType, setSearchType] = useState('1');
    const [searchValue, setSearchValue] = useState('');

    const searchFunction = () => {
        //fetchUpboardList(1);
    }

    const insertHandle = () => {

    }

    // 서버에서(ex : axios) 데이터를 가져왔다고 가정, useEffect 사용
    useEffect(() => {
        const fetchMyNotice = async () => {
            const notice = [
                { no: 1, title: "필독 - 무조건 읽어주세요.", writer: "운영자", hit: 0, regdate: '2015-03-30', rank: 1 }
                , { no: 2, title: "사이트 이용시 유의사항", writer: "운영자", hit: 32353, regdate: '2020-01-01', rank: 2 }
                , { no: 3, title: "6월 한달 이벤트", writer: "운영자", hit: 3500, regdate: '2023-06-01', rank: 3 }
                , { no: 4, title: "대량 구매시 할인 불가", writer: "운영자", hit: 3000, regdate: '2015-03-30', rank: 4 }
                , { no: 5, title: "유선전화 서비스 이용불가 안내", writer: "운영자", hit: 1000, regdate: '2015-02-29', rank: 5 }
            ]
            setAdminItem(notice);
        }
        fetchMyNotice();
    }, [])

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
                    <option value="1">전체</option>
                    <option value="2">상품</option>
                    <option value="3">특이사항</option>
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
                                <td>{e.no}</td>
                                <td>{e.title}</td>
                                <td>{e.writer}</td>
                                <td>
                                    <Link
                                        to={`/admin/itemdetail/${e.no}`}
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
                display: 'flex',
                justifyContent: 'flex-end',
            }}>
                <Link
                    to={`/admin/itemdetail`}
                    className={btnStyle.button}
                >
                    상품 등록
                </Link>
            </div>
        </div>
    )
}

export default ItemList