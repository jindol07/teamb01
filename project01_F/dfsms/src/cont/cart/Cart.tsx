import React, { useState } from 'react'
import style from './cart.module.css'
import { Link } from 'react-router-dom';
import btnStyle from '../components/btn.module.css'

import { Button, InputGroup, FormControl } from 'react-bootstrap';

const Cart: React.FC = () => {
    const saved = sessionStorage.getItem("loginInfo");
    const loginInfo = saved ? JSON.parse(saved) : null;
    const loginNm = loginInfo?.loginNm;

    const [quantity, setQuantity] = useState(0);
    const [quantity2, setQuantity2] = useState(0);

    const handleIncrease = () => setQuantity(prev => prev + 1);
    const handleDecrease = () => {
        setQuantity(prev => (prev > 1 ? prev - 1 : 0));
    };

    const handleIncrease2 = () => setQuantity2(prev => prev + 1);
    const handleDecrease2 = () => {
        setQuantity2(prev => (prev > 1 ? prev - 1 : 0));
    };

    const handleDelete = (num: number) => {
        //백단으로 num값 포함해서 delete 태우기
        //delete성공시 아래 코드 : UI 재랜더링(새로운 리스트)
        //클릭한 num와 일치하지 않는 항목만 남겨서 배열을 업데이트
        //setItems(items.filter(item => item.num !== num));
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
                    <tr>
                        <td>
                            <label>
                                <input type="checkbox" />
                            </label>
                        </td>
                        <td>
                            <div></div>
                            <img src="./images/watermellon.jpg" style={{ width: '60px', height: '60px', marginLeft: '401px', marginRight: '100px' }} /><button style={{ marginLeft: '279px' }} className="btn btn-danger btn-sm">
                                X
                            </button>
                            <p>꿀수박 1500 브릭스</p>
                            <p>18000 * 2 원</p>
                            <div className="input-group">
                                {/* - */}
                                <button
                                    className="btn btn-outline-secondary"
                                    type="button"
                                    onClick={handleDecrease}
                                >
                                    -
                                </button>

                                {/* 수량 */}
                                <input
                                    type="text"
                                    className="form-control text-center"
                                    value={quantity}
                                    readOnly
                                />

                                {/* + */}
                                <button
                                    className="btn btn-outline-secondary"
                                    type="button"
                                    onClick={handleIncrease}
                                >
                                    +
                                </button>

                            </div>
                        </td>
                        <td>36000원</td>
                    </tr>
                    <tr>
                        <td>
                            <label>
                                <input type="checkbox" />
                            </label>
                        </td>
                        <td>

                            <img src="./images/fish.jpg" style={{ width: '60px', height: '60px', marginLeft: '401px', marginRight: '100px' }} /><button style={{ marginLeft: '279px' }} className="btn btn-danger btn-sm">
                                X
                            </button>
                            <p>생물고등어 3마리들입</p>
                            <p>13000 * 3 원</p>
                            <div className="input-group">
                                {/* - */}
                                <button
                                    className="btn btn-outline-secondary"
                                    type="button"
                                    onClick={handleDecrease2}
                                >
                                    -
                                </button>

                                {/* 수량 */}
                                <input
                                    type="text"
                                    className="form-control text-center"
                                    value={quantity2}
                                    readOnly
                                />

                                {/* + */}
                                <button
                                    className="btn btn-outline-secondary"
                                    type="button"
                                    onClick={handleIncrease2}
                                >
                                    +
                                </button>

                            </div>
                        </td>
                        <td>39000원</td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan={3}>총 가격 : <strong>75000</strong>원</td>
                    </tr>
                </tfoot>
            </table>
            <br />
            <Link to="/payment" className={btnStyle.button}>결제하기</Link>
        </div>
    )
}

export default Cart