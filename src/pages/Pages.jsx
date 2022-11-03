import React from "react";
import Home from "./Home";
// import HomeTest from "../archive/HomeTest";
import { Route, Routes, useLocation } from "react-router-dom";
import Cuisine from "../archive/Cuisine";
import CuisineNew from "./CuisineNew";
import Searched from "./Searched";
// import Recipe from "../archive/Recipe";
import Register from "./Register";
import { AnimatePresence } from "framer-motion";
import Login from "./Login";
// import CreateRecipe from "./CreateRecipe";
import CreateRecipe from "./CreateRecipe";
// import Testing from "./Testing";
import MyRecipes from "./MyRecipes";
import RecipeTesting from "./RecipeTesting";
import ProtectedRoute from "../util/ProtectedRoutes";
import AllRecipes from "../components/AllRecipes";
import Account from "./Account";

function Pages() {
  // const location = useLocation();
  // const show = !location.pathname.includes("createrecipe");

  return (
    <AnimatePresence exitBeforeEnter>
      <Routes location={location} key={location.pathname}>
        <Route path='/' element={<Home />} />
        {/* <Route path='/homeTest' element={<HomeTest />} /> */}
        <Route path='/cuisine/:type' element={<Cuisine />} />
        <Route path='/cuisineNew/:type' element={<CuisineNew />} />
        <Route path='/searched/:search' element={<Searched />} />
        {/* <Route path='/recipe/:name' element={<Recipe />} /> */}
        <Route path='/recipeTesting/:test' element={<RecipeTesting />} />

        <Route path='/allRecipes/:test' element={<AllRecipes />} />
        <Route path='/Register' element={<Register />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/createRecipe' element={<CreateRecipe />} />
        <Route path='/account' element={<Account />} />

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
