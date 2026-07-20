import React, { useEffect, useState } from "react";
import style from "./shopping.module.css";
import { useNavigate } from "react-router-dom";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}
const ShoppingList: React.FC = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  // 상품 목록
  const products: Product[] = [
    { id: 1, name: "사과(500g)", price: 5000, image: "image/사과.jpg" },
    { id: 2, name: "복숭아(500g)", price: 7000, image: "image/복숭아.jpg" },
    { id: 3, name: "배(500g)", price: 5000, image: "image/배.jpg" },
    { id: 4, name: "체리(500g)", price: 10000, image: "image/체리.jpg" },
    { id: 5, name: "샤인머스캣(2KG)", price: 8000, image: "image/샤인머스캣.jpg" },
    { id: 6, name: "레몬(500g)", price: 16000, image: "image/레몬.jpg" },
    { id: 7, name: "포도(3KG)", price: 6000, image: "image/포도.jpg" },
    { id: 8, name: "애플망고(500g)", price: 6000, image: "image/망고.jpg" },
    { id: 9, name: "수박(7~8KG)", price: 19000, image: "image/수박.jpg" },
    { id: 10, name: "멜론(1.5~2KG)", price: 8000, image: "image/멜론.jpg" },
    { id: 11, name: "키위(500g)", price: 6000, image: "image/키위.jpg" },
    { id: 12, name: "자두(500g)", price: 3500, image: "image/자두.jpg" }
  ];

  // 검색 기능
  const filteredProducts = products.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  // 브라우저 제목 변경
  useEffect(() => {
    document.title = "Daily Food";
  }, []);

  return (
    <div>
      {/* 중앙 정렬된 깔끔한 타이틀 */}
      <h2 className={style.h2}>Daily Food</h2>
      {/* 세련되게 바뀐 알약 모양 검색창 */}
      <input
        type="text"
        placeholder="찾으시는 Daily Food을 검색해 보세요!" /* 돋보기 이모지를 넣으면 훨씬 직관적입니다 */
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className={style.input}
      />
      <div className={style["img-container"]}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((item) => (
            <div key={item.id}>
              <img
                src={item.image}
                alt={item.name}
                className={style.img}
                onClick={() =>
                  navigate(`/shopping/${item.id}`, {
                    state: item,
                  })
                }
              />
              {/* 아래로 내려갈 텍스트 영역 */}
              <p className={style.productPrice}>
                {item.name} <br />
                <span style={{ fontWeight: "bold" }}>{item.price.toLocaleString()}원</span>
              </p>
            </div>
          ))
        ) : (
          <p
            style={{ width: "100%", textAlign: "center", fontSize: "20px", marginTop: "30px" }}>
            🔍 검색 결과가 없습니다.</p>
        )}
      </div>
    </div>
  );
};
export default ShoppingList;