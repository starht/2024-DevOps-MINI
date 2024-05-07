import React, { useState, useEffect } from "react";
import "../css/pages/Main.css";
import ExerciseCard from "../components/ExerciseCard";
import FoodCardLeft from "../components/FoodCardLeft";
import FoodCardRight from "../components/FoodCardRight";
import Navbar from "../components/Navbar";
import banner from "../assets/images/배너.png";
import db from "../assets/json/db.json"

function Main() {
  const [youtubes, setYoutubes] = useState([]);
  const [foods, setFoods] = useState([]);
  const [exercises, setExercises] = useState([]);
  const API_KEY = process.env.REACT_APP_EXERCISE_KEY;

  let exercisetarget = "복싱";

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

  useEffect(() => {
    getExercises();
  }, []);

  const getExercises = async () => {
    try {
      const response = await fetch(
        "https://api.odcloud.kr/api/15068730/v1/uddi:734ff9bb-3696-4993-a365-c0201eb0a6cd?perPage=360&serviceKey=" +
          API_KEY
      );
      if (!response.ok) {
        throw new Error("Failed to fetch exercises");
      }
      const json = await response.json();
      const filteredExercises = json.data.filter(
        (exercise) => exercise.운동명 === exercisetarget
      );
      setExercises(filteredExercises);
    } catch (error) {
      console.error("Error fetching exercises:", error);
    }
  };

  useEffect(() => {
    getYoutubes();
  }, []);

  const getYoutubes = async () => {
    try {
      const response = await fetch(
        "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=" +
          exercisetarget +
          "배우기0&type=video&regionCode=kr&key=" +
          process.env.REACT_APP_YOUTUBE_API_KEY
      );
      if (!response.ok) {
        throw new Error("Failed to fetch thumbnails");
      }
      const json = await response.json();
      setYoutubes(json.items);
    } catch (error) {
      console.error("Error fetching thumbnails:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="banner-container">
        <img className="banner" src={banner} />
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
                    ATT_FILE_NO_MK={food.picture}
                    RCP_NM={food.foodname}
                    INFO_ENG={food.kcal}
                  />
                ) : (
                  <FoodCardRight
                    ATT_FILE_NO_MK={food.picture}
                    RCP_NM={food.foodname}
                    INFO_ENG={food.kcal}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
        <div >
          {exercises.map((exercise, index) => (
          <div className="exercise-card-container">
            <div className="main-ex-card" key={index}> 
              <ExerciseCard
                key={exercise.운동명}
                kcal={exercise.단위체중당에너지소비량}
                name={exercise.운동명}
                backgroundImage={
                  youtubes[index]?.snippet?.thumbnails?.high?.url || ""
                }
                youtubeId={youtubes[index]?.id?.videoId || ""}
                />
            </div>
            <div className="main-card" key={index}> 
              <ExerciseCard
                key={exercise.운동명}
                kcal={exercise.단위체중당에너지소비량}
                name={exercise.운동명}
                backgroundImage={
                  youtubes[index]?.snippet?.thumbnails?.high?.url || ""
                }
                youtubeId={youtubes[index]?.id?.videoId || ""}
                />
            </div>
            </div>
          ))}
        </div>
        
      </div>
    </div>
  );
}

export default Main;
