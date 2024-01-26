import React from "react";
import Block from "./Block";
import Heading from "./Heading";
import InfoList from "./InfoList";

const PersonInfoList = () => {
  return (
    <>
      <Block>
        <Heading tag={"h2"} text={"Profile"} size={"small"} />
        <InfoList />
      </Block>
    </>
  );
};

export default PersonInfoList;
