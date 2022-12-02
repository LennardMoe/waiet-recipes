import React from "react";
import styled from "styled-components";
import { AiFillGithub, AiFillLinkedin } from "react-icons/ai";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <Foot>
      <h4>Created by LennardMoe </h4>
      <Icons>
        <a
          href='https://github.com/LennardMoe'
          target='_blank'
          rel='noreferrer'
        >
          <AiFillGithub className='footer__github' />
        </a>
        <a
          href='https://www.linkedin.com/in/lennard-m%C3%B6ller-372571229/'
          target='_blank'
          rel='noreferrer'
        >
          <AiFillLinkedin className='footer__linkedin' />
        </a>
      </Icons>
    </Foot>
  );
}

const Foot = styled.footer`
  display: flex;
  box-shadow: 0 -2px 0px 0px rgba(0, 0, 0, 0.2);
  padding: 1rem;
  align-items: center;
  justify-content: right;
  gap: 2rem;
  bottom: 0;
  width: 100%;
  .footer__github {
    margin-right: 0.5rem;
    color: var(--text);
  }
  .footer__linkedin {
    color: var(--text);
  }
`;
const Icons = styled.div`
  font-size: 2rem;
  color: var(--text);
  display: flex;
  /* align-items: center; */
`;

export default Footer;
