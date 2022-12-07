import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../firebase";
import "./AllRecipesList.css";
// import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
// import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

function AllRecipesList() {
  const [recipes, setRecipes] = useState([]);
  const recipesCollectionRef = collection(db, "recipes");

  useEffect(() => {
    onSnapshot(recipesCollectionRef, (snapshot) => {
      setRecipes(
        snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        })
      );
    });
  }, []);

  return (
    <table id='allRecipesList__table'>
      <tr>
        <th>Name</th>
        <th>Description</th>
        <th>Created By</th>
        <th>Date</th>
      </tr>

      {recipes.map((recipe) => {
        return (
          <tr key={recipe.id}>
            <td>
              <Link to={"/recipe/" + recipe.id}>
                <p>{recipe.title}</p>
              </Link>
            </td>
            <td>{recipe.description}</td>
            <td>{recipe.username}</td>
            <td>{recipe.date}</td>
          </tr>
        );
      })}
    </table>
  );
}

export default AllRecipesList;

{
  /* <Table id='allRecipesList__table'>
      <Tr>
        <Th>Name</Th>
        <Th>Description</Th>
        <Th>Created By</Th>
        <Th>Date</Th>
      </Tr>

      {recipes.map((recipe) => {
        return (
          <Tr key={recipe.id}>
            <Td>
              <Link to={"/recipe/" + recipe.id}>
                <p>{recipe.title}</p>
              </Link>
            </Td>
            <Td>{recipe.description}</Td>
            <Td>{recipe.username}</Td>
            <Td>{recipe.date}</Td>
          </Tr>
        );
      })}
    </Table>
  );
} */
}
