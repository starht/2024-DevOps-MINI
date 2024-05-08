import "../css/components/BMIResultModal.css";
import BMIPhoto from "../assets/images/bmicrop.png"
import Checked from "../assets/images/check.png"

function BMIModal({ bmiresultClose, bmiresultshow, bmiresultShow }) {

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
        <div className={`bmiResultModalWrapper ${bmiresultshow ? "bmiresultshow" : "bmiresulthide"}`}>
          <div className="bmiresultmodalheader">
            <img src={Checked} className="resultcheckicon" alt=""/>
            <div className="bmiresultmodaltitle">나의 BMI 지수 확인</div>
            <div className="bmiresultexplanation">
              BMI - 나이, 신장(cm)과 체중(kg)만으로 비만을 판정하는 비만 지수
            </div>
          </div>
          <div className="bmiresultmodalbody">
            <div className="eximgWrapper">
            <img src={BMIPhoto} className="bmiexplanationphoto" alt=""/>
            </div>
            <div className="bmiresultWrapper">
              <div className="resulttitle">비만도 검사 결과</div>
              <input type="text" readOnly="readonly" className="bmiresulttext"/>
            </div>
          </div>
          <div className="bmiresultfooter">
            <button onClick={bmiresultClose} className="bmiresultcancelbtn">
              Cancel
            </button>
            <button onClick={bmiresultClose} className="bmiresultsavebtn">
              SAVE
            </button>
          </div>
        </div>
      </div>
    );
  }

export default BMIModal;
