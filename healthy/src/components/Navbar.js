import React from "react";
import "../css/components/Navbar.css"
import logo from "../assets/images/logo.png";
import search from "../assets/images/search.png"

function Navbar({loginShow}) {
  return (
      <div className="nav">
        <img className="nav-logo" src={logo} />
        <div className="title">HealthyWorld</div>
        <div className="nav-wrap">
          <a className="nav-item" href="/">Home</a>
          <a className="nav-item" href="/foodsearch">음식 조회</a>
          <a className="nav-item" href="/exercisesearch">운동 조회</a>
        </div>
        <div className="nav-search">
          <form>
            <div className="search-wrap">
              <input className="search-input" type="search" placeholder="Search" />
              <button className="search-btn" type="submit"></button>
            </div>
            <div className="toggle-btn r" id="button-1">
              <input type="checkbox" className="checkbox" />
              <div className="food"></div>
              <div className="exercise"></div>
            </div>
          </form>
        </div>
        <div className="nav-login">
          <button className="login" href="/mypage" onClick={loginShow}>로그인</button>
        </div>
      </div>
  );
}

export default Navbar;
