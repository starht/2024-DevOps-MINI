import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/pages/MyPage.css";
import Navbar from "../components/Navbar";
import LoginModal from "../components/LoginModal";
import foodicon from "../assets/images/foodicon.png";
import exicon from "../assets/images/fitness.png";
import heart from "../assets/images/heart.png";
import ExCalModal from "../components/ExCalModal";
import FoodCalModal from "../components/FoodCalModal";
import BigCalendar from "../components/BigCalendar";
import ExerciseCard from "../components/ExerciseCard";
import FoodCardLeft from "../components/FoodCardLeft";
import FoodCardRight from "../components/FoodCardRight";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import exerciselogo from "../assets/images/exerciselogo.png"

function MyPage() {
  const [loginshow, setLoginshow] = useState(false);
  const [excalshow, setExCalshow] = useState(false);
  const [foodcalshow, setFoodCalshow] = useState(false);
  const [goals, setGoal] = useState([]);
  const [intake, setIntake] = useState([]);
  const [consume, setConsume] = useState([]);
  const [favfoods, setfavFoods] = useState([]);
  const [favexercises, setfavExercises] = useState([]);
  const [workoutNeeded, setWorkoutNeeded] = useState(0);
  const [exsum, setExSum] = useState(0);
  const [insum, setInSum] = useState(0);
  const [foodPage, setFoodPage] = useState(1);
  const [exercisePage, setExercisePage] = useState(1);
  const [itemsPerPage] = useState(4);
  const navigate = useNavigate();

  // 운동 칼로리 입력 함수
  const excalClose = () => setExCalshow(false);
  const excalShow = () => setExCalshow(true);

  // 음식 칼로리 입력 함수
  const foodcalClose = () => setFoodCalshow(false);
  const foodcalShow = () => setFoodCalshow(true);

  // login modal 함수
  const loginClose = () => setLoginshow(false);
  const loginShow = () => setLoginshow(true);

  // 검색
  const handleSearch = (query, type) => {
    console.log("검색어:", query);
    console.log("검색 유형:", type);
    if (type === "food") {
      navigate(`/foodsearch?query=${query}`); // 음식 검색 결과 페이지로 이동
    } else if (type === "exercise") {
      navigate(`/exercisesearch?query=${query}`); // 운동 검색 결과 페이지로 이동
    }
  };

  // 섭취 칼로리 총합
  useEffect(() => {
    getIntake();
  }, []);

  let insumtemp = 0;

  const getIntake = async () => {
    try {
      const storedId = localStorage.getItem("id");
      const storedIdObj = JSON.parse(storedId);
      const id = storedIdObj.id;

      const response = await axios.get(
        `http://localhost:4000/intakecalorie?userid=${id}`
      );
      const intakeselectedData = response.data;

      setIntake(intakeselectedData);
      setInSum(0);
      let arr =[];
      let k =0;

      for (let i = 0; i < intakeselectedData.length; i++) {
        let tmp = 0;
        if (intakeselectedData[i].breakfast !== null) {
          tmp += parseInt(intakeselectedData[i].breakfast);
        }
        if (intakeselectedData[i].lunch !== null) {
          tmp += parseInt(intakeselectedData[i].lunch);
        }
        if (intakeselectedData[i].dinner !== null) {
          tmp += parseInt(intakeselectedData[i].dinner);
        }
        if (intakeselectedData[i].snack !== null) {
          tmp += parseInt(intakeselectedData[i].snack);
        }
        arr[k++] = tmp;
      }
      let total = 0;
      for(let j =0;j<arr.length;j++) {
        total += arr[j];
      }

      setInSum(total);
    } catch (error) {
      console.log(error);
    }
  };

  // 운동 칼로리 총합
  useEffect(() => {
    getConsume();
  }, []);

  const getConsume = async () => {
    try {
      const storedId = localStorage.getItem("id");
      const storedIdObj = JSON.parse(storedId);
      const id = storedIdObj.id;
      const response = await axios.get(
        `http://localhost:4000/burncalorie?userid=${id}`
      );
      const consumeselectedData = response.data;

      setConsume(consumeselectedData);
      let tmp = 0;
      for (let i = 0; i < consumeselectedData.length; i++) {
        tmp += parseInt(consumeselectedData[i].calorie);
      }

      setExSum(tmp);

    } catch (error) {
      console.log(error);
    }
  };

  // 목표 데이터
  useEffect(() => {
    getGoal();
  }, []);

  const getGoal = async () => {
    try {
      const storedId = localStorage.getItem("id");
      const storedIdObj = JSON.parse(storedId);
      const id = storedIdObj.id;
      const response = await axios.get(
        `http://localhost:4000/calories?id=${id}`
      );
      const goalselectedData = response.data;

      setGoal(goalselectedData);
      // console.log(goalselectedData);

      if (goalselectedData.length > 0) {
        setWorkoutNeeded(goalselectedData[0].workoutneeded);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // 달 목표를 위한 현재 날짜 구하기
  const currentDate = new Date();
  const numberOfDaysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();
  const monthGoal = numberOfDaysInMonth * workoutNeeded;

  // 즐겨찾기 음식
  useEffect(() => {
    getfavFoods();
  }, []);

  const getfavFoods = async () => {
    try {
      const storedId = localStorage.getItem("id");
      const storedIdObj = JSON.parse(storedId);
      const id = storedIdObj.id;
      const response = await axios.get(
        `http://localhost:4000/foodfavorite?userid=${id}`
      );
      const foodselectedData = response.data;

      setfavFoods(foodselectedData);
      // console.log(foodselectedData);
    } catch (error) {
      console.log(error);
    }
  };

  // 즐겨찾기 운동
  useEffect(() => {
    getfavExercises();
  }, []);

  const getfavExercises = async () => {
    try {
      const storedId = localStorage.getItem("id");
      const storedIdObj = JSON.parse(storedId);
      const id = storedIdObj.id;
      const response = await axios.get(
        `http://localhost:4000/exercisefavorite?userid=${id}`
      );
      const exselectedData = response.data;

      setfavExercises(exselectedData);
      // console.log(exselectedData);
    } catch (error) {
      console.log(error);
    }
  };

  // 페이지네이션
  const handleFoodPageChange = (event, value) => {
    setFoodPage(value);
  };

  const handleExercisePageChange = (event, value) => {
    setExercisePage(value);
  };

  return (
    <div>
      <Navbar onSearch={handleSearch} loginShow={loginShow} />
      <LoginModal
        loginShow={loginShow}
        loginClose={loginClose}
        loginshow={loginshow}
      />
      <FoodCalModal
        foodcalshow={foodcalshow}
        foodcalShow={foodcalShow}
        foodcalClose={foodcalClose}
      />
      <ExCalModal
        excalshow={excalshow}
        excalShow={excalShow}
        excalClose={excalClose}
      />
       <div className="onGoing">
        {goals.map((goal) => (
          <div className="headerWrapper">
          <div className="ongoingGoal highlight">
            <div className="ongoingGoaltitle">
              <div className="heart-wrap">
              <img src={heart} className="heart" alt="" />
              </div>
              <div className="actualtitle">현재 진행중인 목표: </div>
            </div>
            <div className="actualgoal">
              <span className="onspan">{goal.monthunit}</span>개월 동안{" "}
              <span className="onspan">{goal.goalkg}kg</span>감량
            </div>
          </div>
            <div className="diagnosis">
              하루 권장 섭취 칼로리는 <span>{goal.eatneeded} kcal</span> 입니다. 운동으로 <span>{goal.workoutneeded} Kcal</span>를 소모해보세요.
            </div>
          </div>
        ))}
      </div>
      <div className="inputbuttonWrapper">
              <div className="foodinput" onClick={foodcalShow}></div>
              <div className="exerinput" onClick={excalShow}></div>
            </div>
      <div className="calendarinputWrapper">
        <div className="left">
          <BigCalendar
            className="bigcalendar"
            exscheduleData={consume}
            intakescheduleData={intake}
          />
          {consume.map((consume) => (
            <div></div>
          ))}
        </div>
      </div>
      <div className="right">
          <div className="inputWrapper">
            <div className="monthlyintake">
              <div className="mpcaltitle">5월 섭취 칼로리 총합</div>
              <div className="mpcalvalue">{insum}kcal</div>
            </div>
            <div className="monthlyexer">
              <div className="mpcaltitle">5월 운동 칼로리 총합</div>
              <div className="mpcalvalue">{exsum}kcal</div>
            </div>
          </div>
        </div>
     
      <div className="favfoodWrapper">
        <div className="favtitle">
          <img alt="" src={foodicon} className="mpicon" />
          <p className="mptext highlight">즐겨찾는 음식</p>
        </div>
        <div className="favfoodcardWrapper">
          {favfoods
            .slice((foodPage - 1) * itemsPerPage, foodPage * itemsPerPage)
            .map((food, index) => (
              <div
                className="midcardWrapper"
                key={index}
              >
                <div className="innerfoodcard">
                  {index % 4 > 1 ? (
                    <FoodCardLeft
                      index={food.foodname + index}
                      ATT_FILE_NO_MK={food.picture}
                      RCP_NM={food.foodname}
                      INFO_ENG={food.kcal}
                    />
                  ) : (
                    <FoodCardRight
                      index={food.foodname + index}
                      ATT_FILE_NO_MK={food.picture}
                      RCP_NM={food.foodname}
                      INFO_ENG={food.kcal}
                    />
                  )}
                </div>
              </div>
            ))}
        </div>
        <div className="mypage-pagination">
          <Stack spacing={2}>
            <Pagination
              count={Math.ceil(favfoods.length / itemsPerPage)}
              page={foodPage}
              onChange={handleFoodPageChange}
              variant="outlined"
              shape="rounded"
            />
          </Stack>
        </div>
        <div className="favexWrapper">
          <div className="favtitle">
            <img alt="" src={exicon} className="mpicon" />
            <p className="mptext highlight">즐겨찾는 운동</p>
          </div>
          <div className="favexcardWrapper">
            <div className="midexcardWrapper">
              {favexercises
                .slice(
                  (exercisePage - 1) * itemsPerPage,
                  exercisePage * itemsPerPage
                )
                .map((exercise, index) => (
                  <div className="innerexcard" key={index}>
                    <ExerciseCard
                      index={exercise.운동명 + index}
                      kcal={exercise.단위체중당에너지소비량}
                      name={exercise.운동명}
                      backgroundImage={exercise.picture}
                      youtubeId={exercise.youtubeId}
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div className="mypage-pagination">
          <Stack spacing={2}>
            <Pagination
              count={Math.ceil(favexercises.length / itemsPerPage)}
              page={exercisePage}
              onChange={handleExercisePageChange}
              variant="outlined"
              shape="rounded"
            />
          </Stack>
        </div>
      </div>
    </div>
  );
}

export default MyPage;
