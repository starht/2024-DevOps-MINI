import React from "react";
import "../css/components/BMIModal.css";

function BMIModal({bmiClose, bmishow, bmiShow }) {
  return (
    <div id={bmishow ? "backgroundon" : "backgroundoff"} onClick={bmiClose}>
      <div className={`ModalWrapper ${bmishow ? "bmishow" : "bmihide"}`}>
        <div className="bmimodalheader">
          <div className="bmimodaltitle">나의 BMI 지수 확인</div>
          <div className="bmiexplanation">BMI - 나이, 신장(cm)과 체중(kg)만으로 비만을 판정하는 비만 지수</div>
        </div>
        <div className="bmimodalbody">
          <div className="sexWrapper">

          </div>
          <div className="bornWrapper">

          </div>
          <div className="heightandweightWrapper">
          <div className="heightWrapper">
            <div className="heighttitle">키</div>
            <input
              type="text"
              className="heighttext"
              placeholder="170cm"
            />
          </div>
          <div className="weightWrapper">
            <div className="weighttitle">몸무게</div>
            <input
              type="text"
              className="weighttext"
              placeholder="80kg"
            />
          </div>
          </div>
        </div>
        <div className="bmifooter">
          <button onClick={bmiClose} className="cancelbtn">
            Cancel
          </button>
          <button onClick={bmiClose} className="loginbtn">
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default BMIModal;
