import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/components/Navbar.css";
import logo from "../assets/images/logo.png";
import hamburger from "../assets/images/hamburger.png";
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

  const toggleActiveClass = () => {
    const navItems = document.querySelectorAll(".nav-item");
    const navSearch = document.querySelectorAll(".nav-search");
    const navLogin = document.querySelectorAll(".nav-login");
    navItems.forEach((item) => {
      item.classList.toggle("active");
    });
    navSearch.forEach((item) => {
      item.classList.toggle("active");
    });
    navLogin.forEach((item) => {
      item.classList.toggle("active");
    });
  };

  return (
    <div className="nav">
      <div className="logo-title">
        <img className="nav-logo" src={logo} alt="Logo" />
        <div className="title">HealthyWorld</div>
      </div>
      <div>
        <a href="#" className="navbar-toggle" onClick={toggleActiveClass}>
          <img className="hamburger" src={hamburger} />
        </a>
      </div>
      <div className="nav-wrap">
        <a className="nav-item" href="/">
          <div className="nav-text">Home</div>
        </a>
        <a className="nav-item" href="/foodsearch">
          <div className="nav-text">음식 조회</div>
        </a>
        <a className="nav-item" href="/exercisesearch">
          <div className="nav-text">운동 조회</div>
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
