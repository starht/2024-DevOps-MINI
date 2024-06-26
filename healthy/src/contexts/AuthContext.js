// AuthContext.js

import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null); // 로그인한 사용자 정보

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const { isLoggedIn, id, userid, password } = JSON.parse(user);
      setIsLoggedIn(isLoggedIn);
      setLoggedInUser({ id, userid, password }); // 로그인한 사용자 정보 설정
    }
  }, []);

  const login = (id, userid, password) => {
    setIsLoggedIn(true);
    localStorage.setItem("id", JSON.stringify({ id }));
    localStorage.setItem("userid", JSON.stringify({ userid }));
    localStorage.setItem("password", JSON.stringify({ password }));
    localStorage.setItem("user", JSON.stringify({ isLoggedIn: true }));
  };

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("user");
    localStorage.removeItem("userid");
    localStorage.removeItem("password");
    localStorage.removeItem("id");
    setLoggedInUser(null); // 로그아웃 시 사용자 정보 초기화
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, loggedInUser }}>
      {children}
    </AuthContext.Provider>
  );
};
