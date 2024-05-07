import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import FoodCardFull from "../components/FoodCardFull";
import "../css/pages/FoodSearch.css";
import foodicon from "../assets/images/foodicon.png";

// table 줄깨짐 오류 수정 필요
// pagination 수정 필요

function FoodSearch() {
  const [foods, setFoods] = useState([]);
  const [tablefoods, settableFoods] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 5;

  // 추천음식
  let target = "된장국";

  useEffect(() => {
    getFoods();
  }, []);

  const getFoods = async () => {
    try {
      const response = await fetch(
        `https://openapi.foodsafetykorea.go.kr/api/${process.env.REACT_APP_FOOD_KEY}/COOKRCP01/json/1/1000/RCP_NM=${target}`
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

  if (tabletarget === "") {
    
  } else {
    tabletarget = "/RCP_NM="+tabletarget;
  }

  const getTableFoods = async () => {
    try {
      const response = await fetch(
        `https://openapi.foodsafetykorea.go.kr/api/${process.env.REACT_APP_FOOD_KEY}/COOKRCP01/json/1/1000${tabletarget}`
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

  useEffect(() => {
    Promise.all([getFoods(), getTableFoods(), getTotalPages()]).then(() =>
      setLoading(false)
    );
  }, []);

  // 페이지네이션
  const getTotalPages = async () => {
    try {
      const response = await fetch(
        `https://openapi.foodsafetykorea.go.kr/api/${process.env.REACT_APP_FOOD_KEY}/COOKRCP01/json/1/1000${tabletarget}`
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
  }, [tablefoods]);

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
      {loading ? (
        <div className="Loading">Loading...</div>
      ) : (
        <div>
          <Navbar />
          <div className="contentWrapper">
            <div className="FoodrecommendWrapper">
              <div className="recommendtitle">
                <img alt="" src={foodicon} className="iconimg" />
                <p className="text">오늘의 추천음식</p>
              </div>
              <div className="FoodCardWrapper">
                {foods.map((food, index) => (
                  <div className="InnerFoodCardWrapper">
                    <FoodCardFull
                      className="foodcardfull"
                      backgroundImage={food.ATT_FILE_NO_MK}
                      foodname={food.RCP_NM}
                      kcal={food.INFO_ENG}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="TableWrapper">
              <table className="foodtable">
                <thead>
                  <tr className="tableheader">
                    <th style={{ width: "30%" }}>음식명</th>
                    <th style={{ width: "30%" }}>1인분당 칼로리</th>
                    <th style={{ width: "40%", textAlign: "left" }}>
                      상세영양정보
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {tablefoods.map((tablefood, index) => (
                    <tr className="tablecontent" key={index}>
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
                </tbody>
              </table>
            </div>
            <div className="pagination">
              <button
                className="pagebtn"
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  className="innerbtn"
                  key={index + 1}
                  onClick={() => handlePageChange(index + 1)}
                  id={currentPage === index + 1 ? "active" : ""}
                >
                  {index + 1}
                </button>
              ))}
              <button
                className="pagebtn"
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
      ;
    </div>
  );
}

export default FoodSearch;
