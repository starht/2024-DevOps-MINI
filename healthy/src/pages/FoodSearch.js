import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import FoodCardFull from "../components/FoodCardFull";
import "../css/pages/FoodSearch.css";
import foodicon from "../assets/images/foodicon.png";

function FoodSearch() {
  const [foods, setFoods] = useState([]);
  const [tablefoods, settableFoods] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 5;

  // 추천음식
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

  //테이블
  let tabletarget = "된장국";

  const getTableFoods = async () => {
    try {
      const response = await fetch(
        `https://openapi.foodsafetykorea.go.kr/api/${process.env.REACT_APP_FOOD_KEY}/COOKRCP01/json/${currentPage}/${itemsPerPage}/RCP_NM=${tabletarget}`
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

  const getTotalPages = async () => {
    try {
      const response = await fetch(
        `https://openapi.foodsafetykorea.go.kr/api/${process.env.REACT_APP_FOOD_KEY}/COOKRCP01/json/1/1000/RCP_NM=${tabletarget}`
      );
      if (!response.ok) {
        throw new Error("failed to fetch");
      }
      const json = await response.json();
      const total = Math.ceil(json.COOKRCP01.row.length / itemsPerPage);
      setTotalPages(total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTableFoods();
  }, [currentPage]);

  useEffect(() => {
    getTotalPages();
  }, [tablefoods]); // tablefoods가 변경될 때마다 getTotalPages 함수를 호출합니다.


  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  //상세영양정보 함수
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
              <th style={{ width: "40%", textAlign: "left" }}>상세영양정보</th>
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
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={currentPage === index + 1 ? "active" : ""}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FoodSearch;
