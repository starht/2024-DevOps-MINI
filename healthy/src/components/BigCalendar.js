import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import moment from "moment";
import "react-calendar/dist/Calendar.css";
import "../css/components/BigCalendar.css";
import axios from "axios";

function BigCalendar({ exscheduleData, intakescheduleData }) {
  const [value, onChange] = useState(new Date());
  const monthOfActiveDate = moment(value).format("YYYY-MM");
  const [activeMonth, setActiveMonth] = useState(monthOfActiveDate);
  const [Resarr, setResarr] = useState({});
  const [userSelectedData, setUserSelectedData] = useState(null); // 추가: 유저 데이터 상태

  const getActiveMonth = (activeStartDate) => {
    const newActiveMonth = moment(activeStartDate).format("YYYY-MM");
    setActiveMonth(newActiveMonth);
  };

  //달력에 운동 칼로리 표시

  const getconsumeCal = (date) => {
    const exformattedDate = moment(date).format("YYYY-MM-DD");
    const exschedule = exscheduleData.find(
      (item) => item.date === exformattedDate
    );
    return exschedule ? (
      <div className="exinner">운동 : {exschedule.calorie}kcal</div>
    ) : (
      ""
    );
  };

  //달력에 섭취 칼로리 표시

  const getintakeCal = (date) => {
    const intakeformattedDate = moment(date).format("YYYY-MM-DD");
    const intakeschedule = intakescheduleData.find(
      (item) => item.date === intakeformattedDate
    );

    if (intakeschedule) {
      return (
        <div>
          {intakeschedule.breakfast !== null &&
            intakeschedule.breakfast !== 0 && (
              <div className="inner">아침 : {intakeschedule.breakfast}kcal</div>
            )}
          {intakeschedule.lunch !== null && intakeschedule.lunch !== 0 && (
            <div className="inner">점심 : {intakeschedule.lunch}kcal</div>
          )}
          {intakeschedule.dinner !== null && intakeschedule.dinner !== 0 && (
            <div className="inner">저녁 : {intakeschedule.dinner}kcal</div>
          )}
          {intakeschedule.snack !== null && intakeschedule.snack !== 0 && (
            <div className="inner">간식 : {intakeschedule.snack}kcal</div>
          )}
        </div>
      );
    } else {
      return "";
    }
  };


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
        className="bigcalandar"
        locale="ko"
        onChange={onChange}
        value={value}
        next2Label={null}
        prev2Label={null}
        formatDay={(locale, date) => moment(date).format("D")}
        showNeighboringMonth={false}
        tileClassName={getTileClassName}
        onActiveStartDateChange={({ activeStartDate }) =>
          getActiveMonth(activeStartDate)
        }
        tileContent={({ date }) => (
          <div className="kcalbox" style={{ fontSize: "0.7rem" }}>
            <div className="consumeCalWrapper">{getconsumeCal(date)}</div>
            <div className="intakeCalWrapper">{getintakeCal(date)}</div>
          </div>
        )}
      />
    </div>
  );
}

export default BigCalendar;
