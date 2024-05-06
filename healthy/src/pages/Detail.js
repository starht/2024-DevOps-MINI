import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import '../css/pages/Detail.css'

function Detail() {
  const [foods, setFoods] = useState([]);
  const { recipename } = useParams();

  useEffect(() => {
    getFoods();
  }, [recipename]);

  const getFoods = async () => {
    try {
      const response = await fetch(
        `https://openapi.foodsafetykorea.go.kr/api/${
          process.env.REACT_APP_FOOD_KEY
        }/COOKRCP01/json/1/10/RCP_NM=${recipename}`
      );
      if (!response.ok) {
        throw new Error("failed to fetch");
      }
      const json = await response.json();
      const filteredFoods = json.COOKRCP01.row.filter(
        (food) => food.RCP_NM === recipename
      );
      setFoods(filteredFoods);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {foods.map((food) => (
        <div>
        <div className="FoodRecipeWrapper">
          <img src={food.ATT_FILE_NO_MK} className="RecipeImg" alt="" />
          <div className="FoodExplain">
            <p className="RecipeName">{food.RCP_NM}</p>
            <div className="Recipe">
              <p>{food.MANUAL01}</p>
              <p>{food.MANUAL02}</p>
              <p>{food.MANUAL03}</p>
              <p>{food.MANUAL04}</p>
              <p>{food.MANUAL05}</p>
              <p>{food.MANUAL06}</p>
              <p>{food.MANUAL07}</p>
              <p>{food.MANUAL08}</p>
              <p>{food.MANUAL09}</p>
              <p>{food.MANUAL10}</p>
              <p>{food.MANUAL11}</p>
              <p>{food.MANUAL12}</p>
              <p>{food.MANUAL13}</p>
              <p>{food.MANUAL14}</p>
              <p>{food.MANUAL15}</p>
              <p>{food.MANUAL16}</p>
              <p>{food.MANUAL17}</p>
              <p>{food.MANUAL18}</p>
              <p>{food.MANUAL19}</p>
              <p>{food.MANUAL20}</p>
            </div>
          </div>
        </div>
        <div className="Lower">
        <div className="FoodCalorieWrapper" id = "box">
          <div className="UpperCalorie">
            <p id="upperinfobox">영양 상세 정보</p>
            <p id="upperinfobox">총 열량 : {food.INFO_ENG} Kcal</p>
          </div>
          <div className="LowerCalorie">
            <p id="lowerinfobox">
              탄수화물<br />{food.INFO_CAR}
            </p>
            <p id="lowerinfobox">
              지방<br />{food.INFO_FAT}
            </p>
            <p id="lowerinfobox">
              나트륨<br />{food.INFO_NA}
            </p>
            <p id="lowerinfobox">
              단백질<br />{food.INFO_PRO}
            </p>
          </div>
        </div>
        <div className="FoodIngredientsWrapper" id = "box">
          <div className="UpperIngredients">
            <p id="ingredientinfotitle">재료</p>
            <p id="ingredientinfobox">
              {food.RCP_PARTS_DTLS}
            </p>
          </div>
          <hr />
          <div className="LowerTip">
            <p id="ingredientinfotitle">저감 조리법 TIP</p>
            <p id="ingredientinfobox">
              {food.RCP_NA_TIP}
            </p>
          </div>
        </div>
        </div>
        </div>
      ))}
    </div>
  );
}

export default Detail;
