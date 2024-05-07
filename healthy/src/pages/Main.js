import React, { useState, useEffect } from "react";
import "../css/pages/Main.css";
import ExerciseCard from "../components/ExerciseCard";
import FoodCardLeft from "../components/FoodCardLeft";
import FoodCardRight from "../components/FoodCardRight";
import Navbar from "../components/Navbar";
import banner from "../assets/images/배너.png";
import db from "../assets/json/db.json";

function Main() {
  const [foods, setFoods] = useState([]);
  const [exercises, setExercises] = useState([]);
  const API_KEY = process.env.REACT_APP_EXERCISE_KEY;

  // 추천음식
  useEffect(() => {
    getFoods();
  }, []);

  const getFoods = async () => {
    try {
      let testData = JSON.parse(JSON.stringify(db));

      const selectedTable = "foodlist";

      const selectedData = {
        [selectedTable]: testData[selectedTable],
      };

      const getRandomItems = (array, count) => {
        const shuffled = array.slice(0);
        let i = array.length;
        const min = i - count;
        let temp;
        let index;

        while (i-- > min) {
          index = Math.floor((i + 1) * Math.random());
          temp = shuffled[index];
          shuffled[index] = shuffled[i];
          shuffled[i] = temp;
        }

        return shuffled.slice(min);
      };

      const selectedItems = getRandomItems(
        Object.values(selectedData[selectedTable]),
        2
      );
      setFoods(selectedItems);
    } catch (error) {
      console.log(error);
    }
  };

  // 운동
  useEffect(() => {
    getExercises();
  }, []);

  const getExercises = async () => {
    try {
      let testData = JSON.parse(JSON.stringify(db));

      const selectedTable = "exerciselist";

      const selectedData = {
        [selectedTable]: testData[selectedTable],
      };

      const getRandomItems = (array, count) => {
        const shuffled = array.slice(0);
        let i = array.length;
        const min = i - count;
        let temp;
        let index;

        while (i-- > min) {
          index = Math.floor((i + 1) * Math.random());
          temp = shuffled[index];
          shuffled[index] = shuffled[i];
          shuffled[i] = temp;
        }

        return shuffled.slice(min);
      };

      const selectedItems = getRandomItems(
        Object.values(selectedData[selectedTable]),
        2
      );
      setExercises(selectedItems);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="banner-container">
        <img className="banner" src={banner} />
        <div className="banner-text-wrap">
          <div className="banner-text">Protect</div>
          <div className="banner-text">Your</div>
          <div className="banner-text">Health</div>
        </div>
      </div>
      <div className="cal-container">
        <div className="cal-wrapper">
          <button className="cal-btn">칼로리 처방</button>
          <div className="v-line"></div>
          <button className="cal-btn">BMI 계산</button>
        </div>
      </div>
      <div className="cards-container">
        <div className="mini-calendar">캘린더 위치</div>
        <div className="food-card-container">
          {foods.map((food, index) => (
            <div>
              <div className="main-food-card" key={index}>
                {index % 2 == 0 ? (
                  <FoodCardLeft
                    key={food.foodname}
                    ATT_FILE_NO_MK={food.picture}
                    RCP_NM={food.foodname}
                    INFO_ENG={food.kcal}
                  />
                ) : (
                  <FoodCardRight
                    key={food.foodname}
                    ATT_FILE_NO_MK={food.picture}
                    RCP_NM={food.foodname}
                    INFO_ENG={food.kcal}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="exercise-card-wrap">
          {exercises.map((exercise, index) => (
            <div className="exercise-card-container" key={index}>
              <ExerciseCard
                key={exercise.운동명}
                kcal={exercise.단위체중당에너지소비량}
                name={exercise.운동명}
                backgroundImage={exercise.picture}
                youtubeId={exercise.youtubeId}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Main;
