import { useEffect, useState } from "react";
import { GiKnifeFork } from "react-icons/gi";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { db } from "../firebase";
import Search from "./Search";
import { UserAuth } from "../context/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { devices } from "../util/breakpoints";
import "./Navbar.css";
import { useRef } from "react";
function Navbar() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState([]);
  const { user, logOut } = UserAuth();
  const [navMenu, setNavMenu] = useState(false);

  const navigateAccount = () => {
    setNavMenu(false);
    navigate("/account");
  };
  const navigateLogin = () => {
    setNavMenu(false);
    navigate("/login");
  };
  const navigateRegister = () => {
    setNavMenu(false);
    navigate("/register");
  };

  const burger = () => {
    setNavMenu((current) => !current);
  };

  const logout = () => {
    setNavMenu(false);
    logOut();
  };
  const changeClass = () => {
    const scrollValue = document.documentElement.scrollTop;
    if (scrollValue > 1) {
      setNavMenu(false);
    }
  };
  window.addEventListener("scroll", changeClass);

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

  return (
    <Wrapper>
      <Logo>
        <LogoLink to={"/"}>
          <GiKnifeFork /> <p className='logo__text'>WAIET Recipes</p>
        </LogoLink>
      </Logo>
      <div className='nav__fullWidth'>
        <Search />
      </div>

      <Nav>
        {user ? (
          <>
            <div className={`navbar__wrapper ${navMenu ? "navActive" : ""}`}>
              <div className='navbar__login'>
                <h4>Logged in as </h4>
                {userData.username ? (
                  <p> {userData.username} </p>
                ) : (
                  <p>{user.email}</p>
                )}
              </div>
              <button className='nav__menuContent' onClick={logout}>
                Logout
              </button>

              <button onClick={navigateAccount} className='nav__menuContent'>
                Account
              </button>
            </div>
            <div className={`${navMenu ? "overlay" : ""}`}></div>
            <div
              onClick={burger}
              className={`nav__menu ${navMenu ? "navActive" : ""}`}
            >
              <span className='nav__menuBar '></span>
              <span className='nav__menuBar '></span>
              <span className='nav__menuBar '></span>
            </div>
          </>
        ) : (
          <>
            <div className={`navbar__wrapper ${navMenu ? "navActive" : ""}`}>
              <button onClick={navigateLogin} className='nav__menuContent'>
                Login
              </button>
              <button onClick={navigateRegister} className='nav__menuContent'>
                Register
              </button>
            </div>
            <div className={`${navMenu ? "overlay" : ""}`}></div>
            <div
              onClick={burger}
              className={`nav__menu ${navMenu ? "navActive" : ""}`}
            >
              <span className='nav__menuBar'></span>
              <span className='nav__menuBar'></span>
              <span className='nav__menuBar'></span>
            </div>
          </>
        )}
      </Nav>
      <div className='nav__responsiveWidth'>
        <Search />
      </div>
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
  @media ${devices.laptopM} {
    display: grid;
    grid-template-columns: 3fr 1fr;
  }
`;

const LogoLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: 400;
  font-family: "Montserrat";
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  color: #732e36;
  .logo__text {
    color: #732e36;
    @media ${devices.laptopM} {
      font-size: 1.4rem;
    }
  }
`;

const Logo = styled.div`
  padding: 2rem 0rem;
  display: flex;
  align-items: center;
  color: #732e36;
  svg {
    font-size: 2rem;
    color: #732e36;
  }
`;

const Nav = styled.div`
  display: flex;
  margin: 0 auto;
  button {
    background: var(--buttons);
    min-width: 10rem;
    border-radius: 5px;
    margin: 1rem;
    text-decoration: none;
    border: none;
    padding: 0.7rem 0rem;
    color: var(--buttonText);
    font-weight: 400;
    font-size: 1rem;
    font-family: "Alata";
    cursor: pointer;
    @media ${devices.laptopM} {
      min-width: 8rem;
      margin: 0.1rem;
      margin-left: 1rem;
    }
  }
  button:hover {
    opacity: 0.9;
  }
  @media ${devices.laptopM} {
    flex-direction: column;
  }
`;

const AccountData = styled.div`
  /* display: flex;
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
  } */
`;
export default Navbar;
