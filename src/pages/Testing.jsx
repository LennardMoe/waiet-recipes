import { auth, db } from "../firebase";
import { useState, useEffect } from "react";
import { UserAuth } from "../context/AuthContext";
import {
  collection,
  onSnapshot,
  doc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";
import "./testing.css";
import TableRows from "./features/TableRows";
import Fileupload from "../components/Fileupload";
import { useNavigate } from "react-router-dom";

function Testing() {
  // const [user, setUser] = useState(auth.currentUser);
  const navigate = useNavigate();
  const { user } = UserAuth();
  const [recipes, setRecipes] = useState([]);
  const [form, setForm] = useState({
    createdBy: user.email,
    title: "",
    description: "",
    ingredients: [
      {
        amount: "",
        unit: "",
        ingredientName: "",
      },
      {
        amount: "",
        unit: "",
        ingredientName: "",
      },
      {
        amount: "",
        unit: "",
        ingredientName: "",
      },
    ],
    steps: ["", "", ""],
  });

  const deleteTableRows = (index, e) => {
    const rows = [...form.ingredients];
    e.preventDefault();
    rows.splice(index, 1);
    setForm({
      ...form,
      ingredients: rows,
    });
  };

  const recipesCollectionRef = collection(db, "recipes");

  useEffect(() => {
    // setUser(auth.currentUser);

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

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const rowsInput = [...form.ingredients];
    e.preventDefault();
    rowsInput[index][name] = value;
    setForm({
      ...form,
      ingredients: rowsInput,
    });
  };

  const handleStep = (e, i) => {
    const stepsClone = [...form.steps];

    stepsClone[i] = e.target.value;

    setForm({
      ...form,
      steps: stepsClone,
    });
  };

  const deleteSteps = (e, i) => {
    e.preventDefault();
    const stepsDelClone = [...form.steps];
    stepsDelClone.splice(i, 1);
    setForm({
      ...form,
      steps: stepsDelClone,
    });
  };

  const addTableRows = (e) => {
    e.preventDefault();
    const rowsInput = {
      amount: "",
      unit: "",
      ingredientName: "",
    };
    setForm({
      ...form,
      ingredients: [...form.ingredients, rowsInput],
    });
  };

  const handleStepCount = () => {
    setForm({
      ...form,
      steps: [...form.steps, ""],
    });
  };

  const removeRecipe = (id) => {
    deleteDoc(doc(db, "recipes", id));
  };

  const [popupActive, setPopupActive] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !form.title ||
      !form.description ||
      // form.ingredients.unit ||
      !form.ingredients ||
      !form.steps
    ) {
      alert("Please fill out all fields");
      return;
    }

    addDoc(recipesCollectionRef, form);
    setForm({
      createdBy: user.email,
      title: "",
      description: "",
      ingredients: [
        {
          amount: "",
          unit: "",
          ingredientName: "",
        },
        {
          amount: "",
          unit: "",
          ingredientName: "",
        },
        {
          amount: "",
          unit: "",
          ingredientName: "",
        },
      ],
      steps: ["", "", ""],
    });

    // setPopupActive(false);
    navigate("/MyRecipes");
  };

  return (
    <div className='wrapper__newRecipe'>
      {/* <h1>My recipes</h1> */}
      {/* <button className='btn' onClick={() => setPopupActive(!popupActive)}>
        Add recipe
      </button> */}
      {/* Exiting recipes show here */}
      {/* <div className='recipes'>
        {recipes.map((recipe, i) => (
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
        ))}
      </div> */}

      {/* Recipes end here */}
      {/* Create new Recipe form */}

      <div className='newRecipe__wrapper'>
        <div className='newRecipe__inner'>
          <h2>Add a new recipe</h2>
          <form className='newRecipe__form' onSubmit={handleSubmit}>
            <div className='form__group'>
              <label htmlFor='Title'>Title</label>
              <input
                type='text'
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                id='Title'
              />
            </div>
            <div className='form__group '>
              <label htmlFor='desc'>Description</label>
              <textarea
                type='text'
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                className='form__description'
                id='desc'
              />
            </div>

            {/* Ingredients */}
            <div className='newIngredients__wrapper'>
              <div className='form__group '>
                <label htmlFor='Ingredients'>Ingredients</label>
              </div>
              <table className='form__table'>
                <thead>
                  <tr>
                    <th>Ingredient Name</th>
                    <th>Unit</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody className='table__body '>
                  <TableRows
                    rowsData={form.ingredients}
                    deleteTableRows={deleteTableRows}
                    handleChange={handleChange}
                  />
                </tbody>
              </table>
              <button
                type='button'
                onClick={addTableRows}
                className='btn btn__add'
              >
                Add Ingredient
              </button>
            </div>

            {/* Ingredietns ends */}
            {/* Steps Begin */}

            <div className='form__group'>
              <label>Steps</label>

              <div className='form__stepsGrid'>
                {form.steps.map((step, i) => (
                  <div className='form__steps'>
                    <textarea
                      type='text'
                      key={i}
                      value={step}
                      onChange={(e) => handleStep(e, i)}
                      className='steps__textarea'
                      placeholder={`Step ${i + 1}`}
                    />
                    <button className='btn' type='button' onClick={deleteSteps}>
                      Delete
                    </button>
                  </div>
                ))}
              </div>
              <button
                className='btn btn__add'
                type='button'
                onClick={handleStepCount}
              >
                Add Step
              </button>
            </div>
            <Fileupload />

            {/* Submit  Button */}
            <div className='recipe__buttons'>
              <button className=' btn__submit btn' type='submit'>
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Testing;

//https://www.youtube.com/watch?v=Zr0i1-bCFHI&t=355s
{
}
