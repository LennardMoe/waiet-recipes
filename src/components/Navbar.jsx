import { onAuthStateChanged, signOut } from "firebase/auth";
import { useState } from "react";
import { GiKnifeFork } from "react-icons/gi";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { auth } from "../firebase";
import Search from "./Search";
import { UserAuth } from "../context/AuthContext";
function Navbar() {
  const [user, setUser] = useState({});

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  const logout = async () => {
    await signOut(auth);
  };

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
              <h4>{user.email}</h4>
            </div>
            <button onClick={logout}>Logout</button>
          </div>
        ) : (
          <>
            <Link to={"/Login/"}>
              <button>Login</button>
            </Link>
            <Link to={"/Register/"}>
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
    background: #732e36;
    max-width: 7rem;
    border-radius: 5px;
    margin: 20px;
    text-decoration: none;
    border: none;
    padding: 0.7rem 1.8rem;
    color: #b3ffc3;
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