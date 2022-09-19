import { db } from "../firebase";
import { useState, useEffect } from "react";
import {
  collection,
  onSnapshot,
  doc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";
import "./testing.css";
import TableRows from "./features/TableRows";

function Testing() {
  const [recipes, setRecipes] = useState([]);
  // const [rowsData, setRowsData] = useState([
  //   {
  //     amount: "",
  //     unit: "",
  //     ingredientName: "",
  //   },
  //   {
  //     amount: "",
  //     unit: "",
  //     ingredientName: "",
  //   },
  //   {
  //     amount: "",
  //     unit: "",
  //     ingredientName: "",
  //   },
  // ]);

  const [form, setForm] = useState({
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
    steps: [],
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

  const handleIngredient = (e, i) => {
    const ingredientsClone = [...form.ingredients];

    ingredientsClone[i] = e.target.value;

    setForm({
      ...form,
      ingredients: ingredientsClone,
    });
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

  const handleIngredientCount = () => {
    setForm({
      ...form,
      ingredients: [...form.ingredients, ""],
    });
  };

  const addTableRows = (e) => {
    e.preventDefault();
    const rowsInput = {
      amount: "",
      unit: "",
      ingredientName: "",
    };
    setForm([...form.ingredients, rowsInput]);
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
    // console.log(rowsData);
    e.preventDefault();

    if (!form.title || !form.description || !form.ingredients || !form.steps) {
      alert("Please fill out all fields");
      return;
    }

    addDoc(recipesCollectionRef, form);

    // setRowsData([
    //   {
    //     amount: " ",
    //     unit: " ",
    //     ingredientName: " ",
    //   },
    //   {
    //     amount: " ",
    //     unit: " ",
    //     ingredientName: " ",
    //   },
    //   {
    //     amount: " ",
    //     unit: " ",
    //     ingredientName: " ",
    //   },
    // ]);
    setForm({
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
      steps: [],
    });

    setPopupActive(false);
    // console.log(rowsData);
  };

  return (
    <div className='wrapper__newRecipe'>
      <h1>My recipes</h1>
      <button onClick={() => setPopupActive(!popupActive)}>Add recipe</button>
      <div className='recipes'>
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
      </div>

      {popupActive && (
        <div className='popup'>
          <div className='popup-inner'>
            <h2>Add a new recipe</h2>
            <form onSubmit={handleSubmit}>
              <div className='form-group'>
                <label htmlFor=''>Title</label>
                <input
                  type='text'
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                />
              </div>
              <div className='form-group '>
                <label htmlFor=''>Description</label>
                <textarea
                  type='text'
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  className='form-desc'
                />
              </div>

              {/* Ingredients */}

              <div className='form-group '>
                <label htmlFor='Ingredients'>Ingredients</label>

                <button type='button' onClick={addTableRows} className='btn'>
                  {" "}
                  Add Ingredient
                </button>
              </div>
              {/* <div className='form-ingredient'>
                {form.ingredients.map((ingredient, i) => (
                  
                  <input
                    id='Ingredients'
                    type='text'
                    key={i}
                    value={ingredient}
                    onChange={(e) => handleIngredient(e, i)}
                  />
                ))}
              </div> */}

              <div className='col-sm-8'>
                <table className='table'>
                  <thead>
                    <tr>
                      <th>Amount</th>
                      <th>Unit</th>
                      <th>Ingredient Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    <TableRows
                      rowsData={form.ingredients}
                      deleteTableRows={deleteTableRows}
                      handleChange={handleChange}
                    />
                  </tbody>
                </table>
              </div>

              {/* Ingredietns ends */}

              <div className='form-group'>
                <label htmlFor=''>Steps</label>

                <button className='btn' type='button' onClick={handleStepCount}>
                  {" "}
                  Add Step
                </button>
              </div>

              <div>
                {form.steps.map((step, i) => (
                  <div>
                    <textarea
                      type='text'
                      key={i}
                      value={step}
                      onChange={(e) => handleStep(e, i)}
                    />
                    <button className='btn' type='button' onClick={deleteSteps}>
                      {" "}
                      Delete
                    </button>
                  </div>
                ))}
              </div>

              {/* Submit Close Buttons */}
              <div className='recipe__buttons'>
                <button className=' btn' type='submit'>
                  {" "}
                  Submit
                </button>
                <button
                  type='button'
                  className='remove btn'
                  onClick={() => setPopupActive(false)}
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Testing;

//https://www.youtube.com/watch?v=Zr0i1-bCFHI&t=355s
{
  /* <table className='table'>
                <thead>
                  <tr>
                    <th>Amount</th>
                    <th>Unit</th>
                    <th>Ingredient Name</th>
                  </tr>
                </thead>
                <tbody>
                  <TableRows
                    rowsData={rowsData}
                    deleteTableRows={deleteTableRows}
                    handleChange={handleChange}
                  />
                </tbody>
              </table> */
}

{
  /* <td key={i}>{ingredientName}</td> */
}
{
  /* <td key={i}>{amount}</td> */
}
{
  /* <td key={i}>{unit}</td> */
}
