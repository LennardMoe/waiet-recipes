// import { useState } from "react";
// import TableRows from "./TableRows";

// function AddDeleteTableRows(props) {
//   const [rowsData, setRowsData] = useState([
//     {
//       amount: " ",
//       unit: " ",
//       ingredientName: " ",
//     },
//     {
//       amount: " ",
//       unit: " ",
//       ingredientName: " ",
//     },
//     {
//       amount: " ",
//       unit: " ",
//       ingredientName: " ",
//     },
//   ]);

//   const addTableRows = (e) => {
//     e.preventDefault();
//     const rowsInput = {
//       amount: " ",
//       unit: " ",
//       ingredientName: " ",
//     };
//     setRowsData([...rowsData, rowsInput]);
//   };
//   const deleteTableRows = (index, e) => {
//     const rows = [...rowsData];
//     e.preventDefault();
//     rows.splice(index, 1);
//     setRowsData(rows);
//   };

//   const handleChange = (index, e) => {
//     const { name, value } = e.target;
//     const rowsInput = [...rowsData];
//     e.preventDefault();
//     rowsInput[index][name] = value;
//     setRowsData(rowsInput);
//     props.ingredients(rowsData);
//   };
//   return (
//     <div className='container'>
//       <div className='row'>
//         <div className='col-sm-8'>
//           <table className='table'>
//             <thead>
//               <tr>
//                 <th>Amount</th>
//                 <th>Unit</th>
//                 <th>Ingredient Name</th>
//               </tr>
//             </thead>
//             <tbody>
//               <TableRows
//                 rowsData={rowsData}
//                 deleteTableRows={deleteTableRows}
//                 handleChange={handleChange}
//               />
//             </tbody>
//           </table>
//         </div>
//         <button className='addRowBtn' onClick={addTableRows}>
//           Add Row
//         </button>
//       </div>
//     </div>
//   );
// }

// export default AddDeleteTableRows;
