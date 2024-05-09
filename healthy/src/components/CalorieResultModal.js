import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/components/CalorieResultModal.css";
import Checked from "../assets/images/check.png";
import { useAuth } from "../contexts/AuthContext";

function CalorieResultModal({
  calresShow,
  calresClose,
  calresshow,
  bmrResult,
  amrResult,
  calResult,
  tdeeResult,
  dur,
  weight,
  wishweight,
}) {
  const [calories, setCalories] = useState(null);
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    const storedId = localStorage.getItem("id");
    const storedUserId = localStorage.getItem("userid");
    const storedPassword = localStorage.getItem("password");

    if (storedUserId && storedPassword) {
      const storedIdObj = JSON.parse(storedId);
      const id = storedIdObj.id;

      axios
        .get(`http://localhost:4000/calories?id=${id}`)
        .then((response) => {
          if (response.data) {
            setCalories(response.data);
            console.log("data:", response.data);
          }
        })
        .catch((error) => {
          console.error("Error fetching calories:", error);
        });
    }
  }, []);

  const updateCalories = async (
    id,
    bmrResult,
    amrResult,
    calResult,
    tdeeResult,
    dur,
    weight,
    wishweight
  ) => {
    try {
      console.log("id:", id);
      await axios.patch(`http://localhost:4000/calories/${id}`, {
        monthunit: dur,
        goalkg: weight - wishweight,
        bmr: bmrResult,
        amr: amrResult,
        tdee: tdeeResult,
        eatneeded: (tdeeResult - calResult * 0.55).toFixed(2),
        workoutneeded: (calResult * 0.45).toFixed(2) 
      });
    } catch (error) {
      console.error("Error updating calories:", error);
    }
  };

  const handleSaveResult = () => {
    if (!isLoggedIn) {
      console.log("User is not logged in.");
      return;
    }
    if (!calories) {
      console.log(
        "Calories is not available yet. Please wait for it to load."
      );
      return;
    }

    const storedUserId = localStorage.getItem("userid");
    const storedPassword = localStorage.getItem("password");

    if (storedUserId && storedPassword) {
      const storedId = localStorage.getItem("id");
      const storedIdObj = JSON.parse(storedId);
      const id = storedIdObj.id;

      updateCalories(id,
        bmrResult,
        amrResult,
        calResult,
        tdeeResult,
        dur,
        weight,
        wishweight)
        .then(() => {
          console.log("Calories result saved successfully.");
          calresClose();
        })
        .catch((error) => {
          console.error("Error updating Calories result:", error);
        });
    }
  };

  const segmentStyle = (value, color) => {
    return {
      flex: value,
      backgroundColor: color,
    };
  };

  return (
    <div
      id={calresshow ? "calresbackgroundon" : "calresbackgroundoff"}
      onClick={(e) => {
        if (
          e.target.id === "calresbackgroundon" ||
          e.target.id === "calresbackgroundoff"
        ) {
          calresClose();
        }
      }}
    >
      <div
        className={`calresModalWrapper ${
          calresshow ? "calresshow" : "calreshide"
        }`}
      >
        <div className="calresmodalheader">
          <img src={Checked} className="resultcheckicon" alt="" />
          <div className="calresmodaltitle">칼로리 처방 결과</div>
          <div className="calresresultexplanation">
            체중감량 시 운동으로 소모하는 열량을 늘리고 섭취량을 줄이는 것을
            병행하는 것을 권장합니다.
          </div>
        </div>
        <div className="calresmodalbody">
          <div className="firstrow">
            <div className="goalmonWrapper">
              <div className="goalmontitle">총 감량기간</div>
              <input
                readOnly="readonly"
                type="text"
                className="goalmon"
                value={dur + " 개월"}
              />
            </div>
            <div className="nowkgWrapper">
              <div className="nowkgtitle">현재 체중</div>
              <input
                readOnly="readonly"
                type="text"
                className="nowkg"
                value={weight + " kg"}
              />
            </div>
            <div className="goalkgWrapper">
              <div className="goalkgtitle">목표 체중</div>
              <input
                readOnly="readonly"
                type="text"
                className="goalkg"
                value={wishweight + " kg"}
              />
            </div>
          </div>
          <div className="secondrow">
            <div className="goalintakecalWrapper">
              <div className="goalintakecaltitle">
                하루 동안 섭취해야 할 음식 칼로리
              </div>
              <input
                readOnly="readonly"
                type="text"
                className="goalintakecal"
                value={
                  calResult
                    ? (tdeeResult - calResult * 0.55).toFixed(2) + " Kcal"
                    : ""
                }
              />
            </div>
            <div className="goalexcalWrapper">
              <div className="goalexcaltitle">
                하루 동안 운동으로 소모해야 할 칼로리
              </div>
              <input
                readOnly="readonly"
                type="text"
                className="goalexcal"
                value={calResult ? (calResult * 0.45).toFixed(2) + " Kcal" : ""}
              />
            </div>
          </div>
          <div className="thridrow">
            <div className="calextitle">
              하루 소비 칼로리는{" "}
              <span className="tdee-result">
                {tdeeResult ? tdeeResult : ""} Kcal
              </span>
            </div>
            <div className="barbox">
              <div className="colorbarWrapper">
                <div className="bmrbar" style={segmentStyle(50, "#D7ECD5")}>
                  {bmrResult ? bmrResult : ""}
                </div>
                <div className="ambar" style={segmentStyle(20, "#FFD980")}>
                  {amrResult ? amrResult : ""}
                </div>
              </div>
              <div className="exWrapper">
                <div className="bmrex">
                  <div className="bmrex-box"></div>
                  <div>기초대사량</div>
                </div>
                <div className="amex">
                  <div className="amex-box"></div>활동대사량
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="calresfooter">
          <button onClick={calresClose} className="calrescancelbtn">
            Cancel
          </button>
          <button onClick={handleSaveResult} className="calressavebtn">
            SAVE
          </button>
        </div>
      </div>
    </div>
  );
}

export default CalorieResultModal;
