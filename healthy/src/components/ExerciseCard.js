import React, { useState, useEffect } from "react";
import "../css/components/ExerciseCard.css";
import PropTypes from "prop-types";
import addLogo from "../assets/images/List_Add.png";

function ExerciseCard({ name, kcal, backgroundImage }) {
  return (
    <div className="card-container" style={{backgroundImage: `url(${backgroundImage})`}}>
      <div className="card-wrapper">
        <div className="card-header">
          <div className="btn-box"></div>
          <div className="cal-box">{kcal} kcal</div>
        </div>
        <div className="name-box">
          <div className="exercise-name">{name}</div>
          <div className="go-to">
            <img className="add-logo" src={addLogo} alt="Add Logo" />
            운동하러 가기
          </div>
        </div>
      </div>
    </div>
  );
}

ExerciseCard.propTypes = {
  name:PropTypes.string.isRequired,
  kcal: PropTypes.string.isRequired,
};

export default ExerciseCard;
