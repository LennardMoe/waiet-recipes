import React from "react";
import { useEffect } from "react";
import { CheckboxData } from "./../util/CheckboxData";

function Checkboxes({ setCategories, categories }) {
  const handleChange = (e) => {
    const { value, checked } = e.target;
    // console.log(`${value} is ${checked}`);

    if (checked) {
      setCategories((prev) => [...prev, value]);
    } else {
      setCategories(categories.filter((e) => e !== value));
    }
  };

  return (
    <div>
      <label>Select Categories</label>
      <ul className='form__categories'>
        {CheckboxData.map(({ name, value }, index) => {
          return (
            <li key={index}>
              <div className='categories__inputs'>
                <input
                  type='checkbox'
                  id={`category-checkbox-${index}`}
                  name={name}
                  value={value}
                  onChange={handleChange}
                />
                <label htmlFor={`category-checkbox-${index}`}>{name} </label>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Checkboxes;

{
  /* <ul className="form__category">
        {toppings.map(({ name }, index) => {
          return (
            <li key={index}>
              <div className="toppings-list-item">
                <div className="left-section">
                  <input
                    type="checkbox"
                    id={`custom-checkbox-${index}`}
                    name={name}
                    value={name}
                  />
                  <label htmlFor={`custom-checkbox-${index}`}>{name}</label>
                </div>
                <div className="right-section">{getFormattedPrice(price)}</div>
              </div>
            </li> */
}
