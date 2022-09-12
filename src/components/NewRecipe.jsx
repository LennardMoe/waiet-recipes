import styled from "styled-components";

function NewRecipe() {
  return (
    <Wrapper>
      <Button> Create new Recipe</Button>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 0;
`;

const Button = styled.button`
  width: 20rem;
  padding: 1.2rem;
  background: var(--primary-red);
  border-radius: 5px;
  text-decoration: none;
  border: none;

  color: #b3ffc3;
  font-weight: 400;
  font-size: 1rem;
  font-family: "Alata";
  cursor: pointer;
  :hover {
    opacity: 0.9;
  }
`;
export default NewRecipe;
