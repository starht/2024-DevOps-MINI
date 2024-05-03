import PropTypes from 'prop-types';
import menu from "../assets/images/menu.png";
import "../css/components/FoodCardRight.css";
import React from "react";

function FoodCardRight({ATT_FILE_NO_MK,RCP_NM, INFO_ENG}) {

  return (
        <div className="FoodCard">
          <div className="FoodExplanationWrapper">
            <h3>{RCP_NM}</h3>
            <p>{INFO_ENG} Kcal</p>
            <button className='button'>
              <img className="menu" src={menu} alt="" />
              레시피 저장
            </button>
          </div>
          <div className="FoodImgWrapperRight">
            <img src={ATT_FILE_NO_MK} alt="" className="FoodImgRight" />
          </div>
        </div>
  );

}
FoodCardRight.propTypes = {
  ATT_FILE_NO_MK: PropTypes.string.isRequired,
  RCP_NM: PropTypes.string.isRequired,
  INFO_ENG: PropTypes.string.isRequired,
};

export default FoodCardRight;
