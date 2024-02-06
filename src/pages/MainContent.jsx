import React from "react";
import "./MainContent.scss";
import Board from "../components/Board/Board";
import BusinessCard from "../components/BusinessCard2";
import Block from "../components/Common/Block";
import Heading from "../components/Common/Heading";
import Button from "../components/Common/Button";

const MainContent = () => {
  return (
    <div className="main">
      <div className="main-top">
        <div>
          <Board headingTag={"h2"} headingText={"공지사항갤러리"} type={"card"} />
        </div>
        <div>
          <BusinessCard />
        </div>
      </div>
      <Block>
        <div className="align both">
          <Heading tag={"h3"} size={"small"} text={"제목입니다."} />
          <Button text="더보기" className={"btn regular primary"} />
        </div>
      </Block>
    </div>
  );
};

export default MainContent;
