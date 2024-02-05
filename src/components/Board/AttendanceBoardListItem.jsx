import React from "react";
import Button from "../Common/Button";
import Profile from "../Common/Profile";
import pic1 from "../../assets/profile1.jpg";
import { auth } from "../../firebase";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AttendanceBoardView from "./AttendanceBoardView";

const AttendanceBoardListItem = ({
  content,
  createdAt,
  startdate,
  enddate,
  select,
  title,
  userId,
  username,
  id,
}) => {
  const navigate = useNavigate();
  const [isDialog, setIsDialog] = useState(false);
  const viewProps = {
    content,
    createdAt,
    startdate,
    enddate,
    select,
    title,
    userId,
    username,
    id,
  };
  const user = auth.currentUser;

  const onInfo = (e) => {
    e.preventDefault();
    return (
      <>
        <AttendanceBoardView {...viewProps} />
        {navigate("/attendance/view")}
      </>
    );
  };
  const onOption = () => {
    setIsDialog(!isDialog);
  };
  return (
    <li>
      <a href="" onClick={onInfo}>
        <Profile filename={pic1} />
        <div className="board__status">
          {startdate} ~ {enddate}
        </div>
        <div className="board__title">{title}</div>
        <div className="board__writer">{username}</div>
      </a>
      {user?.uid === userId && (
        <div className="board__more">
          <Button className={"btn-more"} onClick={onOption} />
          <dialog open={isDialog}>
            <ul>
              <li>
                <button>승인</button>
              </li>
              <li>
                <button>반려</button>
              </li>
            </ul>
          </dialog>
        </div>
      )}
    </li>
  );
};

export default AttendanceBoardListItem;
