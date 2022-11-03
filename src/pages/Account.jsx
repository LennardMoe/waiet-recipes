import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { useState } from "react";
import { useEffect } from "react";
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function Account() {
  const [favoriteRecipesId, setFavoriteRecipesId] = useState([]);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [allRecipes, setAllRecipes] = useState([]);
  const [userRecipe, setUserRecipe] = useState([]);
  const [me, setMe] = useState([]);

  const usersCollectionRef = collection(db, "users");
  const recipesCollectionRef = collection(db, "recipes");

  const { user } = UserAuth();

  useEffect(() => {
    onSnapshot(usersCollectionRef, (snapshot) => {
      setUserRecipe(
        snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        })
      );
    });
  }, []);

  useEffect(() => {
    let recipeData = userRecipe.filter((item) => user.email === item.id);
    setMe(recipeData);
  }, [userRecipe]);

  useEffect(() => {
    setFavoriteRecipesId(me[0]?.savedRecipes);
  }, [me]);

  useEffect(() => {
    onSnapshot(recipesCollectionRef, (snapshot) => {
      setAllRecipes(
        snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        })
      );
    });
  }, []);

  useEffect(() => {
    let all = [];
    console.log(all);
    for (let i = 0; i < allRecipes.length; i++) {
      if (favoriteRecipesId.includes(allRecipes[i].id)) {
        all.push(allRecipes[i]);
        // console.log(allRecipes[i]);
      }
    }
    setFavoriteRecipes(all);
  }, [favoriteRecipesId]);

  // console.log(me);
  console.log(allRecipes);
  console.log(favoriteRecipesId);

  return (
    <>
      <h3> Your Favorite Recipes</h3>
      <Grid
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {favoriteRecipes.map((recipe) => {
          return (
            <Card key={recipe.id}>
              <Link to={"/recipeTesting/" + recipe.id}>
                <img src={recipe.img} alt='food' />
                <h4>{recipe.title}</h4>
              </Link>
            </Card>
          );
        })}
      </Grid>
    </>
  );
}

// const Title = styled.h2`
//   margin-bottom: 2rem;
//   color
// `;

const Grid = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 3rem;
`;
const Card = styled.div`
  img {
    width: 100%;

    height: 80%;
    border-radius: 2rem;
  }

  a {
    text-decoration: none;
  }
  h4 {
    text-align: center;
    padding: 1rem;
  }
`;

export default Account;
