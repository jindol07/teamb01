import { useNavigate } from "react-router-dom";
import btnStyle from '../components/btn.module.css'

const Payment = () => {

    const navigate = useNavigate();
    const handlePayment = (): void => {
        // 결제 처리 로직 작성 위치
        navigate("/orderstatus");
    };
    return (
        <div className="container py-5">
            <h2 className="mb-4">
                💳 결제 페이지
            </h2>
            <div className="card p-4">
                <h5 className="mb-3">
                    주문 정보
                </h5>
                <p>
                    상품명 : 샐러드 정기배송
                </p>
                <p>
                    결제 금액 : 30,000원
                </p>
                <div className="text-end mt-4">
                    <button
                        className={btnStyle.button}
                        onClick={handlePayment}
                    >
                        배송 조회
                    </button>
                </div>
            </div>
        </div>
    );
};


export default Payment;