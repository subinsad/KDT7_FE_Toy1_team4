import React, { useState } from 'react'
import { auth, db } from '../../../firebase';
import { doc, setDoc } from 'firebase/firestore';
import Swal from 'sweetalert2';
import "../../InfoList.scss";
import './swal.css'

const StatusModal = ({
  userEmail,
  userPhone,
  userJob,
  isUserJob,
  isUserPhone,
  initUserPhone,
  initUserJob,
  setStateModalOpen,
  setUserJob,
  setUserPhone
}) => {

  const [newUserPhone, setNewUserPhone] = useState(userPhone);
  const [newUserJob, setNewUserJob] = useState(userJob);
  const user = auth.currentUser;

  const OnPhoneChange = async () => {
    if (!user) return;
    const { value: text } = await Swal.fire({
      input: "text",
      inputLabel: "전화번호 변경",
      inputPlaceholder: "변경 할 전화번호을 입력하세요 ( - 를 생략하고 써주세요)",
      inputAttributes: {
        "aria-label": "변경 할 전화번호을 입력하세요 ( - 를 생략하고 써주세요)"
      },
      showCancelButton: true,
    });
    if (text) {
      setUserPhone(text);
      setNewUserPhone(text)
      const userDocRef = doc(db, "users", user.uid);
      await setDoc(userDocRef, {
        phoneNumber: text,
      }, { merge: true });
    }
  }

  const OnJobChange = async () => {
    if (!user) return;
    const { value: job } = await Swal.fire({
      title: "직급을 선택해주세요",
      input: "select",
      inputOptions: {
        '': {
          Intern: "Intern",
          Staff: "Staff",
          Manager: 'Manager',
          Director: 'Director'
        }
      },
      inputPlaceholder: "직급 선택",
      showCancelButton: true,

    });
    if (job) {
      setUserJob(job)
      setNewUserJob(job)
      const userDocRef = doc(db, "users", user.uid);
      await setDoc(userDocRef, {
        job: job,
      }, { merge: true });
    }
  }


  const handleCloseModal = () => {
    setStateModalOpen(false)
  }
  return (
    <ul className="info-list">
      <span style={{ cursor: 'pointer' }} onClick={handleCloseModal}>X</span>
      <li className="tel">
        <strong className="info-list__title">Phone</strong>
        <div onClick={OnPhoneChange} style={{ cursor: 'pointer' }}>
          {isUserPhone ? <div className="info-list__content">{newUserPhone}</div> : <div style={{ color: '#DC6089', fontSize: '1.3rem' }} className="info-list__content">{initUserPhone}</div>}
        </div>
      </li>
      <li className="job">
        <strong className="info-list__title">Job</strong>
        <div onClick={OnJobChange} style={{ cursor: 'pointer' }}>
          {isUserJob ? <div className="info-list__content">{newUserJob}</div> : <div style={{ color: '#DC6089', fontSize: '1.3rem' }} className="info-list__content">{initUserJob}</div>}
        </div>
      </li>
      <li className="email">
        <strong className="info-list__title">Email</strong>
        <div className="info-list__content">{userEmail}</div>
      </li>
    </ul>
  );
};

export default StatusModal;
