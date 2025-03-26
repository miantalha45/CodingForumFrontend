import React from "react";

const Contact = (props) => {
  return (
    <div
      id="ques"
      className={`text-${props.mode === "light" ? "dark" : "light"}`}
    >
      hi
    </div>
  );
};

export default Contact;
