import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";

function RecipesData() {
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
}

export default RecipesData;
