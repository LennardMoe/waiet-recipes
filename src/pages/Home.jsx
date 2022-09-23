import Veggie from "../components/Veggie";
import Popular from "../components/Popular";
import { motion } from "framer-motion";
import MyRecipes from "../components/MyRecipesComponent";
import React from "react";
import NewRecipe from "../components/CreateRecipeComponent";
// import NewRecipe from "../components/NewRecipe";
import styled from "styled-components";

function Home() {
  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* <NewRecipe /> */}
      <Styling>
        <div className='Test'>
          <NewRecipe />
        </div>
        <MyRecipes />
      </Styling>
      <Veggie />
      <Popular />
    </motion.div>
  );
}

const Styling = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  /* .Test {
    margin-right: 1rem;
  } */
`;
export default Home;
