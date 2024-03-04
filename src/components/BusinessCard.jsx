import React, { useState } from 'react';
import Profile from './Common/Profile';
import Heading from './Common/Heading';
import Block from './Common/Block';
import './BusinessCard.scss';
import Text from './Common/Text';
import MyStatus from './Common/MyStatus';
import Button from './Common/Button';
import Dialog from './Common/Dialog';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { workStart, workEnd } from '../store/user/workSlice';

const BusinessCard = ({ timeNow }) => {
    const { startTime, endTime } = useSelector(
        (state) => state.workSlice.working
    );
    const { userInfo } = useSelector((state) => state.userSlice);
    const { name, shortInfo, userImg } = userInfo;
    const dispatch = useDispatch();
    const [alertModal, setAlertModal] = useState(false);

    return (
        <div className="business-card">
            <Block>
                <Profile userImg={userImg} />
                <Heading tag={'h2'} size={'small'} text={name} />
                {shortInfo ? (
                    <Text type={'type1'} text={shortInfo} />
                ) : (
                    <Text type={'type1'} text={'-'} />
                )}

                {startTime === '' && endTime === '' && (
                    <MyStatus
                        timeNow={timeNow}
                        situation={'primary'}
                        text={'근무 전'}
                    />
                )}
                {startTime !== '' && endTime === '' && (
                    <MyStatus
                        timeNow={timeNow}
                        situation={'success'}
                        text={'근무 중'}
                    />
                )}
                {startTime !== '' && endTime !== '' && (
                    <MyStatus
                        timeNow={timeNow}
                        situation={'danger'}
                        text={'근무 종료'}
                    />
                )}

                {startTime === '' && endTime === '' && (
                    <>
                        <Button
                            className={'btn primary regular'}
                            text="근무시작"
                            onClick={() => {
                                setAlertModal(true);
                            }}
                        />
                        <Dialog
                            openModal={alertModal}
                            closeModal={() => setAlertModal(false)}
                            className={'alert'}>
                            <div className="txt-center">
                                {' '}
                                근무를 시작하시겠습니까?{' '}
                            </div>
                            <div className="align center mt20">
                                <Button
                                    className={'btn regular primary'}
                                    text="확인"
                                    onClick={() => {
                                        dispatch(workStart(userInfo));
                                        setAlertModal(false);
                                    }}
                                />
                                <Button
                                    className={'btn regular danger'}
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

                {startTime !== '' && endTime === '' && (
                    <>
                        <Button
                            className={'btn danger regular'}
                            text="근무종료"
                            onClick={() => {
                                setAlertModal(true);
                            }}
                        />
                        <Dialog
                            openModal={alertModal}
                            closeModal={() => setAlertModal(false)}
                            className={'alert'}>
                            <div className="txt-center">
                                {' '}
                                근무를 종료하시겠습니까?{' '}
                            </div>
                            <div className="align center mt20">
                                <Button
                                    className={'btn regular primary'}
                                    text="확인"
                                    onClick={() => {
                                        dispatch(workEnd(userInfo));
                                        setAlertModal(false);
                                    }}
                                />
                                <Button
                                    className={'btn regular danger'}
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
                {startTime !== '' && endTime !== '' && (
                    <>
                        <Button
                            className={'btn primary regular'}
                            text="근무시작"
                            disabled
                        />
                    </>
                )}
            </Block>
        </div>
    );
};

export default BusinessCard;
