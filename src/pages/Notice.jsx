import React from "react";
import Board from "../components/Board/Board";
import Profile from "../components/Common/Profile";
import BoardList from "../components/PostComponents/PostBoard";
import { useNavigate } from 'react-router-dom';
import PostList from '../components/PostComponents/PostList';
import PostBoard from "../components/PostComponents/PostBoard";
import { Provider } from "react-redux";

const Notice = () => {


    return (

        <div className="notice__wrapper">
            <PostBoard type={"list"} headingTag={"h2"} headingText={"기업 공지 모음"} />
        </div>


    );
};

export default Notice;
