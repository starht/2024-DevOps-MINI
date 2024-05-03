// import salmon from '../assets/images/SalmonSteak.jpg';
import menu from "../assets/images/menu.png";
import "../css/components/FoodCardLeft.css";
import React from "react";
import { useState, useEffect } from "react";

function FoodCardLeft() {
  var mysql = require("mysql");

  var connection = mysql.createConnection({
    host: process.env.RDS_HOSTNAME,
    user: process.env.RDS_USERNAME,
    password: process.env.RDS_PASSWORD,
    port: process.env.RDS_PORT,
  });

  connection.connect(function (err) {
    if (err) {
      console.error("Database connection failed: " + err.stack);
      return;
    }

    console.log("Connected to database.");
  });

  const [foods, setFoods] = useState([]);
  const [isLoadig, setIsLoading] = useState(true);

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
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  // connection.end();
  return (
    <div>
      {foods.map((food) => (
        <div className="FoodCard">
          <div className="FoodImgWrapperLeft">
            <img src={food.ATT_FILE_NO_MK} alt="" className="FoodImgLeft" />
          </div>
          <div className="FoodExplanationWrapper">
            <h3>{food.RCP_NM}</h3>
            <p>{food.INFO_ENG} Kcal</p>
            <button>
              {" "}
              <img className="menu" src={menu} alt="" />
              레시피 저장
            </button>
          </div>
        </div>
      ))}
    </div>
  );

}

export default FoodCardLeft;
