import "./allRecipes.css";
import { useEffect, useState } from "react";
import { auth, db, storage } from "../firebase";
import {
  collection,
  onSnapshot,
  doc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";
import { UserAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
function AllRecipes() {
  const { user } = UserAuth();
  const [recipes, setRecipes] = useState([]);
  const recipesCollectionRef = collection(db, "recipes");

  useEffect(() => {
    onSnapshot(recipesCollectionRef, (snapshot) => {
      setRecipes(
        snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            viewing: false,
            ...doc.data(),
          };
        })
      );
    });
  }, []);

  // console.log(recipes);

  return (
    <>
      <div className='allRecipes__wrapper'>
        {recipes.map((recipe) => (
          <Link key={recipe.id} to={"/recipeTesting/" + recipe.id}>
            <div className='allRecipes__recipes'>
              <div className='test'>
                <img src={recipe.img} alt={recipe.title} />
              </div>
              <h3>{recipe.title}</h3>
            </div>
          </Link>
        ))}
      </div>
      <div className='allRecipes__wrapper'>
        {recipes.map((recipe) => (
          <Link key={recipe.id} to={"/question/" + recipe.id}>
            <div className='allRecipes__recipes'>
              <div className='test'>
                <img src={recipe.img} alt={recipe.title} />
              </div>
              <h3>{recipe.title}</h3>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}

export default AllRecipes;
