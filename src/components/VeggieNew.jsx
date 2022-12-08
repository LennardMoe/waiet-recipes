import { useEffect, useState } from "react";
import styled from "styled-components";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { Link } from "react-router-dom";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firebase";
import FavoriteComponent from "./FavoriteComponent";
import "./AllVegRecipes.css";

function VeggieNew() {
  const [veg, setVeg] = useState([]);

  const q = query(
    collection(db, "recipes"),
    where("categories", "array-contains", "vegan")
  );

  useEffect(() => {
    onSnapshot(q, (snapshot) => {
      setVeg(
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
    <div>
      <div className='allVegRecipes__wrapper'>
        <h3>Vegetarian Picks</h3>
        <Splide
          options={{
            perPage: 3,
            pagination: false,
            drag: "free",
            gap: "5rem",
            // focus: "center",
            breakpoints: {
              1020: {
                perPage: 2,
                drag: true,
              },
              660: {
                perPage: 1,
                drag: true,
              },
            },
          }}
        >
          {veg.map((recipe) => {
            return (
              <SplideSlide key={recipe.id}>
                <div className='allVegRecipes__card'>
                  <FavoriteComponent recipe={recipe} />
                  <Link to={"/recipe/" + recipe.id}>
                    <p>{recipe.title}</p>
                    <img
                      className='allVegRecipes__img'
                      src={recipe.img}
                      alt={recipe.title}
                    />
                    <div className='allVegRecipes__gradient'> </div>
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

export default VeggieNew;

// const Wrapper = styled.div`
//   margin: 2rem 0rem;
// `;

// const Card = styled.div`
//   min-height: 25rem;
//   /* min-width: 10rem; */
//   border-radius: 2rem;
//   overflow: hidden;
//   position: relative;

//   img {
//     border-radius: 2rem;
//     position: absolute;
//     left: 0;
//     width: 100%;
//     /* min-width: 100%; */
//     height: 100%;
//     object-fit: cover;
//     transition: transform 0.5s;
//     background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5));
//     &:hover {
//       transform: scale(1.1);
//     }
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
//     font-size: 1.4rem;
//     height: 40%;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//   }
// `;

// const Gradient = styled.div`
//   z-index: 3;
//   position: absolute;
//   width: 100%;
//   height: 100%;
//   background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5));
//   &:hover {
//     position: relative;
//     z-index: 0;
//     transform: scale(1.1);
//   }
// `;
