import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

function Testing() {
  let params = useParams();
  const [recipe, setRecipe] = useState([]);

  useEffect(() => {
    async function getRecipe() {
      const docRef = doc(db, "recipes", params.test);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setRecipe(docSnap.data());
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    }
    getRecipe();
  }, []);

  return (
    <div>
      <h2>{recipe.title}</h2>
      <p dangerouslySetInnerHTML={{ __html: recipe.description }}></p>
      <ol>
        {recipe.steps.map((step, i) => (
          <li key={i}>{step}</li>
        ))}
      </ol>
    </div>
  );
}

export default Testing;
