import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import btnStyle from "../components/btn.module.css";
import style from "./login.module.css";
import twoStyle from "./twoFactor.module.css";
import ToastMsg from "../components/ToastMsg";

const TwoFactor: React.FC = () => {

    const navigate = useNavigate();

    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");

    const showToastMessage = (message: string) => {
        setToastMessage(message);
        setShowToast(true);

        setTimeout(() => {
            setShowToast(false);
        }, 3000);
    };

    // CAPTCHA 이미지
    const [images, setImages] = useState<string[]>([]);

    // 문제 문구
    const [captchaQuestion, setCaptchaQuestion] = useState<string>("");

    // 정답 위치
    const [answerIndex, setAnswerIndex] = useState<number[]>([]);

    // 선택 이미지 위치
    const [selected, setSelected] = useState<number[]>([]);

    const imageList = ["🐳", "🐬", "🦈"];

    // CAPTCHA 생성
    const createCaptcha = () => {

        const targetImage =
            imageList[Math.floor(Math.random() * imageList.length)];

        const targetCount = Math.floor(Math.random() * 7);

        const randomImages: string[] = [];
        const targetIndex: number[] = [];

        // 정답 이미지 추가
        for (let i = 0; i < targetCount; i++) {
            randomImages.push(targetImage);
        }

        // 오답 이미지 추가
        while (randomImages.length < 9) {
            const randomImage =
                imageList[Math.floor(Math.random() * imageList.length)];
            if (randomImage !== targetImage) {
                randomImages.push(randomImage);
            }
        }

        // 섞기
        randomImages.sort(() => Math.random() - 0.5);

        // 정답 위치 저장
        randomImages.forEach((image, index) => {
            if (image === targetImage) {
                targetIndex.push(index);
            }
        });


        let targetName = "";

        if (targetImage === "🐳") {
            targetName = "고래";
        }
        else if (targetImage === "🐬") {
            targetName = "돌고래";
        }
        else {
            targetName = "상어";
        }

        if (targetCount === 0) {
            setCaptchaQuestion(
                `${targetName} 이미지가 없습니다. 확인 버튼을 눌러주세요.`
            );
        }
        else {
            setCaptchaQuestion(
                `${targetName}가 있는 이미지를 모두 선택하세요.`
            );
        }
        setImages(randomImages);
        setAnswerIndex(targetIndex);
        setSelected([]);
    };

    // 이미지 선택
    const selectImage = (index: number) => {

        if (selected.includes(index)) {
            setSelected(
                selected.filter(item => item !== index)
            );
        }
        else {
            setSelected([
                ...selected,
                index
            ]);
        }
    };

    // 인증 확인
    const checkCaptcha = () => {
        const answer =
            selected.length === answerIndex.length &&
            selected.every(index =>
                answerIndex.includes(index)
            );

        if (answer) {
            showToastMessage("2차 인증 완료");

            sessionStorage.setItem(
                "twoFactor",
                "success"
            );

            window.dispatchEvent(
                new Event("loginChange")
            );

            setTimeout(() => {
                navigate("/");
            }, 1000);

        }
        else {
            showToastMessage("인증 실패");
            createCaptcha();
        }
    };

    // 최초 실행
    useEffect(() => {createCaptcha();}, []);
    return (
        <div className={style.login}>
            <h2 className={style.h2}>
                2차 인증
            </h2>

            <h3>
                {captchaQuestion}
            </h3>

            <div className={twoStyle.captchaGrid}>

                {
                    images.map((image, index) => (
                        <button key={index} type="button" onClick={() => selectImage(index)}
                            className={`${twoStyle.captchaButton} ${
                                selected.includes(index)
                                    ? twoStyle.selected
                                    : twoStyle.normal
                            }`}
                        >
                            {image}
                        </button>
                    ))
                }
            </div>

            <button type="button" className={`${btnStyle.submitBtn} ${twoStyle.confirmButton}`} onClick={checkCaptcha}>
                확인
            </button>

            {showToast && (
                <ToastMsg message={toastMessage}/>
            )}
        </div>
    );
};


export default TwoFactor;