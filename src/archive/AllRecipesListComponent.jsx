import { Link } from "react-router-dom";
import styled from "styled-components";

function AllRecipesList() {
  return (
    <Wrapper>
      <Link to={"/allRecipesList/"}>
        <Button> All</Button>
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
  background: var(--primary-red);
  border-radius: 5px;
  text-decoration: none;
  border: none;
  letter-spacing: 4px;
  color: #b3ffc3;
  font-weight: 400;
  font-size: 1.4rem;
  font-family: "Alata";
  cursor: pointer;
  :hover {
    opacity: 0.9;
  }
`;
export default AllRecipesList;
