import React from "react";
import "./Profile.scss";

const Profile = ({ filename, className = "" }) => {
  return (
    <div className={"profile " + className}>
      <img src={filename} alt="" />
    </div>
  );
};

export default Profile;
