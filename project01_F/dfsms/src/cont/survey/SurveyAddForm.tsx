import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Style from './survey.module.css';
import btnStyle from '../components/btn.module.css'

const backendUrl = process.env.REACT_APP_BACK_END_URL;

const SurveyAddForm: React.FC = () => {
    const [sub, setSub] = useState("");
    const [cont, setCont] = useState("");
    const [code, setCode] = useState("2");
    const [surveyTitles, setSurveyTitles] = useState<string[]>(Array(2).fill(""));
    const navigate = useNavigate();

    const surveyCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        const numValue = parseInt(newValue);
        if (numValue >= 2 && numValue <= 5) {
            setCode(newValue);
            setSurveyTitles(prev => {
                const newArray = Array(numValue).fill("");
                return newArray.map((item, index) => prev[index] || "");
            });
        }
    };

    const surveyTitleChange = (index: number, value: string) => {
        const newTitles = [...surveyTitles];
        newTitles[index] = value;
        setSurveyTitles(newTitles);
    };

    const surveySubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const surveyData = {
                sub,
                code: parseInt(code),
                contents: surveyTitles.map(title => ({
                    surveytitle: title,
                }))
            };
            const response = await axios.post(`${backendUrl}/api/survey/addsurvey`, surveyData);
            if (response.status === 200) {
                alert("설문이 등록 되었습니다.");
                navigate("/admin/surveyClient");
            }
        } catch (error) {
            console.error("Error : ", error);
            alert("설문 등록에 실패했습니다...");
        }
    };

    return (
        <div className={Style.container}>
            <form onSubmit={surveySubmit}>
                <table className={Style.surveyTable}>
                    <thead>
                        <tr>
                            <th colSpan={2} className={Style.formTitle}>설문조사 작성 폼</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>제목</th>
                            <td>
                                <input
                                    type="text"
                                    className={Style.inputField}
                                    value={sub}
                                    onChange={(e) => setSub(e.target.value)}
                                    required
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>내용</th>
                            <td>
                                <input
                                    type="text"
                                    className={Style.inputField}
                                    value={cont}
                                    onChange={(e) => setCont(e.target.value)}
                                    required
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>문항수 (2-5)</th>
                            <td>
                                <input
                                    type="number"
                                    className={Style.inputField}
                                    min="2"
                                    max="5"
                                    value={code}
                                    onChange={surveyCodeChange}
                                    required
                                />
                            </td>
                        </tr>
                        {surveyTitles.map((title, index) => (
                            <tr key={index}>
                                <th>설문문항{index + 1}</th>
                                <td>
                                    <input
                                        type="text"
                                        className={Style.inputField}
                                        value={title}
                                        onChange={(e) => surveyTitleChange(index, e.target.value)}
                                        required
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <th colSpan={2} className={Style.tableAction}>
                                <button type="submit" className={btnStyle.submitBtn}>등록</button>
                            </th>
                        </tr>
                    </tfoot>
                </table>
                <div style={{textAlign:'right'}}>
                    <button type="button" className={btnStyle.button} onClick={() => navigate("/admin/surveylist")}>
                        목록
                    </button>
                </div>
            </form>

        </div>
    );
};

export default SurveyAddForm;