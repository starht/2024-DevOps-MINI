import React from "react";
import "../css/components/ExerciseCard.css";
import addLogo from "../assets/images/List_Add.png";

function ExerciseCard() {
  return (
    <div className="card-container">
      <div className="card-wrapper">
        <div className="card-header">
          <div className="btn-box"></div>
          <div className="cal-box">150kcal</div>
        </div>

        <div className="name-box">
          <div className="exercise-name">윗몸 일으키기</div>
          <div className="go-to">
            <img className="add-logo" src={addLogo}></img>
            운동하러 가기
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExerciseCard;
