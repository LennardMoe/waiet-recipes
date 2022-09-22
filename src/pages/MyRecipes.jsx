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

function MyRecipes() {
  // const { user } = UserAuth();
  const { user } = UserAuth();
  const [recipes, setRecipes] = useState([]);
  const recipesCollectionRef = collection(db, "recipes");

  const [imgList, setImageList] = useState([]);
  // const imageListRef = ref(storage, "images/");

  useEffect(() => {
    // listAll(imageListRef).then((response) => {
    //   // console.log(response);
    //   response.items.forEach((item) => {
    //     getDownloadURL(item).then((url) => {
    //       setImageList((prev) => [...prev, url]);
    //     });
    //   });
    // });

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

  const removeRecipe = (id) => {
    deleteDoc(doc(db, "recipes", id));
  };

  const handleView = (id) => {
    const recipesClone = [...recipes];

    recipesClone.forEach((recipe) => {
      if (recipe.id === id) {
        recipe.viewing = !recipe.viewing;
      } else {
        recipe.viewing = false;
      }
    });
    setRecipes(recipesClone);
  };

  return (
    <div className='recipes__wrapper'>
      <h1>My Recipes</h1>
      <div className='myRecipes'>
        {recipes.map((recipe) =>
          user.email === recipe.createdBy ? (
            <div className='myRecipe' key={recipe.id}>
              <h3>{recipe.title}</h3>
              <div>
                <h4>How to?</h4>
                <p dangerouslySetInnerHTML={{ __html: recipe.description }}></p>
                <div className='recipe__imgContainer'>
                  <img
                    className='recipe__img'
                    src={recipe.img}
                    alt={`Picture of ${recipe.title}`}
                  />
                </div>
              </div>
              {recipe.viewing && (
                <div>
                  <div className='recipe__ingredient'>
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
                  {/* <div>
                    <img src= alt="" />
                  </div> */}
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
              <p>{`Created by: ${recipe.username} (${recipe.date})`}</p>
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
