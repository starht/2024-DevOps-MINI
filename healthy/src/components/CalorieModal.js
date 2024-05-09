import React, { useState } from "react";
import "../css/components/CalorieModal.css";

function CalorieModal({
  calClose,
  calShow,
  calshow,
  onBmrResult,
  onAmrResult,
  calresultShow,
  onCalResult,
  onTDEE,
  onDur,
  onWeight,
  onWishWeight,
}) {
  const [form, setForm] = useState({
    year: 2024,
    month: "01",
    day: "01",
    gender: "",
    height: "",
    weight: "",
    dur: "",
    wishweight: "",
    activity: "",
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

  // 기초대사량
  const calculateBMR = () => {
    const { gender, height, weight, year } = form;
    let age = 2024 - year + 1;
    let bmr = 9.99 * weight + 6.25 * height - 4.95 * age;
    if (height && weight && age && gender) {
      if (gender === "man") {
        bmr += 5; // BMR 계산식
      }
      if (gender === "woman") {
        bmr -= 161; // BMR 계산식
      }
      return bmr.toFixed(2); // BMR 결과 반환
    }
    return null;
  };

  // 활동대사량
  const calculateAMR = (BMR) => {
    const { activity } = form;
    console.log(activity, BMR);
    let amr = 0;
    if (activity && BMR) {
      if (activity === "1") {
        amr = BMR * 0.2; // AMR 계산식
      }
      if (activity === "2") {
        amr = BMR * 0.375; // AMR 계산식
      }
      if (activity === "3") {
        amr = BMR * 0.555; // AMR 계산식
      }
      if (activity === "4") {
        amr = BMR * 0.725; // AMR 계산식
      }
      if (activity === "5") {
        amr = BMR * 0.9; // AMR 계산식
      }
      return amr.toFixed(2); // AMR 결과 반환
    }
    return null;
  };

  // 하루 총에너지 소비량
  const calculateTDEE = (BMR, AMR) => {
    if (BMR && AMR) {
      let tdee = parseInt(BMR) + parseInt(AMR); // TDEE 계산식
      return tdee; // TDEE 결과 반환
    }
    return null;
  };

  // 감량을 위해 줄여야 하는 에너지
  const calculateCal = (TDEE) => {
    const { weight, dur, wishweight } = form;
    if (weight && dur && wishweight) {
      const loseCal = (7700 * (weight - wishweight)) / (30 * dur);
      return loseCal;
    }
    return null;
  };

  const confirmClick = () => {
    const bmrResult = calculateBMR();
    const amrResult = calculateAMR(bmrResult);
    const tdeeResult = calculateTDEE(bmrResult, amrResult);
    const calResult = calculateCal(tdeeResult);
    console.log("bmrResult:", bmrResult);
    console.log("amrResult:", amrResult);
    console.log("tdeeResult:", tdeeResult);
    console.log("calResult:", calResult);
    if (calResult !== null) {
      // 결과를 Main 컴포넌트로 전달
      onBmrResult(bmrResult);
      onAmrResult(amrResult);
      onCalResult(calResult); 
      onTDEE(tdeeResult);

      onDur(form.dur);
      onWeight(form.weight);
      onWishWeight(form.wishweight);

      calClose();
      calresultShow();
    } else {
      // 키 또는 몸무게가 입력되지 않았을 때
      alert("키와 몸무게를 입력하세요.");
    }
  };

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
                <input
                  type="radio"
                  name="sex"
                  value="man"
                  className="cal-man"
                  onChange={(e) => setForm({ ...form, gender: e.target.value })}
                />
                남자
              </div>
              <div className="radio-woman-wrap">
                <input
                  type="radio"
                  name="sex"
                  value="woman"
                  className="cal-woman"
                  onChange={(e) => setForm({ ...form, gender: e.target.value })}
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
              <input
                type="text"
                className="height-text"
                placeholder="170cm"
                onChange={(e) => setForm({ ...form, height: e.target.value })}
              />
            </div>
            <div className="weight-wrap">
              <div className="weight-title">몸무게</div>
              <input
                type="text"
                className="weight-text"
                placeholder="80kg"
                onChange={(e) => setForm({ ...form, weight: e.target.value })}
              />
            </div>
          </div>
          <div className="height-weight-wrap">
            <div className="height-wrap">
              <div className="height-title">체중감량기간</div>
              <input
                type="text"
                className="height-text"
                placeholder="2개월"
                onChange={(e) => setForm({ ...form, dur: e.target.value })}
              />
            </div>
            <div className="weight-wrap">
              <div className="weight-title">목표 몸무게</div>
              <input
                type="text"
                className="weight-text"
                placeholder="75kg"
                onChange={(e) =>
                  setForm({ ...form, wishweight: e.target.value })
                }
              />
            </div>
          </div>
          <div className="activity-wrap">
            <div className="activity-title">평소 활동량</div>
            <div className="radio-wrap">
              <input
                type="radio"
                name="activity"
                value="1"
                className="radio-activity"
                onChange={(e) => setForm({ ...form, activity: e.target.value })}
              />
              활동 안함(운동을 전혀 안 해요)
            </div>
            <div className="radio-wrap">
              <input
                type="radio"
                name="activity"
                value="2"
                className="radio-activity"
                onChange={(e) => setForm({ ...form, activity: e.target.value })}
              />
              가벼운 활동 (평소 가벼운 운동이나 스포츠를 즐겨요)
            </div>
            <div className="radio-wrap">
              <input
                type="radio"
                name="activity"
                value="3"
                className="radio-activity"
                onChange={(e) => setForm({ ...form, activity: e.target.value })}
              />
              보통 활동 (평소 적당한 운동이나 스포츠를 즐겨요)
            </div>
            <div className="radio-wrap">
              <input
                type="radio"
                name="activity"
                value="4"
                className="radio-activity"
                onChange={(e) => setForm({ ...form, activity: e.target.value })}
              />
              많은 활동 (평소 강렬한 운동이나 스포츠를 즐겨요)
            </div>
            <div className="radio-wrap">
              <input
                type="radio"
                name="activity"
                value="5"
                className="radio-activity"
                onChange={(e) => setForm({ ...form, activity: e.target.value })}
              />
              격심한 활동 (평소 매우 심한 운동을 하거나 육체를 쓰는 직업이예요)
            </div>
          </div>
        </div>
        <div className="cal-footer">
          <button onClick={calClose} className="cal-cancel-btn">
            Cancel
          </button>
          <button onClick={confirmClick} className="cal-confirm-btn">
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

export default CalorieModal;
