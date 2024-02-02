import React from "react";
import "./Form.scss";

const AddFile = ({ type, id, file, text = "", ...props }) => {
  return (
    <>
      <input type="file" className={"addfile"} id={id} {...props} />
      <label htmlFor={id}>{file ? "파일이 추가되었습니다 ✅" : "파일을 추가해주세요"}</label>
    </>
  );
};

export default AddFile;
