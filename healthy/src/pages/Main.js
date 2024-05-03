import ExerciseCard from "../components/ExerciseCard";
import React from "react";
import "../css/pages/Main.css";
import FoodCardLeft from "../components/FoodCardLeft";
import FoodCardRight from "../components/FoodCardRight";
import { useState, useEffect } from "react";

function Main() {
  const [foods, setFoods] = useState([]);
  // const [isLoadig, setIsLoading] = useState(true);
  let target = "된장국";
  if (target !== "") {
    target = "/RCP_NM=" + target;
  }
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
  return (
    <div className="App">
      <header className="App-header">
        <ExerciseCard />
        <div className="FoodLeft">
          {foods.map((food) => (
            <FoodCardLeft
              ATT_FILE_NO_MK={food.ATT_FILE_NO_MK}
              RCP_NM={food.RCP_NM}
              INFO_ENG={food.INFO_ENG}
            />
          ))}
        </div>
        <FoodCardRight />
      </header>
    </div>
  );
}

export default Main;
