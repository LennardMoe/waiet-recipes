import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { useState } from "react";
import "./Register.css";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  // onAuthStateChanged(auth, (currentUser) => {
  //   setUser(currentUser);
  // });

  const register = async (e) => {
    e.preventDefault();
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      setError(error.message);
      console.log(error.message);
    }
  };

  // const login = async () => {};
  // const logout = () => {};

  return (
    <div className='form__wrapper'>
      <form className='form'>
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
          <input type='text' onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label htmlFor='Password'>
          <h4> Password</h4>
          <input
            type='password'
            onChange={(e) => setPassword(e.target.value)}
          />
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
