import React from "react";
import { useNavigate } from 'react-router-dom';
import PostBoard from "../components/PostComponents/PostBoard";
import BoardGallery from "../components/PostComponents/BoardGallery";

import Block from "../components/Common/Block";



const Notice = () => {
    const navigate = useNavigate();

    const goToAddPost = () => {
        // navigate 함수를 사용하여 경로를 변경
        navigate('/notice/AddPost');
    };

    return (
        <div className="notice__wrapper">
            <Block className={"board-wrap"}>
                <div className="align both">
                    <h2 className="heading small">기업 공지 모음</h2>
                    <button className="btn regular primary " onClick={goToAddPost}>글 등록</button>
                </div>
                <BoardGallery pagination={true} />
            </Block>
        </div>




    );
};

export default Notice;
