import { useNavigate } from "react-router-dom";

const OrderStatus = () => {
    const navigate = useNavigate();
    return (
        <div className="container py-5">
            <div className="card shadow-sm p-5 text-center">
                {/* 주문 완료 */}
                <h2 className="mb-4">
                    🎉 주문이 완료되었습니다
                </h2>
                {/* 배송 상태 아이콘 */}
                <div
                    style={{
                        fontSize: "60px",
                        marginBottom: "20px"
                    }}
                >
                    🚚
                </div>
                {/* 배송 상태 */}
                <h3
                    className="text-success fw-bold"
                >
                    배송 준비중
                </h3>
                <p className="text-muted mt-3">
                    주문하신 상품을 준비하고 있습니다.
                    <br />
                    상품 준비가 완료되면 배송이 시작됩니다.
                </p>
                {/* 주문 정보 */}
                <div className="border rounded p-3 mt-4 text-start">
                    <h5 className="mb-3">
                        📦 주문 정보
                    </h5>
                    <p className="mb-1">
                        상품명 : 샐러드 정기배송
                    </p>
                    <p className="mb-1">
                        결제 금액 : 30,000원
                    </p>
                    <p className="mb-0">
                        배송 상태 : 배송 준비중
                    </p>
                </div>
                {/* 버튼 */}
                <div className="mt-4">
                    <button
                        className="btn btn-success me-2"
                        onClick={() => navigate("/")}
                    >
                        홈으로 이동
                    </button>
                    <button
                        className="btn btn-outline-success"
                        onClick={() => navigate("/mypage")}
                    >
                        주문 내역 보기(마이페이지)
                    </button>
                </div>
            </div>
        </div>
    );
};
export default OrderStatus;