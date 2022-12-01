import "./allRecipes.css";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { Link } from "react-router-dom";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import styled from "styled-components";
import FavoriteComponent from "./FavoriteComponent";

function AllRecipes() {
  const [recipes, setRecipes] = useState([]);
  const recipesCollectionRef = collection(db, "recipes");

  useEffect(() => {
    onSnapshot(recipesCollectionRef, (snapshot) => {
      setRecipes(
        snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        })
      );
    });
  }, []);

  return (
    // <>
    //   <div className='allRecipes__wrapper'>
    //     {recipes.map((recipe) => (
    //       <Link key={recipe.id} to={"/recipeTesting/" + recipe.id}>
    //         <div key={recipe.id} className='allRecipes__recipes'>
    //           <div key={recipe.id} className='test'>
    //             <img src={recipe.img} alt={recipe.title} />
    //           </div>
    //           <h3>{recipe.title}</h3>
    //           {/* {console.log(recipe.title)} */}
    //         </div>
    //       </Link>
    //     ))}
    //   </div>
    // </>

    <div>
      <div className='allRecipes__wrapper'>
        <h3>All Recipes</h3>
        <Splide
          options={{
            perPage: 4,
            pagination: false,
            drag: "free",
            gap: "5rem",
          }}
        >
          {recipes.map((recipe) => {
            return (
              <SplideSlide key={recipe.id}>
                <div className='allRecipes__card'>
                  <FavoriteComponent recipe={recipe} />
                  <Link to={"/recipe/" + recipe.id}>
                    <p>{recipe.title}</p>
                    <img
                      className='allRecipes__img'
                      src={recipe.img}
                      alt={recipe.title}
                    />
                    <div className='allRecipes__gradient'> </div>
                  </Link>
                </div>
              </SplideSlide>
            );
          })}
        </Splide>
      </div>
    </div>
  );
}

// const Card = styled.div`
//   min-height: 25rem;
//   border-radius: 2rem;
//   overflow: hidden;
//   position: relative;
//   transition: all 0.5s ease;
//   &:hover {
//     transform: scale(1.03);
//     min-width: fit-content;
//     border-radius: 2rem;
//   }

//   p {
//     position: absolute;
//     z-index: 10;
//     left: 50%;
//     bottom: 0%;
//     transform: translate(-50%, 0%);
//     color: white;
//     text-align: center;
//     font-weight: 600;
//     font-size: 1rem;
//     height: 40%;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//   }
// `;

// const Gradient = styled.div`
//   z-index: 1;
//   position: absolute;
//   width: 100%;
//   height: 100%;
//   background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5));
// `;

export default AllRecipes;
