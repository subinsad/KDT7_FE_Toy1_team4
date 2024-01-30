import React from "react";
import "./Form.scss";

const AddFile = ({ type, id, text = "", ...props }) => {
  return (
    <>
      <input type="file" className={"addfile"} id={id} {...props} />
      <label htmlFor={id}>{text}</label>
    </>
  );
};

export default AddFile;
