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
            className='form-control'
          />
        </td>

        <td>
          <input
            type='text'
            value={amount}
            onChange={(e) => handleChange(index, e)}
            name='amount'
            className='form-control'
            required
          />
        </td>
        <td>
          <select
            name='unit'
            value={unit}
            onChange={(e) => handleChange(index, e)}
            className='form-control table__select'
          >
            <option id='0'>Select</option>
            <option id='1'>tbsp.</option>
            <option id='2'>tsp.</option>
            <option id='3'>ml</option>
            <option id='4'>L</option>
            <option id='5'>Pck.</option>
            <option id='6'>g</option>
            <option id='7'>KG</option>
          </select>
        </td>
        <td>
          <button
            className='btn btn-outline-danger'
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
