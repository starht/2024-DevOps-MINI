import PropTypes from 'prop-types';
import menu from "../assets/images/menu.png";
import "../css/components/FoodCardLeft.css";
import React from "react";

function FoodCardLeft({ATT_FILE_NO_MK,RCP_NM, INFO_ENG}) {

  return (
        <div className="FoodCardLeft">
          <div className="FoodImgWrapperLeft">
            <img src={ATT_FILE_NO_MK} alt="" className="FoodImgLeft" />
          </div>
          <div className="FoodExplanationWrapperLeft">
            <h3>{RCP_NM}</h3>
            <p>{INFO_ENG} Kcal</p>
            <button className='buttonLeft'>
              <img className="menuLeft" src={menu} alt="" />
              레시피 저장
            </button>
          </div>
        </div>
  );

}
FoodCardLeft.propTypes = {
  ATT_FILE_NO_MK: PropTypes.string.isRequired,
  RCP_NM: PropTypes.string.isRequired,
  INFO_ENG: PropTypes.string.isRequired,
};

export default FoodCardLeft;
