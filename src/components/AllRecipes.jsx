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

  console.log(recipes);

  return (
    <div className='allRecipes__wrapper'>
      {recipes.map((recipe) => (
        <div className='allRecipes__recipes' key={recipe.id}>
          <div className='test'>
            <img src={recipe.img} alt='' />
          </div>
          <h3>{recipe.title}</h3>
        </div>
      ))}
    </div>
  );
}

export default AllRecipes;
