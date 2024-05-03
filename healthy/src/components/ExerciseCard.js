import React, { useState, useEffect } from "react";
import "../css/components/ExerciseCard.css";
import addLogo from "../assets/images/List_Add.png";

function ExerciseCard() {
  const [exercises, setExercises] = useState([]);
  const API_KEY = process.env.REACT_APP_EXERCISE_KEY;

  useEffect(() => {
    getExercises();
  }, []);

  const getExercises = async () => {
    try {
      const response = await fetch(
        "https://api.odcloud.kr/api/15068730/v1/uddi:734ff9bb-3696-4993-a365-c0201eb0a6cd?perPage=360&serviceKey=Fbnk2N4bW%2B4o%2BsaaEFrzSXB9dL%2FMDEKDY1hzbRxbz3fJYZT4HMjw0P%2FJ3xBqwtZBKkHe0%2FgccmushZniXUBdSA%3D%3D"
        // "https://api.odcloud.kr/api/15068730/v1/uddi:734ff9bb-3696-4993-a365-c0201eb0a6cd?perPage=360&serviceKey=" +
        //   API_KEY
      );
      if (!response.ok) {
        throw new Error("Failed to fetch exercises");
      }
      const json = await response.json();
      const filteredExercises = json.data.filter(
        (exercise) => exercise.운동명 === "복싱"
      );
      setExercises(filteredExercises);
    } catch (error) {
      console.error("Error fetching exercises:", error);
    }
  };

  return (
    <div>
      {exercises.map((exercise) => (
        <div className="card-container" key={exercise.운동명}>
          <div className="card-wrapper">
            <div className="card-header">
              <div className="btn-box"></div>
              <div className="cal-box">
                {exercise.단위체중당에너지소비량} kcal
              </div>
            </div>
            <div className="name-box">
              <div className="exercise-name">{exercise.운동명}</div>
              <div className="go-to">
                <img className="add-logo" src={addLogo} alt="Add Logo" />
                운동하러 가기
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ExerciseCard;
