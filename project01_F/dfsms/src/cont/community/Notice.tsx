import React, { useEffect, useState } from 'react'
import style from './community.module.css'
import BoardList from '../components/BoardList';
import { Link, useNavigate } from 'react-router-dom';
import btnStyle from '../components/btn.module.css'
import axios from 'axios';

const Notice: React.FC = () => {


  const [onData, setOnData] = useState(false);
  const nav = useNavigate();
  //interface 역할??
  const col = [
    { name: "No", key: "boardid", width: 10 },
    {
      name: "제목", key: "title", width: 45,
      render: function (e: any) { return <Link style={{ textDecoration: 'none', color: "#000000" }} to={`/community/notice/${e.boardid}`}>{e.title}</Link> }
    },
    { name: "작성자", key: "usrnm", width: 15 },
    { name: "조회수", key: "hit", width: 10 },
    { name: "작성일", key: "rdate", width: 20 },
  ];

  //http://192.168.0.39/dfsms/community/list?cPage=1&searchType=1&searchValue=무조건
  // ㄴ 서버에서 받아온 JSON 데이터를 JSOjbect 배열로 저장할 useState
  const [myNotice, setMyNotice] = useState<any>([]);
  //페이징 useState
  const [totalItems, setTotalItems] = useState(0); //count
  const [totalPages, setTotalPages] = useState(0); //전체페이지 수
  const [currentPage, setCurrentPage] = useState(1); //cPate(현재페이지)의 기본 1값을 초기화
  const [startPage, setStartPage] = useState(1);
  const [endPage, setEndPage] = useState(1);
  //<검색>을 위한 useState
  const [searchType, setSearchType] = useState('1');
  const [searchValue, setSearchValue] = useState('');
  //http://192.168.0.39/dfsms
  const backendUrl = process.env.REACT_APP_BACK_END_URL;

  //서버측에 데이터 요청시(by axios : 비동기) 조건(params)도 같이 넘김
  const fetchMyNotice = async (page: number) => {
    try {
      const url = `${backendUrl}/community/list`
      const res = await axios.get(url, {
        params: {
          cPage: page,
          searchType: searchType,
          searchValue: searchValue,
          boardtype: 'N'
        }
      });
      console.log(res.data.data); //communityService.listCommunity(map)
      //서버로부터 응답받은 데이터 useState에 바인딩
      setMyNotice(res.data.data)
      setTotalItems(res.data.totalItems)
      setTotalPages(res.data.totalPages)
      setCurrentPage(res.data.currentPage)
      setStartPage(res.data.startPage)
      setEndPage(res.data.endPage)

    } catch (error) {
      console.error("데이터 가져오기 실패:" + error);
    }
    // const notice = await [
    //   { no: 1, title: "필독 - 무조건 읽어주세요.", writer: "운영자", hit: 0, regdate: '2015-03-30', rank: 1 }
    //   , { no: 2, title: "사이트 이용시 유의사항", writer: "운영자", hit: 32353, regdate: '2020-01-01', rank: 2 }
    //   , { no: 3, title: "6월 한달 이벤트", writer: "운영자", hit: 3500, regdate: '2023-06-01', rank: 3 }
    //   , { no: 4, title: "대량 구매시 할인 불가", writer: "운영자", hit: 3000, regdate: '2015-03-30', rank: 4 }
    //   , { no: 5, title: "유선전화 서비스 이용불가 안내", writer: "운영자", hit: 1000, regdate: '2015-02-29', rank: 5 }
    // ]
  }

  //useEffect를 사용해 페이지가 변경될 때마다 서버로 데이터 요청
  useEffect(() => {
    setOnData(true) //이건 뭐지??
    fetchMyNotice(currentPage)
  }, [currentPage])

  //page Handler
  const pageChange = (page: number) => {
    setCurrentPage(page);
  }
  //검색 버튼 클릭시에 1페이지 부터 검색!
  const searchFunction = () => {
    fetchMyNotice(1);
  }

  return (
    <>
      < BoardList title="공지사항" data={myNotice} column={col} getClassName={function (e: any) {
        return (e.rank === 1 ? style.rank1 : e.rank === 2 ? style.rank2 : "");
      }} foot={
        <>
          {/* 
          <tr>
            <td colSpan={5}>
              <button className={btnStyle.button} style={{ float: 'right' }} onClick={() => nav('/community/notice/write')}>글쓰기</button>
            </td>
          </tr>
          */}
          <tr>
            <th colSpan={5} className='text-center align-middle'>
              <select onChange={(e) => { setSearchType(e.target.value) }}>
                <option value="1">제목</option>
                <option value="2">작성자</option>
                <option value="3">내용</option>
              </select>
              <input type="text" onChange={(e) => { setSearchValue(e.target.value) }} />
              <button className='btn btn-warning' onClick={searchFunction}>검색</button>
              <button className={btnStyle.button} style={{ float: 'right' }} onClick={() => nav('/community/notice/write')}>글쓰기</button>
            </th>
          </tr>
          <tr>
            <td colSpan={5} style={{ textAlign: "center" }}>

              <nav>
                <ul className="pagination justify-content-center">
                  {startPage > 1 && (
                    <li className="page-item">
                      <button className="page-link"
                        onClick={() => { pageChange(startPage - 1) }}>
                        이전</button>
                    </li>
                  )}
                  {/* 페이지 출력하기 */}

                  {
                    // startPage = 1 , endPage=3 => [1,2,3]이란 배열을 만들어 준다.
                    Array.from({ length: endPage - startPage + 1 }, (_, i) => i + startPage)
                      .map((page) => (
                        <li key={page} className={`page-item ${page === currentPage ? 'active' : ''}`}>
                          <button className="page-link" onClick={() => { pageChange(page) }}>{page}</button>
                        </li>
                      ))
                  }


                  {/*
                                NextPage 출력하기 : totalPage 보다 endPage 적을 때 다음페이지가
                                있는 것으로 계산        
                                */}
                  {endPage < totalPages && (
                    <li className="page-item">
                      <button className="page-link" onClick={() => { pageChange(endPage + 1) }}>
                        다음</button>
                    </li>
                  )}
                </ul>
              </nav>
            </td>
          </tr>
        </>
      } />
    </>
  )
}

export default Notice