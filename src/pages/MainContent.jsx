import React from "react";
import "./MainContent.scss";
import Board from "../components/Board/Board";
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
            <Link to="/attendance" className="btn regular success ">
              근태현황 바로가기
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
