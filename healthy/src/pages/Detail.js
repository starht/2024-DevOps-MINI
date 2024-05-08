import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import "../css/pages/Detail.css";
import Navbar from "../components/Navbar";
import Loading from "../components/Loading";
import LoginModal from "../components/LoginModal";

function Detail() {
  const [foods, setFoods] = useState([]);
  const { recipename } = useParams();
  const [loading, setLoading] = useState(true);
  const [loginshow, setLoginshow] = useState(false);
  const navigate = useNavigate();

  // 검색
  const handleSearch = (query, type) => {
    console.log("검색어:", query);
    console.log("검색 유형:", type);
    if (type === "food") {
      navigate(`/foodsearch?query=${query}`); // 음식 검색 결과 페이지로 이동
    } else if (type === "exercise") {
      navigate(`/exercisesearch?query=${query}`); // 운동 검색 결과 페이지로 이동
    }
  };

  // login modal 함수
  const loginClose = () => setLoginshow(false);
  const loginShow = () => setLoginshow(true);

  useEffect(() => {
    getFoods();
  }, [recipename]);

  const getFoods = async () => {
    try {
      const response = await fetch(
        `https://openapi.foodsafetykorea.go.kr/api/${process.env.REACT_APP_FOOD_KEY}/COOKRCP01/json/1/1000/RCP_NM=${recipename}`
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

  useEffect(() => {
    getFoods().then(() => setLoading(false));
  }, []);

  const handleClick = (foodname) => {
    const youtubeUrl = `https://www.youtube.com/results?search_query=${foodname}+레시피`;
    window.open(youtubeUrl, "_blank");
    console.log("click");
  };

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div className="body">
          <Navbar onSearch={handleSearch} loginShow={loginShow} />
          <LoginModal
            loginShow={loginShow}
            loginClose={loginClose}
            loginshow={loginshow}
          />
          {foods.map((food, index) => (
            <div key={index}>
              <div className="Upper">
                <div className="FoodRecipeWrapper">
                  <img src={food.ATT_FILE_NO_MK} className="RecipeImg" alt="" />
                  <div className="FoodExplain">
                    <p className="RecipeName">{food.RCP_NM}</p>
                    <div className="Recipe">
                      {food.MANUAL01 && <p>{food.MANUAL01}</p>}
                      {food.MANUAL02 && <p>{food.MANUAL02}</p>}
                      {food.MANUAL03 && <p>{food.MANUAL03}</p>}
                      {food.MANUAL04 && <p>{food.MANUAL04}</p>}
                      {food.MANUAL05 && <p>{food.MANUAL05}</p>}
                      {food.MANUAL06 && <p>{food.MANUAL06}</p>}
                      {food.MANUAL07 && <p>{food.MANUAL07}</p>}
                      {food.MANUAL08 && <p>{food.MANUAL08}</p>}
                      {food.MANUAL09 && <p>{food.MANUAL09}</p>}
                      {food.MANUAL10 && <p>{food.MANUAL10}</p>}
                      {food.MANUAL11 && <p>{food.MANUAL11}</p>}
                      {food.MANUAL12 && <p>{food.MANUAL12}</p>}
                      {food.MANUAL13 && <p>{food.MANUAL13}</p>}
                      {food.MANUAL14 && <p>{food.MANUAL14}</p>}
                      {food.MANUAL15 && <p>{food.MANUAL15}</p>}
                      {food.MANUAL16 && <p>{food.MANUAL16}</p>}
                      {food.MANUAL17 && <p>{food.MANUAL17}</p>}
                      {food.MANUAL18 && <p>{food.MANUAL18}</p>}
                      {food.MANUAL19 && <p>{food.MANUAL19}</p>}
                      {food.MANUAL20 && <p>{food.MANUAL20}</p>}
                    </div>
                    <div className="detail-youtube-btn" onClick={() => handleClick(food.RCP_NM)}></div>
                  </div>
                </div>
              </div>
              <div className="Lower">
                <div className="FoodCalorieWrapper" id="box">
                  <div className="UpperCalorie">
                    <p id="upperinfobox">영양 상세 정보</p>
                    <p id="upperinfobox">총 열량 : {food.INFO_ENG} Kcal</p>
                  </div>
                  <div className="LowerCalorie">
                <p id="lowerinfobox">
                  탄수화물
                  <br />
                  {food.INFO_CAR}g
                </p>
                <p id="lowerinfobox">
                  지방
                  <br />
                  {food.INFO_FAT}g
                </p>
                <p id="lowerinfobox">
                  나트륨
                  <br />
                  {food.INFO_NA} mg
                </p>
                <p id="lowerinfobox">
                  단백질
                  <br />
                  {food.INFO_PRO}g
                </p>
              </div>
                </div>
                <div className="FoodIngredientsWrapper" id="box">
                  <div className="UpperIngredients">
                    <p id="ingredientinfotitle">재료</p>
                    <p id="ingredientinfobox">{food.RCP_PARTS_DTLS}</p>
                  </div>
                  <hr />
                  <div className="LowerTip">
                    <p id="ingredientinfotitle">저감 조리법 TIP</p>
                    <p id="ingredientinfobox">{food.RCP_NA_TIP}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Detail;
