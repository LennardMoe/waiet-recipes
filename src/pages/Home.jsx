// import Veggie from "../archive/Veggie";
// import Popular from "../components/Popular";
import { motion } from "framer-motion";
// import MyRecipes from "../components/MyRecipesComponent";
import React from "react";
// import NewRecipe from "../components/CreateRecipeComponent";
// import AllRecipesList from "../archive/AllRecipesListComponent";
// import NewRecipe from "../components/NewRecipe";
import styled from "styled-components";
import AllRecipes from "../components/AllRecipes";
import VeggieNew from "../components/VeggieNew";
import HomeButtons from "../components/Button";
import { devices } from "../util/breakpoints";
import Category from "../components/Category";

function Home() {
  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Category />
      <Styling>
        <HomeButtons text='New Recipe' link='/createRecipe/' />
        <HomeButtons text='My Recipes' link='/MyRecipes/' />
        <HomeButtons text='View All' link='/allRecipesList/' />
      </Styling>
      <AllRecipes />
      <VeggieNew />
    </motion.div>
  );
}

const Styling = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 1rem;
  @media ${devices.laptop} {
    grid-template-columns: 1fr;
    grid-gap: 1rem;
  }
  /* .Test {
    margin-right: 1rem;
  } */
`;
export default Home;
