import React, { useEffect, useState } from "react";
import UserInfo from "../components/mypageComponents/UserInfo";
import UserStatus from "../components/mypageComponents/UserStatus";
import Block from "../components/Common/Block";
import { auth, db } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const Mypage = () => {
  const user = auth.currentUser;
  const initShortInfo = "한줄 소개글을 등록해주세요"
  const initUserPhone = "전화번호를 등록해주세요"
  const initUserJob = "직급을 등록해주세요"

  //사용자 state
  const [name, setName] = useState(""); //사용자 이름 state
  const [shortInfo, setShortInfo] = useState(initShortInfo) //사용자 한줄소개 state
  const [userImg, setUserImg] = useState("") //사용자 유저 이미지 state
  const [userEmail, setUserEmail] = useState("") //사용자 이메일
  const [userPhone, setUserPhone] = useState(initUserPhone) //사용자 전화번호
  const [userJob, setUserJob] = useState(initUserJob)
  const [timeNow, setTimeNow] = useState(""); //현재 시간 state

  //그 외 state
  const [infoModalOpen, setInfoModalOpen] = useState(false);
  const [stateModalOpen, setStateModalOpen] = useState(false)
  const [isUserImg, setIsUserImg] = useState(false); //유저 이미지 존재여부
  const [isUserShortInfo, setIsUserShortInfo] = useState(false) //유저 생일 등록 여부
  const [isUserPhone, setIsUserPhone] = useState(false) //유저 핸드폰 번호 등록 여부
  const [isUserJob, setIsUserJob] = useState(false)


  useEffect(() => { //사용자가 로그인하면 user 정보대로 displayName, photoURL을 업데이트 및 storage를 만든다.
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const { displayName, photoURL, email } = user;
        setName(displayName || "");
        setUserImg(photoURL || "");
        setUserEmail(email || "");
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);

        const userShortInfo = userDoc.data()?.shortInfo;
        const userPhone = userDoc.data()?.phoneNumber;
        const userJob = userDoc.data()?.job;

        setShortInfo(userShortInfo)
        setUserPhone(userPhone)
        setUserJob(userJob)

        try {
          await setDoc(userDocRef, {
            name: displayName,
            email: email,
            phoneNumber: userPhone || "",
            photoURL: photoURL,
            job: userJob || "",
            shortInfo: userShortInfo || "",
          }, { merge: true });

        } catch (error) {
          console.error("에러발생:", error);
        }
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => { //현재시간 가져오기
    const intervalId = setInterval(() => {
      const now = new Date();
      const options = { hour: '2-digit', minute: '2-digit' };
      const formattedTime = now.toLocaleTimeString([], options);
      setTimeNow(formattedTime);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    setIsUserImg(!!userImg)
  }, [userImg])

  useEffect(() => {
    setIsUserShortInfo(!!shortInfo)
  }, [shortInfo])

  useEffect(() => {
    setIsUserJob(!!userJob)
  }, [userJob])

  useEffect(() => {
    setIsUserPhone(!!userPhone)
  }, [userPhone])


  const openInfoModal = () => {
    setInfoModalOpen(true);
  }

  const openStateModal = () => {
    setStateModalOpen(true);
  }

  return (
    <Block>
      <Block>
        <UserInfo
          user={auth.currentUser} //현재유저
          name={name} //현재유저 이름
          shortInfo={shortInfo} //현재유저 한줄소개
          filename={userImg} //현재유저 이미지

          timeNow={timeNow} //현재시간

          isUserShortInfo={isUserShortInfo} //현재유저의 한줄소개가 등록되었는지?
          isUserImg={isUserImg} //현재 유저의 이미지가 등록되었는지?
          infoModalOpen={infoModalOpen} //모달이 오픈된 상태인지?

          initShortInfo={initShortInfo} //현재유저의 한줄소개가 등록되어있지 않다면 초기 값

          openInfoModal={openInfoModal} //모달 창 열기
          setInfoModalOpen={setInfoModalOpen} //모달 창 오픈 바꾸기
          setName={setName} //현재 유저 이름 바꾸기
          setUserImg={setUserImg} //현재 유저 이미지 바꾸기
          setShortInfo={setShortInfo} //현재 유저 한줄소개 바꾸기
          setIsUserShortInfo={setIsUserShortInfo}
        />
      </Block>
      <Block>
        <UserStatus
          user={auth.currentUser}
          userEmail={userEmail}
          userPhone={userPhone}
          userJob={userJob}

          isUserPhone={isUserPhone}
          isUserJob={isUserJob}

          stateModalOpen={stateModalOpen}

          initUserPhone={initUserPhone}
          initUserJob={initUserJob}

          setUserPhone={setUserPhone}
          setUserJob={setUserJob}

          setIsUserPhone={setIsUserPhone}
          setIsUserJob={setIsUserJob}

          setStateModalOpen={setStateModalOpen}
          openStateModal={openStateModal}
        />
      </Block>
    </Block>
  )
};

export default Mypage;
