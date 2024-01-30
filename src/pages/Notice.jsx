import React from "react";
import Board from "../components/Board/Board";
import Profile from "../components/Common/Profile";
import BoardList from "../components/Board/BoardList";
import { useNavigate } from 'react-router-dom';

const Notice = () => {
    // 함수 컴포넌트 내에서 useNavigate 호출
    const navigate = useNavigate();

    const goToAddPost = () => {
        // navigate 함수를 사용하여 경로를 변경
        navigate('/AddPost');
    };

    return (
        <div className="notice__wrapper">
            <Board type={"list"} headingTag={"h2"} headingText={"기업 공지 모음"} />
            <div className="align vb">
                <button className="btn regular primary " onClick={goToAddPost}>글 등록</button>
            </div>

        </div>
    );
};

export default Notice;
