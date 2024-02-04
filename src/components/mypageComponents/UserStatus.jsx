import React from 'react'
import InfoList from '../InfoList'
import StatusModal from './Modal/StatusModal'

const UserStatus = ({
  user,
  userEmail,
  userPhone,
  userJob,
  isUserJob,
  isUserPhone,
  initUserJob,
  initUserPhone,
  setUserPhone,
  setUserJob,
  stateModalOpen,
  openStateModal,
  setStateModalOpen

}) => {

  return (
    <>
      {stateModalOpen ? (
        <StatusModal
        {...user}
        userEmail={userEmail}
        userPhone={userPhone}
        userJob={userJob}
        setUserJob={setUserJob}
        isUserJob={isUserJob}
        isUserPhone={isUserPhone}
        initUserPhone={initUserPhone}
        initUserJob={initUserJob}
        setStateModalOpen={setStateModalOpen}
        setUserPhone={setUserPhone}

        />
      ) : (
        <>
          <InfoList
            userEmail={userEmail}
            userPhone={userPhone}
            userJob={userJob}
            isUserPhone={isUserPhone}
            isUserJob={isUserJob}
            initUserPhone={initUserPhone}
            initUserJob={initUserJob}
          />
          <button onClick={openStateModal}>프로필 수정</button>
        </>
      )}
    </>
  )
}

export default UserStatus
