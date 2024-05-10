import React, { useState } from "react";
import "../css/components/ExCalModal.css";
import axios from "axios";

function ExCalModal({ excalshow, excalShow, excalClose}) {


    return (
      <div
        id={excalshow ? "excalbackgroundon" : "excalbackgroundoff"}
        onClick={(e) => {
          if (
            e.target.id === "excalbackgroundon" ||
            e.target.id === "excalbackgroundoff"
          ) {
            excalClose();
          }
        }}
      >
        <div className={`excalModalWrapper ${excalshow ? "excalshow" : "excalhide"}`}>
          <div className="excalmodalheader">
            <div className="excalmodaltitle">칼로리 입력하기</div>
          </div>
          <div className="excalmodalbody">
            <div className="excalcalWrapper">
                <div className="kcal">칼로리</div>
                <input input="text" className="caltext" placeholder="200kcal" />
            </div>
          </div>
          <div className="excalfooter">
            <button onClick={excalClose} className="excalcancelbtn">
              Cancel
            </button>
            <button onClick={excalClose} className="excalconfirmbtn">
              Confirm
            </button>
          </div>
        </div>
      </div>
    );
  }

export default ExCalModal;
