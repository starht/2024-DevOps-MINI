import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Main from './pages/Main';
import FoodSearch from "./pages/FoodSearch";
import ExerciseSearch from "./pages/ExerciseSerch";
import MyPage from "./pages/MyPage";
import Detail from "./pages/Detail";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Main />}></Route>
      <Route path="/foodsearch" element={<FoodSearch />}></Route>
      <Route path="/exercisesearch" element={<ExerciseSearch />}></Route>
      <Route path="/detail/:recipename" element={<Detail />}></Route>
      <Route path="/mypage" element={<MyPage />}></Route>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
