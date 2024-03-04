import React from 'react';
import './InfoList.scss';
import { useSelector } from 'react-redux';

const InfoList = () => {
    const { userPhone, userJob, userEmail } = useSelector(
        (state) => state.userSlice.userInfo
    );

    return (
        <ul className="info-list">
            <li className="tel">
                <strong className="info-list__title">Phone</strong>
                {userPhone ? (
                    <div className="info-list__content">{userPhone}</div>
                ) : (
                    <div className="info-list__content">-</div>
                )}
            </li>
            <li className="job">
                <strong className="info-list__title">Job</strong>
                {userJob ? (
                    <div className="info-list__content">{userJob}</div>
                ) : (
                    <div className="info-list__content">-</div>
                )}
            </li>
            <li className="email">
                <strong className="info-list__title">Email</strong>
                <div className="info-list__content">{userEmail}</div>
            </li>
        </ul>
    );
};

export default InfoList;
