// FoodSearch.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import FoodCardFull from "../components/FoodCardFull";
import "../css/pages/FoodSearch.css";
import foodicon from "../assets/images/foodicon.png";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import db from "../assets/json/db.json";
import Loading from "../components/Loading";
import LoginModal from "../components/LoginModal";
import { Link, useLocation, useNavigate } from "react-router-dom";

function FoodSearch() {
  const [foods, setFoods] = useState([]);
  const [tableFoods, setTableFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loginshow, setLoginshow] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // login modal 함수
  const loginClose = () => setLoginshow(false);
  const loginShow = () => setLoginshow(true);

  // 페이지네이션
  const ramenPerPage = 10; // 페이지당 리스트 개수
  const currentPageLast = currentPage * ramenPerPage; // 현재 페이지의 처음
  const currentPageFirst = currentPageLast - ramenPerPage; // 현재 페이지의 끝
  const currentFoods = searchQuery ? searchResults : tableFoods;
  const currentResultFoods = searchResults.slice(
    currentPageFirst,
    currentPageLast
  );
  const currentTableFoods = currentFoods.slice(
    currentPageFirst,
    currentPageLast
  ); // 현재 페이지의 운동 목록
  const pageNumber = Math.ceil(currentFoods.length / ramenPerPage); // 총 페이지 수

  useEffect(() => {
    getFoods();
    getTableFoods();
  }, []);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get("query");
    if (query) {
      setSearchQuery(query);
      searchFoods(query);
    } else {
      setSearchQuery("");
      setSearchResults([]);
    }
  }, [location.search]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchResults]);

  useEffect(() => {
    if (searchQuery && tableFoods.length > 0) {
      searchFoods(searchQuery);
    }
  }, [searchQuery, tableFoods]);

  const getFoods = async () => {
    try {
      const selectedData = await axios.get("http://localhost:4000/foodlist");

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

      const selectedItems = getRandomItems(Object.values(selectedData.data), 5);
      setFoods(selectedItems);
    } catch (error) {
      console.log(error);
    }
  };

  const getTableFoods = async () => {
    try {
      const response = await fetch(
        `https://openapi.foodsafetykorea.go.kr/api/${process.env.REACT_APP_FOOD_KEY}/COOKRCP01/json/1/1000`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch");
      }
      const json = await response.json();
      setTableFoods(json.COOKRCP01.row);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleSearch = (query, type) => {
    console.log("검색어:", query);
    console.log("검색 유형:", type);
    if (type === "food") {
      navigate(`/foodsearch?query=${query}`); // 음식 검색 결과 페이지로 이동
    } else if (type === "exercise") {
      navigate(`/exercisesearch?query=${query}`); // 운동 검색 결과 페이지로 이동
    }
    setSearchQuery(query);
    searchFoods(query);
  };

  const searchFoods = (searchQuery) => {
    if (!searchQuery) {
      setSearchResults(tableFoods);
    } else {
      const filteredResults = tableFoods.filter((food) =>
        food.RCP_NM.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(filteredResults);
    }
  };

  const segmentStyle = (value, color) => {
    return {
      flex: value,
      backgroundColor: color,
    };
  };

  const renderTableFoods = (foods) => {
    return foods.map((food, index) => (
      <tr className="tablecontent" key={index}>
        <td>
          <Link className="link" to={`/detail/${food.RCP_NM}`}>
            {food.RCP_NM}
          </Link>
        </td>
        <td>
          <Link className="link" to={`/detail/${food.RCP_NM}`}>
            {food.INFO_ENG} Kcal
          </Link>
        </td>
        <td className="colorbarwrapper">
          <Link className="link" to={`/detail/${food.RCP_NM}`}>
            <div className="color-bar">
              <div
                className="car-color-segment"
                style={segmentStyle(food.INFO_CAR, "#D7ECD5")}
              >
                {food.INFO_CAR}
              </div>
              <div
                className="pro-color-segment"
                style={segmentStyle(food.INFO_PRO, "#7ED1E3")}
              >
                {food.INFO_PRO}
              </div>
              <div
                className="fat-color-segment"
                style={segmentStyle(food.INFO_FAT, "#FFD980")}
              >
                {food.INFO_FAT}
              </div>
            </div>
          </Link>
        </td>
      </tr>
    ));
  };

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <Navbar onSearch={handleSearch} loginShow={loginShow} />
          <LoginModal
            loginShow={loginShow}
            loginClose={loginClose}
            loginshow={loginshow}
          />
          <div className="contentWrapper">
            <div className="FoodrecommendWrapper">
              <div className="recommendtitle">
                <img alt="" src={foodicon} className="iconimg" />
                <p className="text highlight">오늘의 추천음식</p>
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
                      <div className="nut-wrap">
                      <span className="nut-span">상세영양정보</span>
                        <div className="nut-text">
                          <div className="tan-box"></div>
                          <div>탄수화물</div>
                        </div>
                        <div className="nut-text">
                          <div className="dan-box"></div>
                          <div>단백질</div>
                        </div>
                        <div className="nut-text">
                          <div className="ji-box"></div>
                          <div>지방</div>
                        </div>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {searchQuery
                    ? renderTableFoods(currentResultFoods)
                    : renderTableFoods(currentTableFoods)}
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
