import React from "react";
import "./Header.scss";

const Header = (props) => {
  return (
    <div className="heading">
      <div className="heading__logo--text">
        <span className="heading__logo--text--1">Live. </span>
        <span className="heading__logo--text--2">24x7</span>
      </div>
      <div className="heading__link">
        <ul className="heading__link--list">
          <li>
            <span>HOME</span>
          </li>
          <li>
            <span>MAP</span>
          </li>
          <li>
            <span>CONTACT</span>
          </li>
          <li className="heading__link--list-1">
            <span>GET APP</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
