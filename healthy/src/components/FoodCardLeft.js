import PropTypes from 'prop-types';
import menu from "../assets/images/menu.png";
import "../css/components/FoodCardLeft.css";
import React from "react";
import { useState, useEffect } from "react";

function FoodCardLeft({ATT_FILE_NO_MK,RCP_NM, INFO_ENG}) {

  const [foods, setFoods] = useState([]);
  // const [isLoadig, setIsLoading] = useState(true);

  useEffect(() => {
    getFoods();
  }, []);
  const getFoods = async () => {
    try {
      const response = await fetch(
        "https://openapi.foodsafetykorea.go.kr/api/" +
          process.env.REACT_APP_FOOD_KEY +
          "/COOKRCP01/json/1/1000/RCP_NM=" +
          "새우 두부 계란찜"
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
    <div>
      {foods.map((food) => (
        <div className="FoodCard">
          <div className="FoodImgWrapperLeft">
            <img src={ATT_FILE_NO_MK} alt="" className="FoodImgLeft" />
          </div>
          <div className="FoodExplanationWrapper">
            <h3>{RCP_NM}</h3>
            <p>{INFO_ENG} Kcal</p>
            <button>
              <img className="menu" src={menu} alt="" />
              레시피 저장
            </button>
          </div>
        </div>
      ))}
    </div>
  );

}
FoodCardLeft.propTypes = {
  ATT_FILE_NO_MK: PropTypes.string.isRequired,
  RCP_NM: PropTypes.string.isRequired,
  INFO_ENG: PropTypes.number.isRequired,
};

export default FoodCardLeft;
