import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import btnStyle from '../components/btn.module.css'
import style from './mypage.module.css'

// 회원 정보 수정 인터페이스
interface useUsrInfo
{
    usrno: number;
    pwd?:string;
    addr?:string;
    email?:string;
    tel?:string;
}

const Usrinfo: React.FC = () => 
{
    const [formData, setFormData] = useState<useUsrInfo>
    ({
        pwd:    '', // 비밀번호는 보안상 빈값 처리
        addr:   '',
        email:  '',
        tel:    '',
        usrno:  0
    });
    const backendUrl = process.env.REACT_APP_BACK_END_URL;

    useEffect(() => 
    {
        const getUserInfo = async () => 
        {
            try 
            {
                const res = await axios.get<useUsrInfo>(`${backendUrl}/api/mypage/selinfo`, 
                {
                    withCredentials: true, // HttpSession 사용 시 필요(CORS 환경이라면)
                });
                setFormData(res.data);
            } 
            catch (err) 
            {
                console.error("유저 정보 조회 실패", err);
            }
        };
        getUserInfo();
    }, []);

    const nav = useNavigate();

    // form 데이터를 change받아서 useState에 저장할 함수
    const formChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => 
    {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const formSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => 
    {
        e.preventDefault();

        try 
        {
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

            alert('회원정보가 성공적으로 수정되었습니다.');
            nav('/mypage');
        } 
        catch (errro) 
        {
            console.error('회원정보 수정 실패', errro);
            alert('회원정보 수정 중 오류가 발생했습니다.');
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
                    </tbody>
                    <tfoot>
                        <tr>
                            <th colSpan={2}>
                                <button type="submit" className={btnStyle.button}>
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
        </div>
    )
}

export default Usrinfo