import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import FoodCardFull from "../components/FoodCardFull";
import "../css/pages/FoodSearch.css";
import foodicon from "../assets/images/foodicon.png";

function FoodSearch() {
  const [foods, setFoods] = useState([]);
  const [tablefoods, settableFoods] = useState([]);

  let target = "된장국";

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

  let tabletarget = "된장국";
  useEffect(() => {
    gettableFoods();
  }, []);

  const gettableFoods = async () => {
    try {
      const response = await fetch(
        `https://openapi.foodsafetykorea.go.kr/api/${process.env.REACT_APP_FOOD_KEY}/COOKRCP01/json/1/1000/RCP_NM=${tabletarget}`
      );
      if (!response.ok) {
        throw new Error("failed to fetch");
      }
      const json = await response.json();
      settableFoods(json.COOKRCP01.row);
    } catch (error) {
      console.log(error);
    }
  };
  // function calculateColor(value) {
  //   value = Math.min(value, 100);
  //   var red = Math.round(255 * (value / 100)); // 빨간색 성분
  //   var green = Math.round(255 * ((100 - value) / 100)); // 초록색 성분
  //   var blue = 0; // 파란색 성분은 0으로 고정
  //   return `rgb(${red}, ${green}, ${blue})`; // RGB 형식의 색상 문자열 반환
  // }
  const segmentStyle = (value, color) => {
    return {
      flex: value,
      backgroundColor: color,
    };
  };

  return (
    <div>
      <Navbar />
      <div className="contentWrapper">
        <div className="FoodrecommendWrapper">
          <div className="title">
            <img alt="" src={foodicon} className="iconimg" />
            <p className="text">오늘의 추천음식</p>
          </div>
          <div className="FoodCardWrapper">
            {foods.map((food) => (
              <FoodCardFull
                className="foodcardfull"
                backgroundImage={food.ATT_FILE_NO_MK}
                foodname={food.RCP_NM}
                kcal={food.INFO_ENG}
              />
            ))}
          </div>
        </div>
        <div className="TableWrapper">
          <table className="foodtable">
            <tr className="tableheader">
              <th style={{ width: "30%" }}>음식명</th>
              <th style={{ width: "30%" }}>1인분당 칼로리</th>
              <th style={{ width: "40%", textAlign:"left" }}>상세영양정보</th>
            </tr>
            {tablefoods.map((tablefood) => (
              <tr className="tablecontent">
                <td>{tablefood.RCP_NM}</td>
                <td>{tablefood.INFO_ENG} Kcal</td>
                <td className="colorbarwrapper">
                  <div className="color-bar">
                    <div
                      className="car-color-segment"
                      style={segmentStyle(tablefood.INFO_CAR, "#3498db")}
                    >
                      {tablefood.INFO_CAR}
                    </div>
                    <div
                      className="pro-color-segment"
                      style={segmentStyle(tablefood.INFO_PRO, "#2ecc71")}
                    >
                      {tablefood.INFO_PRO}
                    </div>
                    <div
                      className="fat-color-segment"
                      style={segmentStyle(tablefood.INFO_FAT, "#ff9ff3")}
                    >
                      {tablefood.INFO_FAT}
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </table>
        </div>
      </div>
    </div>
  );
}

export default FoodSearch;
