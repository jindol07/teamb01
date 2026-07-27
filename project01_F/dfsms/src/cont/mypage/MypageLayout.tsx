import React from "react";
import { Outlet } from "react-router-dom";
import SideMenu from "./SideMenu";

const MypageLayout = () => {
    return (
        <div className="d-flex">

            <SideMenu />

            <div className="flex-grow-1 p-4">
                <Outlet />
            </div>

        </div>
    );
};

export default MypageLayout;