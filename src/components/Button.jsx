import { Link } from "react-router-dom";
import styled from "styled-components";

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
  margin: 0;
`;

const Button = styled.button`
  min-width: 15rem;
  padding: 1rem;
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
`;
export default HomeButton;
