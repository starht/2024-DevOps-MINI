import "../css/components/FoodCardFull.css";
import PropTypes from "prop-types";
import addLogo from "../assets/images/List_Add.png";

function FoodCardFull({ foodname, kcal, backgroundImage }) {
  

  return (
    <div
      className="foodcard-container"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="foodcard-wrapper">
        <div className="foodcard-header">
          <div className="foodcal-box">{kcal} kcal</div>
        </div>
        <div className="foodname-box">
          <div className="food-name">{foodname}</div>
          <div className="foodgo-to">
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
