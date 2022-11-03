import { FaHeart, FaRegHeart } from "react-icons/fa";
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase";
import {
  arrayUnion,
  doc,
  updateDoc,
  arrayRemove,
  getDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import styled from "styled-components";

function FavoriteComponent({ recipe }) {
  const [like, setLike] = useState(false);
  const { user } = UserAuth();
  // const q = query(
  //   collection(db, "users"),
  //   where("savedRecipes", "array-contains", `${recipe.id}`)
  // );

  const recipeID = doc(db, "users", `${user?.email}`);

  useEffect(() => {
    async function setLikeFunction() {
      const docRef = doc(db, "users", user?.email);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const likeIds = docSnap.data();

        for (let i = 0; i < likeIds.savedRecipes.length; i++) {
          if (recipe.id === likeIds.savedRecipes[i]) {
            setLike(true);
          }
        }
        // setRecipe(docSnap.data());
      } else {
        console.log("No such document!");
        setLike(false);
      }
    }
    setLikeFunction();
  }, []);

  const saveRecipe = async () => {
    if (user?.email) {
      if (like === false) {
        setLike(!like);

        await updateDoc(recipeID, {
          savedRecipes: arrayUnion(recipe.id),
        });
      } else {
        setLike(!like);

        await updateDoc(recipeID, {
          savedRecipes: arrayRemove(recipe.id),
        });
      }
    } else {
      alert("Please log in to save a movie");
    }
  };

  return (
    <p onClick={saveRecipe}>
      {user?.email ? (
        <Favorite>{like ? <FaHeart /> : <FaRegHeart />}</Favorite>
      ) : (
        ""
      )}
    </p>
  );
}

const Favorite = styled.span`
  position: absolute;
  z-index: 99;
  left: 50%;
  bottom: 210%;
  transform: translate(-50%, 0%);
  color: #f7f7f7;
  text-align: center;
  font-weight: 800;
  font-size: 2rem;
  height: 40%;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    font-size: 2.2rem;
    opacity: 0.9;
  }
`;

export default FavoriteComponent;
