import { useNavigate } from "react-router-dom";
import styles from "./payment.module.css";

const Payment = () => {
    const navigate = useNavigate();

    const handlePayment = (): void => {
        // 결제 처리 로직 작성 위치
        navigate("/orderstatus");
    };

    return (
        <div className={styles.paymentContainer}>
            <h2 className={styles.title}>
                💳 결제 페이지
            </h2>

            {/* 필독 사항 영역 */}
            <div className={styles.noticeWrapper}>
                <strong className={styles.noticeTitle}>📌 !결제하시기전 필독사항!</strong>
                <p className={styles.noticeText}>
                    결제하시기 전 주문하시는
                    <br/> {/* 줄 바꿈 */}
                    상품 및 결제 금액이 일치하는지
                    <br /> {/* 줄 바꿈 */}
                    다시 한번 확인 부탁드립니다.
                </p>
            </div>

            <div className={styles.cardBox}>
                <h5 className={styles.sectionTitle}>
                    📄 주문 정보
                </h5>
                <p className={styles.infoText}>
                    🛍️ 상품명 : 샐러드 정기배송
                </p>
                <p className={styles.infoText}>
                    🏷️ 결제 금액 : 30,000원
                </p>
                <div className={styles.buttonWrapper}>
                    <button
                        className={styles.payButton}
                        onClick={handlePayment}
                    >
                       🚚 배송 조회 🚚
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Payment;