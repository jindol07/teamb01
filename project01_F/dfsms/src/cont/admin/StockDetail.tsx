import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import style from './admin.module.css'
import btnStyle from '../components/btn.module.css'
import axios from 'axios';
//import axios from 'axios';

interface History {
    historyid: number;
    productid: number;
    usrno: number;
    usrnm: string;
    pnm: string;
    qty: number;
    bfrpnm: string;
    updnm: string;
    price: number;
    updprice: number;
    title: string;
    updtitle: string;
    cont: string;
    updtcont: string;
    bfrqty: number;
    updtqty: number;
    gbn: string;
    rdate: string;
}

const StockDetail: React.FC = () => {

    const [stock, setStock] = useState<History>();
    const { no } = useParams<{ no: string }>();
    console.log(`no: ${no}`)

    const [itemNm, setItemNm] = useState('');
    const [qty, setQty] = useState(0);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [price, setPrice] = useState(0);

    const backendUrl = process.env.REACT_APP_BACK_END_URL;

    const navi = useNavigate();

    useEffect(() => {
        const fetchDetail = async () => {
            // const notice = { no: 1, title: "필독 - 무조건 읽어주세요.", writer: "운영자", hit: 0, 
            //     regdate: '2015-03-30', rank: 1, content: '공지에 들어갈 내용' };
            // setNotice(notice);
            const url = `${backendUrl}/api/stock/detail?num=${no}`
            const res = await axios.get(url)
            console.log(res.data)
            setStock(res.data);
        }
        fetchDetail()

    }, [])

    if (!stock) {
        return <div>Loading...</div>;
    }

    const myFormSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault();
        const data = new FormData();
        data.append('historyid', stock.historyid.toString());
        data.append('productid', stock.productid.toString());
        data.append('updnm', itemNm);
        data.append('updtitle', title);
        data.append('updtcont', content);
        data.append('updtqty', qty.toString());
        data.append('updprice', price.toString());

        try {
            const url = `${backendUrl}/api/stock/update`
            await axios.post(url, data, {withCredentials: true})
            alert("수정 완료");
            navi("/admin/stocklist")
        } catch (error) {
             alert("관리자 재고 수정 오류");
        }
    
    }

    return (

        <div className={style.container}>
            <h2>
                재고 관리 :{" "}
                <span style={{ color: "gray" }}>
                    no.{stock.historyid}
                </span>
            </h2>

            <hr />

            <form onSubmit={myFormSubmit}>
                <table className={style.boardTable}>
                    <tbody>
                        <tr>
                            <th className={style.diagonal}></th>
                            <th>Info</th>
                            <th>Input</th>
                        </tr>

                        <tr>
                            <th>상품명</th>
                            <td>{stock.pnm}</td>
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
                            <td>{stock.qty}</td>
                            <td>
                                <input
                                    type="number"
                                    min={0}
                                    step={10}
                                    value={qty}
                                    onChange={(e) => setQty(Number(e.target.value))}
                                />
                            </td>
                        </tr>

                        <tr>
                            <th>가격</th>
                            <td>{stock.price}</td>
                            <td>
                                <input
                                    type="number"
                                    min={0}
                                    value={price}
                                    onChange={(e) => setPrice(Number(e.target.value))}
                                />
                            </td>
                        </tr>

                        <tr>
                            <th>제목</th>
                            <td >{stock.title}</td>
                            <td>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </td>
                        </tr>

                        <tr>
                            <th>내용</th>
                            <td>{stock.cont}</td>
                            <td>
                                <textarea
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    rows={6}
                                    style={{
                                        width: "100%",
                                        resize: "vertical"
                                    }}
                                />
                            </td>
                        </tr>

                        <tr>
                            <th>갱신일</th>
                            <td colSpan={2}>
                                {stock.rdate?.substring(0, 10)}
                            </td>
                        </tr>

                        <tr>
                            <th>최종수정자</th>
                            <td colSpan={2}>
                                {stock.usrnm}
                            </td>
                        </tr>

                        <tr>
                            <th>변경 구분</th>
                            <td colSpan={2}>{stock.gbn}</td>
                        </tr>
                    </tbody>

                    <tfoot>
                        <tr>
                            <th colSpan={3}>
                                <button
                                    type="submit"
                                    className={btnStyle.button}
                                >
                                    수정
                                </button>
                            </th>
                        </tr>
                    </tfoot>
                </table>
            </form>
        </div>


        // <div className={style.container}>
        //     <h2>재고 관리 : <span style={{ color: 'gray' }}>no.{no}</span></h2>
        //     <hr />
        //     <form action="" onSubmit={myFormSubmit}>
        //         <table className={style.boardTable}>
        //             <tbody>
        //                 <tr>
        //                     <th className={style.diagonal}></th>
        //                     <th>Info</th>
        //                     <th>Input</th>
        //                 </tr>
        //                 <tr>
        //                     <th>상품명</th>
        //                     <td>사과</td>
        //                     <td>
        //                         <input
        //                             type="text"
        //                             value={itemNm}
        //                             onChange={(e) => setItemNm(e.target.value)}
        //                         />
        //                     </td>
        //                 </tr>
        //                 <tr>
        //                     <th>수량</th>
        //                     <td>10</td>
        //                     <td>
        //                         <input
        //                             type="number" min={0} step={10}
        //                             value={qty}
        //                             onChange={(e) => setQty(Number(e.target.value))}
        //                         />
        //                     </td>
        //                 </tr>
        //                 <tr>
        //                     <th>최종갱신일</th>
        //                     <td colSpan={2}></td>
        //                 </tr>
        //                 <tr>
        //                     <th>최종수정자</th>
        //                     <td colSpan={2}></td>
        //                 </tr>
        //             </tbody>
        //             <tfoot>
        //                 <tr>
        //                     <th colSpan={3}>
        //                         <button type="submit" className={btnStyle.button}>수정</button>
        //                     </th>
        //                 </tr>
        //             </tfoot>
        //         </table>
        //     </form>
        // </div>
    )
}

export default StockDetail