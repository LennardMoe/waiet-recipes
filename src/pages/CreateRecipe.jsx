import { db, storage } from "../firebase";
import { useState, useEffect } from "react";
import { UserAuth } from "../context/AuthContext";
import { collection, doc, addDoc, getDoc } from "firebase/firestore";
import "./createRecipe.css";
import TableRows from "./features/TableRows";
import { useNavigate } from "react-router-dom";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { v4 } from "uuid";
import Checkboxes from "../components/Checkboxes";

function CreateRecipe() {
  const [imageUpload, setImageUpload] = useState(null);
  const navigate = useNavigate();
  const { user } = UserAuth();
  const imageListRef = ref(storage, "images/");
  const [categories, setCategories] = useState([]);
  const [progress, setProgress] = useState(0);

  const [form, setForm] = useState({
    // url: url,
    createdBy: user.email,
    date: new Date().toLocaleString(),
    title: "",
    description: "",
    ingredients: [
      {
        amount: "",
        unit: "",
        ingredientName: "",
      },
      {
        amount: "",
        unit: "",
        ingredientName: "",
      },
      {
        amount: "",
        unit: "",
        ingredientName: "",
      },
    ],
    steps: ["", "", ""],
    source: "",
    // categories: [],
  });

  const deleteTableRows = (index, e) => {
    const rows = [...form.ingredients];
    e.preventDefault();
    rows.splice(index, 1);
    setForm({
      ...form,
      ingredients: rows,
    });
  };

  useEffect(() => {
    setForm({
      ...form,
      categories: categories,
    });
    console.log(categories);
  }, [categories]);

  useEffect(() => {
    async function Username() {
      const docRef = doc(db, "users", user.email);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setForm({
          ...form,
          username: docSnap.data().username,
        });
        console.log(docSnap.data().username);
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    }
    Username();
  }, []);

  useEffect(() => {
    const uploadImage = () => {
      if (imageUpload == null) return;
      const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
      uploadBytesResumable(imageRef, imageUpload).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          console.log(url);
          setForm({
            ...form,
            img: url,
          });
          setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        });

        alert("Image Uploaded");
      });
    };
    imageUpload && uploadImage();
  }, [imageUpload]);

  const recipesCollectionRef = collection(db, "recipes");

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const rowsInput = [...form.ingredients];
    e.preventDefault();
    rowsInput[index][name] = value;
    setForm({
      ...form,
      ingredients: rowsInput,
    });
  };

  const handleStep = (e, i) => {
    const stepsClone = [...form.steps];

    stepsClone[i] = e.target.value;

    setForm({
      ...form,
      steps: stepsClone,
    });
  };

  const deleteSteps = (e, i) => {
    e.preventDefault();
    const stepsDelClone = [...form.steps];
    stepsDelClone.splice(i, 1);
    setForm({
      ...form,
      steps: stepsDelClone,
    });
  };

  const addTableRows = (e) => {
    e.preventDefault();
    const rowsInput = {
      amount: "",
      unit: "",
      ingredientName: "",
    };
    setForm({
      ...form,
      ingredients: [...form.ingredients, rowsInput],
    });
  };

  const handleStepCount = () => {
    setForm({
      ...form,
      steps: [...form.steps, ""],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !form.title ||
      !form.description ||
      !form.categories ||
      // form.ingredients.unit ||
      !form.ingredients ||
      !form.steps
    ) {
      alert("Please fill out all fields");
      return;
    }

    addDoc(recipesCollectionRef, form);
    setForm({
      // url: url,
      createdBy: user.email,
      date: new Date().toLocaleString(),
      title: "",
      description: "",
      ingredients: [
        {
          amount: "",
          unit: "",
          ingredientName: "",
        },
        {
          amount: "",
          unit: "",
          ingredientName: "",
        },
        {
          amount: "",
          unit: "",
          ingredientName: "",
        },
      ],
      steps: ["", "", ""],
      source: "",
      // categories: [],
    });
    navigate("/MyRecipes");
  };

  return (
    <div className='wrapper__newRecipe'>
      {/* Create new Recipe form */}
      <div className='newRecipe__wrapper'>
        <div className='newRecipe__inner'>
          <h2>Add a new recipe</h2>
          <form className='newRecipe__form' onSubmit={handleSubmit}>
            <div className='form__group'>
              <label htmlFor='Title'>Title</label>
              <input
                type='text'
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                id='Title'
                placeholder='Tomato soup, Egg salad, Roastbeef...'
              />
            </div>
            <div className='form__group '>
              <label htmlFor='desc'>Description</label>
              <textarea
                type='text'
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                className='form__description'
                id='desc'
              />
            </div>
            {/*Checkboxes  */}
            <div className='form__group'>
              <Checkboxes
                setCategories={setCategories}
                categories={categories}
              />
            </div>
            {/* Ingredients */}
            <div className='newIngredients__wrapper'>
              <div className='form__group '>
                <label htmlFor='Ingredients'>Ingredients</label>
              </div>
              <table className='form__table'>
                <thead>
                  <tr>
                    <th>Ingredient Name</th>
                    <th>Unit</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody className='table__body '>
                  <TableRows
                    rowsData={form.ingredients}
                    deleteTableRows={deleteTableRows}
                    handleChange={handleChange}
                  />
                </tbody>
              </table>
              <button
                type='button'
                onClick={addTableRows}
                className='btn btn__add'
              >
                Add Ingredient
              </button>
            </div>

            {/* Ingredietns ends */}
            {/* Steps Begin */}

            <div className='form__group'>
              <label>Steps</label>

              <div className='form__stepsGrid'>
                {form.steps.map((step, i) => (
                  <div className='form__steps'>
                    <textarea
                      type='text'
                      key={i}
                      value={step}
                      onChange={(e) => handleStep(e, i)}
                      className='steps__textarea'
                      placeholder={`Step ${i + 1}`}
                    />
                    <button className='btn' type='button' onClick={deleteSteps}>
                      Delete
                    </button>
                  </div>
                ))}
              </div>
              <button
                className='btn btn__add'
                type='button'
                onClick={handleStepCount}
              >
                Add Step
              </button>
            </div>
            {/* <Fileupload uploadImage={uploadImage} /> */}
            <div className='form__upload'>
              <label htmlFor='fileUpload'>
                {!imageUpload
                  ? "Click here to upload an Image"
                  : `Imageupload ${progress}% completed`}
                <input
                  type='file'
                  onChange={(event) => {
                    setImageUpload(event.target.files[0]);
                  }}
                  name='fileUpload'
                  id='fileUpload'
                />
              </label>
            </div>
            <div className='form__group'>
              <label htmlFor='source'>Original Source</label>
              <input
                type='text'
                value={form.source}
                onChange={(e) => setForm({ ...form, source: e.target.value })}
                id='source'
                placeholder='www.chefkoch.de/...'
              />
            </div>

            {/* Submit  Button */}
            <div className='recipe__buttons'>
              <button className=' btn__submit btn' type='submit'>
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateRecipe;

//https://www.youtube.com/watch?v=Zr0i1-bCFHI&t=355s
