import salmon from '../assets/images/SalmonSteak.jpg';
import menu from '../assets/images/menu.png';

function FoodCard() {
  return (
    <div className="FoodCard">
      <div className="FoodExplanationWrapper">
          <h3>연어 스테이크</h3>
          <p>280 Kcal</p>
          <button> <img className='menu' src={menu} alt=''/>레시피 저장</button>
        </div>
      <div className = "FoodImgWrapperRight">
        <img src={salmon} alt=''className='FoodImgRight' />
      </div>
    </div>
  );
}

export default FoodCard;