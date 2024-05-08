import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import "../css/pages/ExerciseSearch.css";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import FoodBanner from "../assets/images/운동배너.png";
import youtube from "../assets/images/youtube-logo-icon.png";
import Loading from "../components/Loading"
import { useLocation, useNavigate } from "react-router-dom";

function ExerciseSearch() {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const API_KEY = process.env.REACT_APP_EXERCISE_KEY;
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  // 페이지네이션
  const ramenPerPage = 10; // 페이지당 리스트 개수
  const currentPageLast = currentPage * ramenPerPage; // 현재 페이지의 처음
  const currentPageFirst = currentPageLast - ramenPerPage; // 현재 페이지의 끝
  const currentExercises = searchQuery ? searchResults : exercises;
  const currentExercise = currentExercises.slice(currentPageFirst, currentPageLast); // 현재 페이지의 운동 목록
  const pageNumber = Math.ceil(currentExercises.length / ramenPerPage); // 총 페이지 수

  useEffect(() => {
    getExercises().then(() => setLoading(false)); // 데이터를 불러온 후 로딩 상태 변경
  }, []);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get("query");
    if (query) {
      setSearchQuery(query);
      searchExercises(query);
    } else {
      setSearchQuery("");
      setSearchResults([]);
    }
  }, [location.search]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchResults]);

  useEffect(() => {
    if (searchQuery && exercises.length > 0) {
      searchExercises(searchQuery);
    }
  }, [searchQuery, exercises]);

  const getExercises = async () => {
    try {
      const response = await fetch(
        "https://api.odcloud.kr/api/15068730/v1/uddi:734ff9bb-3696-4993-a365-c0201eb0a6cd?perPage=360&serviceKey=" +
          API_KEY
      );
      if (!response.ok) {
        throw new Error("Failed to fetch exercises");
      }
      const json = await response.json();
      setExercises(json.data);
    } catch (error) {
      console.error("Error fetching exercises:", error);
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
    searchExercises(query);
  };

  const searchExercises = (searchQuery) => {
    if (!searchQuery) {
      setSearchResults(exercises);
    } else {
      const filteredResults = exercises.filter((exercise) =>
      exercise.운동명.includes(searchQuery)
      );
      setSearchResults(filteredResults);
    }
  };

  const handleSearchYouTube = (exerciseName) => {
    const youtubeSearchUrl = `https://www.youtube.com/results?search_query=${exerciseName}+배우기`;
    window.open(youtubeSearchUrl, "_blank");
  };

  const renderExercises = (exercise) => {
    return exercise.map((exercise, index) => (
      <tr className="table-content" key={index}>
        <td>{exercise.운동명}</td>
        <td>1분</td>
        <td>{exercise.단위체중당에너지소비량} Kcal</td>
        <td className="youtube-logo-wrap">
            <img className="youtube-logo" src={youtube} onClick={() => handleSearchYouTube(exercise.운동명)} />
        </td>
      </tr>
    ))
  }

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <Navbar onSearch={handleSearch} />
          <div className="contentWrapper">
            <div>
              <img className="exercise-banner" src={FoodBanner} />
            </div>
            <div className="table-wrapper">
              <table className="exercise-table">
                <thead>
                  <tr className="table-header">
                    <th style={{ width: "25%" }}>운동명</th>
                    <th style={{ width: "25%" }}>단위시간</th>
                    <th style={{ width: "25%" }}>칼로리</th>
                    <th style={{ width: "25%" }}>유튜브에서 검색</th>
                  </tr>
                </thead>
                <tbody>
                {searchQuery
                    ? renderExercises(searchResults)
                    : renderExercises(currentExercise)}
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

export default ExerciseSearch;

