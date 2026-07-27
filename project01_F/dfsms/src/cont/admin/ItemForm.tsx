import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import style from './admin.module.css'
import btnStyle from '../components/btn.module.css'

interface PrductsVO {
    productid: number;
    categoryid: number;
    pnm: string;
    price: number;
    qty: number;
    title: string;
    cont: string;
    rdate?: string;
    //@RequestParam("images") MultipartFile[] images
    //File Interface는 JS에서 파일을 접근할 수 있는 JS 객체.
    images: File[];
    writer?: string;
}

const ItemForm: React.FC = () => {

    //http://192.168.0.7/dfsms
    const backendUrl = process.env.REACT_APP_BACK_END_URL;

    //const { no } = useParams<{ no: string }>();
    //const [itemNm, setItemNm] = useState('');
    //const [qty, setQty] = useState(0);
    //const [itemContent, setItemContent] = useState('');
    const [adminitem, setAdminitem] = useState<PrductsVO>({
        productid: 0
        , categoryid: 0
        , pnm: ''
        , price: 0
        , qty: 0
        , title: ''
        , cont: ''
        , images: [] //이미지 n개
    })

    //미리보기 넘어오는 파일의 이름이 한개가 아니기 때문에 배열로 처리
    const [preview, setPreview] = useState<string[]>([])

    const navi = useNavigate();

    //post, 이미지 : 배열로 전송
    const myFormSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault();
        const myFormdata = new FormData()
        //state에 저장한 값을 FormData객체에 하나씩 저장
        //append 이용
        //여기까지가 서버측 컨트롤러에 전송하는 ProductsVO의 property와 같아야 한다.
        myFormdata.append('categoryid', adminitem.categoryid.toString());
        myFormdata.append('pnm', adminitem.pnm);
        myFormdata.append('price', adminitem.price.toString());
        myFormdata.append('qty', adminitem.qty.toString());
        myFormdata.append('title', adminitem.title);
        myFormdata.append('cont', adminitem.cont);
        //이미지 배열 => @RequestParam("images") MultipartFile[] images
        //업로드할 이미지 file
        adminitem.images.forEach((file, idx) => {
            myFormdata.append('images', file)
        })

        try {
            console.log(`FormData => ${myFormdata}`)
            //axios나 fetch를 사용해 서버로 데이터를 전송
            const res = await fetch(`${backendUrl}/products/add`
                , { method: 'POST', body: myFormdata }
            )
            navi("/admin/itemlist")
        } catch (error) {
            console.error("전송 오류:", error);
        }

    }

    /*
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, files } = e.target;
        console.log(`AllNames : ${name} : ${value}`);

        if (name === 'images' && files) {

            const fileArray = Array.from(files);
            //--------------------------------------------------------------------
            //배열에서 이미지 하나당 이미지의 주소를 반환 해주는 배열값
            const filePreviews = fileArray.map(file => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                //파일의 바이너리를 읽어서 반환 
                return new Promise<string>((resolve) => {
                    reader.onloadend = () => {
                        resolve(reader.result as string); //이미지 바이너리 값을 문자열로 전송 
                    };
                });
            });
            //useState에 저장 - 하나라도 만약에 실패하면 전체가 실패한것처럼 취급
            Promise.all(filePreviews).then(pUrls => {
                setPreview(pUrls);
            });
            setAdminitem({ ...adminitem, images: fileArray });
        } else {
            setAdminitem({ ...adminitem, [name]: value });
        }
    }
    */

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;

        if (e.target instanceof HTMLInputElement && name === "images") {
            const files = e.target.files;

            if (files) {
                const fileArray = Array.from(files);

                const filePreviews = fileArray.map(file => {
                    const reader = new FileReader();
                    reader.readAsDataURL(file);

                    return new Promise<string>((resolve) => {
                        reader.onloadend = () => resolve(reader.result as string);
                    });
                });

                //Promise.all(filePreviews).then(setPreview);
                Promise.all(filePreviews).then(urls => {
                    setPreview(prev => [...prev, ...urls]);
                });

                //setAdminitem({ ...adminitem, images: fileArray });
                setAdminitem(prev => ({
                    ...prev,
                    images: [...prev.images, ...fileArray]
                }));
            }
        } else {
            setAdminitem({ ...adminitem, [name]: value });
        }
    };

    return (
        <div className={style.container}>
            <h2>상품 등록</h2>
            <hr />
            <form action="" onSubmit={myFormSubmit}>
                <table className={style.boardTable}>
                    <tbody>
                        <tr>
                            <th className={style.diagonal}></th>
                            <th>Input</th>
                        </tr>
                        <tr>
                            <th>종류</th>
                            <td>
                                <select
                                    id="categoryid"
                                    name="categoryid"
                                    className={style.input}
                                    onChange={handleChange}
                                >
                                    <option value="">선택</option>
                                    <option value="1">과일</option>
                                    <option value="2">야채</option>
                                    <option value="3">육류</option>
                                    <option value="4">어류</option>
                                    <option value="5">밀키트</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <th>상품명</th>
                            <td>
                                <input
                                    type="text" id='pnm' name='pnm' className={style.input}
                                    //value={itemNm}
                                    //onChange={(e) => setItemNm(e.target.value)}
                                    onChange={handleChange}
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>제목</th>
                            <td>
                                <input
                                    type="text" id='title' name='title' className={style.input}
                                    onChange={handleChange}
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>가격</th>
                            <td>
                                <input
                                    type="number" min={0} step={500} className={style.input}
                                    id='price' name='price'
                                    onChange={handleChange}
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>수량</th>
                            <td>
                                <input
                                    type="number" min={0} step={10} className={style.input}
                                    id='qty' name='qty'
                                    //value={qty}
                                    //onChange={(e) => setQty(Number(e.target.value))}
                                    onChange={handleChange}
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>특이사항</th>
                            <td>
                                {/* <textarea
                                    value={itemContent}
                                    onChange={(e) => setItemContent(e.target.value)}
                                /> */}
                                <input type='text' id='cont' name='cont' className={style.input}
                                    onChange={handleChange}
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>상품이미지</th>
                            <td>
                                <input className={style.input} type="file" placeholder="이미지 URL 입력"
                                    onChange={handleChange} required name='images' multiple
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>이미지 미리보기</th>
                            <td>
                                {
                                    preview.length > 0 && (
                                        <div className="mb-3">
                                            {
                                                preview.map((p, index) => (
                                                    <p key={index}>
                                                        <img src={p} alt='' className='img-thumbnail'
                                                            style={{ marginRight: '10px', marginBottom: '10px', width: '150px', height: '150px' }}
                                                        />
                                                        {/* <span>{p}</span> */}
                                                    </p>
                                                ))
                                            }
                                        </div>
                                    )
                                }
                            </td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <th colSpan={2}>
                                <button type="submit" className={btnStyle.button}>등록</button>
                            </th>
                        </tr>
                    </tfoot>
                </table>
            </form>
        </div>
    )
}

export default ItemForm