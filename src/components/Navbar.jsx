import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { GiKnifeFork } from "react-icons/gi";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { auth, db } from "../firebase";
import Search from "./Search";
import { UserAuth } from "../context/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import Account from "../pages/Account";
function Navbar() {
  // const [user, setUser] = useState({});
  const [userData, setUserData] = useState([]);
  const [userName, setUserName] = useState("");
  const { user, logOut } = UserAuth();
  const navigate = useNavigate();

  // onAuthStateChanged(auth, (currentUser) => {
  //   setUser(currentUser);
  // });

  // const logout = async () => {
  //   await signOut(auth);
  // };

  const logout = () => {
    logOut();
    // navigate("/");
  };

  useEffect(() => {
    if (user) {
      async function getUserData() {
        const docRef = doc(db, "users", user.email);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());

          setUserData(docSnap.data());
        } else {
          console.log("No such document!");
        }
      }
      getUserData();
    } else {
      console.log("No User");
    }
  }, [user]);

  // useEffect(() => {
  //   setUserName(userData.username);
  // }, [userData.username]);

  return (
    <Wrapper>
      <Nav>
        <GiKnifeFork />
        <Logo to={"/"}> WAIET Recipes </Logo>
      </Nav>
      <Search />
      <Login>
        {user ? (
          <div className='navbar__wrapper'>
            <div className='navbar__login'>
              <h4>Logged in as </h4>
              {userData.username ? (
                <h4> {userData.username} </h4>
              ) : (
                <h4>{user.email}</h4>
              )}
            </div>
            <button onClick={logout}>Logout</button>
            <AccountData>
              <Link to={"/account"}>
                <button>Account</button>
              </Link>
            </AccountData>
          </div>
        ) : (
          <>
            <Link to={"/login/"}>
              <button>Login</button>
            </Link>
            <Link to={"/register/"}>
              <button>Register</button>
            </Link>
          </>
        )}
      </Login>
    </Wrapper>
  );
}

const Wrapper = styled.nav`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  margin: 0;
  box-shadow: 0 2px 2px -2px rgba(0, 0, 0, 0.2);
  align-items: center;
`;

const Logo = styled(Link)`
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: 400;
  font-family: "Montserrat";
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  color: #732e36;
`;

const Nav = styled.div`
  padding: 2rem 0rem;
  display: flex;
  align-items: center;
  svg {
    font-size: 2rem;
  }
`;

const Login = styled.div`
  display: flex;
  button {
    background: var(--buttons);
    max-width: 7rem;
    border-radius: 5px;
    margin: 20px;
    text-decoration: none;
    border: none;
    padding: 0.7rem 1.8rem;
    color: var(--buttonText);
    font-weight: 400;
    font-size: 1rem;
    font-family: "Alata";
    cursor: pointer;
  }
  button:hover {
    opacity: 0.9;
  }
`;

const AccountData = styled.div`
  display: flex;
  button {
    background: var(--buttons);
    max-width: 7rem;
    border-radius: 5px;
    margin: 20px;
    text-decoration: none;
    border: none;
    padding: 0.7rem 1.8rem;
    color: var(--buttonText);
    font-weight: 400;
    font-size: 1rem;
    font-family: "Alata";
    cursor: pointer;
  }
  button:hover {
    opacity: 0.9;
  }
`;
export default Navbar;
