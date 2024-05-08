import React, { useState } from "react";
import "../css/components/BMIModal.css";

function BMIModal({ bmiClose, bmishow, bmiShow, bmiresultShow}) {
  const [form, setForm] = useState({
    year: 2023,
    month: "01",
    day: "01",
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

  const confirmClick = () => {
    bmiClose();
    bmiresultShow();
  };

    return (
      <div
        id={bmishow ? "bmibackgroundon" : "bmibackgroundoff"}
        onClick={(e) => {
          if (
            e.target.id === "bmibackgroundon" ||
            e.target.id === "bmibackgroundoff"
          ) {
            bmiClose();
          }
        }}
      >
        <div className={`bmiModalWrapper ${bmishow ? "bmishow" : "bmihide"}`}>
          <div className="bmimodalheader">
            <div className="bmimodaltitle">나의 BMI 지수 확인</div>
            <div className="bmiexplanation">
              BMI - 나이, 신장(cm)과 체중(kg)만으로 비만을 판정하는 비만 지수
            </div>
          </div>
          <div className="bmimodalbody">
            <div className="sexWrapper">
              <div className="sextext">성별</div>
              <div className="radioWrapper">
                <div className="radiomanWrapper">
                  <input type="radio" name="sex" value="man" className="bmiman" />
                  남자
                </div>
                <div className="radiowomanWrapper">
                  <input type="radio" name="sex" value="woman" className="bmiwoman"/>
                  여자
                </div>
              </div>
            </div>
            <div className="bornWrapper">
              <div className="yearWrapper">
                <div className="yeartitle">연도</div>
                <input input="text" className="yeartext" placeholder="2000" />
              </div>
              <div className="monthWrapper">
                <div className="monthtitle">월</div>
                <select
                  className="monthselect"
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
              <div className="dayWrapper">
                <div className="daytitle">일</div>
                <select
                  className="dayselect"
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
            <div className="heightandweightWrapper">
              <div className="heightWrapper">
                <div className="heighttitle">키</div>
                <input type="text" className="heighttext" placeholder="170cm" />
              </div>
              <div className="weightWrapper">
                <div className="weighttitle">몸무게</div>
                <input type="text" className="weighttext" placeholder="80kg" />
              </div>
            </div>
          </div>
          <div className="bmifooter">
            <button onClick={bmiClose} className="bmicancelbtn">
              Cancel
            </button>
            <button onClick={confirmClick} className="bmiconfirmbtn">
              Confirm
            </button>
          </div>
        </div>
      </div>
    );
  }

export default BMIModal;
