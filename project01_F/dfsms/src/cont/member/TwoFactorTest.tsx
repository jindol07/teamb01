import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import btnStyle from "../components/btn.module.css";
import style from "./login.module.css";

const TwoFactorTest: React.FC = () => {

    const navigate = useNavigate();

    // CAPTCHA 표시 이미지
    const [images, setImages] = useState<string[]>([]);

    // 문제 문구
    const [captchaQuestion, setCaptchaQuestion] = useState<string>("");

    // 정답 위치
    const [answerIndex, setAnswerIndex] = useState<number[]>([]);

    // 선택한 이미지 위치
    const [selected, setSelected] = useState<number[]>([]);

    // 이미지 목록
    const imageList = ["🐳", "🐬", "🦈"];

    // CAPTCHA 생성
    const createCaptcha = () => {

        const targetImage =
            imageList[Math.floor(Math.random() * imageList.length)];

        // 정답 이미지 개수
        const targetCount =
            Math.floor(Math.random() * 6);

        const randomImages: string[] = [];
        const targetIndex: number[] = [];

        // 정답 이미지 추가
        for (let i = 0; i < targetCount; i++) {
            randomImages.push(targetImage);
        }

        // 오답 이미지 추가
        while (randomImages.length < 9) {
            const randomImage = imageList[
                    Math.floor(Math.random() * imageList.length)
                ];
            if (randomImage !== targetImage) {

                randomImages.push(randomImage);

            }

        }



        // 이미지 섞기
        randomImages.sort(
            () => Math.random() - 0.5
        );



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
                `${targetName}가 없습니다. 선택하지 말고 확인 버튼을 눌러주세요.`
            );

        }
        else {

            setCaptchaQuestion(
                `다음 이미지 중 ${targetName}가 있는 이미지를 모두 선택하세요.`
            );

        }



        setImages(randomImages);

        setAnswerIndex(targetIndex);

        setSelected([]);

    };





    // 이미지 선택
    const selectImage = (index:number) => {


        if (selected.includes(index)) {


            setSelected(
                selected.filter(
                    item => item !== index
                )
            );


        }
        else {


            setSelected([
                ...selected,
                index
            ]);


        }

    };






    // CAPTCHA 확인
    const checkCaptcha = () => {


        const answer =
            selected.length === answerIndex.length
            &&
            selected.every(
                index => answerIndex.includes(index)
            );



        if(answer) {


            alert("2차 인증 완료");



            sessionStorage.setItem(
                "twoFactor",
                "success"
            );



            const loginInfo =
                sessionStorage.getItem("loginInfo");



            if(loginInfo) {

                const userInfo =
                    JSON.parse(loginInfo);


                userInfo.twoFactor = true;


                sessionStorage.setItem(
                    "loginInfo",
                    JSON.stringify(userInfo)
                );

            }



            navigate("/");


        }
        else {


            alert("인증 실패");

            createCaptcha();


        }


    };





    // 페이지 진입 시 실행
    useEffect(() => {


        alert("2차 인증을 진행해주세요.");

        createCaptcha();


    }, []);






    return (

        <div className={style.login}>


            <h2 className={style.h2}>
                2차 인증
            </h2>



            <h3>
                {captchaQuestion}
            </h3>





            <div

                style={{
                    display:"grid",
                    gridTemplateColumns:"repeat(3,1fr)",
                    gap:"10px",
                    marginTop:"20px"
                }}

            >


                {
                    images.map(
                        (image,index)=>(


                            <button

                                key={index}

                                type="button"

                                onClick={() =>
                                    selectImage(index)
                                }


                                style={{

                                    fontSize:"40px",

                                    padding:"20px",

                                    border:
                                        selected.includes(index)
                                            ?
                                            "4px solid blue"
                                            :
                                            "1px solid gray",


                                    backgroundColor:
                                        selected.includes(index)
                                            ?
                                            "#dbeafe"
                                            :
                                            "white",


                                    cursor:"pointer"

                                }}

                            >

                                {image}


                            </button>


                        )
                    )
                }


            </div>





            <button

                type="button"

                className={btnStyle.submitBtn}

                onClick={checkCaptcha}


                style={{

                    marginTop:"20px"

                }}

            >

                확인


            </button>




        </div>

    );

};


export default TwoFactorTest;