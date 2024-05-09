import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/components/BMIResultModal.css";
import BMIPhoto from "../assets/images/bmicrop.png";
import Checked from "../assets/images/check.png";
import { useAuth } from "../contexts/AuthContext";

function BMIResultModal({
  bmiresultClose,
  bmiresultshow,
  bmiresultShow,
  bmiResult,
}) {
  const [userInfo, setUserInfo] = useState(null);
  const { isLoggedIn } = useAuth();
  console.log("bmiResult :", bmiResult);

  useEffect(() => {
    const storedId = localStorage.getItem("id");
    const storedUserId = localStorage.getItem("userid");
    const storedPassword = localStorage.getItem("password");

    if (storedUserId && storedPassword) {
      const storedIdObj = JSON.parse(storedId);
      const id = storedIdObj.id;
      const storedUserIdObj = JSON.parse(storedUserId);
      const userId = storedUserIdObj.userid;
      const storedPasswordObj = JSON.parse(storedPassword);
      const password = storedPasswordObj.password;
      console.log("id:", id);
      console.log("userId:", userId);
      console.log("password:", password);

      axios
        .get(`http://localhost:4000/userInfo?id=${id}`)
        .then((response) => {
          if (response.data) {
            setUserInfo(response.data);
            console.log("data:", response.data);
          }
        })
        .catch((error) => {
          console.error("Error fetching user info:", error);
        });
    }
  }, []);

  const updateUserInfo = async (id, newBMI) => {
    try {
      console.log("id:", id);
      console.log("newBMI:", newBMI);
      await axios.patch(
        `http://localhost:4000/userInfo/${id}`,
        {
          bmi: newBMI,
        }
      );
    } catch (error) {
      console.error("Error updating user info:", error);
    }
  };

  const handleSaveBMIResult = () => {
    if (!isLoggedIn) {
      console.log("User is not logged in.");
      return;
    }
    if (!userInfo) {
      console.log(
        "User info is not available yet. Please wait for it to load."
      );
      return;
    }

    const storedUserId = localStorage.getItem("userid");
    const storedPassword = localStorage.getItem("password");

    if (storedUserId && storedPassword) {
      const storedId = localStorage.getItem("id");
      const storedIdObj = JSON.parse(storedId);
      const id = storedIdObj.id;

      updateUserInfo(id, bmiResult)
        .then(() => {
          console.log("BMI result saved successfully.");
          bmiresultClose();
        })
        .catch((error) => {
          console.error("Error updating BMI result:", error);
        });
    }
  };

  return (
    <div
      id={bmiresultshow ? "bmiresultbackgroundon" : "bmiresultbackgroundoff"}
      onClick={(e) => {
        if (
          e.target.id === "bmiresultbackgroundon" ||
          e.target.id === "bmiresultbackgroundoff"
        ) {
          bmiresultClose();
        }
      }}
    >
      <div
        className={`bmiResultModalWrapper ${
          bmiresultshow ? "bmiresultshow" : "bmiresulthide"
        }`}
      >
        <div className="bmiresultmodalheader">
          <img src={Checked} className="resultcheckicon" alt="" />
          <div className="bmiresultmodaltitle">나의 BMI 지수 확인</div>
          <div className="bmiresultexplanation">
            BMI - 나이, 신장(cm)과 체중(kg)만으로 비만을 판정하는 비만 지수
          </div>
        </div>
        <div className="bmiresultmodalbody">
          <div className="eximgWrapper">
            <img src={BMIPhoto} className="bmiexplanationphoto" alt="" />
          </div>
          <div className="bmiresultWrapper">
            <div className="resulttitle">비만도 검사 결과</div>
            <input
              type="text"
              readOnly="readonly"
              className="bmiresulttext"
              value={bmiResult ? bmiResult : ""}
            />
          </div>
        </div>
        <div className="bmiresultfooter">
          <button onClick={bmiresultClose} className="bmiresultcancelbtn">
            Cancel
          </button>
          <button onClick={handleSaveBMIResult} className="bmiresultsavebtn">
            SAVE
          </button>
        </div>
      </div>
    </div>
  );
}

export default BMIResultModal;
