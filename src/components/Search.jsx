import styled from "styled-components";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Search() {
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const submitHandler = (e) => {
    e.preventDefault();
    navigate("/searched/" + input);
  };

  return (
    <FormStyle onSubmit={submitHandler}>
      <div>
        <FaSearch></FaSearch>
        <input
          onChange={(e) => setInput(e.target.value)}
          type='text'
          value={input}
        />
      </div>
    </FormStyle>
  );
}

const FormStyle = styled.form`
  /* margin-top: 1rem; */
  div {
    position: relative;
    width: 100%;
    min-width: 15rem;
  }
  input {
    border: none;
    background: linear-gradient(35deg, #fffbfb, #dfdada);
    font-size: 1.2rem;
    color: #0f0e0e;
    padding: 1rem 3rem;
    border: none;
    border-radius: 1rem;
    outline: none;
    width: 100%;
  }
  input:focus {
    border: var(--dark) 1px solid;
  }
  svg {
    position: absolute;
    top: 50%;
    left: 0%;
    transform: translate(100%, -50%);
    color: var(--dark);
  }
`;
export default Search;
