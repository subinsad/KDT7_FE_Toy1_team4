import React from "react";
import "./Profile.scss";
import styled from "styled-components";

const Profile = ({ userImg, className = "" }) => {
  return (
    <div className={"profile " + className}>
      <img src={userImg} alt="" /> 
    </div>
  );
};

export default Profile;

