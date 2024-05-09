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
  const [foods, setFoods] = useState([]);
  const [exercises, setExercises] = useState([]);
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

  const getFoods = async () => {
    try {
      const selectedData = await axios.get("http://localhost:4000/favfood");

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

      const selectedItems = getRandomItems(Object.values(selectedData.data), 2);
      setFoods(selectedItems);
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
        <BigCalendar className="bigcalendar"/>
        </div>
        <div className="right">
        <div className="inputWrapper">
          <div className="inputbuttonWrapper">
            <div className="foodinput" onClick={foodcalShow}></div>
            <div className="exerinput" onClick={excalShow}></div>
          </div>
          <div className="monthlyintake">
            <div className="mpcaltitle">5월 섭취 칼로리 총합</div>
            <div className="mpcalvalue">10000kcal</div>
          </div>
          <div className="monthlyexer">
            <div className="mpcaltitle">5월 운동 칼로리 총합</div>
            <div className="mpcalvalue">1000kcal</div>
          </div>
        </div>
        </div>
      </div>
      <div className="onGoing">
        <div className="ongoingGoal">
          <div className="ongoingGoaltitle">
            <img src={heart} className="heart" alt="" />
            <div className="actualtitle">
              현재 진행중인 목표
            </div>
          </div>
            <div className="actualgoal">
              <span className="onspan">2</span>개월 동안 <span className="onspan">5kg</span>감량
            </div>
            </div>
          <div className="monthgoalWrapper">
            <div className="monthgoalkcal">
              이번 달에 <span className="monthspan">19500kcal</span>를 소모해야 합니다.
            </div>
            <div className="monthdaykcal">
              1일마다 <span className="monthspan">650kcal</span>를 소모해야 해요!
            </div>
          </div>
      </div>
      <div className="favfoodWrapper">
        <div className="favtitle">
          <img alt="" src={foodicon} className="mpicon" />
          <p className="mptext">즐겨찾는 음식</p>
        </div>
        <div className="favfoodcardWrapper">

        </div>
      </div>
      <div className="favexWrapper">
        <div className="favtitle">
          <img alt="" src={exicon} className="mpicon" />
          <p className="mptext">즐겨찾는 운동</p>
        </div>
          <div className="favexcardWrapper">

          </div>
      </div>
    </div>
  );
}

export default MyPage;
