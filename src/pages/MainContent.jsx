import React from "react";
import "./MainContent.scss";
import BusinessCard from "../components/BusinessCard";
import TimeBlock from "../components/TimeBlock";
import PersonInfoList from "../components/PersonInfoList";
import BoardGallery from "../components/Board/BoardGallery";
import Block from "../components/Common/Block";
import AttendanceBoardList from "../components/Board/AttendanceBoardList";
import Heading from "../components/Common/Heading";
import { Link } from "react-router-dom";

const MainContent = () => {
  return (
    <div className="main">
      <div className="main-top">
        <Block className="main__attend">
          <div className="align both vm">
            <Heading tag={"h2"} size={"small"} text={"근태현황"} />
            <Link to="/attendance" className="btn small success ">
              근태현황 바로가기
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8" />
              </svg>
            </Link>
          </div>
          <AttendanceBoardList filterShow={false} />
        </Block>
        <div>
          <BusinessCard />
          <div className="mt10">
            <PersonInfoList />
          </div>
        </div>
      </div>
      <div className="time-wrap">
        <TimeBlock time={"11:00:20"} title={"현재시각"} icon={"ico1"} />
        <TimeBlock time={"11:00:20"} title={"근무종료"} icon={"ico2"} />
        <TimeBlock time={"11:00:20"} title={"근무시각"} icon={"ico3"} />
        <TimeBlock time={"11:00:20"} title={"현재시각"} icon={"ico4"} />
      </div>

      <BoardGallery />
    </div>
  );
};

export default MainContent;
