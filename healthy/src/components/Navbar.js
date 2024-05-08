import React, { useState } from "react";
import "../css/components/Navbar.css";
import logo from "../assets/images/logo.png";
import search from "../assets/images/search.png";

function Navbar({ onSearch }) {
  const [searchType, setSearchType] = useState("food");
  const [searchQuery, setSearchQuery] = useState("");

  const handleCheckboxChange = (event) => {
    setSearchType(event.target.checked ? "food" : "exercise");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(searchType);
    onSearch(searchQuery, searchType); // 검색어와 검색 유형 전달
  };

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="nav">
      <img className="nav-logo" src={logo} alt="Logo" />
      <div className="title">HealthyWorld</div>
      <div className="nav-wrap">
        <a className="nav-item" href="/">
          Home
        </a>
        <a className="nav-item" href="/foodsearch">
          음식 조회
        </a>
        <a className="nav-item" href="/exercisesearch">
          운동 조회
        </a>
      </div>
      <div className="nav-search">
        <form onSubmit={handleSubmit}>
          <div className="search-wrap">
            <input
              className="search-input"
              type="search"
              placeholder="Search"
              value={searchQuery}
              onChange={handleInputChange}
            />
            <button className="search-btn-wrap" type="submit">
              <img className="search-btn" src={search} alt="Search" />
            </button>
          </div>
          <div className="toggle-btn r" id="button-1">
            <input
              type="checkbox"
              className="checkbox"
              onChange={handleCheckboxChange}
            />
            <div className="food"></div>
            <div className="exercise"></div>
          </div>
        </form>
      </div>
      <div className="nav-login">
        <button className="login" href="/mypage">
          로그인
        </button>
      </div>
    </div>
  );
}

export default Navbar;
