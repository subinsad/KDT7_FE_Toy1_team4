import React from "react";
import "./InfoList.scss";

const InfoList = () => {
  return (
    <ul className="info-list">
      <li className="tel">
        <strong className="info-list__title">Phone</strong>
        <div className="info-list__content">010-1234-1234</div>
      </li>
      <li className="job">
        <strong className="info-list__title">Job</strong>
        <div className="info-list__content">대리</div>
      </li>
      <li className="email">
        <strong className="info-list__title">Email</strong>
        <div className="info-list__content">asd@asd.com</div>
      </li>
    </ul>
  );
};

export default InfoList;
