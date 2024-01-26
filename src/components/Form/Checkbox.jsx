import React from "react";
import "./Form.scss";

const Checkbox = ({ type, id, text = "" }) => {
  return (
    <>
      <input type="checkbox" className={"check-" + type} name="" id={id} />
      <label htmlFor={id}>{text}</label>
    </>
  );
};

export default Checkbox;
