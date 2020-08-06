import React from "react";
import "./loader.scss";

const loader = () => {
  return (
    <div class="content">
      <div class="planet">
        <div class="ring"></div>
        <div class="cover-ring"></div>
        <div class="spots">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <p>loading</p>
    </div>
  );
};
export default loader;
