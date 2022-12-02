function TableRows({ rowsData, deleteTableRows, handleChange }) {
  return rowsData.map((data, index) => {
    const { amount, unit, ingredientName } = data;
    return (
      <tr key={index}>
        <td>
          <input
            type='text'
            value={ingredientName}
            onChange={(e) => handleChange(index, e)}
            name='ingredientName'
            className='createRecipe__formControl'
          />
        </td>

        <td>
          <input
            type='text'
            value={amount}
            onChange={(e) => handleChange(index, e)}
            name='amount'
            className='createRecipe__formControl'
            required
          />
        </td>
        <td>
          <select
            name='unit'
            value={unit}
            onChange={(e) => handleChange(index, e)}
            className='createRecipe__formControl createRecipe__tableSelect'
          >
            <option id='0'>Select</option>
            <option id='1'>Tl.</option>
            <option id='2'>EL.</option>
            <option id='3'>ml</option>
            <option id='4'>L</option>
            <option id='5'>Paket</option>
            <option id='6'>g</option>
            <option id='7'>kg</option>
            <option id='8'>Stück/e</option>
            <option id='9'>Dose</option>
            <option id='10'>Messerspitze</option>
            <option id='11'>Becher</option>
            <option id='12'>Handvoll</option>
          </select>
        </td>
        <td>
          <button
            className='createRecipe__btn btn-outline-danger'
            onClick={(e) => deleteTableRows(index, e)}
          >
            Delete
          </button>
        </td>
      </tr>
    );
  });
}
export default TableRows;
