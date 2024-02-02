import React from "react";
import Heading from "../Common/Heading";
import Block from "../Common/Block";
import Button from "../Common/Button";

const AttendanceBoardWrite = () => {
  return (
    <>
      <Block>
        <Heading tag={"h2"} size={"regular"} text={"근태신청"} />
        <form action="">
          <div className="attendance-write"></div>
          <div className="btn-group">
            <Button className={"btn danger regular"} text="취소하기" />
            <Button className={"btn primary regular"} text="신청하기" />
          </div>
        </form>
      </Block>
    </>
  );
};

export default AttendanceBoardWrite;
