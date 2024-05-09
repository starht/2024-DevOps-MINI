import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from 'prop-types';
import menu from "../assets/images/menu.png";
import "../css/components/FoodCardLeft.css";

function FoodCardLeft({index, ATT_FILE_NO_MK,RCP_NM, INFO_ENG}) {
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
        <div className="FoodCardLeft" key={index}>
          <div className="FoodImgWrapperLeft">
            <img src={ATT_FILE_NO_MK} alt="" className="FoodImgLeft" />
          </div>
          <div className="FoodExplanationWrapperLeft">
            <h3>{RCP_NM}</h3>
            <p>{INFO_ENG} Kcal</p>
            <button className='buttonLeft' onClick={() => handleSave()}>
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
