import { Link } from "react-router-dom";
import styled from "styled-components";
import { devices } from "../util/breakpoints";

function HomeButton(props) {
  return (
    <Wrapper>
      <Link to={props.link}>
        <Button>{props.text}</Button>
      </Link>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Button = styled.button`
  /* min-width: 15rem; */
  min-width: 15rem;

  padding: 0.5rem;
  background: var(--buttons);
  border-radius: 5px;
  text-decoration: none;
  border: none;
  letter-spacing: 4px;
  color: var(--buttonText);
  font-weight: 400;
  font-size: 1.4rem;
  font-family: "Alata";
  cursor: pointer;
  :hover {
    opacity: 0.9;
  }
  @media ${devices.desktop} {
    font-size: 1.5rem;
    /* min-width: 15rem; */
    min-width: 15rem;
    text-align: center;
    letter-spacing: 1px;
    padding: 1rem 8rem;
  }
  @media ${devices.laptopL} {
    font-size: 1.5rem;
    min-width: 15rem;

    text-align: center;
    letter-spacing: 1px;
    padding: 1rem 4rem;
  }

  @media ${devices.laptopM} {
    font-size: 1.2rem;
    min-width: 12rem;
    /* min-width: 60vw; */
    max-width: 20rem;
    text-align: center;
    letter-spacing: 1px;
    padding: 0.5rem;
  }
  @media ${devices.laptop} {
    font-size: 1.2rem;
    /* min-width: 60vw; */
    min-width: 60vw;
    max-width: 20rem;
    text-align: center;
    letter-spacing: 1px;
    padding: 0.5rem;
  }
`;
export default HomeButton;
