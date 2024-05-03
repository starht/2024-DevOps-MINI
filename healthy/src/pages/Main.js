import ExerciseCard from '../components/ExerciseCard';
import React from "react";
import '../css/pages/Main.css';
import FoodCardLeft from '../components/FoodCardLeft';
import FoodCardRight from '../components/FoodCardRight';


function Main() {
  return (
    <div className="App">
      <header className="App-header">
        <ExerciseCard />
        <FoodCardLeft />
        <FoodCardRight />
      </header>
    </div>
  );
}

export default Main;
