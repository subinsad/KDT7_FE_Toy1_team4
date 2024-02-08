import React from "react";
import "./MainContent.scss";
import Board from "../components/Board/Board";
import BusinessCard from "../components/BusinessCard";
import TimeBlock from "../components/TimeBlock";
import PersonInfoList from "../components/PersonInfoList";
import BoardGallery from "../components/Board/BoardGallery";

const MainContent = () => {
  return (
    <div className="main">
      <div className="main-top">
        <Board type={"list"} headingTag={"h2"} headingText={"근태현황"} />
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
