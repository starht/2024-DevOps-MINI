import React, { useState, useEffect } from "react";
import "../css/pages/Main.css";
import ExerciseCard from "../components/ExerciseCard";
import FoodCardLeft from "../components/FoodCardLeft";
import FoodCardRight from "../components/FoodCardRight";
import Navbar from "../components/Navbar";
import banner from "../assets/images/banner.jpg";

function Main() {
  const [youtubes, setYoutubes] = useState([]);
  const [foods, setFoods] = useState([]);
  const [exercises, setExercises] = useState([]);
  const API_KEY = process.env.REACT_APP_EXERCISE_KEY;

  let target = "된장국";
  let exercisetarget = "복싱";

  useEffect(() => {
    getFoods();
  }, []);

  const getFoods = async () => {
    try {
      const response = await fetch(
        `https://openapi.foodsafetykorea.go.kr/api/${process.env.REACT_APP_FOOD_KEY}/COOKRCP01/json/1/10/RCP_NM=${target}`
      );
      if (!response.ok) {
        throw new Error("failed to fetch");
      }
      const json = await response.json();
      // setFoods(json.COOKRCP01.row);
      const filteredFoods = json.COOKRCP01.row.filter(
        (food) => food.RCP_NM === target
      );
      setFoods(filteredFoods);
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
              <div className="Food" key={index}>
                {index % 2 == 0 ? (
                  <FoodCardLeft
                    ATT_FILE_NO_MK={food.ATT_FILE_NO_MK}
                    RCP_NM={food.RCP_NM}
                    INFO_ENG={food.INFO_ENG}
                  />
                ) : (
                  <FoodCardRight
                    ATT_FILE_NO_MK={food.ATT_FILE_NO_MK}
                    RCP_NM={food.RCP_NM}
                    INFO_ENG={food.INFO_ENG}
                  />
                )}
              </div>
              <div className="Food" key={index}>
                {index % 2 === 1 ? (
                  <FoodCardLeft
                    ATT_FILE_NO_MK={food.ATT_FILE_NO_MK}
                    RCP_NM={food.RCP_NM}
                    INFO_ENG={food.INFO_ENG}
                  />
                ) : (
                  <FoodCardRight
                    ATT_FILE_NO_MK={food.ATT_FILE_NO_MK}
                    RCP_NM={food.RCP_NM}
                    INFO_ENG={food.INFO_ENG}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
        <div >
          {exercises.map((exercise, index) => (
          <div className="exercise-card-container">
              <ExerciseCard
                key={exercise.운동명}
                kcal={exercise.단위체중당에너지소비량}
                name={exercise.운동명}
                backgroundImage={
                  youtubes[index]?.snippet?.thumbnails?.high?.url || ""
                }
                youtubeId={youtubes[index]?.id?.videoId || ""}
              />
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
          ))}
        </div>
        
      </div>
    </div>
  );
}

export default Main;
