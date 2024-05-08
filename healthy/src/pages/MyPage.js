import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import foodicon from "../assets/images/foodicon.png";
import exicon from "../assets/images/fitness.png"
import heart from "../assets/images/heart.png"

function MyPage() {
  return (
    <div>
      <Navbar></Navbar>
      <div className="calendarinputWrapper">
        {/* calendar */}
        <div className="inputWrapper">
          <div className="inputbuttonWrapper">
            <div className="foodinput"></div>
            <div className="exerinput"></div>
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
      <div className="onGoing">
        <div className="ongoingGoal">
          <div className="ongoingGoaltitle">
            <img src={heart} className="heart" alt="" />
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
