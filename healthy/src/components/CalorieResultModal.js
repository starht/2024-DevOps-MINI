import React from "react";
import "../css/components/CalorieResultModal.css";
import Checked from "../assets/images/check.png";

function CalorieResultModal({ calresShow, calresClose, calresshow}) {
  const segmentStyle = (value, color) => {
    return {
      flex: value,
      backgroundColor: color,
    };
  };

  return (
    <div
      id={calresshow ? "calresbackgroundon" : "calresbackgroundoff"}
      onClick={(e) => {
        if (
          e.target.id === "calresbackgroundon" ||
          e.target.id === "calresbackgroundoff"
        ) {
          calresClose();
        }
      }}
    >
      <div
        className={`calresModalWrapper ${
          calresshow ? "calresshow" : "calreshide"
        }`}
      >
        <div className="calresmodalheader">
          <img src={Checked} className="resultcheckicon" alt="" />
          <div className="calresmodaltitle">칼로리 처방 결과</div>
          <div className="calresresultexplanation">
            체중감량 시 운동으로 소모하는 열량을 늘리고 섭취량을 줄이는 것을
            병행하는 것을 권장합니다.
          </div>
        </div>
        <div className="calresmodalbody">
          <div className="firstrow">
          <div className="goalmonWrapper">
            <div className="goalmontitle">총 감량기간</div>
            <input
              readOnly="readonly"
              type="text"
              className="goalmon"
            />
          </div>
          <div className="nowkgWrapper">
            <div className="nowkgtitle">현재 체중</div>
            <input
              readOnly="readonly"
              type="text"
              className="nowkg"
            />
          </div>
          <div className="goalkgWrapper">
            <div className="goalkgtitle">목표체중</div>
            <input
              readOnly="readonly"
              type="text"
              className="goalkg"
            />
          </div>
          </div>
          <div className="secondrow">
          <div className="goalintakecalWrapper">
            <div className="goalintakecaltitle">하루 동안 첩취해야 할 음식 칼로리</div>
            <input
              readOnly="readonly"
              type="text"
              className="goalintakecal"
            />
          </div>
          <div className="goalexcalWrapper">
            <div className="goalexcaltitle">하루 동안 운동으로 소모해야 할 칼로리</div>
            <input
              readOnly="readonly"
              type="text"
              className="goalexcal"
            />
          </div>
          </div>
          <div className="thridrow">
            <div className="calextitle">하루 소비 칼로리는 <span>Kcal</span></div>
            <div className="barbox">
              <div className="colorbarWrapper">
                <div className="bmrbar" style={segmentStyle(50, "#3498db")}></div>
                <div className="ambar" style={segmentStyle(20, "#2ecc71")}></div>
                <div className="digenerbar"style={segmentStyle(30, "#ff9ff3")}></div>
              </div>
              <div className="exWrapper">
                <div className="bmrex">기초대사량</div>
                <div className="amex">활동대사량</div>
                <div className="digenerex">소화를 위한 에너지</div>
              </div>
            </div>
          </div>
        </div>
        <div className="calresfooter">
          <button onClick={calresClose} className="calrescancelbtn">
            Cancel
          </button>
          <button onClick={calresClose} className="calressavebtn">
            SAVE
          </button>
        </div>
      </div>
    </div>
  );
}

export default CalorieResultModal;
