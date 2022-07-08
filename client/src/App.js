import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/common/Home.js";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import WineShow from "./components/Wine";
//import DrinksIndex from "./components/DrinksIndex.js";
import UserProfile from "./components/UserProfile";
//import SuggestDrink from "./components/Suggestions/SuggestDrink";
//import HeissRoom from "./components/Suggestions/HeissRoom.js";
import About from "./components/common/About";
import ShopWine from "./components/Shopping/ShopWine";
//import ShopSuccess from "./components/Shopping/ShopSuccess";
//import SuggestedDrinkShow from "./components/SuggestedDrinkShow.js";
//import SuggestionsEdit from "./components/SuggestionsEdit.js";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/profile/:id/edit"></Route>
        <Route path="/drinks/:id">
          <WineShow />
        </Route>
        <Route path="/profile/:id"></Route>
        <Route path="/drinks">
          <WineShow />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/profile">
          <UserProfile />
        </Route>
        <Route path="/suggest-wine"></Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/shop-wine">
          <ShopWine />
        </Route>
        <Route path="/shop-success"></Route>
        <Route path="/">
          <Home />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
