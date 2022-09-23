import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { useState } from "react";
import "./Register.css";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  // const [user, setUser] = useState({});
  const navigate = useNavigate();
  const { user, signUp } = UserAuth();

  // onAuthStateChanged(auth, (currentUser) => {
  //   setUser(currentUser);
  // });

  // const register = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const user = await createUserWithEmailAndPassword(auth, email, password);
  //     navigate("/");
  //   } catch (error) {
  //     setError(error.message);
  //     console.log(error.message);
  //   }
  // };

  // const login = async () => {};
  // const logout = () => {};

  const register = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signUp(email, password, username);

      // navigate("/");
    } catch (error) {
      setError(error.message);
      console.log(error.message);
    }
  };

  return (
    <div className='register__form__wrapper'>
      <form className='register__form'>
        {error ? (
          <p>
            <strong>Error: </strong>Invalid Password or E-Mail{" "}
            {error.split(" ").pop().split("_").pop()}
          </p>
        ) : (
          ""
        )}
        <label htmlFor='E-Mail'>
          <h4> E-Mail</h4>
          <input
            type='text'
            onChange={(e) => setEmail(e.target.value.toLowerCase())}
          />
        </label>
        <label htmlFor='Password'>
          <h4> Password</h4>
          <input
            type='password'
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <label htmlFor='Username'>
          <h4> Username</h4>
          <input type='text' onChange={(e) => setUsername(e.target.value)} />
        </label>
        <button onClick={register} type='submit'>
          Register
        </button>
        <p>
          <Link to='/Login'>Already have an account?</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
