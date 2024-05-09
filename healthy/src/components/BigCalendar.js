import React, { useState } from "react";
import Calendar from "react-calendar";
import moment from "moment";
import "react-calendar/dist/Calendar.css";
import "../css/components/BigCalendar.css";

function BigCalendar({ exscheduleData, intakescheduleData }) {
  const [value, onChange] = useState(new Date());
  const monthOfActiveDate = moment(value).format("YYYY-MM");
  const [activeMonth, setActiveMonth] = useState(monthOfActiveDate);
  

  const getActiveMonth = (activeStartDate) => {
    const newActiveMonth = moment(activeStartDate).format("YYYY-MM");
    setActiveMonth(newActiveMonth);
  };

  //달력에 운동 칼로리 표시
  
  const getconsumeCal = (date) => {
    const exformattedDate = moment(date).format('YYYY-MM-DD');
    const exschedule = exscheduleData.find((item) => item.date === exformattedDate);
    return exschedule ? `exercise: ${exschedule.calorie}kcal` : "";
  };

  //달력에 섭취 칼로리 표시

  const getintakeCal = (date) => {
    const intakeformattedDate = moment(date).format('YYYY-MM-DD');
    const intakeschedule = intakescheduleData.find((item) => item.date === intakeformattedDate);

    if (intakeschedule) {
      return (
        <div>
          {intakeschedule.breakfast !== null && <div>Breakfast: {intakeschedule.breakfast}kcal</div>}
          {intakeschedule.lunch !== null && <div>Lunch: {intakeschedule.lunch}kcal</div>}
          {intakeschedule.dinner !== null && <div>Dinner: {intakeschedule.dinner}kcal</div>}
          {intakeschedule.snack !== null && <div>Snack: {intakeschedule.snack}kcal</div>}
        </div>
      );
    } else {
      return "";
    }
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
        onActiveStartDateChange={({ activeStartDate }) =>
          getActiveMonth(activeStartDate)
        }
        tileContent={({ date }) => (
          <div className="kcalbox" style={{fontSize:"0.7rem"}}>
            <div className="consumeCalWrapper">
            {getconsumeCal(date)}
            </div>
            <div className="intakeCalWrapper">
            {getintakeCal(date)}
            </div>
          </div>
        )}
      />
    </div>
  );
}

export default BigCalendar;
