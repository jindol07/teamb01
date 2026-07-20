import React, { useEffect, useState } from 'react'
import style from './review.module.css'
import { FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom'
import BoardList from '../components/BoardList';
const ReviewList = () => {
    const [myReivew, setMyReivew] = useState([]);

    const col = [
        {name: "No", key: "no", width: 20}, 
        {name: "제목", key: "subject", width: 100}, 
        {name: "작성자", key: "wirter", width: 30}, 
        {name: "평점", key: "rating", width: 1000,
            render: function(e) { return (
                                    <td>{Array.from({ length: Number(e.rating) }, (_, idx) => 
                                            (
                                                <FaStar key={idx} color="gold" /> 
                                            ))}
                                    </td> 
                                  )
                                }
        }, 
        {name: "작성일", key: "regDate", width: 40}, 
    ];

    useEffect(() => {
        const fetchMyReview = async () => {
            const reivew = [
                { no: 1, subject: '너무 맛있어요!!', wirter: '진도리', rating: '5', regDate: '2026/05/26' }
                , { no: 2, subject: '완전 최악!', wirter: 'T없e맑은Or0l', rating: '1', regDate: '2026/05/26' }
                , { no: 3, subject: '애옹애오앵옹', wirter: '맛있으면 우는 고양이', rating: '4', regDate: '2026/05/26' }
                , { no: 4, subject: '음.. 쏘쏘합니다.', wirter: '카오스', rating: '2', regDate: '2026/05/26' }
                , { no: 5, subject: 'Um...', wirter: 'Jenny', rating: '3', regDate: '2026/05/26' }
            ]
            setMyReivew(reivew);
        }
        fetchMyReview();
    }, [])

    return (
        <div className={style.container}>
            <BoardList title="Review" data={myReivew} column={col} getClassName={function(e) {}} foot={<div></div>} />
        </div>
    )
}

export default ReviewList