import { FaHamburger } from "react-icons/fa";
import { BiCookie } from "react-icons/bi";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { TbCheese, TbSoup } from "react-icons/Tb";
import { devices } from "../util/breakpoints";

function Category() {
  return (
    <List>
      <SLink to={"/cuisine/soup"}>
        <TbSoup />
        <h4>Soup</h4>
      </SLink>
      <SLink to={"/cuisine/appetizer"}>
        <TbCheese />
        <h4>Appetizer</h4>
      </SLink>
      <SLink to={"/cuisine/maincourse"}>
        <FaHamburger />
        <h4>Main</h4>
      </SLink>

      <SLink to={"/cuisine/dessert"}>
        <BiCookie />
        <h4>Dessert</h4>
      </SLink>
    </List>
  );
}

const List = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2rem 0rem;
  @media ${devices.tablet} {
    margin: 0;
  }
`;

const SLink = styled(NavLink)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 25rem;
  margin-right: 2rem;
  text-decoration: none;
  background: linear-gradient(35deg, #494949, #313131);
  width: 6rem;
  height: 6rem;
  cursor: pointer;
  transform: scale(0.8);
  @media ${devices.tablet} {
    margin: 1rem 0.2rem;
    min-width: fit-content;
    min-height: fit-content;
    text-align: center;
  }
  @media ${devices.mobileL} {
    margin: 1rem 0rem;
    min-height: fit-content;
    text-align: center;
  }

  h4 {
    color: white;
    font-size: 1rem;
    @media ${devices.tablet} {
      font-size: 0.9rem;
    }
  }

  svg {
    color: white;
    font-size: 1.5rem;
  }
  &.active {
    background: linear-gradient(to right, #f27171, #e94057);

    svg {
      color: white;
    }
    h4 {
      color: white;
    }
  }
`;

export default Category;
