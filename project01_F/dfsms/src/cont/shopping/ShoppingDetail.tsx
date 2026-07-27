import React, { useEffect, useState, useCallback } from "react";
import style from "./shopping.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const NO_IMAGE_PLACEHOLDER =
    "data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22200%22%20height%3D%22200%22%20viewBox%3D%220%200%20200%20200%22%3E%3Crect%20fill%3D%22%23f0f0f0%22%20width%3D%22200%22%20height%3D%22200%22%2F%3E%3Ctext%20fill%3D%22%23888888%22%20font-family%3D%22sans-serif%22%20font-size%3D%2216%22%20x%3D%2250%25%22%20y%3D%2250%25%22%20text-anchor%3D%22middle%22%20dy%3D%22.3em%22%3ENo%20Image%3C%2Ftext%3E%3C%2Fsvg%3E";

interface Product {
    PRODUCTID?: number;
    productid?: number;
    id?: number;
    CATEGORYID?: number;
    categoryid?: number;
    PNM?: string;
    pnm?: string;
    pname?: string;
    PRICE?: number;
    price?: number;
    pprice?: number;
    QTY?: number;
    qty?: number;
    TITLE?: string;
    title?: string;
    CONT?: string;
    cont?: string;
    IMGNM?: string;
    imgnm?: string;
    PIMG?: string;
    pimg?: string;
    image?: string;
}

// 💡 환경 변수가 없을 경우 대비해 기본값(Fallback) 설정
const backendUrl = process.env.REACT_APP_BACK_END_URL;

// static/imgfile/gallery 경로 매핑
const getImageUrl = (rawImg?: string) => {
    if (!rawImg) return NO_IMAGE_PLACEHOLDER;

    if (
        rawImg.startsWith("http://") ||
        rawImg.startsWith("https://") ||
        rawImg.startsWith("data:")
    ) {
        return rawImg;
    }

    const fileName = rawImg.split(/[/\\]/).pop();
    return `${backendUrl}/imgfile/gallery/${fileName}`;
};

// 카테고리 ID를 한국어 명칭으로 변환
const getCategoryName = (categoryId?: number | string) => {
    const id = String(categoryId);
    switch (id) {
        case "1": return "과일류";
        case "2": return "채소류";
        case "3": return "육류";
        case "4": return "어류";
        case "5": return "밀키트";
        default: return "Fresh Food";
    }
};

const ShoppingList: React.FC = () => {
    const [shoppingList, setShoppingList] = useState<Product[]>([]);
    const [totalItems, setTotalItems] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [startPage, setStartPage] = useState(1);
    const [endPage, setEndPage] = useState(1);

    const navigate = useNavigate();

    const [searchInput, setSearchInput] = useState("");
    const [searchValue, setSearchValue] = useState("all");

    useEffect(() => {
        document.title = "Daily Food";
    }, []);

    // API 데이터 호출
    const fetchProducts = useCallback(async (controller?: AbortController) => {
        try {
            const response = await axios.get(`${backendUrl}/api/products/list`, {
                withCredentials: true,
                params: {
                    cPage: currentPage,
                    searchType: searchInput.trim(),
                    searchValue: searchValue,
                },
                signal: controller?.signal,
            });

            const rawData: Product[] = response.data.data || [];

            const uniqueProducts = rawData.filter(
                (item, index, self) =>
                    index ===
                    self.findIndex((p) => {
                        const currentId = item.PRODUCTID ?? item.productid ?? item.id;
                        const targetId = p.PRODUCTID ?? p.productid ?? p.id;
                        return currentId === targetId;
                    })
            );

            setShoppingList(uniqueProducts);
            setTotalItems(response.data.totalItems || uniqueProducts.length);
            setTotalPages(response.data.totalPages || 0);
            setStartPage(response.data.startPage || 1);
            setEndPage(response.data.endPage || 1);
        } catch (error) {
            if (axios.isCancel(error)) {
                console.log("이전 요청 취소됨");
            } else {
                console.error("데이터를 가져오는 중 오류 발생:", error);
            }
        }
    }, [currentPage, searchInput, searchValue]);

    useEffect(() => {
        const controller = new AbortController();
        fetchProducts(controller);

        return () => {
            controller.abort();
        };
    }, [fetchProducts]);

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSearchValue(e.target.value);
        setCurrentPage(1);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInput(e.target.value);
        setCurrentPage(1);
    };

    const parseProductData = (item: Product, index: number) => {
        const productId = item.PRODUCTID ?? item.productid ?? item.id ?? index;
        const productName = item.PNM || item.pnm || item.pname || item.TITLE || "상품명 없음";
        const productPrice = item.PRICE ?? item.price ?? item.pprice ?? 0;
        const rawCategory = item.CATEGORYID ?? item.categoryid;
        const categoryName = getCategoryName(rawCategory);

        const rawImage = item.IMGNM || item.imgnm || item.PIMG || item.pimg || item.image;
        const productImage = getImageUrl(rawImage);

        return { productId, productName, productPrice, productImage, categoryName };
    };

    return (
        <div>
            <h2 className={style.h2}>Daily Food</h2>

            <div className={style.searchContainer}>
                <select value={searchValue} onChange={handleCategoryChange}>
                    <option value="all">전체보기</option>
                    <option value="1">과일류</option>
                    <option value="2">채소류</option>
                    <option value="3">육류</option>
                    <option value="4">어류</option>
                    <option value="5">밀키트</option>
                </select>

                <input
                    type="text"
                    value={searchInput}
                    placeholder="찾으시는 상품명을 입력하세요..."
                    onChange={handleInputChange}
                />
            </div>

            <div style={{ textAlign: "right", margin: "10px 0", fontSize: "14px", color: "#666" }}>
                {searchInput && (
                    <span style={{ color: "#007bff", marginRight: "10px" }}>
                        <strong>{searchInput}</strong> 검색 결과:
                    </span>
                )}
                총 <strong>{totalItems}</strong>개의 상품
            </div>

            <div className={style["img-container"]}>
                {shoppingList && shoppingList.length > 0 ? (
                    shoppingList.map((item, index) => {
                        const { productId, productName, productPrice, productImage, categoryName } =
                            parseProductData(item, index);
                        const uniqueKey = `product-${productId}-${index}`;

                        return (
                            <div key={uniqueKey} className={style.productCard}>
                                <img
                                    src={productImage}
                                    alt={productName}
                                    className={style.img}
                                    onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        target.onerror = null;
                                        target.src = NO_IMAGE_PLACEHOLDER;
                                    }}
                                    onClick={() =>
                                        navigate(`/shopping/${productId}`, {
                                            state: { ...item, image: productImage, price: productPrice },
                                        })
                                    }
                                />
                                <p className={style.productPrice}>
                                    <span style={{ fontSize: "12px", color: "#28a745", fontWeight: "bold", display: "block" }}>
                                        [{categoryName}]
                                    </span>
                                    {productName} <br />
                                    <span style={{ fontWeight: "bold", fontSize: "16px" }}>
                                        {productPrice.toLocaleString()}원
                                    </span>
                                </p>
                            </div>
                        );
                    })
                ) : (
                    <p
                        style={{
                            width: "100%",
                            gridColumn: "1 / -1",
                            textAlign: "center",
                            fontSize: "18px",
                            marginTop: "40px",
                            color: "#888"
                        }}
                    >
                        🔍 <strong>{searchInput || "조건"}</strong>에 부합하는 상품이 없습니다.
                    </p>
                )}
            </div>

            {totalPages > 0 && endPage >= startPage && (
                <div style={{ textAlign: "center", marginTop: "30px", marginBottom: "20px" }}>
                    {startPage > 1 && (
                        <button onClick={() => setCurrentPage(startPage - 1)}>이전</button>
                    )}

                    {Array.from(
                        { length: endPage - startPage + 1 },
                        (_, i) => startPage + i
                    ).map((page) => (
                        <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            style={{
                                fontWeight: currentPage === page ? "bold" : "normal",
                                margin: "0 4px",
                                padding: "6px 12px",
                                borderRadius: "4px",
                                border: "1px solid #ccc",
                                backgroundColor: currentPage === page ? "#007bff" : "#fff",
                                color: currentPage === page ? "#fff" : "#333",
                                cursor: "pointer"
                            }}
                        >
                            {page}
                        </button>
                    ))}

                    {endPage < totalPages && (
                        <button onClick={() => setCurrentPage(endPage + 1)}>다음</button>
                    )}
                </div>
            )}
        </div>
    );
};

export default ShoppingList;