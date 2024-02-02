import React from "react";
import Block from "../components/Common/Block";
import Heading from "../components/Common/Heading";
import Text from "../components/Common/Text";
import AttendanceBoardList from "../components/Board/AttendanceBoardList";

const Attendance = () => {
  return (
    <>
      <Block>
        <Heading tag={"h1"} size={"regular"} text={"근태신청"} />
        <Text type={"type1"} text={"근태신청해주세요."} />
        <AttendanceBoardList />
      </Block>
    </>
  );
};

export default Attendance;
