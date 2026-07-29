import React, { useEffect, useState } from 'react'
import style from './cart.module.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"
import btnStyle from '../components/btn.module.css'
import Confirm from '../components/Confirm'
import confirmStyle from '../components/confirm.module.css'
import ToastMsg from '../components/ToastMsg'
import toastStyle from '../components/toastMsg.module.css'


// interface 세워서 타입 정의
interface CartItem {
    PQTY: number; // 남은 재고 수량
    PRICE: number; // 가격
    SUBTOT: number; // 상품 총 가격
    QTY: number; // 담은 상품 수량
    USRNM: string; // 사용자명
    CATEGORYID: number; // 카테고리(1:과일,2:채소,3:육류,4:어류,5:밀키트)
    TITLE: string; // 상품제목
    IMGNM?: string; // 이미지
    PRODUCTID: number; // 상품번호
    CONT?: string; // 상품설명(상세)
    PNM: string; // 상품명
}

/* postman 테스트한 데이터 - http://192.168.0.23/dfsms/api/cart/list?usrno=2
{
    "data": [
        {
            "PQTY": 49995,
            "PRICE": 18900,
            "SUBTOT": 18900,
            "QTY": 1,
            "USRNM": "김민준",
            "CATEGORYID": 5,
            "TITLE": "비주얼 완벽! 담백한 밀푀유나베",
            "IMGNM": "millefeuille_mealkit.jpg",
            "PRODUCTID": 314,
            "CONT": "손님 초대용이나 홈파티 추천 요리.",
            "PNM": "밀푀유나베 밀키트 (2인분)"
        }
    ]
}
*/

const backendUrl = process.env.REACT_APP_BACK_END_URL;
// `${backendUrl}/api/cart/list?usrno=${usrno}`

const NO_IMAGE_PLACEHOLDER =
    "data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22400%22%20height%3D%22400%22%20viewBox%3D%220%200%20400%20400%22%3E%3Crect%20fill%3D%22%23f0f0f0%22%20width%3D%22400%22%20height%3D%22400%22%2F%3E%3Ctext%20fill%3D%22%23888888%22%20font-family%3D%22sans-serif%22%20font-size%3D%2224%22%20x%3D%2250%25%22%20y%3D%2250%25%22%20text-anchor%3D%22middle%22%20dy%3D%22.3em%22%3ENo%20Image%3C%2Ftext%3E%3C%2Fsvg%3E";

const Cart: React.FC = () => {

    // 서버에서 받아온 JSON 데이터를 JSON Object 배열로 저장할 useState
    const [productsList, setProductsList] = useState<CartItem[]>([]);

    // 로그인 사용자 정보
    const saved = sessionStorage.getItem("loginInfo");
    const loginInfo = saved ? JSON.parse(saved) : null;
    const loginNm = loginInfo?.loginNm;

    const navigate = useNavigate();

    // static/imgfile/gallery 저장 경로에 맞춘 URL 생성 함수
    const getImageUrl = (imgStr?: string) => {
        if (!imgStr) return NO_IMAGE_PLACEHOLDER;

        if (
            imgStr.startsWith("http://") ||
            imgStr.startsWith("https://") ||
            imgStr.startsWith("data:")
        ) {
            return imgStr;
        }

        const fileName = imgStr.split(/[/\\]/).pop();
        return `${backendUrl}/imgfile/gallery/${fileName}`;
    };

    //서버측에 데이터 요청 시(by axios : 비동기) 조건(params)도 같이 넘김
    const fetchCartList = async () => {
        try {
            const url = `${backendUrl}/api/cart/list`
            const res = await axios.get(url, {
                withCredentials: true
            });
            console.log(res.data.data);
            //서버로부터 응답받은 데이터 useState에 바인딩
            setProductsList(res.data.data)

        } catch (error) {
            console.error("데이터 가져오기 실패 :", error);
            alert(`데이터 가져오기 실패 : ${error}`);
            // <Confirm
            //         message="로그아웃 하시겠습니까?"
            //         onConfirm={logout}
            //         onCancel={() => setShowConfirm(false)}
            //     />
        }

    }

    const orderHandler = async () => {
        try {
            const url = `${backendUrl}/api/order/add`
            const res = await axios.post(url, {/*비어있는 바디(백단에서 이미 다 받아와서 보낼 데이터가 없음)*/ },
                { withCredentials: true }
            )

            if (res.data.code === 'NO_USR_INFO') {
                //로그인 페이지로 이동
                alert(res.data.message)
            } else if (res.data.code === 'NO_MATCHED_ROLE') {
                alert(res.data.message)
            } else if (res.data.code === 'LACK_OF_QTY') {
                alert(res.data.message)
            } else { //success
                alert(res.data.message)
                navigate('/Payment');
            }
            console.log(res.data.data);

        } catch (error) {
            console.error("데이터 가져오기 실패 :", error);
            alert(`데이터 가져오기 실패 : ${error}`);
        }

    }

    //useEffect를 사용해 최초 한번만 초기화
    useEffect(() => {
        fetchCartList();
    }, [])

    // 수량 변경 핸들러
    const handleQuantityChange = async (productid: number, currentQty: number, delta: number) => {
        // 수량이 1 밑으로 내려가지 않도록
        if (currentQty + delta < 1) return;

        try {
            const url = `${backendUrl}/api/cart/updateQty`;
            const res = await axios.get(url, {
                params: {
                    productid: productid,
                    qty: delta
                },
                withCredentials: true
            });

            if (res.data.code === "LACK_OF_QTY") {
                alert(res.data.message);
                return;
            }
            fetchCartList();
            console.log(res.data);

        } catch (error) {
            console.error("수량 변경 실패:", error);
        }
    };

    // 장바구니에 담긴 상품 하나 삭제
    const handledelOneCartProduct = async (productid: number) => {
        try {
            const url = `${backendUrl}/api/cart/delOneCartProduct`;
            const res = await axios.get(url, {
                params: {
                    productid: productid
                },
                withCredentials: true
            });

            if (res.data.code === 'SUCCESS') {
                alert(res.data.message);
                fetchCartList();
            }

        } catch (error) {
            console.error("삭제 실패 :", error);
        }

    };

    // 장바구니 담긴 물품들 가격 전체 합
    let total = 0;
    productsList.forEach((item) => {
        total += item.SUBTOT;
    });
    const totalPrice = total;

    return (
        <div style={{ textAlign: 'center' }}>
            <h3>{loginNm}님의 현재 장바구니 목록입니다.</h3>
            <br />
            <table className={style.boardTable}>
                <thead>
                    <tr>
                        <th>상품 정보</th>
                        <th>합계 금액</th>
                    </tr>
                </thead>
                <tbody>
                    {productsList.length === 0 ? (
                        <tr>
                            <td colSpan={2} style={{ padding: '30px' }}>
                                장바구니에 담긴 상품이 없습니다.
                            </td>
                        </tr>
                    ) : (
                        productsList.map((item) => (
                            <tr key={item.PRODUCTID}>
                                <td>
                                    <img
                                        src={getImageUrl(item.IMGNM)}
                                        alt={item.PNM}
                                        onError={(e) => {
                                            const target = e.target as HTMLImageElement;
                                            target.onerror = null;
                                            target.src = NO_IMAGE_PLACEHOLDER;
                                        }}
                                        style={{ width: '100px', height: '100px', marginLeft: '21px' }}
                                    />
                                    {/* X 버튼 */}
                                    <button
                                        style={{ float: 'right' }}
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handledelOneCartProduct(item.PRODUCTID)}
                                    >
                                        X
                                    </button>
                                    <p style={{ fontWeight: 'bold' }}>{item.TITLE}</p>
                                    <p>{item.PRICE?.toLocaleString()} * {item.QTY} 원</p>
                                    {/* toLocaleString() : 큰 수에 천단위로 쉼표 찍어줌 */}
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
                                <td>{item.SUBTOT.toLocaleString()} 원</td>
                            </tr>
                        ))
                    )}
                </tbody>
                <tfoot>
                    {
                        productsList.length === 0
                            ?
                            <tr>
                                <td colSpan={2} style={{ padding: '30px' }}>
                                    구매하실 상품을 장바구니에 담아주세요!
                                </td>
                            </tr>
                            :
                            <tr>
                                <td colSpan={2}>총 가격 : <strong>{totalPrice.toLocaleString()}</strong>원</td>
                            </tr>
                    }
                </tfoot>
            </table>
            <br />
            {
                productsList.length === 0
                    ?
                    <Link to='/shoppingList' className={btnStyle.button}>
                        상품 리스트
                    </Link>
                    :
                    <button className={btnStyle.button} onClick={orderHandler}>
                        결제하기
                    </button>
            }
        </div>
    )
}

export default Cart