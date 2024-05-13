import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/components/ExCalModal.css";

function ExCalModal({ excalshow, excalShow, excalClose}) {
  const [isSaved, setIsSaved] = useState(false);

  const [form, setForm] = useState({
    year: 2024,
    month: "01",
    day: "01",
    excal:""
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
  
  const handleExcalSave = () => {
    const storedId = localStorage.getItem("id");
    const storedIdObj = JSON.parse(storedId);
    const id = storedIdObj.id;
    const date = form.year + "-" + form.month + "-" + form.day;
    let excal = form.excal;

    axios.get(`http://localhost:4000/burncalorie?userid=${id}&date=${date}`)
    .then(existingExcalResponse => {
      if (existingExcalResponse.data.length > 0) {
        const existingExcal = existingExcalResponse.data[0];
        axios.patch(`http://localhost:4000/burncalorie/${existingExcal.id}`, {
          userid: id,
          calorie: excal
        })
          .then(response => {
            setIsSaved(true);
            reload();
          })
          .catch(error => {
            console.error('Error updating exercise calories:', error);
          });
      } else {
        axios.post("http://localhost:4000/burncalorie", {
          userid: id,
          date: date,
          calorie: excal
        })
          .then(response => {
            setIsSaved(true);
            reload();
          })
          .catch(error => {
            console.error('Error saving exercise calories:', error);
          });
      }
    })
    .catch(error => {
      console.error('Error checking existing exercise calories:', error);
    });

    setIsSaved(true);
};

  const confirmClick = () => {
    if (form.excal !== null) {
      handleExcalSave();
    } else {
      alert("칼로리를 입력하세요.");
    }
  };

  const handleCloseModal = () => {
    excalClose();
    setForm({
      year: 2024,
      month: "01",
      day: "01",
      excal: "",
    });
    setIsSaved(false);
  };

  useEffect(() => {
    if (isSaved) {
      handleCloseModal();
    }
  }, [isSaved]);

  const reload = () => {
    if (window.opener) {
      window.opener.location.reload();
      window.close();
    } else {
      window.location.reload();
    }
  };

    return (
      <div
        id={excalshow ? "excalbackgroundon" : "excalbackgroundoff"}
        onClick={(e) => {
          if (
            e.target.id === "excalbackgroundon" ||
            e.target.id === "excalbackgroundoff"
          ) {
            handleCloseModal();
          }
        }}
      >
        <div className={`excalModalWrapper ${excalshow ? "excalshow" : "excalhide"}`}>
          <div className="excalmodalheader">
            <div className="excalmodaltitle">칼로리 입력하기</div>
            <div className="excalmodal-explanation">운동으로 소모한 칼로리를 입력하세요</div>
          </div>
          <div className="excalmodalbody">
          <div className="born-wrap">
            <div className="year-wrap">
              <div className="year-title">연도</div>
              <input input="text" className="year-text" placeholder="2024" />
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
            <div className="excalcalWrapper">
                <div className="kcal">칼로리</div>
                <input input="text" className="caltext" placeholder="200kcal" onChange={(e) => setForm({ ...form, excal: e.target.value })} />
            </div>
          </div>
          <div className="excalfooter">
            <button onClick={excalClose} className="excalcancelbtn">
              Cancel
            </button>
            <button onClick={confirmClick} className="excalconfirmbtn">
              Confirm
            </button>
          </div>
        </div>
      </div>
    );
  }

export default ExCalModal;
