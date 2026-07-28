import React, { useEffect, useState } from 'react'
import style from './cart.module.css'
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import btnStyle from '../components/btn.module.css'
import { Button, InputGroup, FormControl } from 'react-bootstrap';

// interface 세워서 타입 정의
interface Cart {
    PQTY: number; // 남은 재고 수량
    PRICE: number; // 가격
    SUBTOT: number; // 상품 총 가격
    QTY: number; // 담은 상품 수량
    USRNM: string; // 사용자명
    CATEGORYID: number; // 카테고리(1:과일,2:채소,3:육류,4:어류,5:밀키트)
    TITLE: string; // 상품제목
    PRODUCTID: number; // 상품번호
    CONT: string; // 상품설명(상세)
    PNM: string; // 상품명
}

/* postman 테스트한 데이터
{
    "data": [
        {
            "PQTY": 5000,
            "PRICE": 10000,
            "SUBTOT": 10000000,
            "QTY": 1000,
            "USRNM": "김민준",
            "CATEGORYID": 1,
            "TITLE": "청송사과",
            "PRODUCTID": 5,
            "CONT": "이런 사과는 없었다!! 이것은 사과인가? 꿀인가?",
            "PNM": "사과"
        }
    ]
}
*/

const Cart: React.FC = () => {

    // 데이터 받아올 경로 : http://192.168.0.23/dfsms/api/cart/list?usrno=2
    const backendUrl = process.env.REACT_APP_BACK_END_URL;
    // `${backendUrl}/api/cart/list?usrno=${usrno}`
    // ㄴ 서버에서 받아온 JSON 데이터를 JSOjbect 배열로 저장할 useState
    const [productsList, setProductsList] = useState<Cart[]>([]);

    // 로그인 사용자 정보
    const saved = sessionStorage.getItem("loginInfo");
    const loginInfo = saved ? JSON.parse(saved) : null;
    const loginNm = loginInfo?.loginNm;
    const usrno = loginInfo?.usrno

    const navigate = useNavigate();

    //서버측에 데이터 요청 시(by axios : 비동기) 조건(params)도 같이 넘김
    const fetchCartList = async () => {
        try {
            const url = `${backendUrl}/api/cart/list`
            const res = await axios.get(url, {
                withCredentials: true
                //params: { usrno: usrno }
            });

            // if (res.data.code == "ALREADY_EXIST") {
            //     alert(res.data.message)
            // } else if (res.data.code == "LACK_OF_QTY") {
            //     alert(res.data.message)
            // } else {
            //     alert(res.data.message) // 성공
            // }

            console.log(res.data.data);
            //서버로부터 응답받은 데이터 useState에 바인딩
            setProductsList(res.data.data)

        } catch (error) {
            console.error("데이터 가져오기 실패 :", error);
            alert(`데이터 가져오기 실패 : ${error}`);
        }

        // try {
        //     const url = `${backendUrl}/api/cart/list?usrno=${usrno}` 
        //     const res = await axios.get(url, {
        //         params: { usrno: usrno }
        //     });
        //     setProductsList(res.data.data);
        // } catch (err) {
        //     console.error(err);
        // }

    }
    
    //0727 s
    const orderhandler = async () => {
        try {
            const url = `${backendUrl}/api/order/add`
            const res = await axios.post( url, {}, // body
                    {withCredentials: true}
            )

            if(res.data.code === 'NO_USR_INFO'){
             //로그인 페이지로 이동
                alert(res.data.message)
            }else if(res.data.code === 'NO_MATCHED_ROLE'){
             alert(res.data.message)
            }else if(res.data.code === 'LACK_OF_QTY'){
                alert(res.data.message)
            }else{ //success
             alert(res.data.message)
             navigate('/shoppingList')
            }

            console.log(res.data.data);


            //서버로부터 응답받은 데이터 useState에 바인딩
            //setProductsList(res.data.data)

        } catch (error) {
            console.error("데이터 가져오기 실패 :", error);
            alert(`데이터 가져오기 실패 : ${error}`);
        }

    }
    //0727 e

    //useEffect를 사용해 최초 한번만 초기화
    useEffect(() => {
        fetchCartList();
    }, [])

    // 수량 변경 핸들러
    const handleQuantityChange = async (productid: number, currentQty: number, delta: number) => {
        const qty = currentQty + delta;
        if (qty < 1) return;

        try {
            const url = `${backendUrl}/api/cart/add?usrno=${usrno}&productid=${productid}&qty=${qty}`
            const res = await axios.get(url, {
                params: {
                    usrno,
                    productid,
                    qty: delta
                },
                withCredentials: true
            });

            if (res.data.code === "LACK_OF_QTY") {
                alert(res.data.message);
                return;
            }
            fetchCartList();
        } catch (error) {
            console.error("수량 변경 실패:", error);
        }
    };

    // const [quantity, setQuantity] = useState(0);
    // const [quantity2, setQuantity2] = useState(0);

    // const handleIncrease = () => setQuantity(prev => prev + 1);
    // const handleDecrease = () => {
    //     setQuantity(prev => (prev > 1 ? prev - 1 : 0));
    // };

    // const handleIncrease2 = () => setQuantity2(prev => prev + 1);
    // const handleDecrease2 = () => {
    //     setQuantity2(prev => (prev > 1 ? prev - 1 : 0));
    // };

    // const handleDelete = (num: number) => {
    //     //1. 백단으로 num값 포함해서 delete 태우기
    //     //2. delete성공시 아래 코드 : UI 재랜더링(새로운 리스트)
    //     //fetchCartList()
    //     //3.클릭한 num와 일치하지 않는 항목만 남겨서 배열을 업데이트
    //     //setProductsList(productsList.filter(item => item.PRODUCTID !== PRODUCTID));
    // };


    const handledelOneCartProduct = async (productid: number) => {
        try {
            const url = `${backendUrl}/api/cart/list?usrno=${usrno}`
            const res = await axios.get(url, {
                params: {
                    usrno: usrno,
                    productid: productid
                }
            });

            if (res.data.code === 'SUCCESS') {
                alert(res.data.message);
                setProductsList(productsList.filter(item => item.PRODUCTID !== productid));
                fetchCartList();
            }

        } catch (error) {
            console.error("삭제 실패 :", error);
        }

    };

    return (
        <div style={{ textAlign: 'center' }}>
            <h3>{loginNm}님의 현재 장바구니 목록입니다.</h3>
            <br />
            <table className={style.boardTable}>
                <thead>
                    <tr>
                        <th>구매여부 체크</th>
                        <th>상품 정보</th>
                        <th>합계 금액</th>
                    </tr>
                </thead>
                <tbody>
                    {productsList.length === 0 ? (
                        <tr>
                            <td colSpan={3} style={{ padding: '30px' }}>
                                장바구니에 담긴 상품이 없습니다.
                            </td>
                        </tr>
                    ) : (
                        productsList.map((item) => (
                            <tr key={item.PRODUCTID}>
                                <td>
                                    <label>
                                        <input type="checkbox" checked />
                                    </label>
                                </td>
                                <td>
                                    <button
                                        style={{ float: 'right' }}
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handledelOneCartProduct(item.PRODUCTID)}
                                    >
                                        X
                                    </button>
                                    <p style={{ fontWeight: 'bold' }}>{item.TITLE}</p>
                                    <p>{item.PRICE?.toLocaleString()} * {item.QTY} 원</p>

                                    <div className="input-group" style={{ width: '120px', margin: '0 auto' }}>
                                        {/* - 버튼 */}
                                        <button
                                            className="btn btn-outline-secondary"
                                            type="button"
                                            onClick={() => handleQuantityChange(item.PRODUCTID, item.QTY, -1)}
                                        >
                                            -
                                        </button>

                                        {/* 수량 */}
                                        <input
                                            type="text"
                                            className="form-control text-center"
                                            value={item.QTY}
                                            readOnly
                                        />

                                        {/* + 버튼 */}
                                        <button
                                            className="btn btn-outline-secondary"
                                            type="button"
                                            onClick={() => handleQuantityChange(item.PRODUCTID, item.QTY, 1)}
                                        >
                                            +
                                        </button>
                                    </div>
                                </td>
                                <td>{item.SUBTOT?.toLocaleString()}원</td>
                            </tr>
                        ))
                    )}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan={3}>총 가격 : <strong></strong>원</td>
                    </tr>
                </tfoot>
            </table>
            <br />
            <Link to="" className={btnStyle.button} onClick={orderhandler}>결제하기</Link>
        </div>
    )
}

export default Cart