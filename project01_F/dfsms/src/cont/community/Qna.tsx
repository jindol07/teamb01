import React, { useEffect, useState } from 'react'

const Qna: React.FC = () => {

    const [myQna, setMyQna] = useState<any>([]);
    const [qnaNo, setQnaNd] = useState(0);

    // 서버에서(ex : axios) 데이터를 가져왔다고 가정, useEffect 사용
    useEffect(() => {
        const fetchMyQna = async () => {
            const qna = [
                { no: 1, q: "주문은 어떻게 해요?", a: "죄송합니다.. 입사한지 얼마 안돼서 잘 모르겠어요ㅠㅠ." }
                , { no: 2, q: "한달전에 주문했는데 도대체 언제 도착하나요?", a: "그럴리가 없을텐데.. 아마 택배사가 오배송한 듯 합니다." }
                , { no: 3, q: "주문한 품목과 받은 품목이 다릅니다!! 교환이 될까요?", a: "이번만 그냥 드시고 다음에 서비스 챙겨드리겠습니다." }
                , { no: 4, q: "환불 규정은 어떻게 되나요?", a: "저희는 환불을 해드리지 않습니다." }
                , { no: 5, q: "비회원으로는 주문이 안되나요?", a: "가능은 한데 주문하실때 추가요금을 더 받습니다." }
            ];
            setMyQna(qna)
        }
        fetchMyQna();
    }, [])

    const qClick = (no: number) => {
        setQnaNd(qnaNo === no ? 0 : no);
    };

    return (
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            <h1 style={{ textAlign: 'center' }}>FAQ</h1>
            {
                myQna.map((e: any) => (
                    <div key={e.no} style={{ border: "1px solid #ddd", marginBottom: "10px", borderRadius: "8px" }}>
                        <div onClick={() => qClick(e.no)} style={{ padding: "15px", cursor: "pointer", backgroundColor: "#f5f5f5", fontWeight: "bold" }}>
                            Q. {e.q}
                        </div>
                        {
                            qnaNo === e.no && (
                                <div style={{ padding: "15px" }}>
                                    A. {e.a}
                                </div>
                            )
                        }
                    </div>
                ))
            }
        </div>
    )
}

export default Qna