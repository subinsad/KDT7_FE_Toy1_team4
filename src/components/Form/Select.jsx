import React from "react";
import "./Form.scss";

const Select = ({ placeholder, options, onChangeOption }) => {
  return (
    <select className="select" onChange={(e) => onChangeOption(e.target.value)}>
      {placeholder && <option hidden>{placeholder}</option>}
      {options.map(({ value, text }) => (
        <option key={value} value={value}>
          {text}
        </option>
      ))}
    </select>
  );
};

export default Select;
