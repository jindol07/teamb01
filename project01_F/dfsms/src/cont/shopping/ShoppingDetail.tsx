import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import style from "./shoppingDetail.module.css";

interface ProductState {
  id: number;
  name: string;
  price: number;
  image: string;
}

const ShoppingDetail: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // GalleryList에서 navigate로 보낸 state(상품 정보)를 받아옵니다.
  const product = location.state as ProductState;

  // 혹시 주소창으로 직접 들어와서 상품 정보가 없는 경우 예외 처리
  if (!product) {
    return <div className={style.error}>상품 정보가 없습니다.</div>;
  }

  return (
    <div className={style.detailContainer}>
      {/* 상단 레이아웃: 왼쪽(이미지) + 오른쪽(주문 정보) */}
      <div className={style.mainContent}>
        
        {/* 왼쪽: 이미지 영역 (마우스 올리면 커지는 효과 유지) */}
        <div className={style.leftSection}>
          <div className={style.imageContainer}>
            <img src={`/${product.image}`} alt={product.name} />
          </div>
        </div>

        {/* 오른쪽: 주문 정보 영역 */}
        <div className={style.rightSection}>
          <span className={style.category}>Fresh Fruit</span>
          <h2 className={style.productName}>{product.name}</h2>
          <p className={style.productPrice}>{product.price.toLocaleString()}원</p>
          
          <hr className={style.divider} />
          
          {/* 간단한 주문 옵션 예시 */}
          <div className={style.orderInfo}>
            <p>🚚 배송방법: 새벽배송 (내일 아침 수령)</p>
            <p>📦 배송비: 3,000원 (3만원 이상 구매 시 무료)</p>
            <div className={style.quantityBox}>
              <label>수량: </label>
              <input type="number" defaultValue={1} min={1} className={style.quantityInput} />
            </div>
          </div>
        </div>

      </div>

      {/* 하단 레이아웃: 장바구니 및 이동 버튼 */}
      <div className={style.bottomSection}>
        <button className={style.cartBtn} onClick={() => alert("장바구니에 담겼습니다!")}>
          장바구니 담기
        </button>
        <button className={style.goToCartBtn} onClick={() => navigate("/cart")}>
          장바구니로 가기 🛒
        </button>
        <button className={style.backBtn} onClick={() => navigate(-1)}>
          뒤로가기
        </button>
      </div>
    </div>
  );
};

export default ShoppingDetail;