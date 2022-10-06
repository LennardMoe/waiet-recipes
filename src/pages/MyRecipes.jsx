import "./MyRecipes.css";
import { auth, db, storage } from "../firebase";
import {
  collection,
  onSnapshot,
  doc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { UserAuth } from "../context/AuthContext";
import { getStorage, ref, deleteObject } from "firebase/storage";
import { Link } from "react-router-dom";

function MyRecipes() {
  const { user } = UserAuth();
  const [recipes, setRecipes] = useState([]);
  const recipesCollectionRef = collection(db, "recipes");
  const [userRecipe, setUserRecipe] = useState([]);

  useEffect(() => {
    let recipeData = userRecipe.filter((item) => user.email === item.createdBy);
    setRecipes(recipeData);
  }, [userRecipe]);

  useEffect(() => {
    onSnapshot(recipesCollectionRef, (snapshot) => {
      setUserRecipe(
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

  const removeRecipe = (id) => {
    deleteDoc(doc(db, "recipes", id));
  };

  // const handleView = (id) => {
  //   const recipesClone = [...recipes];

  //   recipesClone.forEach((recipe) => {
  //     if (recipe.id === id) {
  //       recipe.viewing = !recipe.viewing;
  //     } else {
  //       recipe.viewing = false;
  //     }
  //   });
  //   setRecipes(recipesClone);
  // };
  // console.log(recipes);

  return (
    <div className='recipes__wrapper'>
      <h1>My Recipes</h1>

      {recipes.length === 0 ? (
        <div>
          <h4>You don't have any Recipes yet?</h4>
          <p>
            Click <Link to={"/createRecipe/"}> here </Link>to create a new
            recipes or <Link to={"/"}>here </Link> to see all recipes
          </p>
        </div>
      ) : (
        <div className='myRecipes'>
          {recipes.map((recipe) =>
            user.email === recipe.createdBy ? (
              <div className='myRecipe' key={recipe.id}>
                <h3>{recipe.title}</h3>
                <div>
                  <p
                    className='myRecipe__description'
                    dangerouslySetInnerHTML={{ __html: recipe.description }}
                  ></p>
                  <div className='recipe__imgContainer'>
                    <img
                      className='recipe__img'
                      src={recipe.img}
                      alt={`Picture of ${recipe.title}`}
                    />
                  </div>
                </div>

                <div className='recipe__btn'>
                  <Link to={"/recipeTesting/" + recipe.id}>
                    {" "}
                    <button>
                      {/* // onClick={() => handleView(recipe.id)}>  */}
                      View
                      {/* {recipe.viewing ? "less" : "more"} */}
                    </button>
                  </Link>
                  <button
                    onClick={() => removeRecipe(recipe.id)}
                    className='recipe__btnRemove'
                  >
                    Remove
                  </button>
                </div>
                <p>{`Created  ${recipe.date}`}</p>
                {recipe.source ? (
                  <p>
                    {<a href={recipe.source}>Click here</a>} to see the origial
                    source
                  </p>
                ) : (
                  ""
                )}
              </div>
            ) : (
              ""
            )
          )}
        </div>
      )}
    </div>
  );
}

export default MyRecipes;

{
  /* {recipe.viewing && (
                  <div>
                    <div className='recipe__ingredient'>
                      <h5 className='recipes__ingredientsHeading'>
                        Ingredients
                      </h5>
                      <table>
                        <thead>
                          <tr>
                            <th>Ingredient Name</th>
                            <th>Amount</th>
                            <th>Unit</th>
                          </tr>
                        </thead>
                        {recipe.ingredients.map(
                          ({ ingredientName, amount, unit }, i) => (
                            <tbody key={i}>
                              <tr>
                                <td>{ingredientName}</td>
                                <td>{amount}</td>
                                <td>{unit}</td>
                              </tr>
                            </tbody>
                          )
                        )}
                      </table>
                      <h4>Steps</h4>
                      <ol>
                        {recipe.steps.map((step, i) => (
                          <li key={i}>{step}</li>
                        ))}
                      </ol>
                    </div>
                    {/* <div>
                    <img src= alt="" />
                  </div> */
}
{
  /* </div> */
}
{
  /* )} */
}
