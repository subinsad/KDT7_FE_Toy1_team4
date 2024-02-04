import React, { useState } from 'react'
import { auth, db, storage } from '../../../firebase';
import { updateProfile } from 'firebase/auth';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';
import Swal from 'sweetalert2';

import "../../BusinessCard.scss";
import Block from '../../Common/Block';
import Profile from '../../Common/Profile';
import Heading from '../../Common/Heading';
import Text from '../../Common/Text';

const InfoModal = ({
    displayName,
    photoURL,
    setInfoModalOpen,
    setName,
    setUserImg,
    setShortInfo,
    isUserShortInfo,
    shortInfo,
    initShortInfo
}) => {

    const [newPhotoURL, setNewPhotoURL] = useState(photoURL);
    const [newName, setNewName] = useState(displayName);
    const [newShortInfo, setNewShortInfo] = useState(shortInfo)
    const user = auth.currentUser;

    const onAvatarChange = async (e) => {
        const { files } = e.target
        if (!user) return;
        if (files && files.length === 1) {
            const file = files[0];
            const locationRef = ref(storage, `UserImage/${user.displayName}`)
            const result = await uploadBytes(locationRef, file)
            const userImgUrl = await getDownloadURL(result.ref)
            await updateProfile(user, {
                photoURL: userImgUrl,
            })
            const userDocRef = doc(db, "users", user.uid);
            await setDoc(userDocRef, {
                photoURL: userImgUrl,
            }, { merge: true });
            setUserImg(userImgUrl)
            setNewPhotoURL(userImgUrl)
        }
    }

    const OnNameChange = async () => {
        if (!user) return;
        const { value: text } = await Swal.fire({
            input: "text",
            inputLabel: "사용자 이름 수정",
            inputPlaceholder: "변경 할 이름을 입력하세요",
            inputAttributes: {
                "aria-label": "변경 할 이름을 입력하세요"
            },
            showCancelButton: true
        });
        if (text) {
            setName(text);
            setNewName(text)

            await updateProfile(user, { displayName: text });
            const userDocRef = doc(db, "users", user.uid);
            await setDoc(userDocRef, {
                name: text,
            }, { merge: true });
        }
    }
    const OnShortInfoChange = async () => {
        if (!user) return;
        const { value: text } = await Swal.fire({
            input: "text",
            inputLabel: "한줄 자기소개 변경",
            inputPlaceholder: "한줄 자기소개를 입력하세요",
            inputAttributes: {
                "aria-label": "한줄 자기소개를 입력하세요"
            },
            showCancelButton: true
        });

        if (text) {
            setShortInfo(text)
            setNewShortInfo(text)
            const userDocRef = doc(db, "users", user.uid);
            await setDoc(userDocRef, {
                shortInfo: text,
            }, { merge: true });
        }
    }

    const handleCloseModal = () => {
        setInfoModalOpen(false)
    }
    return (
        <div className="business-card">
            <Block>
                <span style={{ cursor: 'pointer' }} onClick={handleCloseModal}>X</span>
                <label htmlFor="avartar" style={{ cursor: 'pointer' }}>
                    <Profile filename={newPhotoURL} />
                </label>
                <input type="file" id="avartar" accept='image/*' style={{ display: 'none' }} onChange={onAvatarChange} />
                <div onClick={OnNameChange} style={{ cursor: 'pointer', margin: '20px' }}>
                    <Heading tag={"h2"} size={"small"} text={newName} />
                </div>
                <div onClick={OnShortInfoChange} style={{ cursor: 'pointer', margin: '20px' }}>
                    {isUserShortInfo ? <Text type={"type1"} text={newShortInfo} /> : <p style={{ color: '#DC6089', fontSize: '1.3rem' }}>{initShortInfo}</p>}
                </div>
            </Block>
        </div>
    );
};

export default InfoModal;
