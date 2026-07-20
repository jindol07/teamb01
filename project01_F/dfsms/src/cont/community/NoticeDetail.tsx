import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import btnStyle from '../components/btn.module.css'
import style from './noticedetail.module.css'
import axios from 'axios';

interface useNoticeCol {
    boardid: number;
    title: string;
    usrnm: string;
    hit: number;
    rdate: string;
    rank: number;
    cont: string;
}

const NoticeDetail: React.FC = () => {
    const { num } = useParams<{ num: string }>();
    // const [title, setTitle] = useState("");
    // const [content, setContent] = useState("");
    const [notice, setNotice] = useState<useNoticeCol | null>(null);
    const backendUrl = process.env.REACT_APP_BACK_END_URL;

    const nav = useNavigate();

    const chgPage = () => {
        nav("/community/notice/write", {
            state: {
                notice
            }
        });
    };

    const delPage = async () => {
        const url = `${backendUrl}/community/delete?num=${num}`
        const res = await axios.get(url)
        alert('삭제 완료')
        nav("/community/notice"); //리스트
    };

    useEffect(() => {
        const fetchMyNoticeDetail = async () => {
            // const notice = { no: 1, title: "필독 - 무조건 읽어주세요.", writer: "운영자", hit: 0, 
            //     regdate: '2015-03-30', rank: 1, content: '공지에 들어갈 내용' };
            // setNotice(notice);
            const url = `${backendUrl}/community/detail?num=${num}`
            const res = await axios.get(url)
            console.log(res.data)
            setNotice(res.data);
        }
        fetchMyNoticeDetail()
    }, [num]);

    if (notice == null) {
        return <div>Loading . . .</div>;
    }

    const { boardid, title, cont, usrnm, hit, rdate, rank } = notice;

    return (
        <div className={style.container}>
            <h2 style={{ textAlign: 'center' }}>공지사항</h2>
            <br />
            <table className={style.boardTable}>
                <tbody>
                    <tr>
                        <th>번호</th>
                        <td>{boardid}</td>
                    </tr>
                    <tr>
                        <th>제목</th>
                        <td>{title}</td>
                    </tr>
                    <tr>
                        <th>작성자</th>
                        <td>{usrnm}</td>
                    </tr>
                    {/* <tr>
                        <th>이미지</th>
                        <td>{ upboard?.imgn && <img src={imageBasePath + upboard?.imgn} className='img-fluid mt-2' /> }</td>
                    </tr> */}
                    <tr>
                        <th>내용</th>
                        <td>{cont}</td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan={5}>
                            <button className={btnStyle.button} onClick={() => { nav('/community/notice'/*, { state: { page: loc.state.currentPage } }*/) }}>목록</button>
                            <button className={btnStyle.button} onClick={() => chgPage()}>수정</button>
                            <button className={btnStyle.button} onClick={() => delPage()}>삭제</button>
                        </td>
                    </tr>
                </tfoot>
            </table>
            {/* <UpBoardComm num={num} /> */}
        </div>
    )
}

export default NoticeDetail