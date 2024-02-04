import React from 'react';
import BusinessCard from '../BusinessCard';
import InfoModal from './Modal/InfoModal';
import styled from 'styled-components';

const UserInfo = (
    { user,
        name,
        shortInfo,
        timeNow,
        filename,

        isUserShortInfo,
        infoModalOpen,
        isUserImg,
        initShortInfo,

        openInfoModal,
        setInfoModalOpen,
        setName,
        setUserImg,
        setShortInfo,
    }
) => {

    return (
        <>
            {infoModalOpen ? (
                <InfoModal
                    {...user}
                    setInfoModalOpen={setInfoModalOpen}
                    setName={setName}
                    setUserImg={setUserImg}
                    setShortInfo={setShortInfo}
                    isUserShortInfo={isUserShortInfo}
                    shortInfo={shortInfo}
                    initShortInfo={initShortInfo}
                />
            ) : (
                <>
                <BusinessCard
                        name={name}
                        shortInfo={shortInfo}
                        timeNow={timeNow}
                        filename={filename}
                        isUserImg={isUserImg} //현재 유저 이미지가 있는지 받아온다.
                        isUserShortInfo={isUserShortInfo} //현재 유저 한줄소개가 있는지 받아온다.
                        initShortInfo={initShortInfo} //현재 유저 한줄소개 초기값
                    />
                    <EditBtn onClick={openInfoModal}>
                    <svg xmlns="http://www.w3.org/2000/svg" style={{ width: '24px', height: '24px' }} viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
  <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
  <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
</svg>
                    </EditBtn>
                    
                </>
            )}
        </>

    );
};

export default UserInfo;

const EditBtn = styled.span`
cursor: pointer;
position:fixed;
top:11%;
right:34%;
`
