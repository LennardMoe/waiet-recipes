import { useState } from "react";
// import AddDeleteTableRows from "./features/AddDeleteTableRows";
import "./CreateRecipe.css";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import TableRows from "./features/TableRows";

function CreateRecipe() {
  const [name, setName] = useState("");
  const [extra, setExtra] = useState("");
  const [description, setDescription] = useState("");
  const [rowsData, setRowsData] = useState([
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
  ]);

  const addTableRows = (e) => {
    e.preventDefault();
    const rowsInput = {
      amount: "",
      unit: "",
      ingredientName: "",
    };
    setRowsData([...rowsData, rowsInput]);
  };
  const deleteTableRows = (index, e) => {
    const rows = [...rowsData];
    e.preventDefault();
    rows.splice(index, 1);
    setRowsData(rows);
  };

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const rowsInput = [...rowsData];
    e.preventDefault();
    rowsInput[index][name] = value;
    setRowsData(rowsInput);
  };

  const recipeData = async (e) => {
    e.preventDefault();

    await setDoc(doc(db, "recipes", name), {
      name: name,
      extraInfo: extra,
      ingredients: rowsData,
      description: description,
    });
  };

  return (
    <div className='wrapper'>
      <form className='recipe__form'>
        <h4 className='form__header'>Create a new Recipe!</h4>
        <div className='recipe__info'>
          <label htmlFor='recipeName'>
            <h4>Recipe Name:</h4>
            <input
              type='text'
              id='recipeName'
              onChange={(e) => setName(e.target.value)}
              placeholder='Whats the name of the recipe?'
            />
          </label>
          <label htmlFor='extra'>
            <h4>Extra Information</h4>
            <input
              type='text'
              placeholder='Extra info (e.g. vegan, without mushrooms...)'
              id='extra'
              onChange={(e) => setExtra(e.target.value)}
            />
          </label>
        </div>

        <div className='container'>
          <div className='row'>
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
                    rowsData={rowsData}
                    deleteTableRows={deleteTableRows}
                    handleChange={handleChange}
                  />
                </tbody>
              </table>
            </div>
            <button className='addRowBtn' onClick={addTableRows}>
              Add Row
            </button>
          </div>
        </div>

        <div className='form__textarea'>
          <label htmlFor='description'>
            <h4>How is it done?</h4>
            <textarea
              onChange={(e) => setDescription(e.target.value)}
              name='description'
              id='description'
              cols='50'
              rows='10'
            ></textarea>
          </label>
        </div>
        <button onClick={recipeData}> Submit your recipe!</button>
      </form>
    </div>
  );
}

export default CreateRecipe;
