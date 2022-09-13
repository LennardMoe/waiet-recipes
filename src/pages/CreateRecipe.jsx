import { useState } from "react";
import AddDeleteTableRows from "./features/AddDeleteTableRows";
import "./CreateRecipe.css";

function CreateRecipe() {
  const [name, setName] = useState("");
  const [extra, setExtra] = useState("");
  const [quantity, setQuantity] = useState("");
  const [ingredientName, setingeredientName] = useState("");
  const [unit, setUnit] = useState("");
  const [description, setDescription] = useState("");

  const dataRecipe = [
    {
      name: name,
      extraInfo: extra,
      ingredients: [
        {
          quantity: quantity,
          unit: unit,
          ingredientName: ingredientName,
        },
      ],
      description: description,
    },
  ];

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
        <AddDeleteTableRows />
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
      </form>
    </div>
  );
}

export default CreateRecipe;
