import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import "../css/pages/ExerciseSearch.css";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import FoodBanner from "../assets/images/운동배너.png";
import youtube from "../assets/images/youtube-logo-icon.png";

function ExerciseSearch() {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const API_KEY = process.env.REACT_APP_EXERCISE_KEY;

  useEffect(() => {
    getExercises();
    setLoading(false);
  }, []);

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

  // 페이지네이션
  const ramenPerPage = 10; // 페이지당 리스트 개수
  const currentPageLast = currentPage * ramenPerPage; // 현재 페이지의 처음
  const currentPageFirst = currentPageLast - ramenPerPage; /// 현재 페이지의 끝
  const currentExercise = exercises.slice(currentPageFirst, currentPageLast); // 현재 페이지의 운동 목록
  const pageNumber = Math.ceil(exercises.length / ramenPerPage); // 총 페이지 수

  const handleChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleSearchYouTube = (exerciseName) => {
    const youtubeSearchUrl = `https://www.youtube.com/results?search_query=${exerciseName}+배우기`;
    window.open(youtubeSearchUrl, "_blank");
    console.log("Search on YouTube:", youtubeSearchUrl);
  };

  return (
    <div>
      {loading ? (
        <div className="Loading">Loading...</div>
      ) : (
        <div>
          <Navbar />
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
                  {currentExercise.map((exercise, index) => (
                    <tr className="table-content" key={index}>
                      <td>{exercise.운동명}</td>
                      <td>1분</td>
                      <td>{exercise.단위체중당에너지소비량} Kcal</td>
                      <td className="youtube-logo-wrap">
                          <img className="youtube-logo" src={youtube} onClick={() => handleSearchYouTube(exercise.운동명)} />
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

export default ExerciseSearch;
