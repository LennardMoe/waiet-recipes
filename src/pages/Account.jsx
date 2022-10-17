import { getDoc } from "firebase/firestore";
import { useState } from "react";
import { useEffect } from "react";
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase";


function Account() {
    const { user } = UserAuth();
    const [favoriteRecipes, setFavoriteRecipes] = useState([])
    
    
    useEffect(() => {
        async function getFavoriteRecipes() {
          const docRef = doc(db, "users", user.email);
          const docSnap = await getDoc(docRef);
    
          if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
    
            setFavoriteRecipes(docSnap.data());
          } else {
            console.log("No such document!");
          }
        }
        getFavoriteRecipes();
      }, []);
  
  
    return (
    {favoriteRecipes.savedRecipes.map((recipe, i) =>{
        <div>{recipe}</div>
    })}
  )
}

export default Account