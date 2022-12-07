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
import { devices } from "../util/breakpoints";
import "./Navbar.css";
function Navbar() {
  // const [user, setUser] = useState({});
  const [userData, setUserData] = useState([]);
  const [userName, setUserName] = useState("");
  const { user, logOut } = UserAuth();
  const navigate = useNavigate();
  const [navMenu, setNavMenu] = useState(false);

  // onAuthStateChanged(auth, (currentUser) => {
  //   setUser(currentUser);
  // });

  // const logout = async () => {
  //   await signOut(auth);
  // };

  const burger = () => {
    setNavMenu((current) => !current);
  };

  const logout = () => {
    setNavMenu((current) => !current);
    logOut();
    // navigate("/");
  };
  const changeClass = () => {
    const scrollValue = document.documentElement.scrollTop;
    if (scrollValue != scrollValue) {
      setNavMenu(false);
    }
    // else{
    //   setstate(false);
    // }
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

  // useEffect(() => {
  //   setUserName(userData.username);
  // }, [userData.username]);

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
                  <h4> {userData.username} </h4>
                ) : (
                  <h4>{user.email}</h4>
                )}
              </div>
              <button className='nav__menuContent' onClick={logout}>
                Logout
              </button>
              {/* <AccountData> */}
              <Link to={"/account"}>
                <button className='nav__menuContent'>Account</button>
              </Link>
              {/* </AccountData> */}
            </div>

            <div
              onClick={burger}
              onScroll={scroll}
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
              <Link to={"/login/"}>
                <button className='nav__menuContent'>Login</button>
              </Link>
              <Link to={"/register/"}>
                <button className='nav__menuContent'>Register</button>
              </Link>
            </div>
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
  @media ${devices.laptop} {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
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
    @media ${devices.laptop} {
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
    @media ${devices.laptop} {
      min-width: 8rem;
      margin: 0.1rem;
      margin-left: 1rem;
    }
  }
  button:hover {
    opacity: 0.9;
  }
  @media ${devices.laptop} {
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
