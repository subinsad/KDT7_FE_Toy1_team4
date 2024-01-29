import React from "react";
import Block from "./Common/Block";
import Heading from "./Common/Heading";
import "./TimeBlock.scss";

const TimeBlock = ({ title, time }) => {
  return (
    <Block className="time-block">
      <Heading tag={"h3"} text={title} />
      <p className="time-block__time">{time}</p>
      <span className="time-block__icon"></span>
    </Block>
  );
};

export default TimeBlock;
