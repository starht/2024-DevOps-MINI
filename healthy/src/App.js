import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from './pages/Main';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Main />}></Route>
      {/* <Route path="/movie/:id" element={<Detail />}></Route> */}
    </Routes>
  </BrowserRouter>
  );
}

export default App;
