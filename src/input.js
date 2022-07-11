import React from "react";

const input = ({placeholder, settingInputValue, value}) => {
  return (
    <input
      className="input"
      type="text"
      placeholder={placeholder}
      onChange={settingInputValue}
      value={value}
      maxLength="35"
    />
  );
};

export default input;
