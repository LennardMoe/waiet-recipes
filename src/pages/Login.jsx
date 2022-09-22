import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import "./Register.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  // onAuthStateChanged(auth, (currentUser) => {
  //   setUser(currentUser);
  // });

  const login = async (e) => {
    e.preventDefault();
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className='register__form__wrapper'>
      <form className='register__form'>
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
        <button onClick={login} type='submit'>
          Login
        </button>
        <p>
          <Link to='/Register'>Don't have an account?</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
//https://www.youtube.com/watch?v=jCY6DH8F4oc&t=1904s
