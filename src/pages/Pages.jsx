import React from "react";
import Home from "./Home";
import { Route, Routes, useLocation } from "react-router-dom";
import Cuisine from "./Cuisine";
import Searched from "./Searched";
import Recipe from "./Recipe";
import Register from "./Register";
import { AnimatePresence } from "framer-motion";
import Login from "./Login";
import CreateRecipe from "./CreateRecipe";

function Pages() {
  const location = useLocation();
  const show = !location.pathname.includes("createrecipe");

  return (
    <AnimatePresence exitBeforeEnter>
      <Routes location={location} key={location.pathname}>
        <Route path='/' element={<Home />} />
        <Route path='/cuisine/:type' element={<Cuisine />} />
        <Route path='/searched/:search' element={<Searched />} />
        <Route path='/recipe/:name' element={<Recipe />} />
        <Route path='/Register' element={<Register />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/createrecipe' element={<CreateRecipe />} />
      </Routes>
    </AnimatePresence>
  );
}

export default Pages;
