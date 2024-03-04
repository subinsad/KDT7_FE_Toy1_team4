import React, { useState, useEffect } from 'react';
import Block from '../components/Common/Block';
import Heading from '../components/Common/Heading';
import Input from '../components/Form/Input';
import AddFile from '../components/Form/AddFile';
import Button from '../components/Common/Button';
import { auth, db, storage } from '../firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { updateProfile } from 'firebase/auth';
import Dialog from '../components/Common/Dialog';
import Loading from '../components/Common/Loading';
import './EditMypage.scss';
import { useSelector, useDispatch } from 'react-redux';
import { editUser, editUserBg, editUserImg } from '../store/user/userSlice';
import Select from '../components/Form/Select';
import { jobOptions } from '../data/selectOption';

const EditMypage = () => {
    const { userInfo } = useSelector((state) => state.userSlice);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [telError, setTelError] = useState('');
    const [formData, setFormData] = useState({
        shortInfo: userInfo.shortInfo || '',
        userPhone: userInfo.userPhone || '',
        userJob: userInfo.userJob || '',
        userImgFile: null,
        userBgFile: null,
    });

    const [alertModal, setAlertModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (telError) {
            const timer = setTimeout(() => {
                setTelError('');
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [telError]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    const handleFileChange = (field) => (e) => {
        const { files } = e.target;
        if (files && files.length === 1) {
            setFormData((prevData) => ({
                ...prevData,
                [field]: files[0],
            }));
        }
    };

    const edit = async (e) => {
        e.preventDefault();
        const { userPhone, userImgFile, userBgFile, shortInfo, userJob } =
            formData;

        const phoneRegex = /^010\d{8}$/;
        if (!phoneRegex.test(userPhone)) {
            setAlertModal(false);
            setTelError('010으로 시작하는 11자리 숫자를 입력해주세요');
            return;
        }
        setIsLoading(true);
        const userDocRef = doc(db, 'users', auth.currentUser.uid);
        try {
            await setDoc(
                userDocRef,
                {
                    shortInfo: shortInfo,
                    phoneNumber: userPhone,
                    job: userJob,
                },
                { merge: true }
            );
            dispatch(
                editUser({
                    shortInfo,
                    userPhone,
                    userJob,
                })
            );

            if (userImgFile) {
                const locationRef = ref(
                    storage,
                    `UserImage/${auth.currentUser.displayName}`
                );
                const result = await uploadBytes(locationRef, userImgFile);
                const userImgUrl = await getDownloadURL(result.ref);
                await updateProfile(auth.currentUser, {
                    photoURL: userImgUrl,
                });
                await setDoc(
                    userDocRef,
                    {
                        photoURL: userImgUrl,
                    },
                    { merge: true }
                );
                dispatch(editUserImg(userImgUrl));
            }

            if (userBgFile) {
                const locationRef = ref(
                    storage,
                    `UserBg/${auth.currentUser.displayName}`
                );
                const result = await uploadBytes(locationRef, userBgFile);
                const userBgUrl = await getDownloadURL(result.ref);
                await setDoc(
                    userDocRef,
                    {
                        bg: userBgUrl,
                    },
                    { merge: true }
                );
                dispatch(editUserBg(userBgUrl));
            }
            navigate('/mypage');
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const checkType = () => {
        if (!formData.shortInfo || !formData.userPhone || !formData.userJob) {
            setAlertModal(false);
        }
    };

    const handleModalClose = () => {
        setAlertModal(false);
    };

    return (
        <>
            {isLoading ? (
                <div className="fixed">
                    <Loading />
                </div>
            ) : (
                <form onSubmit={edit}>
                    <Block className="form-type1">
                        <Heading
                            tag={'h2'}
                            size={'small'}
                            text={'회원 정보 수정'}
                        />

                        <label htmlFor="name">Name</label>
                        <Input
                            width={'100%'}
                            id="name"
                            type="text"
                            disabled
                            value={userInfo.name}
                        />

                        <label htmlFor="email">Email</label>
                        <Input
                            width={'100%'}
                            id="email"
                            type="email"
                            disabled
                            value={userInfo.userEmail}
                        />

                        <label htmlFor="shortInfo">한줄소개</label>
                        <Input
                            width={'100%'}
                            id="shortInfo"
                            type="text"
                            placeholder="한줄소개를 입력해주세요."
                            value={formData.shortInfo}
                            onChange={handleChange}
                            required
                        />

                        <label htmlFor="userPhone">전화번호</label>
                        {telError && (
                            <Button
                                className={'btn regular danger'}
                                text={telError}
                                type="button"
                            />
                        )}
                        <Input
                            width={'100%'}
                            id="userPhone"
                            type="tel"
                            placeholder="숫자만 입력해주세요."
                            value={formData.userPhone}
                            onChange={handleChange}
                            required
                        />

                        <label htmlFor="userJob">직급</label>
                        <Select
                            id="userJob"
                            placeholder="직급을 선택해주세요"
                            options={jobOptions}
                            value={formData.userJob}
                            onChange={handleChange}
                            required
                        />

                        <label htmlFor="">프로필사진</label>
                        <AddFile
                            id={'file2_1'}
                            text={
                                formData.userImgFile
                                    ? '파일이 추가되었습니다'
                                    : '첨부파일'
                            }
                            onChange={handleFileChange('userImgFile')}
                        />

                        <label htmlFor="">배경사진</label>
                        <AddFile
                            id={'file2_2'}
                            text={
                                formData.userBgFile
                                    ? '파일이 추가되었습니다'
                                    : '첨부파일'
                            }
                            onChange={handleFileChange('userBgFile')}
                        />

                        <div className="align center">
                            <Button
                                className={'btn regular primary'}
                                text="회원정보수정"
                                type="button"
                                onClick={() => setAlertModal(true)}
                            />
                        </div>

                        <Dialog
                            openModal={alertModal}
                            closeModal={handleModalClose}
                            className={'alert'}>
                            <div className="txt-center">
                                회원 정보를 수정 하시겠습니까?
                            </div>
                            <div className="align center mt20">
                                <Button
                                    className={'btn regular primary'}
                                    text="확인"
                                    type="submit"
                                    onClick={checkType}
                                />
                                <Button
                                    className={'btn regular danger'}
                                    text="취소"
                                    type="button"
                                    onClick={handleModalClose}
                                />
                            </div>
                        </Dialog>
                    </Block>
                </form>
            )}
        </>
    );
};

export default EditMypage;
