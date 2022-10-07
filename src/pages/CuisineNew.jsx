import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firebase";

function Cuisine() {
  const [cuisine, setCuisine] = useState([]);
  let params = useParams();

  const q = query(
    collection(db, "recipes"),
    where("categories", "array-contains", params.type)
  );

  useEffect(() => {
    onSnapshot(q, (snapshot) => {
      setCuisine(
        snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        })
      );
    });
  }, [params]);

  // const getCuisine = async (name) => {
  //   const data = await fetch(
  //     `https://api.spoonacular.com/recipes/complexSearch?apiKey=${
  //       import.meta.env.VITE_API_KEY
  //     }&number=9&cuisine=${name}`
  //   );
  //   const recipes = await data.json();
  //   setCuisine(recipes.results);
  // };

  // useEffect(() => {
  //   getCuisine(params.type);
  // }, [params.type]);

  return (
    <Grid
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {cuisine.map((item) => {
        return (
          <Card key={item.id}>
            <Link to={"/recipeTesting/" + item.id}>
              <img src={item.img} alt='food' />
              <h4>{item.title}</h4>
            </Link>
          </Card>
        );
      })}
    </Grid>
  );
}

const Grid = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 3rem;
`;
const Card = styled.div`
  img {
    width: 100%;
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

export default Cuisine;
