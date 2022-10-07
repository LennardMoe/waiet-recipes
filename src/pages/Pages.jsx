import React from "react";
import Home from "./Home";
import HomeTest from "./HomeTest";
import { Route, Routes, useLocation } from "react-router-dom";
import Cuisine from "./Cuisine";
import CuisineNew from "./CuisineNew";
import Searched from "./Searched";
import Recipe from "./Recipe";
import Register from "./Register";
import { AnimatePresence } from "framer-motion";
import Login from "./Login";
// import CreateRecipe from "./CreateRecipe";
import CreateRecipe from "./CreateRecipe";
// import Testing from "./Testing";
import MyRecipes from "./MyRecipes";
import RecipeTesting from "./RecipeTesting";
import ProtectedRoute from "./features/ProtectedRoutes";
import AllRecipes from "../components/AllRecipes";
import Question from "./Question";

function Pages() {
  // const location = useLocation();
  // const show = !location.pathname.includes("createrecipe");

  return (
    <AnimatePresence exitBeforeEnter>
      <Routes location={location} key={location.pathname}>
        <Route path='/' element={<Home />} />
        <Route path='/homeTest' element={<HomeTest />} />
        <Route path='/cuisine/:type' element={<Cuisine />} />
        <Route path='/cuisineNew/:type' element={<CuisineNew />} />
        <Route path='/searched/:search' element={<Searched />} />
        <Route path='/recipe/:name' element={<Recipe />} />
        <Route path='/recipeTesting/:test' element={<RecipeTesting />} />
        <Route path='/question/:test' element={<Question />} />
        <Route path='/allRecipes/:test' element={<AllRecipes />} />
        <Route path='/Register' element={<Register />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/createRecipe' element={<CreateRecipe />} />

        <Route
          path='/myRecipes'
          element={
            <ProtectedRoute>
              <MyRecipes />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

export default Pages;
