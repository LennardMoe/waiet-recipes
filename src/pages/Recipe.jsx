import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import "./Recipe.css";

function Recipe() {
  let params = useParams();
  const [activeTab, setActiveTab] = useState("instructions");
  const [recipe, setRecipe] = useState([]);
  const [date, setDate] = useState("");

  useEffect(() => {
    async function getRecipe() {
      const docRef = doc(db, "recipes", params.name);
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

  useEffect(() => {
    setDate(recipe?.date?.split(","));
  }, [recipe]);
  return (
    <div className='recipeInfo__wrapper'>
      <div className='recipeInfo__infos'>
        <h2>{recipe.title}</h2>
        <div className='recipeInfo_imgContainer'>
          <img src={recipe.img} alt='' />
        </div>
        <div className='recipeInfo__tags'>
          {recipe.categories?.map((tag, i) => (
            <p style={{ textTransform: "capitalize" }} key={i}>
              {tag}
            </p>
          ))}
        </div>
        <p style={{ textAlign: "center" }}>{`Created by ${recipe.username} (${
          date ? date[0] : ""
        })`}</p>
      </div>
      <div className='recipeInfo__infoWrapper_Wrapper'>
        <div className='recipeInfo__details'>
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
          <div
          // className='recipeInfo__info'
          >
            {activeTab === "instructions" && (
              <div className='recipeInfo__instructions'>
                <h4
                  dangerouslySetInnerHTML={{ __html: recipe.description }}
                ></h4>
                <ol>
                  {recipe.steps?.map((step, i) => (
                    <li className='recipeInfo__steps' key={i}>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </div>
          <div className='recipeInfo__info'>
            {activeTab === "ingredients" && (
              <div>
                <h4> Ingredients</h4>
                <div className='recipeInfo__ingredients'>
                  {recipe.ingredients.map(
                    ({ ingredientName, amount, unit }, i) => (
                      <div className='ingredients__list'>
                        <li key={i}>{`${amount} ${unit} `}</li> -
                        <li className='ingredients__list__name'>
                          {ingredientName}
                        </li>
                      </div>
                    )
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Recipe;
