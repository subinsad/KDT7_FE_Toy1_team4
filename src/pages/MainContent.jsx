import React, { useEffect, useState } from "react";
import "./MainContent.scss";
import BusinessCard from "../components/BusinessCard";
import TimeBlock from "../components/TimeBlock";
import PersonInfoList from "../components/PersonInfoList";
import BoardGallery from "../components/PostComponents/BoardGallery";
import Block from "../components/Common/Block";
import AttendanceBoardList from "../components/Board/AttendanceBoardList";
import Heading from "../components/Common/Heading";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useCallback } from "react";

const MainContent = () => {
  const { working } = useSelector((state) => state.workSlice)
  const [timeNow, setTimeNow] = useState("");

  const updateCurrentTime = useCallback(() => { //useCallback을 써서 메모 한 후 사용함으로 성능향상
    const today = new Date();
    const formattedMinutes = today.getMinutes() < 10 ? "0" + today.getMinutes() : today.getMinutes();
    const formattedTime = `${today.getHours()}:${formattedMinutes}`;
    setTimeNow(formattedTime);
  }, []);

  useEffect(() => {
    const intervalId = setInterval(updateCurrentTime, 1000);
    return () => clearInterval(intervalId);
  }, [updateCurrentTime]);

  const calWorkingTime = (end, start) => {
    const endTime = new Date(`2000-01-01 ${end}`);
    const startTime = new Date(`2000-01-01 ${start}`);
    const differenceInMilliseconds = endTime.getTime() - startTime.getTime();
    const hours = Math.floor(differenceInMilliseconds / (1000 * 60 * 60));
    const minutes = Math.floor((differenceInMilliseconds % (1000 * 60 * 60)) / (1000 * 60));
    const formattedHours = hours.toString().padStart(2, "0");
    const formattedMinutes = minutes.toString().padStart(2, "0");
    return `${formattedHours}:${formattedMinutes}`;
  };

  return (
    <div className="main">
      <div className="main-top">
        <Block className="main__attend">
          <div className="align both vm">
            <Heading tag={"h2"} size={"small"} text={"Attendance State"} />
            <Link to="/attendance" className="btn small success ">
              근태현황 바로가기
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                <path d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8" />
              </svg>
            </Link>
          </div>
          <AttendanceBoardList filterShow={false} />
        </Block>

        <div>
          <BusinessCard timeNow={timeNow} />
          <div className="mt10">
            <PersonInfoList />
          </div>
        </div>
      </div>
      <div className="time-wrap">
        <TimeBlock time={timeNow} title={"현재시간"} icon={"ico1"} />
        {working.startTime ? <TimeBlock time={working.startTime} title={"근무시작"} icon={"ico3"} /> : <TimeBlock time=" - " title={"근무시작"} icon={"ico3"} />}
        {working.endTime ? <TimeBlock time={working.endTime} title={"근무종료"} icon={"ico3"} /> : <TimeBlock time=" - " title={"근무종료"} icon={"ico3"} />}
        {working.startTime && working.endTime ? <TimeBlock time={calWorkingTime(working.endTime, working.startTime)} title={"근무시간"} icon={"ico4"} /> : <TimeBlock time={" - "} title={"근무시간"} icon={"ico4"} />}
      </div>

      <BoardGallery pagination={false} />
    </div>
  );
};

export default MainContent;
