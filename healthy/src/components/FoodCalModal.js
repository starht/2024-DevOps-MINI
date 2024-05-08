import React, { useState } from "react";
import "../css/components/FoodCalModal.css";

function FoodCalModal({ foodcalshow, foodcalShow, foodcalClose}) {

    return (
      <div
        id={foodcalshow ? "foodcalbackgroundon" : "foodcalbackgroundoff"}
        onClick={(e) => {
          if (
            e.target.id === "foodcalbackgroundon" ||
            e.target.id === "foodcalbackgroundoff"
          ) {
            foodcalClose();
          }
        }}
      >
        <div className={`foodcalModalWrapper ${foodcalshow ? "foodcalshow" : "foodcalhide"}`}>
          <div className="foodcalmodalheader">
            <div className="foodcalmodaltitle">칼로리 입력하기</div>
          </div>
          <div className="foodcalmodalbody">
            <div className="mealWrapper">
              <div className="mealtext">식사 유형</div>
              <div className="bigradioWrapper">
                <div className="radioWrapper">
                  <input type="radio" name="meal" value="breakfast" className="radiobtn" />
                  아침
                </div>
                <div className="radioWrapper">
                  <input type="radio" name="meal" value="lunch" className="radiobtn"/>
                  점심
                </div>
                <div className="radioWrapper">
                  <input type="radio" name="meal" value="dinner" className="radiobtn"/>
                  저녁
                </div>
              </div>
            </div>
            <div className="foodcalWrapper">
                <div className="kcal">칼로리</div>
                <input input="text" className="caltext" placeholder="200kcal" />
            </div>
          </div>
          <div className="excalfooter">
            <button onClick={foodcalClose} className="foodcalcancelbtn">
              Cancel
            </button>
            <button onClick={foodcalClose} className="foodcalconfirmbtn">
              Confirm
            </button>
          </div>
        </div>
      </div>
    );
  }

export default FoodCalModal;
