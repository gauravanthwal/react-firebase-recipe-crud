import React from "react";
import "./App.css";
import Home from "./pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SingleRecipe from "./components/recipe/SingleRecipe";
import Navbar from "./components/layout/Navbar";
import NewRecipe from "./components/recipe/NewRecipe";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipe/:id" element={<SingleRecipe />} />
          <Route path="/update-recipe/:id" element={<NewRecipe edit={true}/>} />
          <Route path="/new-recipe" element={<NewRecipe />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
