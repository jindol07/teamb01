import React from "react";
import style from "./confirm.module.css";

interface ConfirmProps {
    message : string;
    onConfirm: () => void;
    onCancel: () => void;
}

const Confirm: React.FC<ConfirmProps> = ({
    message,
    onConfirm,
    onCancel
}) => {
    return (
        <div className={style.overlay}>
            <div className={style.confirmBox}>
                <p>{message}</p>

                <div className={style.buttonBox}>
                    <button onClick={onConfirm}>확인</button>
                    <button onClick={onCancel}>취소</button>
                </div>
            </div>
        </div>
    )
}

export default Confirm;