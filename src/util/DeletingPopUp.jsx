import React from "react";
import "./DeletingPopUp.css";
export const PopUp = ({ text, closePopup, deleteRecipe }) => {
  return (
    <div className='popup__container'>
      <div className='popup__body'>
        <h3>{text}</h3>
        <div className='popup__buttons'>
          <button className='popUp_btnDelete' onClick={deleteRecipe}>
            Delete Recipe
          </button>
          <button onClick={closePopup}>Close</button>
        </div>
      </div>
    </div>
  );
};
