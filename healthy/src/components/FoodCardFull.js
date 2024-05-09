import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/components/FoodCardFull.css";
import PropTypes from "prop-types";
import addLogo from "../assets/images/List_Add.png";

function FoodCardFull({ index, foodname, kcal, backgroundImage }) {
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    const storedId = localStorage.getItem("id");
    const storedIdObj = JSON.parse(storedId);
    const id = storedIdObj.id;

    axios.get(`http://localhost:4000/foodfavorite?userid=${id}&foodname=${foodname}`)
    .then(existingFoodResponse => {
      if (existingFoodResponse.data.length > 0) {
        const existingFood = existingFoodResponse.data[0];
        axios.patch(`http://localhost:4000/foodfavorite/${existingFood.id}`, {
          userid: id,
          foodname: foodname,
          kcal: kcal,
          picture: backgroundImage
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
          foodname: foodname,
          kcal: kcal,
          picture: backgroundImage,
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
    <div
      className="foodcard-container"
      style={{ backgroundImage: `url(${backgroundImage})` }}
      key={index}
    >
      <div className="foodcard-wrapper">
        <div className="foodcard-header">
          <div className="foodcal-box">{kcal} kcal</div>
        </div>
        <div className="foodname-box">
          <div className="food-name">{foodname}</div>
          <div className="foodgo-to"  onClick={() => handleSave()}>
            <img className="foodadd-logo" src={addLogo} alt="Add Logo" />
            레시피 저장
          </div>
        </div>
      </div>
    </div>
  );
}

FoodCardFull.propTypes = {
  foodname: PropTypes.string.isRequired,
  kcal: PropTypes.string.isRequired,
  backgroundImage: PropTypes.string.isRequired,
};

export default FoodCardFull;
