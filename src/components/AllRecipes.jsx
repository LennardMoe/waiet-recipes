import "./allRecipes.css";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  onSnapshot,
  getDocs,
  where,
  query,
} from "firebase/firestore";
import { Link } from "react-router-dom";
import VeggieNew from "./VeggieNew";
function AllRecipes() {
  const [recipes, setRecipes] = useState([]);
  const recipesCollectionRef = collection(db, "recipes");
  const [categories, setCategories] = useState([]);
  const q = query(
    collection(db, "recipes"),
    where("categories", "array-contains", "Vegan")
  );

  // useEffect(() => {
  //   const getCategories = async () => {
  //     const querySnapshot = await getDocs(q);
  //     const test = [];
  //     querySnapshot.forEach((doc) => {
  //       // doc.data(),

  //       test.push(doc.data(), doc.id);
  //       // test.push(doc.id);
  //       // setCategories(doc.data());
  //       setCategories(test);
  //     });
  //   };
  //   getCategories();

  //   console.log(categories);
  // }, []);

  // useEffect(() => {
  //   onSnapshot(q, (snapshot) => {
  //     setCategories(
  //       snapshot.docs.map((doc) => {
  //         return {
  //           id: doc.id,
  //           ...doc.data(),
  //         };
  //       })
  //     );
  //   });
  // }, []);

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
    <>
      <div className='allRecipes__wrapper'>
        {recipes.map((recipe) => (
          <Link key={recipe.id} to={"/recipeTesting/" + recipe.id}>
            <div key={recipe.id} className='allRecipes__recipes'>
              <div key={recipe.id} className='test'>
                <img src={recipe.img} alt={recipe.title} />
              </div>
              <h3>{recipe.title}</h3>
              {/* {console.log(recipe.title)} */}
            </div>
          </Link>
        ))}
      </div>

      {/* <div className='allRecipes__wrapper'>
        <h2>Vegan Dishes</h2>
        {categories.map((vegan) => (
          <Link key={vegan.id} to={"/recipeTesting/" + vegan.id}>
            <div className='allRecipes__recipes'>
              <div className='test'>
                <img src={vegan.img} alt={vegan.title} />
              </div>
              <h3>{vegan.title}</h3>
              {console.log(categories)}
            </div>
          </Link>
        ))}
      </div> */}
      <VeggieNew />
    </>
  );
}

export default AllRecipes;
