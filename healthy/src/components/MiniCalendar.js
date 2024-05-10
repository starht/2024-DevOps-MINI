import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import moment from "moment";
import "react-calendar/dist/Calendar.css";
import "../css/components/MiniCalendar.css";
import axios from "axios";

const MiniCalendar = () => {
  const [value, onChange] = useState(new Date());
  const [Resarr, setResarr] = useState({});
  const [userSelectedData, setUserSelectedData] = useState(null); // 추가: 유저 데이터 상태

  useEffect(() => {
    getInConsume();
  }, []);

  const getInConsume = async () => {
    try {
      const storedId = localStorage.getItem("id");
      const storedIdObj = JSON.parse(storedId);
      const id = storedIdObj.id;

      const intakeResponse = await axios.get(`http://localhost:4000/intakecalorie?userid=${id}`);
      const intakeSelectedData = intakeResponse.data;
      const burnResponse = await axios.get(`http://localhost:4000/burncalorie?userid=${id}`);
      const burnSelectedData = burnResponse.data;

      let arr = {};

      for (let i = 0; i < intakeSelectedData.length; i++) {
        const date = intakeSelectedData[i].date;
        const intakeSum = (parseInt(intakeSelectedData[i].breakfast) || 0) +
                          (parseInt(intakeSelectedData[i].lunch) || 0) +
                          (parseInt(intakeSelectedData[i].dinner) || 0) +
                          (parseInt(intakeSelectedData[i].snack) || 0);
        arr[date] = intakeSum;
      }

      for (let i = 0; i < burnSelectedData.length; i++) {
        const date = burnSelectedData[i].date;
        const burnSum = parseInt(burnSelectedData[i].calorie);
        arr[date] = (arr[date] || 0) - burnSum;
      }

      setResarr(arr);
      
      // 추가: 유저 데이터 가져오기
      const userResponse = await axios.get(`http://localhost:4000/calories?id=${id}`);
      setUserSelectedData(userResponse.data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const getTileClassName = ({ date }) => {
    const formattedDate = moment(date).format("YYYY-MM-DD");
    const value = Resarr[formattedDate];

    if (value !== undefined && userSelectedData) {
      const target = userSelectedData.eatneeded - userSelectedData.workoutneeded;
      if (target !== undefined) {
        return (target >= value ? 'missionsuccess' : 'missionfailed');
      }
    }

    return '';
  };

  return (
    <div>
      <Calendar
        className="minical"
        locale="ko"
        onChange={onChange}
        value={value}
        next2Label={null}
        prev2Label={null}
        formatDay={(locale, date) => moment(date).format("D")}
        showNeighboringMonth={false}
        tileClassName={getTileClassName}
      />
    </div>
  );
};

export default MiniCalendar;
