import React, { useEffect, useState } from "react";
import UserInfo from "../components/mypageComponents/UserInfo";
import UserStatus from "../components/mypageComponents/UserStatus";
import Block from "../components/Common/Block";
import { auth, db } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const Mypage = () => {

  //소개글, 전화번호, 직급 등록이 안되어 있을 시 마이페이지에 표시되는 초기 텍스트
  const initShortInfo = "한줄 소개글을 등록해주세요"
  const initUserPhone = "전화번호를 등록해주세요"
  const initUserJob = "직급을 등록해주세요"

  //사용자 state
  const [name, setName] = useState(""); //사용자 이름 state
  const [shortInfo, setShortInfo] = useState(initShortInfo) //사용자 한줄소개 state
  const [userImg, setUserImg] = useState("") //사용자 유저 이미지 state
  const [userEmail, setUserEmail] = useState("") //사용자 이메일
  const [userPhone, setUserPhone] = useState(initUserPhone) //사용자 전화번호
  const [userJob, setUserJob] = useState(initUserJob) //사용자 직급
  const [timeNow, setTimeNow] = useState(""); //현재 시간 state

  //그 외 state
  const [infoModalOpen, setInfoModalOpen] = useState(false); //infomodal 오픈 되었는지
  const [stateModalOpen, setStateModalOpen] = useState(false) //statemodal 오픈 되었는지
  const [isUserImg, setIsUserImg] = useState(false); //유저 이미지 존재여부
  const [isUserShortInfo, setIsUserShortInfo] = useState(false) //유저 생일 등록 여부
  const [isUserPhone, setIsUserPhone] = useState(false) //유저 핸드폰 번호 등록 여부
  const [isUserJob, setIsUserJob] = useState(false) //유저 직업 등록 여부

  //근무 state
  const [workStartTime, setWorkStartTime] = useState("")
  const [workEndTime, setWorkEndTime] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      const user = auth.currentUser;

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

        const today = new Date();
        const formattedDate = `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일`;
        const userWorkDocRef = doc(db, 'workingtimeline', user.uid, user.displayName, formattedDate);
        const userWorkDoc = await getDoc(userWorkDocRef);

        if (userWorkDoc) {
          const startTime = userWorkDoc.data()?.startTime;
          const endTime = userWorkDoc.data()?.endTime;

          setWorkStartTime(startTime || "");
          setWorkEndTime(endTime || "");

          try {
            await setDoc(userWorkDocRef, {
              startTime: startTime || "",
              endTime: endTime || "",
            }, { merge: true });

          } catch (error) {
            console.error("에러발생:", error);
          }
        } else {
          setWorkStartTime("");
          setWorkEndTime("");
        }
      }
    };
    const intervalId = setInterval(() => {
      const now = new Date();
      const options = { hour: '2-digit', minute: '2-digit' };
      const formattedTime = now.toLocaleTimeString([], options);
      setTimeNow(formattedTime);
    }, 1000);

    fetchData(); // 데이터 가져오는 함수 호출

    return () => {
      clearInterval(intervalId);
    };
  }, []);


  //컴포넌트가 언마운트가 되었다가 다시 마운트 되면 isUser state는 모두 false가 되기 때문에 useEffect를 사용해서 
  //해당 유저에 맞는 값이 있을 때 해당 isuser 값을 true로 바꿔준다.
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


  //모달창 열기 함수
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

          openInfoModal={openInfoModal} //모달 창 열기 함수
          setInfoModalOpen={setInfoModalOpen} //모달 창 오픈 상태 바꾸기
          setName={setName} //현재 유저 이름 바꾸기
          setUserImg={setUserImg} //현재 유저 이미지 바꾸기
          setShortInfo={setShortInfo} //현재 유저 한줄소개 바꾸기

          workStartTime={workStartTime}
          workEndTime={workEndTime}
          setWorkStartTime={setWorkStartTime}
          setWorkEndTime={setWorkEndTime}

        />
      </Block>
      <Block>
        <UserStatus
          user={auth.currentUser} //현재유저
          userEmail={userEmail} //유저 이메일
          userPhone={userPhone} //유저 폰번호 
          userJob={userJob} //유저 직급

          isUserPhone={isUserPhone} //유저 핸드폰 번호가 등록된 상태인지?
          isUserJob={isUserJob} //유저 직급이 등록된 상태인지?

          stateModalOpen={stateModalOpen} //state모달 오픈 상태

          initUserPhone={initUserPhone} //폰번호 등록 안되어 있을 때 초기텍스트
          initUserJob={initUserJob} //직급 등록 안되어 있을 때 초기텍스트

          setUserPhone={setUserPhone} //유저 핸드폰 번호 등록
          setUserJob={setUserJob} //유저 직급 등록

          setStateModalOpen={setStateModalOpen}
          openStateModal={openStateModal}
        />
      </Block>
    </Block>
  )
};

export default Mypage;
