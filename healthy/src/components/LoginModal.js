import React from "react";
import "../css/components/LoginModal.css";

function LoginModal({loginShow, loginClose, loginshow}) {
  return (
    <div className="ModalWrapper" id={`${loginshow ? "show" : "hide"}`}>
      <div className="loginmodalheader">
        <div className="loginmodaltitle">로그인</div>
      </div>
      <div className="loginmodalbody">
        <div className="idWrapper">
          <div className="idtitle">아이디</div>
          <input type="text" className="idtext" placeholder="아이디를 입력하세요."></input>
        </div>
        <div className="pwWrapper">
          <div className="pwtitle">비밀번호</div>
          <input type="password" className="pwtext" placeholder="비밀번호를 입력하세요."></input>
        </div>
      </div>
      <div className="loginfooter">
        <button onClick={loginClose} className="cancelbtn">Cancel</button>
        <button onClick={loginClose} className="loginbtn">Login</button>
      </div>
    </div>
  );
}

export default LoginModal;