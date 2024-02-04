import React, { useContext } from "react";
import Profile from "./Common/Profile";
import Heading from "./Common/Heading";
import Block from "./Common/Block";
import "./BusinessCard.scss";
import Text from "./Common/Text";
import MyStatus from "./Common/MyStatus";
import Button from "./Common/Button";
import styled from "styled-components";
import Swal from "sweetalert2";

const BusinessCard = ({ 
  name, 
  shortInfo, 
  timeNow, 
  filename, 
  isUserImg,
  isUserShortInfo,
  initShortInfo 
}) => {

  const onClickImgError = () => {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
      didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
  })
  
  Toast.fire({
      icon: 'warning',
      title: '유저 이미지를 등록해주세요'
  })

  }

  return (
    <div className="business-card">
      <Block>
        <div style={{ position: 'relative' }}>
          <Profile filename={filename} />
          {isUserImg ? null : <ImgError onClick={onClickImgError} ><svg style={{ width: '17px', height: '17px' }} xmlns="http://www.w3.org/2000/svg" fill="#DC6089" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
          </svg></ImgError>
          }
        </div>
        <Heading tag={"h2"} size={"small"} text={name} />
        {isUserShortInfo ? <Text type={"type1"} text={shortInfo} /> : <p style={{ color: '#DC6089', fontSize: '1.3rem' }}>{initShortInfo}</p>}
        <MyStatus timeNow={timeNow} />
        <Button className={"btn primary regular"} text="근무시작" />
        <Button className={"btn success regular"} text="근무중" />
        <Button className={"btn danger regular"} text="근무종료" />
      </Block>
    </div>
  );
};

export default BusinessCard;

const ImgError = styled.div`
position: absolute;
top:-5%;
right:39%;
color: black;
cursor: pointer;
`
