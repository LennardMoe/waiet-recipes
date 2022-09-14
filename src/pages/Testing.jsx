import { db } from "../firebase";
import { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";

function Testing() {
  const [recipes, setRecipes] = useState([]);
  const [form, setForm] = useState({
    title: "",
    desc: "",
    ingredients: [],
    steps: [],
  });

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

  const [popupActive, setPopupActive] = useState(false);

  return (
    <div>
      <h1>My recipes</h1>
      <button>Add recipe</button>
      <div className='recipes'>
        {recipes.map((recipe, i) => (
          <div className='recipe' key={recipe.id}>
            <h3>{recipe.name}</h3>
            <p dangerouslySetInnerHTML={{ __html: recipe.description }}></p>
            <div>
              <h5>Ingredients</h5>
              <ul>
                {recipe.ingredients.map(({ amount, ingredientName }, i) => (
                  <>
                    <table className='table'>
                      <thead>
                        <tr>
                          <th>Amount</th>
                          <th>Unit</th>
                          <th>Ingredient Name</th>
                        </tr>
                      </thead>
                      <tbody>
                        <li key={i}>{ingredientName}</li>
                        <li key={i}>{amount}</li>
                      </tbody>
                    </table>
                  </>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Testing;

//https://www.youtube.com/watch?v=Zr0i1-bCFHI&t=355s
