import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import style from "./shoppingDetail.module.css";

// 이미지 로딩 실패 시 기본 이미지 (SVG)
const NO_IMAGE_PLACEHOLDER =
  "data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22400%22%20height%3D%22400%22%20viewBox%3D%220%200%20400%20400%22%3E%3Crect%20fill%3D%22%23f0f0f0%22%20width%3D%22400%22%20height%3D%22400%22%2F%3E%3Ctext%20fill%3D%22%23888888%22%20font-family%3D%22sans-serif%22%20font-size%3D%2224%22%20x%3D%2250%25%22%20y%3D%2250%25%22%20text-anchor%3D%22middle%22%20dy%3D%22.3em%22%3ENo%20Image%3C%2Ftext%3E%3C%2Fsvg%3E";

// 백엔드 데이터 키 매핑 인터페이스
interface ProductState {
  productid?: number;
  PRODUCTID?: number;
  categoryid?: number;
  CATEGORYID?: number;
  categoryName?: string;
  CATEGORYNAME?: string;
  pnm?: string;
  PNM?: string;
  price?: number | string;
  PRICE?: number | string;
  qty?: number;
  QTY?: number;
  title?: string;
  TITLE?: string;
  cont?: string;
  CONT?: string;
  imgnm?: string;
  IMGNM?: string;
  pimg?: string;
  image?: string;
}

const backendUrl = process.env.REACT_APP_BACK_END_URL;

const ShoppingDetail: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const rawProduct = location.state as ProductState | null;

  // 수량 상태 관리 (기본값 1)
  const [quantity, setQuantity] = useState<number>(1);

  if (!rawProduct) {
    return (
      <div className={style.errorContainer}>
        <p className={style.error}>존재하지 않거나 잘못된 접근입니다.</p>
        <button className={style.backBtn} onClick={() => navigate("/shopping")}>
          쇼핑 목록으로 돌아가기
        </button>
      </div>
    );
  }

  // 백엔드 데이터 추출 (소문자/대문자 호환)
  const productName = rawProduct.pnm || rawProduct.PNM || rawProduct.title || rawProduct.TITLE || "상품명 없음";
  const rawPrice = rawProduct.price ?? rawProduct.PRICE ?? 0;
  const productPrice = Number(rawPrice) || 0;
  const productCont = rawProduct.cont || rawProduct.CONT || "상품 상세 설명이 없습니다.";
  const categoryName = rawProduct.categoryName || rawProduct.CATEGORYNAME || "Fresh Food";
  
  // RAW 이미지 파일명/경로 추출
  const rawImage = rawProduct.image || rawProduct.imgnm || rawProduct.IMGNM || rawProduct.pimg;

  // 재고 수량 추출
  const stockQty = rawProduct.qty ?? rawProduct.QTY ?? 0;
  const maxAllowedQty = Math.max(stockQty, 1);

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

  const imageSrc = getImageUrl(rawImage);

  // 수량 입력 핸들러
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === "") {
      setQuantity(1);
      return;
    }
    const value = parseInt(val, 10);
    if (isNaN(value) || value < 1) {
      setQuantity(1);
    } else if (value > maxAllowedQty) {
      setQuantity(maxAllowedQty);
    } else {
      setQuantity(value);
    }
  };
  
// 장바구니 담기 버튼 클릭 이벤트
const handleAddToCart = () => {
  // 현재 선택한 상품 정보를 객체로 생성
  const cartItem = {
    // 상품 번호 (백엔드 데이터가 소문자/대문자 둘 다 올 수 있어서 처리)
    productid: rawProduct.productid || rawProduct.PRODUCTID,
    // 상품명
    productName,
    // 상품 가격
    price: productPrice,
    // 선택한 수량
    quantity
  };
  // 기존 localStorage에 저장되어 있는 장바구니 데이터 가져오기
  // 데이터가 없으면 빈 배열([])로 초기화
let existingCart = [];
try {
 existingCart = JSON.parse(
   localStorage.getItem("cart") || "[]"
 );
} catch {
 existingCart = [];
}
// 기존 장바구니 목록에서 현재 추가하려는 상품과 같은 상품이 있는지 찾기
// findIndex는 조건에 맞는 상품의 배열 위치(index)를 반환하고,
// 없으면 -1을 반환함
const index = existingCart.findIndex(
  (item: any) => item.productid === cartItem.productid
);
if (index >= 0) {
  // 기존 장바구니 상품의 수량에 선택한 수량을 추가
  const newQty = existingCart[index].quantity + quantity;
  // 재고 수량을 초과하지 않도록 최대 수량 제한
  existingCart[index].quantity =
    newQty > maxAllowedQty ? maxAllowedQty : newQty;
} else {
  // 같은 상품이 없는 경우
  // 새로운 상품 정보를 장바구니 배열에 추가
  existingCart.push(cartItem);
}
// 변경된 장바구니 데이터를 localStorage에 저장
// localStorage는 문자열만 저장 가능하므로 JSON 문자열 형태로 변환
localStorage.setItem(
  "cart",
  JSON.stringify(existingCart)
);
  // 사용자에게 상품 추가 완료 메시지 표시
  alert(`${productName} ${quantity}개가 장바구니에 담겼습니다!`);
};

// 장바구니 페이지로 이동하면서 로그인 여부 확인하는 함수
const handleClick = () => {
  const user = JSON.parse(
    sessionStorage.getItem("loginInfo") || "null"
  );
  
  // loginNm(이름)이나 role(권한)이 존재하면 로그인된 상태로 인정
  if (!user || !user.loginNm) {
    alert("로그인이 필요합니다.");
    navigate("/login");
    return;
  }
  
  navigate("/cart");
};
  // 실시간 총 금액
  const totalPrice = productPrice * quantity;

  return (
    <div className={style.detailContainer}>
      <div className={style.mainContent}>
        {/* 왼쪽: 이미지 영역 */}
        <div className={style.leftSection}>
          <div className={style.imageContainer}>
            <img
              src={imageSrc}
              alt={productName}
              className={style.img}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                target.src = NO_IMAGE_PLACEHOLDER;
              }}
            />
          </div>
        </div>

        {/* 오른쪽: 주문 정보 영역 */}
        <div className={style.rightSection}>
          <span className={style.category}>{categoryName}</span>
          <h2 className={style.productName}>{productName}</h2>
          
          {/* 상품 단가 */}
          <p className={style.productPrice}>
            {productPrice.toLocaleString()}원
          </p>

          <hr className={style.divider} />

          <div className={style.orderInfo}>
            <p>🚚 배송방법: 새벽배송 (내일 아침 수령)</p>
            <p>📦 배송비: 3,000원 (3만원 이상 구매 시 무료)</p>
            <p>🔢 남은 재고: {stockQty}개</p>

            {/* 수량 입력 박스 */}
            <div className={style.quantityBox}>
              <label htmlFor="quantity">수량: </label>
              <input
                id="quantity"
                type="number"
                value={quantity}
                min={1}
                max={maxAllowedQty}
                onChange={handleQuantityChange}
                className={style.quantityInput}
              />
            </div>

            {/* 총 금액 표시 */}
            <div className={style.totalPriceBox}>
              <span>총 상품 금액: </span>
              <strong className={style.totalPrice}>
                {totalPrice.toLocaleString()}원
              </strong>
            </div>
          </div>
        </div>
      </div>

      {/* 하단 상세 설명 영역 */}
      {productCont && (
        <div className={style.productDetail}>
          <h3>상품 상세 정보</h3>
          <p style={{ whiteSpace: "pre-line" }}>{productCont}</p>
        </div>
      )}

      {/* 하단 버튼 영역 */}
      <div className={style.bottomSection}>
        <button  disabled={stockQty <= 0} className={style.cartBtn} onClick={handleAddToCart}>
          장바구니 담기
        </button>
        <button className={style.goToCartBtn} onClick={handleClick}>
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