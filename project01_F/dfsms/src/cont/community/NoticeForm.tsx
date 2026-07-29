import React, { useState } from 'react'
import style from '../community/community.module.css'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import btnStyle from '../components/btn.module.css'
import ToastMsg from '../components/ToastMsg';
import Confirm from "../components/Confirm";

interface formContext {
    boardid: number,
    title: string,
    usrnm: string,
    cont: string,
}

const NoticeForm: React.FC = () => {
    //const [title, setTitle] = useState("");
    //const [usrnm, setUsrnm] = useState("");
    //const [cont, setCont] = useState("");

    const [showConfirm, setShowConfirm] = useState(false);
    const [toast, setToast] = useState("");

    const confirmHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault(); 
        setShowConfirm(true);
    };

    let url = '';
    //수정창
    const { state } = useLocation();
    console.log('state: ',state)
    const notice = state?.notice;

    const [formData, setFormData] = useState<formContext>({
        boardid: notice?.boardid || "",
        title: notice?.title || "",
        usrnm: notice?.usrnm || "",
        cont: notice?.cont || ""
    });
    //const [isConfirm, setIsComfirm] = useState(false);
    const backendUrl = process.env.REACT_APP_BACK_END_URL;

    //form데이터를 change받아서 useState에 저장할 함수
    const formChage = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        //선택된 target 즉, HTMLElement에서 name, value를 각각 받아 온다.
        const { name, value } = e.target;
        //받아온 데이터를 useState의 formData 객체에 각각 저장한다.
        setFormData({ ...formData, [name]: value });
    }

    const nav = useNavigate();

    const boardSubmit = async () => {
        const data = new FormData();
        data.append('title', formData.title);
        data.append('usrnm', formData.usrnm);
        data.append('cont', formData.cont);
        data.append('boardtype', 'N'); //공지사항
        try {
            //setIsComfirm(true);
            // if (!title || !usrnm || !cont) {
            //     return;
            // }
            if(state){
                data.append('boardid', formData.boardid.toString());
                url = `${backendUrl}/api/community/update` //수정
                await axios.post(url, data)
                setToast('공지사항이 수정 되었습니다.')
                setTimeout(() => {
                    nav(`/community/notice/${notice.boardid}`); //상세
                }, 1000);
            }else{
                url = `${backendUrl}/api/community/add` //등록
                await axios.post(url, data)
                setToast('공지사항이 등록 되었습니다.')
                setTimeout(() => {
                    nav("/community/notice"); //리스트
                }, 1000);
            }
    
        } catch {
            alert("오류");
        }
        console.log(formData);
    }

    return (
        <div className={style.container}>
            <h2 style={{ textAlign: 'center' }}>글쓰기</h2>
            <br />
            <form onSubmit={boardSubmit}>
                <table className={style.boardTable}>
                    <tbody>
                        <tr>
                            <th>제목</th>
                            <td>
                                <input type="text" name="title" id="title" required
                                    style={{ width: '100%', padding: 8 }}
                                    //onChange={e => { setTitle(e.target.value) }}
                                    value={formData.title}
                                    onChange={formChage}
                                />
                                {/* {(isConfirm && !title) && <p style={{ color: 'red' }}>제목을 입력해주세요.</p>} */}
                            </td>
                        </tr>
                        <tr>
                            <th>작성자</th>
                            <td>
                                <input type="text" name="usrnm" id="usrnm" required
                                    style={{ width: '100%', padding: 8 }}
                                    // onChange={e => { setUsrnm(e.target.value) }}
                                    value={formData.usrnm}
                                    onChange={formChage}
                                />
                                {/* {(isConfirm && !usrnm) && <p style={{ color: 'red' }}>이름을 입력해주세요.</p>} */}

                            </td>
                        </tr>
                        <tr>
                            <th>내용</th>
                            <td>
                                <textarea rows={7} name="cont" id="cont" required
                                    style={{ width: '100%', padding: 8 }}
                                    //onChange={e => { setCont(e.target.value) }}
                                    value={formData.cont}
                                    onChange={formChage}
                                />
                                {/* {(isConfirm && !cont) && <p style={{ color: 'red' }}>내용을 입력해주세요.</p>} */}

                            </td>
                        </tr>
                        {/* <tr>
                            <th>파일 첨부</th>
                            <td>
                                <input type="file" className="form-control"/>
                            </td>
                        </tr> */}
                    </tbody>
                    <tfoot>
                        <tr>
                            <th colSpan={2}>
                                <button type="submit" className={btnStyle.button} onClick={confirmHandler}>
                                    {state ? "수정" : "등록"}
                                </button>
                                <Link
                                    to={`/community/notice`}
                                    className={btnStyle.button}
                                >
                                    취소
                                </Link>
                            </th>
                        </tr>
                    </tfoot>
                </table>
            </form>

            {showConfirm && (
                <Confirm
                    message={state ? "수정하시겠습니까?" : "등록하시겠습니까?"}
                    onConfirm={() => {
                        setShowConfirm(false)
                        boardSubmit()
                    }}
                    onCancel={() => setShowConfirm(false)}
                />
            )}

            {toast && <ToastMsg message={toast}/>}

        </div>
    )
}

export default NoticeForm