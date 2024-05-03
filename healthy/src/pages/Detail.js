import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import FoodCardLeft from "../components/FoodCardLeft";

function Detail() {
  const [foods, setFoods] = useState([]);
  const { recipename } = useParams();

  useEffect(() => {
    getFoods();
  }, [recipename]);

  const getFoods = async () => {
    try {
      const response = await fetch(
        `https://openapi.foodsafetykorea.go.kr/api/${
          process.env.REACT_APP_FOOD_KEY
        }/COOKRCP01/json/1/10/RCP_NM=${recipename}`
      );
      if (!response.ok) {
        throw new Error("failed to fetch");
      }
      const json = await response.json();
      const filteredFoods = json.COOKRCP01.row.filter(
        (food) => food.RCP_NM === recipename
      );
      setFoods(filteredFoods);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>{recipename}</h1>
      {foods.map((food) => (
        <FoodCardLeft
          ATT_FILE_NO_MK={food.ATT_FILE_NO_MK}
          RCP_NM={food.RCP_NM}
          INFO_ENG={food.INFO_ENG}
        />
      ))}
    </div>
  );
}

export default Detail;
