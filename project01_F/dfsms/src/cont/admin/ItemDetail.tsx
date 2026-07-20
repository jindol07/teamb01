import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import style from './admin.module.css'
import btnStyle from '../components/btn.module.css'

interface ItemVO {
  num?: number;
  itemNm?: string;
  content?: string;
  idate?: string;
}

const ItemDetail: React.FC = () => {

  const [adminitem, setAdminitem] = useState<ItemVO | null>(null);
  const { no } = useParams<{ no: string }>();

  const [itemNm, setItemNm] = useState('');
  const [qty, setQty] = useState(0);
  const [itemContent, setItemContent] = useState('');

  const navi = useNavigate();

  useEffect(() => {
    //axios를 사용해서 server api의 데이터를 받은 후 useState에 저장
    //const detailServer = async () => {
    //const url = `http://192.168.0.39/myictstudy/stock/stockdetail?num=${no}`
    //const res = await axios.get(url) //여기가 xhr's 콜백함수 부분이라고 보면 된다! 즉, 성공시(4 & 200)에만 반환!
    //console.log('Server Data')
    //console.log(res.data)
    //console.log('------------------------')
    //응답 받은 데이터 구조와 동일한 useState에 저장!
    //setStock(res.data)
    //}
    //detailServer()
  }, [no])

  const myFormSubmit = async (e: React.SubmitEvent) => {
      e.preventDefault();
      navi("/admin/itemlist")
  }

  return (
    <div className={style.container}>
            <h2>상품 등록</h2>
            <hr />
            <form action="" onSubmit={myFormSubmit}>
                <table className={style.boardTable}>
                    <tbody>
                        <tr>
                            <th className={style.diagonal}></th>
                            <th>Input</th>
                        </tr>
                        <tr>
                            <th>상품명</th>
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
                            <td>
                                <input
                                    type="number" min={0} step={10}
                                    value={qty}
                                    onChange={(e) => setQty(Number(e.target.value))}
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>특이사항</th>
                            <td>
                                <textarea
                                    value={itemContent}
                                    onChange={(e) => setItemContent(e.target.value)}
                                />
                            </td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <th colSpan={2}>
                                <button type="submit" className={btnStyle.button}>등록</button>
                            </th>
                        </tr>
                    </tfoot>
                </table>
            </form>
        </div>
  )
}

export default ItemDetail