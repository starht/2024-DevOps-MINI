import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/pages/MyPage.css"
import Navbar from "../components/Navbar";
import LoginModal from "../components/LoginModal";
import foodicon from "../assets/images/foodicon.png";
import exicon from "../assets/images/fitness.png"
import heart from "../assets/images/heart.png"
import ExCalModal from "../components/ExCalModal";
import FoodCalModal from "../components/FoodCalModal";
import BigCalendar from "../components/BigCalendar";
import ExerciseCard from "../components/ExerciseCard";
import FoodCardLeft from "../components/FoodCardLeft";
import FoodCardRight from "../components/FoodCardRight";

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

  //섭취 칼로리 총합

  useEffect(() => {
    getIntake();
  }, []);
  
  const getIntake = async () => {
    try {
      const testuserid = 1;
      // const selectedData = await axios.get(`http://localhost:4000/favfood?userid=${userid}`);
      const response = await axios.get(`http://localhost:4000/intakecalorie?userid=${testuserid}`);
      const intakeselectedData = response.data;
  
      setIntake(intakeselectedData);
    
      for(let i = 0; i<intakeselectedData.length; i++){
        let tmp = 0;
        tmp += parseInt(intakeselectedData[i].breakfast);
        tmp += parseInt(intakeselectedData[i].lunch);
        tmp += parseInt(intakeselectedData[i].dinner);
        tmp += parseInt(intakeselectedData[i].snack);
        setInSum(tmp);
      }

    } catch (error) {
      console.log(error);
    }
  };

  //운동 칼로리 총합
  useEffect(() => {
    getConsume();
  }, []);
  
  const getConsume = async () => {
    try {
      const testuserid = 1;
      // const selectedData = await axios.get(`http://localhost:4000/favfood?userid=${userid}`);
      const response = await axios.get(`http://localhost:4000/burncalorie?userid=${testuserid}`);
      const consumeselectedData = response.data;
  
      setConsume(consumeselectedData);

      for(let i = 0; i<consumeselectedData.length; i++){
        let tmp = 0;
        tmp += parseInt(consumeselectedData[i].calorie)
        setExSum(tmp);
      }
      
    } catch (error) {
      console.log(error);
    }
  };

  //목표 데이터
  useEffect(() => {
    getGoal();
  }, []);
  
  const getGoal = async () => {
    try {
      const testuserid = 2
      // const selectedData = await axios.get(`http://localhost:4000/favfood?userid=${userid}`);
      const response = await axios.get(`http://localhost:4000/calories?id=${testuserid}`);
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

  //달 목표를 위한 현재 날짜 구하기
  const currentDate = new Date();
  const numberOfDaysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const monthGoal = numberOfDaysInMonth*workoutNeeded;

  //즐겨찾기 음식

  useEffect(() => {
    getfavFoods();
  }, []);
  
  const getfavFoods = async () => {
    try {
      const testuserid = 1
      // const selectedData = await axios.get(`http://localhost:4000/favfood?userid=${userid}`);
      const response = await axios.get(`http://localhost:4000/foodfavorite?userid=${testuserid}`);
      const foodselectedData = response.data;
  
      setfavFoods(foodselectedData);
      // console.log(foodselectedData);
    } catch (error) {
      console.log(error);
    }
  };

  //즐겨찾기 운동

  useEffect(() => {
    getfavExercises();
  }, []);
  
  const getfavExercises = async () => {
    try {
      const testuserid = 1
      // const selectedData = await axios.get(`http://localhost:4000/favfood?userid=${userid}`);
      const response = await axios.get(`http://localhost:4000/exercisefavorite?userid=${testuserid}`);
      const exselectedData = response.data;
  
      setfavExercises(exselectedData);
      // console.log(exselectedData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Navbar onSearch={handleSearch} loginShow={loginShow} />
      <LoginModal
        loginShow={loginShow}
        loginClose={loginClose}
        loginshow={loginshow}
      />
      <FoodCalModal foodcalshow={foodcalshow} foodcalShow={foodcalShow} foodcalClose={foodcalClose}/>
      <ExCalModal excalshow={excalshow} excalShow={excalShow} excalClose={excalClose}/>
      <div className="calendarinputWrapper">
        <div className="left">
        <BigCalendar className="bigcalendar"
          exscheduleData={consume}
          intakescheduleData={intake}
        />
        {consume.map((consume)=>(
          <div></div>
        ))}
        </div>
        <div className="right">
        <div className="inputWrapper">
          <div className="inputbuttonWrapper">
            <div className="foodinput" onClick={foodcalShow}></div>
            <div className="exerinput" onClick={excalShow}></div>
          </div>
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
      </div>
      <div className="onGoing">
          {goals.map((goal)=>(
            <div className="ongoingGoal">
              <div className="ongoingGoaltitle">
            <img src={heart} className="heart" alt="" />
            <div className="actualtitle">
              현재 진행중인 목표
            </div>
          </div>
            <div className="actualgoal">
              <span className="onspan">{goal.monthunit}</span>개월 동안 <span className="onspan">{goal.goalkg}kg</span>감량
            </div>
            </div>
          ))}
          <div className="monthgoalWrapper">
            <div className="monthgoalkcal">
              이번 달에 <span className="monthspan">{monthGoal}kcal</span>를 소모해야 합니다.
            </div>
            <div className="monthdaykcal">
              1일마다 <span className="monthspan">{workoutNeeded}kcal</span>를 소모해야 해요!
            </div>
          </div>
      </div>
      <div className="favfoodWrapper">
        <div className="favtitle">
          <img alt="" src={foodicon} className="mpicon" />
          <p className="mptext">즐겨찾는 음식</p>
        </div>
        <div className="favfoodcardWrapper">
        {favfoods.map((food, index) => (
          <div className="midcardWrapper" key={index} style={{ justifyContent: index % 2 === 0 ? 'flex-end' : 'flex-start' }}>
            <div className="innerfoodcard">
              {index % 4 > 1 ? (
                <FoodCardLeft
                  key={food.foodname}
                  ATT_FILE_NO_MK={food.picture}
                  RCP_NM={food.foodname}
                  INFO_ENG={food.kcal}
                />
              ) : (
                <FoodCardRight
                  key={food.foodname}
                  ATT_FILE_NO_MK={food.picture}
                  RCP_NM={food.foodname}
                  INFO_ENG={food.kcal}
                />
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="favexWrapper">
        <div className="favtitle">
          <img alt="" src={exicon} className="mpicon" />
          <p className="mptext">즐겨찾는 운동</p>
        </div>
        <div className="favexcardWrapper">
          <div className="midexcardWrapper">
        {favexercises.map((exercise, index) => (
          <div className="innerexcard" key={index}>
            <ExerciseCard
                key={exercise.운동명}
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
    </div>
    </div>
  );
}

export default MyPage;
