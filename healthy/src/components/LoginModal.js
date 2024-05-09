import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";
import "../css/components/LoginModal.css";

function LoginModal({ loginShow, loginClose, loginshow }) {
  const { login } = useAuth();
  const [id, setId] = useState("");
  const [userid, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const testUser1 = {
        id: 1,
        userid: "test1",
        password: "test1"
      };
      const testUser2 = {
        id: 2,
        userid: "test2",
        password: "test2"
      };
      if (userid === testUser1.userid  && password === testUser1.password) {
        login(1, userid, password); // id와 password를 전달하여 로그인
      }
      if(userid === testUser2.userid  && password === testUser2.password){
        login(2, userid, password); // id와 password를 전달하여 로그인
      }
      loginClose();
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <div
      id={loginshow ? "idbackgroundon" : "idbackgroundoff"}
      onClick={(e) => {
        if (
          e.target.id === "idbackgroundon" ||
          e.target.id === "idbackgroundoff"
        ) {
          loginClose();
        }
      }}
    >
      <div className={`loginModalWrapper ${loginshow ? "idshow" : "idhide"}`}>
        <div className="loginmodalheader">
          <div className="loginmodaltitle">로그인</div>
        </div>
        <form className="loginmodalbody">
          <div className="idWrapper">
            <div className="idtitle">아이디</div>
            <input
              type="text"
              className="idtext"
              placeholder="아이디를 입력하세요."
              onChange={(e) => setUserId(e.target.value)}
            />
          </div>
          <div className="pwWrapper">
            <div className="pwtitle">비밀번호</div>
            <input
              type="password"
              className="pwtext"
              placeholder="비밀번호를 입력하세요."
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </form>
        <div className="loginfooter">
          <button onClick={loginClose} className="logincancelbtn">
            Cancel
          </button>
          <button onClick={handleLogin} className="loginloginbtn">
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginModal;
