import React, { useState, useEffect } from "react";
import '../css/pages/Main.css';
import ExerciseCard from '../components/ExerciseCard';
import FoodCardLeft from '../components/FoodCardLeft';
import FoodCardRight from '../components/FoodCardRight';

function Main() {
  const [youtubes, setYoutubes] = useState([]);
  const [foods, setFoods] = useState([]);
  const [exercises, setExercises] = useState([]);
  const API_KEY = process.env.REACT_APP_EXERCISE_KEY;

  let cnt = 0;

  let target = "된장국";
  if (target !== "") {
    target = "/RCP_NM=" + target;
  }
  let exercisetarget = "복싱";

  useEffect(() => {
    getFoods();
  }, []);

  const getFoods = async () => {
    try {
      const response = await fetch(
        "https://openapi.foodsafetykorea.go.kr/api/" +
          process.env.REACT_APP_FOOD_KEY +
          "/COOKRCP01/json/1/10" +
          target
      );
      if (!response.ok) {
        throw new Error("failed to fetch");
      }
      const json = await response.json();
      setFoods(json.COOKRCP01.row);
      // setIsLoading(false);
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
        "https://api.odcloud.kr/api/15068730/v1/uddi:734ff9bb-3696-4993-a365-c0201eb0a6cd?perPage=360&serviceKey=Fbnk2N4bW%2B4o%2BsaaEFrzSXB9dL%2FMDEKDY1hzbRxbz3fJYZT4HMjw0P%2FJ3xBqwtZBKkHe0%2FgccmushZniXUBdSA%3D%3D"
        // "https://api.odcloud.kr/api/15068730/v1/uddi:734ff9bb-3696-4993-a365-c0201eb0a6cd?perPage=360&serviceKey=" +
        //   API_KEY
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
        "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q="+ exercisetarget + "배우기0&type=video&regionCode=kr&key=" + process.env.REACT_APP_YOUTUBE_API_KEY
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
    <div className="App">
      <header className="App-header">
      {exercises.map((exercise) => (
          <ExerciseCard
            key={exercise.운동명}
            kcal={exercise.단위체중당에너지소비량}
            name={exercise.운동명}
            backgroundImage={youtubes[0]?.snippet?.thumbnails?.high?.url}
            youtubeId={youtubes[0]?.id?.videoId}
          />
        ))}
      
        <div className="Food">
          {foods.map((food) => (
              <FoodCardLeft
                ATT_FILE_NO_MK={food.ATT_FILE_NO_MK}
                RCP_NM={food.RCP_NM}
                INFO_ENG={food.INFO_ENG}
              />
          ))}
          {foods.map((food) => (
              <FoodCardRight
              ATT_FILE_NO_MK={food.ATT_FILE_NO_MK}
              RCP_NM={food.RCP_NM}
              INFO_ENG={food.INFO_ENG}
              />
          ))}
        </div>
      </header>
    </div>
  );
}

export default Main;
