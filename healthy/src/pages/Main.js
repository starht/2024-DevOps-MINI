import React, { useState, useEffect } from "react";
import '../css/pages/Main.css';
import ExerciseCard from '../components/ExerciseCard';
import FoodCardLeft from '../components/FoodCardLeft';
import FoodCardRight from '../components/FoodCardRight';

function Main() {
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
    <div className="App">
      <header className="App-header">
      {exercises.map((exercise) => (
        <ExerciseCard
        key={exercise.운동명}
        kcal={exercise.단위체중당에너지소비량}
        name={exercise.운동명}
        />
      ))}
        <FoodCardLeft />
        <FoodCardRight />
      </header>
    </div>
  );
}

export default Main;
