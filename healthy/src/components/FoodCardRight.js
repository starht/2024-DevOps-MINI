import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from 'prop-types';
import menu from "../assets/images/menu.png";
import "../css/components/FoodCardRight.css";

function FoodCardRight({index, ATT_FILE_NO_MK,RCP_NM, INFO_ENG}) {
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    const storedId = localStorage.getItem("id");
    const storedIdObj = JSON.parse(storedId);
    const id = storedIdObj.id;

    axios.get(`http://localhost:4000/foodfavorite?userid=${id}&foodname=${RCP_NM}`)
    .then(existingFoodResponse => {
      if (existingFoodResponse.data.length > 0) {
        const existingFood = existingFoodResponse.data[0];
        axios.patch(`http://localhost:4000/foodfavorite/${existingFood.id}`, {
          userid: id,
          foodname: RCP_NM,
          kcal:INFO_ENG,
          picture: ATT_FILE_NO_MK,
        })
          .then(response => {
            setIsSaved(true);
          })
          .catch(error => {
            console.error('Error updating food:', error);
          });
      } else {
        axios.post("http://localhost:4000/foodfavorite", {
          userid: id,
          foodname: RCP_NM,
          kcal:INFO_ENG,
          picture: ATT_FILE_NO_MK,
        })
          .then(response => {
            setIsSaved(true);
          })
          .catch(error => {
            console.error('Error saving food:', error);
          });
      }
    })
    .catch(error => {
      console.error('Error checking existing food:', error);
    });
};

  return (
        <div className="FoodCardRight" key={index}>
          <div className="FoodExplanationWrapperRight">
            <div className="food-card-name">{RCP_NM}</div>
            <p>{INFO_ENG} Kcal</p>
            <button className='buttonRight' onClick={() => handleSave()}>
              <img className="menuRight" src={menu} alt="" />
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
