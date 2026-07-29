import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import btnStyle from '../components/btn.module.css'
import style from './mypage.module.css'
import ToastMsg from '../components/ToastMsg';
import Confirm from "../components/Confirm";

// 회원 정보 수정 인터페이스
interface useUsrInfo {
    usrno: number;
    pwd?: string;
    addr?: string;
    email?: string;
    tel?: string;
    subsrbat?: string;
}

const Usrinfo: React.FC = () => {
    const [formData, setFormData] = useState<useUsrInfo>
        ({
            pwd: '', // 비밀번호는 보안상 빈값 처리
            addr: '',
            email: '',
            tel: '',
            usrno: 0
        });
    const backendUrl = process.env.REACT_APP_BACK_END_URL;

    const [showConfirmU, setShowConfirmU] = useState(false);
    const [showConfirmS, setShowConfirmS] = useState(false);
    const [toast, setToast] = useState<string | null>("");
    const [subsrbat, setSubsrbat] = useState<string | null>();

    const confirmHandlerU = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setShowConfirmU(true);
    };

    const confirmHandlerS = () => {
        console.log('구독버튼이벤트')
        setShowConfirmS(true);
    };

    useEffect(() => {
        const getUserInfo = async () => {
            try {
                const res = await axios.get<useUsrInfo>(`${backendUrl}/api/mypage/selinfo`,
                    {
                        withCredentials: true, // HttpSession 사용 시 필요(CORS 환경이라면)
                    });
                setFormData(res.data);
                setSubsrbat(res.data.subsrbat ?? null);
            }
            catch (err) {
                console.error("유저 정보 조회 실패", err);
            }
        };
        getUserInfo();
        //토스트메시지 호출되면 DOM에서 제거
        const timer = setTimeout(() => {
            setToast(null);
        }, 2000);
        return () => clearTimeout(timer);

    }, [subsrbat]);

    const nav = useNavigate();

    // form 데이터를 change받아서 useState에 저장할 함수
    const formChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const formSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        setShowConfirmU(true)
    }

    const updateUsr = async () => {
        try {
            // PWD가 null/undefined일 경우 빈 문자열("")로 안전하게 변환
            const payload = {
                usrno: formData.usrno,
                pwd: formData.pwd ?? '',
                addr: formData.addr ?? '',
                email: formData.email ?? '',
                tel: formData.tel ?? ''
            };

            // 회원정보 수정 API 요청 
            await axios.post(`${backendUrl}/api/mypage/usrinfo`, payload,
                {
                    withCredentials: true,
                });

            setToast('수정이 완료되었습니다.')
            //alert('회원정보가 성공적으로 수정되었습니다.');
            //nav('/mypage');
        }
        catch (errro) {
            console.error('회원정보 수정 실패', errro);
            alert('회원정보 수정 중 오류가 발생했습니다.');
        }
    }

    const goSubscrible = async (wantSrb: string) => {
        try {
            const res = await axios.get(`${backendUrl}/api/mypage/subscribe`,
                {
                    params: {
                        subsrbat: (wantSrb === 'Y') ? 'N' : 'Y'
                    }
                    , withCredentials: true, // HttpSession 사용 시 필요(CORS 환경이라면)
                });
            if (res.data.code !== 'FAIL') {
                setSubsrbat(res.data.subsrbat);
                console.log('구독여부: ', res.data.message)
                setToast(subsrbat === 'Y' ? "구독이 취소되었습니다." : "구독 되었습니다.")
            }
        }
        catch (err) {
            console.error("구독 프로세스 실패", err);
        }
    }

    return (
        <div className={style.container}>
            <h2 style={{ textAlign: 'center' }}>회원정보 수정</h2>
            <br />
            <form onSubmit={formSubmit}>
                <input type="hidden" name="usrno" value={formData.usrno} />
                <table className={style.boardTable}>
                    <tbody>
                        <tr>
                            <th>비밀번호</th>
                            <td>
                                <input
                                    type="password"
                                    name="pwd"
                                    id="pwd"
                                    placeholder="변경할 비밀번호 입력 (미입력 시 기존 유지)"
                                    style={{ width: '100%', padding: 8 }}
                                    value={formData.pwd}
                                    onChange={formChange}
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>주소</th>
                            <td>
                                <input
                                    type="text"
                                    name="addr"
                                    id="addr"
                                    required
                                    style={{ width: '100%', padding: 8 }}
                                    value={formData.addr}
                                    onChange={formChange}
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>이메일</th>
                            <td>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    required
                                    style={{ width: '100%', padding: 8 }}
                                    value={formData.email}
                                    onChange={formChange}
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>전화번호</th>
                            <td>
                                <input
                                    type="tel"
                                    name="tel"
                                    id="tel"
                                    required
                                    style={{ width: '100%', padding: 8 }}
                                    value={formData.tel}
                                    onChange={formChange}
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>구독여부</th>
                            <td>
                                {
                                    subsrbat === 'Y'
                                        ? <>
                                            <span>구독중</span>&nbsp;
                                            <button type="button" className={btnStyle.button} onClick={confirmHandlerS}>구독취소</button>
                                        </>
                                        : <button type="button" className={btnStyle.button} onClick={confirmHandlerS}>구독하기</button>
                                }
                            </td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <th colSpan={2}>
                                <button type="submit" className={btnStyle.button} onClick={confirmHandlerU}>
                                    수정
                                </button>
                                <Link
                                    to="/mypage"
                                    className={btnStyle.button}
                                >
                                    취소
                                </Link>
                            </th>
                        </tr>
                    </tfoot>
                </table>
            </form>

            {showConfirmU && (
                <Confirm
                    message="수정 하시겠습니까?"
                    onConfirm={() => {
                        setShowConfirmU(false)
                        updateUsr()
                    }}
                    onCancel={() => setShowConfirmU(false)}
                />
            )}

            {showConfirmS && (
                <Confirm
                    message={subsrbat === 'Y' ? "구독취소 하시겠습니까?" : "구독 하시겠습니까?"}
                    onConfirm={() => {
                        setShowConfirmS(false)
                        if (subsrbat != null) {
                            console.log('구독컨펌창1: ', subsrbat)
                            goSubscrible(subsrbat)
                        }
                    }}
                    onCancel={() => setShowConfirmS(false)}
                />
            )}

            {toast && <ToastMsg message={toast} />}

        </div>
    )
}

export default Usrinfo