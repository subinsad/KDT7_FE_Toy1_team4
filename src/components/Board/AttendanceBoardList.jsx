import React from "react";
import Profile from "../Common/Profile";
import pic1 from "../../assets/profile1.jpg";
import Button from "../Common/Button";

const AttendanceBoardList = () => {
  return (
    <div className={"list"}>
      <ul className={"board"}>
        <li>
          <a href="">
            <Profile filename={pic1} />
            <div className="board__status">출근전</div>
            <div className="board__title">제목</div>
            <div className="board__writer">작성자</div>
          </a>
          <div className="board__more">
            <Button className={"btn-more"} />
            <dialog open>
              <ul>
                <li>
                  <button>승인</button>
                </li>
                <li>
                  <button>반려</button>
                </li>
                <li>
                  <button>취소</button>
                </li>
              </ul>
            </dialog>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default AttendanceBoardList;
