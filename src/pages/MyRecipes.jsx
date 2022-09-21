import { auth, db } from "../firebase";
import {
  collection,
  onSnapshot,
  doc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { UserAuth } from "../context/AuthContext";

function MyRecipes() {
  // const { user } = UserAuth();
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

  return (
    <div>
      <button onClick={() => console.log(recipes.createBy)}>PRESS</button>
      <h1>My Recipes</h1>
      <div className='recipes'>
        {recipes.map((recipe, i) =>
          user.email === recipe.createdBy ? (
            <div className='recipe' key={recipe.id}>
              <h3>{recipe.title}</h3>
              <div>
                <h4>How to?</h4>
                <p dangerouslySetInnerHTML={{ __html: recipe.description }}></p>
              </div>
              {recipe.viewing && (
                <div>
                  <h5 className='recipes__ingredientsHeading'>Ingredients</h5>
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
                        <tbody>
                          <tr>
                            <td key={i}>{ingredientName}</td>
                            <td key={i}>{amount}</td>
                            <td key={i}>{unit}</td>
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
              )}
              <div className='recipe__btn'>
                <button onClick={() => handleView(recipe.id)}>
                  View {recipe.viewing ? "less" : "more"}
                </button>
                <button
                  onClick={() => removeRecipe(recipe.id)}
                  className='recipe__btnRemove'
                >
                  {" "}
                  Remove{" "}
                </button>
              </div>
            </div>
          ) : (
            ""
          )
        )}
      </div>
    </div>
  );
}

export default MyRecipes;
