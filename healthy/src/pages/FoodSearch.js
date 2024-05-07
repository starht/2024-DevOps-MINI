import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import FoodCardFull from "../components/FoodCardFull";
import "../css/pages/FoodSearch.css";
import foodicon from "../assets/images/foodicon.png";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import db from "../assets/json/db.json";
import Loading from "../components/Loading";
import {Link} from "react-router-dom";

function FoodSearch() {
  const [foods, setFoods] = useState([]);
  const [tablefoods, settableFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

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
        5
      );
      setFoods(selectedItems);
    } catch (error) {
      console.log(error);
    }
  };

  //테이블
  let tabletarget = "";

  if (tabletarget === "") {
  } else {
    tabletarget = "/RCP_NM=" + tabletarget;
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
    Promise.all([getFoods(), getTableFoods()]).then(() => setLoading(false));
  }, []);

  // 페이지네이션
  const ramenPerPage = 10; // 페이지당 리스트 개수
  const currentPageLast = currentPage * ramenPerPage; // 현재 페이지의 처음
  const currentPageFirst = currentPageLast - ramenPerPage; /// 현재 페이지의 끝
  const currentTableFoods = tablefoods.slice(currentPageFirst, currentPageLast); // 현재 페이지의 음식 목록
  const pageNumber = Math.ceil(tablefoods.length / ramenPerPage); // 총 페이지 수

  const handleChange = (event, value) => {
    setCurrentPage(value);
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
        <Loading />
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
                  <div className="InnerFoodCardWrapper" key={index}>
                    <FoodCardFull
                      className="foodcardfull"
                      backgroundImage={food.picture}
                      foodname={food.foodname}
                      kcal={food.kcal}
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
                  {currentTableFoods.map((tablefood, index) => (
                    <tr className="tablecontent" key={index}>
                      <td>
                      <Link className="link" to={`/detail/${tablefood.RCP_NM}`}>
                          {tablefood.RCP_NM}
                      </Link>
                      </td>
                      <td>
                        <Link className="link" to={`/detail/${tablefood.RCP_NM}`}>
                        {tablefood.INFO_ENG} Kcal
                        </Link>
                      </td>
                      <td className="colorbarwrapper">
                      <Link className="link" to={`/detail/${tablefood.RCP_NM}`}>
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
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="pagination">
              <Stack spacing={2}>
                <Pagination
                  count={pageNumber}
                  shape="rounded"
                  onChange={handleChange}
                />
              </Stack>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FoodSearch;
