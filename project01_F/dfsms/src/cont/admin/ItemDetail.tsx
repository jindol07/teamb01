import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import style from './admin.module.css'
import btnStyle from '../components/btn.module.css'
import axios from 'axios';
//import axios from 'axios';

interface StockVO {
    num?: number;
    title?: string;
    writer?: string;
    content?: string;
    imgn?: string;
    hit?: number;
    reip?: string;
    bdate?: string;
}

const ItemDetail: React.FC = () => {

    const [stock, setStock] = useState<StockVO | null>(null);
    const { no } = useParams<{ no: string }>();

    const [itemNm, setItemNm] = useState('');
    const [qty, setQty] = useState(0);

    const backendUrl = process.env.REACT_APP_BACK_END_URL;

    const navi = useNavigate();

    useEffect(() => {
        //axios를 사용해서 server api의 데이터를 받은 후 useState에 저장
        //const detailServer = async () => {
        //const url = `http://192.168.0.7/myictstudy/stock/stockdetail?num=${no}`
        //const res = await axios.get(url) //여기가 xhr's 콜백함수 부분이라고 보면 된다! 즉, 성공시(4 & 200)에만 반환!
        //console.log('Server Data')
        //console.log(res.data)
        //console.log('------------------------')
        //응답 받은 데이터 구조와 동일한 useState에 저장!
        //setStock(res.data)
        //}
        //detailServer()
    }, [no])

    const delhandler = async () => {
         const url = `${backendUrl}/api/stock/delete?num=${no}`
                const res = await axios.get(url)
                alert('삭제 완료')
        navi("/admin/itemlist")
    }

    return (
        <div className={style.container}>
            <h2>상품 정보 : <span style={{ color: 'gray' }}>no.{no}</span></h2>
            <hr />
         
                <table className={style.boardTable}>
                    <tbody>
                        <tr>
                            <th className={style.diagonal}></th>
                            <th>Info</th>
                            <th>Input</th>
                        </tr>
                        <tr>
                            <th>상품명</th>
                            <td>사과</td>
                            <td>
                                <input
                                    type="text"
                                    value={itemNm}
                                    onChange={(e) => setItemNm(e.target.value)}
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>수량</th>
                            <td>10</td>
                            <td>
                                <input
                                    type="number" min={0} step={10}
                                    value={qty}
                                    onChange={(e) => setQty(Number(e.target.value))}
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>최종갱신일</th>
                            <td colSpan={2}></td>
                        </tr>
                        <tr>
                            <th>최종수정자</th>
                            <td colSpan={2}></td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <th colSpan={3}>
                                <button type="button" className={btnStyle.button} onClick={delhandler}>삭제</button>
                            </th>
                        </tr>
                    </tfoot>
                </table>
            
        </div>
    )
}

export default ItemDetail