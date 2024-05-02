import ExerciseCard from '../components/ExerciseCard';
import '../css/App.css';
import '../components/FoodCardLeft';
import '../css/FoodCardLeft.css';
import '../css/FoodCardRight.css';
import FoodCardLeft from '../components/FoodCardLeft';
import FoodCardRight from '../components/FoodCardRight';



function App() {
  return (
    <div className="App">
      <header className="App-header">
        <ExerciseCard></ExerciseCard>
        <FoodCardLeft />
        <FoodCardRight />
      </header>
    </div>
  );
}

export default App;
