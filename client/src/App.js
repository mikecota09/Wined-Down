import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/common/Home.js";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";

import UserProfile from "./components/UserProfile";

import About from "./components/common/About";
import ShopWine from "./components/Shopping/ShopWine";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/profile/:id/edit"></Route>
        <Route path="/wines/:id">
          {/* <WineShow /> */}
        </Route>
        <Route path="/profile/:id"></Route>
        <Route path="/wines">
          {/* <WineShow /> */}
        </Route>
        <Route exact path='/register' element={<Register/>}/>
        <Route exact path='/login' element={<Login />}/>
        <Route exact path='/profile' element={<UserProfile/>}/>
        
        <Route exact path="/about" element={<About />}/>
        <Route exact path="/shop-wine" element={<ShopWine />}/>

        <Route path="/shop-success"></Route>
        <Route exact path="/" element={<Home />}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
