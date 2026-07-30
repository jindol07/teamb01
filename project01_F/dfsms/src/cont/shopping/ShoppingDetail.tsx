import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import style from "./shoppingDetail.module.css";
import axios from "axios";
import Confirm from "../components/Confirm";


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

  //const [products, setProducts] = useState<ProductState>()

  // 수량 상태 관리 (기본값 1)
  const [quantity, setQuantity] = useState<number>(1);

  //0728
  const [salePrice, setSalePrice] = useState(0);
  const [oriPirce, setOriPirce] = useState(0);
  const [cont, setCont] = useState("");
  useEffect(() => {
    const fetchMyNoticeDetail = async () => {
      const url = `${backendUrl}/api/products/detailTemp`
      const res = await axios.get(url, {
        params: {
          productid: productid
        }
        , withCredentials: true
      })
      console.log('pDetail: ', res.data)
      setOriPirce(res.data.originprice)
      setSalePrice(res.data.price)
      setCont(res.data.cont)
    }
    fetchMyNoticeDetail()
  }, []);

  const [success, setSuccess] = useState(false);
  const [already, setAlready] = useState(false);
  const [logins, setLogins] = useState(false);
  const [loginn, setLoginn] = useState(false);
  const [message, setMessage] = useState(''); // 메시지 내용 저장용

  if (!rawProduct) {
    return (
      <div className={style.errorContainer}>
        <p className={style.error}>존재하지 않거나 잘못된 접근입니다.</p>
        <button className={style.backBtn} onClick={() => navigate("/shopping/list")}>
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
  //0727
  const productid = rawProduct.productid ?? rawProduct.PRODUCTID ?? null

  // RAW 이미지 파일명/경로 추출
  const rawImage = rawProduct.image || rawProduct.imgnm || rawProduct.IMGNM || rawProduct.pimg;

  // 재고 수량 추출
  const stockQty = rawProduct.qty ?? rawProduct.QTY ?? 0;

  const maxAllowedQty = Math.max(stockQty, 1);

  // static/imgfile/gallery 저장 경로에 맞춘 URL 생성 함수
  const getImageUrl = (imgStr?: string) => {
    // 이미지 문자열이 없거나 빈 값인 경우 기본 대체 이미지(PLACEHOLDER) 반환
    if (!imgStr) return NO_IMAGE_PLACEHOLDER;
    // 이미지 절대 경로(http/https) 이거나 Base64 인코딩 데이터(data:)인 경우 그대로 반환
    if (
      imgStr.startsWith("http://") ||
      imgStr.startsWith("https://") ||
      imgStr.startsWith("data:")
    ) {
      return imgStr;
    }
    // 파일 경로 형태인 경우, 슬래시(/)나 역슬래시(\)를 기준으로 파일명만 추출
    const fileName = imgStr.split(/[/\\]/).pop();
    // 백엔드 서버의 이미지 파일 저장 경로와 조합하여 최종 URL 반환
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
    // 입력받은 값을 10진수 정수로 변환
    const value = parseInt(val, 10);
    // 숫자가 아니거나 1 미만인 경우 최소값인 1로 설정
    if (isNaN(value) || value < 1) {
      setQuantity(1);
      // 허용된 최대 수량(maxAllowedQty)을 초과한 경우 최대 허용 수량으로 설정
    } else if (value > maxAllowedQty) {
      setQuantity(maxAllowedQty);
      // 유효한 범위 내의 값인 경우 그대로 수량으로 설정
    } else {
      setQuantity(value);
    }
  };
  // 장바구니 담기 클릭시 로그인을 하지 않았을 경우 이동
  const login1 = () => {
    setLogins(false);
    window.dispatchEvent(new Event("loginChange"));
    setTimeout(() => {
      navigate("/login");
    }, 2000)
  };
  // 장바구니 담기 버튼 클릭 이벤트
  const handleAddToCart = async () => {
    // 로그아웃 시 장바구니 담기 안되도록 수정(재 로그인 시 이상 없음)
    const user = JSON.parse(
        sessionStorage.getItem("loginInfo") || "null"
    );
    if (!user || !user.loginNm) {
        setLogins(true);
        return;
    }
    try {
      const url = `${backendUrl}/api/cart/add`
      const res = await axios.get(url, {
        params: {
          productid: productid
          , qty: quantity
        }
        , withCredentials: true
      });
      console.log(res.data);
      if (res.data.code === 'NO_USR_INFO') {
        // alert(res.data.message) // 사용자가 존재하지 않는 경우
        setLogins(true);
      } else if (res.data.code === 'NO_MATCHED_ROLE') {
        alert(res.data.message) // 권한이나 역할이 일치하지 않는 경우
      } else if (res.data.code === 'LACK_OF_QTY') {
        alert(res.data.message) // 수량이 부족한 경우(재고 부족 등)
        // 이미 장바구니에 담겨 있는 경우
      } else if (res.data.code === 'ALREADY_EXIST') {
        setMessage(res.data.message); // 메시지 상태 설정
        setAlready(true); // 중복 상태(already)를 true로 변경
        // 그외의 모든 경우(성공 또는 기타 기본 처리)
      } else {
        setMessage(res.data.message); // 메시지 상태 설정
        setSuccess(true); // 중복 상태(already)를 true로 변경
      }
      //서버로부터 응답받은 데이터 useState에 바인딩

    } catch (error) {
      console.error("데이터 가져오기 실패:" + error);
    }

  };

  // 장바구니 페이지로 이동하면서 로그인 여부 확인하는 함수
  const handleClick = () => {
    const user = JSON.parse(
      sessionStorage.getItem("loginInfo") || "null"
    );

    // loginNm(이름)이나 role(권한)이 존재하면 로그인된 상태로 인정
    if (!user || !user.loginNm) {
      // alert("로그인이 필요합니다."); 
      setMessage("잠시 후 로그인 페이지로 이동");
      setLoginn(true);
      setTimeout(() => {
        setLoginn(false);
        navigate("/login");
      }, 2000);
      return;
    }
    navigate("/cart");
  };
  
  // 실시간 총 금액
  //const totalPrice = productPrice * quantity;
  const totalPrice = (salePrice > 0 ? salePrice : productPrice) * quantity;

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
            {/* {productPrice.toLocaleString()}원 */}
            {salePrice > 0 ? (
              <>
                <span>{salePrice.toLocaleString()}원</span>&nbsp;[구독 회원 할인]<br />
                <del style={{ color: "black", fontSize: "20px" }}>
                  {productPrice.toLocaleString()}원
                </del>
              </>
            ) : (
              <span>{oriPirce.toLocaleString()}원</span>
            )}
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
          <p style={{ whiteSpace: "pre-line" }}>{cont}</p>
        </div>
      )}
      {/* 확인 클릭 시 2.5초 후 로그인 페이지로 이동 */}
      {logins && (
        <Confirm
          message="로그인페이지로 이동합니다."
          onConfirm={login1}
          onCancel={() => setLogins(false)}
        />
      )
      }
      {/* 토스트 메시지 적용 */}
      <div>
       {/* 장바구니로 가기 클릭 시 (로그인 필요) 토스트 */}
        {loginn && (
          <div className={style.logoutMsg}>
            {message}
          </div>
        )}
        {/* 이미 장바구니에 있는 경우 토스트 */}
        {already && (
          <div className={style.logoutMsg}>
            {message}
          </div>
        )}
        {/* 성공 또는 기타 메시지 토스트 */}
        {success && (
          <div className={style.logoutMsg}>
            {message}
          </div>
        )}
      </div>
      {/* 하단 버튼 영역 */}
      <div className={style.bottomSection}>
        <button disabled={stockQty <= 0} className={style.cartBtn} onClick={handleAddToCart}>
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