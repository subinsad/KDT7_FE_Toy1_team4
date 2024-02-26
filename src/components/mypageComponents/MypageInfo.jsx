import React, { useState } from 'react'
import Block from '../Common/Block'
import ProfileEdit from '../Common/ProfileEdit'
import Profile from '../Common/Profile'
import Badge from '../Common/Badge'
import Button from '../Common/Button'
import Dialog from '../Common/Dialog'
import bgMypage from "../../assets/bg_mypage.png";
import { useSelector } from 'react-redux'
import { useDispatch } from "react-redux";
import { workEnd, workStart } from '../../store/work.slice'

const MypageInfo = () => {
    const dispatch = useDispatch()
    const { userInfo } = useSelector((state) => state.userSlice)
    const { name, shortInfo, userImg, userEmail, userPhone, userJob, userBg, } = userInfo
    const { startTime, endTime } = useSelector((state) => state.workSlice.working)

    const [alertModal, setAlertModal] = useState(false);


    return (
        <Block className="mypage__wrapper">
            <div className="mypage__bg">
                <img src={userBg || bgMypage} alt="" />
            </div>
            <div className="mypage__inner">
                <div className="mypage__profile">
                    <ProfileEdit>
                        <Profile userImg={userImg} />
                    </ProfileEdit>
                    <div className="mypage__name">{name}</div>
                    {shortInfo ? <div className="mypage__memo">{shortInfo}</div> : <div className="mypage__memo">소개글을 등록 해주세요</div>}
                </div>
                <div className="mypage__info">
                    <ul>
                        <li>
                            <strong>이메일</strong>
                            <div>{userEmail}</div>
                        </li>
                        <li>
                            <strong>전화번호</strong>
                            {userPhone ? <div>{userPhone}</div> : <div >-</div>}
                        </li>
                        <li>
                            <strong>직급</strong>
                            {userJob ? <div>{userJob}</div> : <div >-</div>}
                        </li>
                        <li aria-hidden="true"></li>
                        <li>
                            <strong>출근시간</strong>
                            {startTime ? <div>{startTime}</div> : <div >-</div>}
                        </li>
                        <li>
                            <strong>퇴근시간</strong>
                            {endTime ? <div>{endTime}</div> : <div >-</div>}
                        </li>
                        <li>
                            <strong>근태상태</strong>
                            <div>
                                {startTime === "" && endTime === "" && (
                                    <Badge situation={"primary"} text={"근무 전"} />
                                )}
                                {startTime !== "" && endTime === "" && (
                                    <Badge situation={"success"} text={"근무 중"} />
                                )}
                                {startTime !== "" && endTime !== "" && (
                                    <Badge situation={"danger"} text={"근무 종료"} />
                                )}

                            </div>
                        </li>
                    </ul>
                </div>
                <div className="mypage__status">
                    {startTime === "" && endTime === "" && (
                        <>
                            <Button className={"btn primary regular"} text="근무시작" onClick={() => { setAlertModal(true); }} />
                            <Dialog openModal={alertModal} closeModal={() => setAlertModal(false)} className={"alert"}>
                                <div className="txt-center"> 근무를 시작하시겠습니까? </div>
                                <div className="align center mt20">
                                    <Button className={"btn regular primary"} text="확인"
                                        onClick={() => {
                                            dispatch(workStart(userInfo))
                                            setAlertModal(false);
                                        }} />
                                    <Button
                                        className={"btn regular danger"}
                                        text="취소"
                                        type="button"
                                        onClick={() => {
                                            setAlertModal(false);
                                        }}
                                    />
                                </div>
                            </Dialog>
                        </>
                    )}

                    {startTime !== "" && endTime === "" && (
                        <>
                            <Button className={"btn danger regular"} text="근무종료" onClick={() => { setAlertModal(true); }} />
                            <Dialog openModal={alertModal} closeModal={() => setAlertModal(false)} className={"alert"}>
                                <div className="txt-center"> 근무를 종료하시겠습니까? </div>
                                <div className="align center mt20">
                                    <Button className={"btn regular primary"} text="확인"
                                        onClick={() => {
                                            dispatch(workEnd(userInfo))
                                            setAlertModal(false);
                                        }} />
                                    <Button
                                        className={"btn regular danger"}
                                        text="취소"
                                        type="button"
                                        onClick={() => {
                                            setAlertModal(false);
                                        }}
                                    />
                                </div>
                            </Dialog>
                        </>
                    )}
                    {startTime !== "" && endTime !== "" && (
                        <>
                            <Button className={"btn primary regular"} text="근무시작" disabled />
                        </>
                    )}
                </div>
            </div>
        </Block>
    )
}

export default MypageInfo
