import React, { useState } from "react";
import "../css/components/CalorieModal.css";

function CalorieModal({ calClose, calShow, calshow }) {
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

  return (
    <div
      id={calshow ? "cal-background-on" : "cal-background-off"}
      onClick={(e) => {
        if (
          e.target.id === "cal-background-on" ||
          e.target.id === "cal-background-off"
        ) {
          calClose();
        }
      }}
    >
      <div className={`cal-modal-wrap ${calshow ? "cal-show" : "cal-hide"}`}>
        <div className="cal-modal-header">
          <div className="cal-modal-title">칼로리 처방 받기</div>
          <div className="cal-explanation">
            체중감량 시 운동으로 소모하는 열량을 늘리고 섭취량을 줄이는 것을
            병행하는 것을 권장합니다.
          </div>
        </div>
        <div className="cal-modal-body">
          <div className="sex-wrap">
            <div className="sex-text">성별</div>
            <div className="sex-radio-wrap">
              <div className="radio-man-wrap">
                <input type="radio" name="sex" value="man" className="cal-man" />
                남자
              </div>
              <div className="radio-woman-wrap">
                <input
                  type="radio"
                  name="sex"
                  value="woman"
                  className="cal-woman"
                />
                여자
              </div>
            </div>
          </div>
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
          <div className="height-weight-wrap">
            <div className="height-wrap">
              <div className="height-title">키</div>
              <input type="text" className="height-text" placeholder="170cm" />
            </div>
            <div className="weight-wrap">
              <div className="weight-title">몸무게</div>
              <input type="text" className="weight-text" placeholder="80kg" />
            </div>
          </div>
          <div className="height-weight-wrap">
            <div className="height-wrap">
              <div className="height-title">체중감량기간</div>
              <input type="text" className="height-text" placeholder="2개월" />
            </div>
            <div className="weight-wrap">
              <div className="weight-title">목표 몸무게</div>
              <input type="text" className="weight-text" placeholder="75kg" />
            </div>
          </div>
          <div className="activity-wrap">
            <div className="activity-title">평소 활동량</div>
            <div className="radio-wrap">
              <input type="radio" name="activity" value="0" className="radio-activity" />
              활동 안함(운동을 전혀 안 해요)
            </div>
            <div className="radio-wrap">
              <input type="radio" name="activity" value="1" className="radio-activity" />
              가벼운 활동 (평소 가벼운 운동이나 스포츠를 즐겨요)
            </div>
            <div className="radio-wrap">
              <input type="radio" name="activity" value="2" className="radio-activity" />
              보통 활동 (평소 적당한 운동이나 스포츠를 즐겨요)
            </div>
            <div className="radio-wrap">
              <input type="radio" name="activity" value="3" className="radio-activity" />
              많은 활동 (평소 강렬한 운동이나 스포츠를 즐겨요)
            </div>
            <div className="radio-wrap">
              <input type="radio" name="activity" value="4" className="radio-activity" />
              격심한 활동 (평소 매우 심한 운동을 하거나 육체를 쓰는 직업이예요)
            </div>
          </div>
        </div>
        <div className="cal-footer">
          <button onClick={calClose} className="cal-cancel-btn">
            Cancel
          </button>
          <button onClick={calClose} className="cal-confirm-btn">
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

export default CalorieModal;
