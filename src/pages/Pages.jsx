import React from "react";
import Home from "./Home";
// import HomeTest from "../archive/HomeTest";
import { Route, Routes, useLocation } from "react-router-dom";

import CuisineNew from "./CuisineNew";
import Searched from "./Searched";
// import Recipe from "../archive/Recipe";
import Register from "./Register";
import { AnimatePresence } from "framer-motion";
import Login from "./Login";
import CreateRecipe from "./CreateRecipe";
import MyRecipes from "./MyRecipes";
import Recipe from "./Recipe";
import ProtectedRoute from "../util/ProtectedRoutes";
import AllRecipes from "../components/AllRecipes";
import Account from "./Account";
import AllRecipesList from "./AllRecipesList";

function Pages() {
  return (
    <AnimatePresence exitBeforeEnter>
      <Routes location={location} key={location.pathname}>
        <Route path='/' element={<Home />} />

        <Route path='/cuisine/:type' element={<CuisineNew />} />
        <Route path='/searched/:search' element={<Searched />} />

        <Route path='/recipe/:name' element={<Recipe />} />
        <Route path='/allRecipes/:test' element={<AllRecipes />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/createRecipe' element={<CreateRecipe />} />
        <Route path='/allRecipesList' element={<AllRecipesList />} />
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
