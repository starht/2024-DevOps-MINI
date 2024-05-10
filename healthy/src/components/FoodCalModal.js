import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/components/FoodCalModal.css";

function FoodCalModal({ foodcalshow, foodcalShow, foodcalClose }) {
  const [isSaved, setIsSaved] = useState(false);

  const [form, setForm] = useState({
    year: 2024,
    month: "01",
    day: "01",
    type: "",
    foodcal: "",
  });

  const now = new Date();

  let years = [];
  for (let y = now.getFullYear(); y >= 1930; y -= 1) {
    years.push(y);
  }

  let month = [];
  for (let m = 1; m <= 12; m += 1) {
    if (m < 10) {
      month.push("0" + m.toString());
    } else {
      month.push(m.toString());
    }
  }
  let days = [];

  const selectedMonth = parseInt(form.month, 10);
  const selectedYear = parseInt(form.year, 10);
  const daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate();
  for (let d = 1; d <= daysInMonth; d++) {
    if (d < 10) {
      days.push("0" + d.toString());
    } else {
      days.push(d.toString());
    }
  }

  const handleFoodcalSave = () => {
    const storedId = localStorage.getItem("id");
    const storedIdObj = JSON.parse(storedId);
    const id = storedIdObj.id;
    const date = form.year + "-" + form.month + "-" + form.day;
    let foodcal = form.foodcal;
    let type = form.type;
    const breakfast = form.breakfast;
    const lunch = form.lunch;
    const dinner = form.dinner;
    const snack = form.snack;

    if (!foodcal) {
      alert("칼로리를 입력하세요.");
      return;
    }
  
    const data = {
      userid: id,
      date: date,
    };

    const insertData = {
      userid: id,
      date: date,
      breakfast: 0,
      lunch: 0,
      dinner: 0,
      snack: 0,
    };

    if (type === "breakfast") {
      data.breakfast = foodcal;
      insertData.breakfast = foodcal;
    }
    if (type === "lunch") {
      data.lunch = foodcal;
      insertData.lunch = foodcal;
    }
    if (type === "dinner") {
      data.dinner = foodcal;
      insertData.dinner = foodcal;
    }
    if (type === "snack") {
      data.snack = foodcal;
      insertData.snack = foodcal;
    }

    axios
      .get(`http://localhost:4000/intakecalorie?userid=${id}&date=${date}`)
      .then((existingFoodcalResponse) => {
        if (existingFoodcalResponse.data.length > 0) {
          const existingFoodcal = existingFoodcalResponse.data[0];
          axios
            .patch(
              `http://localhost:4000/intakecalorie/${existingFoodcal.id}`, data)
            .then((response) => {
              setIsSaved(true);
            })
            .catch((error) => {
              console.error("Error updating exercise food:", error);
            });
        } else {
          axios
            .post("http://localhost:4000/intakecalorie", insertData)
            .then((response) => {
              setIsSaved(true);
            })
            .catch((error) => {
              console.error("Error saving food calories:", error);
            });
        }
      })
      .catch((error) => {
        console.error("Error checking existing food calories:", error);
      });

    setIsSaved(true);
  };

  const confirmClick = () => {
    if (form.year && form.month && form.day) {
      handleFoodcalSave();
    } else {
      alert("날짜를 입력하세요.");
    }
  };

  const handleCloseModal = () => {
    foodcalClose();
    setForm({
      year: 2024,
      month: "01",
      day: "01",
      type: "",
      foodcal: "",
    });
    setIsSaved(false);
  };

  useEffect(() => {
    if (isSaved) {
      handleCloseModal();
    }
  }, [isSaved]);

  return (
    <div
      id={foodcalshow ? "foodcalbackgroundon" : "foodcalbackgroundoff"}
      onClick={(e) => {
        if (
          e.target.id === "foodcalbackgroundon" ||
          e.target.id === "foodcalbackgroundoff"
        ) {
          handleCloseModal();
        }
      }}
    >
      <div
        className={`foodcalModalWrapper ${
          foodcalshow ? "foodcalshow" : "foodcalhide"
        }`}
      >
        <div className="foodcalmodalheader">
          <div className="foodcalmodaltitle">칼로리 입력하기</div>
          <div className="excalmodal-explanation">
            섭취한 칼로리를 입력하세요
          </div>
        </div>
        <div className="foodcalmodalbody">
          <div className="born-wrap">
            <div className="year-wrap">
              <div className="year-title">연도</div>
              <input input="text" className="year-text" placeholder="2000" />
            </div>
            <div className="month-wrap">
              <div className="month-title">월</div>
              <select
                className="month-select"
                value={form.month}
                onChange={(e) => setForm({ ...form, month: e.target.value })}
              >
                {month.map((item) => (
                  <option value={item} key={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
            <div className="day-wrap">
              <div className="day-title">일</div>
              <select
                className="day-select"
                value={form.day}
                onChange={(e) => setForm({ ...form, day: e.target.value })}
              >
                {days.map((item) => (
                  <option value={item} key={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="mealWrapper">
            <div className="mealtext">식사 유형</div>

            <div className="bigradioWrapper">
              <div className="radioWrapper">
                <input
                  type="radio"
                  name="meal"
                  value="breakfast"
                  className="radiobtn"
                  onChange={(e) => setForm({ ...form, type: e.target.value })}
                />
                아침
              </div>
              <div className="radioWrapper">
                <input
                  type="radio"
                  name="meal"
                  value="lunch"
                  className="radiobtn"
                  onChange={(e) => setForm({ ...form, type: e.target.value })}
                />
                점심
              </div>
              <div className="radioWrapper">
                <input
                  type="radio"
                  name="meal"
                  value="dinner"
                  className="radiobtn"
                  onChange={(e) => setForm({ ...form, type: e.target.value })}
                />
                저녁
              </div>
              <div className="radioWrapper">
                <input
                  type="radio"
                  name="meal"
                  value="snack"
                  className="radiobtn"
                  onChange={(e) => setForm({ ...form, type: e.target.value })}
                />
                간식
              </div>
            </div>
          </div>
          <div className="foodcalWrapper">
            <div className="kcal">칼로리</div>
            <input
              input="text"
              className="caltext"
              placeholder="200kcal"
              onChange={(e) => setForm({ ...form, foodcal: e.target.value })}
            />
          </div>
        </div>
        <div className="excalfooter">
          <button onClick={foodcalClose} className="foodcalcancelbtn">
            Cancel
          </button>
          <button onClick={confirmClick} className="foodcalconfirmbtn">
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

export default FoodCalModal;
