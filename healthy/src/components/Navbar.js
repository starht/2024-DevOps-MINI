import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/components/Navbar.css";
import logo from "../assets/images/logo.png";
import search from "../assets/images/search.png";
import { useAuth } from "../contexts/AuthContext";

function Navbar({ onSearch, loginShow }) {
  const [searchType, setSearchType] = useState("food");
  const [searchQuery, setSearchQuery] = useState("");
  const { isLoggedIn, login, logout } = useAuth();
  const navigate = useNavigate();

  const handleCheckboxChange = (event) => {
    setSearchType(event.target.checked ? "exercise" : "food");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(searchType);
    onSearch(searchQuery, searchType);
  };

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleLogoutClick = () => {
    logout();
    navigate("/");
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
        {isLoggedIn ? (
          <div>
            <button className="mypage" onClick={() => navigate("/mypage")}>
              마이페이지
            </button>
            <button className="logout" onClick={handleLogoutClick}>
              로그아웃
            </button>
          </div>
        ) : (
          <button className="login" href="/mypage" onClick={loginShow}>
            로그인
          </button>
        )}
      </div>
    </div>
  );
}

export default Navbar;
