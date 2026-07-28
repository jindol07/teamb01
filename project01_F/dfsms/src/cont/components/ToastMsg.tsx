import React from "react";
import style from "./toastMsg.module.css";

interface ToastMsgProps {
    message: string;
}

const ToastMsg: React.FC<ToastMsgProps> = ({message}) => {
    return (
        <div className={style.toast}>
            {message}
        </div>
    );
};

export default ToastMsg;