import React from "react";
import "./MyStatus.scss";

const MyStatus = ({timeNow}) => {
  return (
    <ul className="my-status">
      <li>
        <strong className="my-status__title">현재시간</strong>
        <div className="my-status__time">{timeNow}</div>
      </li>
      <li>
        <strong className="my-status__title">현재상태</strong>
        <div className="my-status__state">근무중</div>
      </li>
    </ul>
  );
};

export default MyStatus;
