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
        <span>
          {like ? (
            <Favorite>
              <FaHeart />
            </Favorite>
          ) : (
            <Favorite>
              <FaRegHeart />
            </Favorite>
          )}
        </span>
      ) : (
        ""
      )}
    </p>
  );
}

const Favorite = styled.span`
  position: absolute;
  z-index: 99999;
  left: 50%;
  bottom: 220%;
  transform: translate(-350%, 0%);
  font-size: 25px;
`;

export default FavoriteComponent;
