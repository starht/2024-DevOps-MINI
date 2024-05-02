import ExerciseCard from '../components/ExerciseCard';
import '../css/App.css';
import '../components/FoodCardLeft';
import '../css/FoodCardLeft.css';
import FoodCard from '../components/FoodCardLeft';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <ExerciseCard></ExerciseCard>
        <FoodCard />
      </header>
    </div>
  );
}

export default App;
