import React from "react";
import Profile from "./Common/Profile";
import Heading from "./Common/Heading";
import Block from "./Common/Block";
import "./BusinessCard2.scss";
import Text from "./Common/Text";
import MyStatus from "./Common/MyStatus";
import Button from "./Common/Button";
import styled from "styled-components";
import Swal from "sweetalert2";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

const BusinessCard = ({
  name,
  shortInfo,
  timeNow,
  filename,
  isUserImg,
  isUserShortInfo,
  initShortInfo,
  workStartTime,
  workEndTime,
  setWorkStartTime,
  setWorkEndTime,
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

  const workStart = async () => {
    const user = auth.currentUser;
    if (!user) return;
    const today = new Date();
    const hours = today.getHours().toString().padStart(2, '0');
    const minutes = today.getMinutes().toString().padStart(2, '0');
    const formattedTime = `${hours}:${minutes}`;
    const formattedDate = `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일`;
    setWorkStartTime(formattedTime);
    const userDocRef = doc(db, 'workingtimeline', user.uid, user.displayName, formattedDate);
    await setDoc(userDocRef, {
      startTime: formattedTime
    }, { merge: true });
  }

  const workEnd = async () => {
    const user = auth.currentUser;
    if (!user) return;
    const today = new Date();
    const hours = today.getHours().toString().padStart(2, '0');
    const minutes = today.getMinutes().toString().padStart(2, '0');
    const formattedTime = `${hours}:${minutes}`;
    const formattedDate = `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일`;
    setWorkEndTime(formattedTime);
    const userDocRef = doc(db, 'workingtimeline', user.uid, user.displayName, formattedDate);
    await setDoc(userDocRef, {
      endTime: formattedTime
    }, { merge: true });
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

        {/* here!! */}
        {workStartTime === "" && workEndTime === "" && (
          <Button className={"btn primary regular"} text="근무시작" onClick={() => { workStart() }} />
        )}

        {workStartTime !== "" && workEndTime === "" && (
          <>
            <Button className={"btn success regular"} text="근무중" />
            <Button className={"btn danger regular"} text="근무종료" onClick={() => { workEnd() }} />
          </>
        )}

        {workStartTime !== "" && workEndTime !== "" && (
          <>
            <Button className={"btn success regular"} text="근무중" disabled />
            <Button className={"btn danger regular"} text="근무종료" disabled />
          </>
        )}

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
