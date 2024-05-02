import salmon from '../assets/images/SalmonSteak.jpg';
import menu from '../assets/images/menu.png';

function FoodCard() {
  return (
    <div className="FoodCard">
      <div class = "FoodImgWrapperLeft">
        <img src={salmon} alt=''class='FoodImgLeft' />
      </div>
        <div class="FoodExplanationWrapper">
          <h3>연어 스테이크</h3>
          <p>280 Kcal</p>
          <button> <img class='menu' src={menu} alt=''/>레시피 저장</button>
        </div>
    </div>
  );
}

export default FoodCard;