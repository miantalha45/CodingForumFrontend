import React from "react";

const About = (props) => {
  return (
    <>
      <div
        id="ques"
        className={`text-${props.mode === "light" ? "dark" : "light"}`}
      >
        hi
      </div>
    </>
  );
};

export default About;
