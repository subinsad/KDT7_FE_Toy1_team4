import React from "react";
import "./MyStatus.scss";
import Badge from "./Badge";

const MyStatus = () => {
  return (
    <ul className="my-status">
      <li>
        <strong className="my-status__title">현재시간</strong>
        <div className="my-status__time">23:11:20</div>
      </li>
      <li>
        <strong className="my-status__title">현재상태</strong>
        <div className="my-status__state">
          <Badge situation={"success"} text={"근무중"} />
        </div>
      </li>
    </ul>
  );
};

export default MyStatus;
