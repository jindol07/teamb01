import React, { useEffect, useState } from 'react'
import style from './admin.module.css'
import { Link } from 'react-router-dom';
import btnStyle from '../components/btn.module.css'
import axios from 'axios';

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

const ItemList: React.FC = () => {
    const [adminItem, setAdminItem] = useState<Product[]>([]);

    const searchFunction = () => {
        //fetchUpboardList(1);
    }

    const insertHandle = () => {

    }
    //0727
    //http://192.168.0.39/dfsms
    const backendUrl = process.env.REACT_APP_BACK_END_URL;
    //페이징 useState
      const [totalItems, setTotalItems] = useState(0); //count
      const [totalPages, setTotalPages] = useState(0); //전체페이지 수
      const [currentPage, setCurrentPage] = useState(1); //cPate(현재페이지)의 기본 1값을 초기화
      const [startPage, setStartPage] = useState(1);
      const [endPage, setEndPage] = useState(1);
      //<검색>을 위한 useState
      const [searchType, setSearchType] = useState('1');
      const [searchValue, setSearchValue] = useState('');

    const fetchAItem = async (page: number) => {
        try {
          const url = `${backendUrl}/api/products/list`
          const res = await axios.get(url, {
            params: {
              cPage: page,
              searchType: searchType,
              searchValue: searchValue,
            }
          });
          console.log(res.data.data);
          //서버로부터 응답받은 데이터 useState에 바인딩
          setAdminItem(res.data.data)
          setTotalItems(res.data.totalItems)
          setTotalPages(res.data.totalPages)
          setCurrentPage(res.data.currentPage)
          setStartPage(res.data.startPage)
          setEndPage(res.data.endPage)
    
        } catch (error) {
          console.error("데이터 가져오기 실패:" + error);
        }

      }

    // 서버에서(ex : axios) 데이터를 가져왔다고 가정, useEffect 사용
    useEffect(() => {
        fetchAItem(currentPage)
    }, [])

    const handleUpdate = (no: number) => {
        console.log("수정할 재고 번호 :", no);
        //to detail
    };
    return (
        <div className={style.container}>
            <h2>재고 현황</h2>
            <hr />
            <div style={{ marginBottom: '15px' }}>
                <select onChange={(e) => { setSearchType(e.target.value) }} style={{ marginRight: '15px' }}>
                    <option value="1">전체</option>
                    <option value="2">상품</option>
                    <option value="3">특이사항</option>
                </select>
                <input type="text" onChange={(e) => { setSearchValue(e.target.value) }} style={{ width: '70%' }} />
                <button className={btnStyle.button} onClick={searchFunction}>조회</button>
            </div>
            <table className={style.boardTable}>
                <thead>
                    <tr>
                        <th>상품</th>
                        <th>특이사항</th>
                        <th>등록일자</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        adminItem.map((e: any, idx: any) => (
                            <tr key={idx}>
                                <td>{e.PNM}</td>
                                <td>{e.CONT}</td>
                                <td>{e.writer}</td>
                                <td>
                                    <Link
                                        to={`/admin/itemdetail/${e.no}`}
                                        className={btnStyle.button}
                                    >
                                        삭제
                                    </Link>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <div style={{
                marginTop: '15px',
                display: 'flex',
                justifyContent: 'flex-end',
            }}>
                <Link
                    to={`/admin/itemForm`}
                    className={btnStyle.button}
                >
                    상품 등록
                </Link>
            </div>
        </div>
    )
}

export default ItemList