import React from "react";
import Profile from "./Profile";
import pic1 from "../assets/profile2.jpg";
import Heading from "./Heading";
import Block from "./Block";
import "./BusinessCard.scss";
import Text from "./Text";
import MyStatus from "./MyStatus";
import Button from "./Button";

const BusinessCard = () => {
  return (
    <div className="business-card">
      <Block>
        <Profile filename={pic1} />
        <Heading tag={"h2"} size={"small"} text={"Your Name"} />
        <Text type={"type1"} text={"@yourShortID"} />
        <MyStatus />
        <Button className={"btn primary regular"} text="근무시작" />
        <Button className={"btn success regular"} text="근무중" />
        <Button className={"btn danger regular"} text="근무종료" />
      </Block>
    </div>
  );
};

export default BusinessCard;
