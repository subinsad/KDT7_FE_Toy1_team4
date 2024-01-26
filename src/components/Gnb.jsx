import React from "react";
import "./Gnb.scss";
import { Link } from "react-router-dom";
const Gnb = () => {
  return (
    <nav>
      <ul className="gnb">
        <li className="ico1">
          <Link to="/">
            <span>첫페이지</span>
          </Link>
        </li>
        <li className="ico2">
          <Link to="/notice">
            <span>공지사항</span>
          </Link>
        </li>
        <li className="ico3">
          <Link to="/attendance">
            <span>근태현황</span>
          </Link>
        </li>
        <li className="ico4">
          <Link to="/mypage">
            <span>마이페이지</span>
          </Link>
        </li>
        <li className="ico5">
          <Link to="/styleguide">
            <span>스타일가이드</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Gnb;
