import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/components/ExerciseCard.css";
import PropTypes from "prop-types";
import addLogo from "../assets/images/List_Add.png";

function ExerciseCard({ index, name, kcal, backgroundImage, youtubeId }) {
  const [isSaved, setIsSaved] = useState(false);

  const handleClick = () => {
    const youtubeUrl = `https://www.youtube.com/watch?v=${youtubeId}`;
    window.open(youtubeUrl, "_blank");
    console.log("click");
  };

  const handleSave = () => {
    const storedId = localStorage.getItem("id");
    const storedIdObj = JSON.parse(storedId);
    const id = storedIdObj.id;

    axios.get(`http://localhost:4000/exercisefavorite?userid=${id}&운동명=${name}`)
    .then(existingExerciseResponse => {
      if (existingExerciseResponse.data.length > 0) {
        const existingExercise = existingExerciseResponse.data[0];
        axios.patch(`http://localhost:4000/exercisefavorite/${existingExercise.id}`, {
          userid: id,
          단위체중당에너지소비량: kcal,
          운동명: name,
          youtubeId: youtubeId,
          picture: backgroundImage,
        })
          .then(response => {
            setIsSaved(true);
          })
          .catch(error => {
            console.error('Error updating exercise:', error);
          });
      } else {
        axios.post("http://localhost:4000/exercisefavorite", {
          userid: id,
          단위체중당에너지소비량: kcal,
          운동명: name,
          youtubeId: youtubeId,
          picture: backgroundImage,
        })
          .then(response => {
            setIsSaved(true);
          })
          .catch(error => {
            console.error('Error saving exercise:', error);
          });
      }
    })
    .catch(error => {
      console.error('Error checking existing exercise:', error);
    });
};

  return (
    <div
      className="card-container"
      key={index}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="card-wrapper">
        <div className="card-header">
          <div className="btn-box" onClick={() => handleClick()}></div>
          <div className="cal-box">{kcal} kcal</div>
        </div>
        <div className="name-box">
          <div className="exercise-name">{name}</div>
          <div className="go-to" onClick={() => handleSave()}>
            <img className="add-logo" src={addLogo} alt="Add Logo" />
            운동 저장
          </div>
        </div>
      </div>
    </div>
  );
}

ExerciseCard.propTypes = {
  name: PropTypes.string.isRequired,
  kcal: PropTypes.string.isRequired,
  backgroundImage: PropTypes.string.isRequired,
  youtubeId: PropTypes.string.isRequired,
};

export default ExerciseCard;
