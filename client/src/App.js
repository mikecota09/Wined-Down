import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/common/Home.js";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import DrinkShow from "./components/Drink.js";
import DrinksIndex from "./components/DrinksIndex.js";
import UserProfile from "./components/UserProfile.js";
import SuggestDrink from "./components/Suggestions/SuggestDrink";
import TastingRoom from "./components/Suggestions/TastingRoom.js";
import About from "./components/common/About.js";
import ShopDrink from "./components/Shopping/ShopDrink.js";
import ShopSuccess from "./components/Shopping/ShopSuccess";
import SuggestedDrinkShow from "./components/SuggestedDrinkShow.js";
import SuggestionsEdit from "./components/SuggestionsEdit.js";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/profile/:id/edit" element={<SuggestionsEdit />} />
        <Route exact path="/drinks/:id" element={<DrinkShow />} />
        <Route exact path="/profile/:id" element={<SuggestedDrinkShow />} />
        <Route exact path="/tasting-room" element={<TastingRoom />} />
        <Route exact path="/drinks" element={<DrinksIndex />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/profile" element={<UserProfile />} />
        <Route exact path="/suggest-drink" element={<SuggestDrink />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/shop-drink" element={<ShopDrink />} />
        <Route exact path="/shop-success" element={<ShopSuccess />} />
        <Route exact path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
