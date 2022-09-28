import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { db } from "../firebase";

import { doc, getDoc } from "firebase/firestore";

import "./RecipeTesting.css";

function RecipeTesting() {
  let params = useParams();
  const [activeTab, setActiveTab] = useState("instructions");
  const [recipe, setRecipe] = useState([]);

  useEffect(() => {
    async function getRecipe() {
      const docRef = doc(db, "recipes", params.test);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());

        setRecipe(docSnap.data());
      } else {
        console.log("No such document!");
      }
    }
    getRecipe();
  }, []);

  return (
    <div className='recipeInfo__wrapper'>
      <div className='heading__info'>
        <h2>{recipe.title}</h2>
        <button
          className={`heading__btn ${
            activeTab === "instructions" ? "active" : ""
          }`}
          onClick={() => setActiveTab("instructions")}
        >
          Instructions
        </button>
        <button
          className={`heading__btn ${
            activeTab === "ingredients" ? "active" : ""
          }`}
          onClick={() => setActiveTab("ingredients")}
        >
          Ingredients
        </button>
      </div>
      <div className='recipeInfo__infoWrapper'>
        <img src={recipe.img} alt='' />
        {activeTab === "instructions" && (
          <div className='recipeInfo__info'>
            <p dangerouslySetInnerHTML={{ __html: recipe.description }}></p>
            <ol>
              {recipe.steps?.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ol>
          </div>
        )}
        <div className='recipeInfo__info'>
          {activeTab === "ingredients" && (
            <table>
              <thead>
                <tr>
                  <th>Ingredient Name</th>
                  <th>Amount</th>
                  <th>Unit</th>
                </tr>
              </thead>
              {recipe.ingredients.map(({ ingredientName, amount, unit }, i) => (
                <tbody key={i}>
                  <tr>
                    <td>{ingredientName}</td>
                    <td>{amount}</td>
                    <td>{unit}</td>
                  </tr>
                </tbody>
              ))}
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default RecipeTesting;
