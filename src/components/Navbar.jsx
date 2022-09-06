import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";


export default function Navbar() {

  const [time, setTime] = useState();

  let today = new Date().toLocaleDateString('fa-IR-u-nu-latn');
  let todayTime = new Date().toLocaleTimeString();

  useEffect(() =>{
    const timer = setInterval(() => {
    setTime(new Date().toLocaleString());
    }, 1000);
    return () => {
      clearInterval(timer);
    };
}, []);

  return (
    <Nav>
      <div className="title">
        <h4>{today}, {todayTime}</h4>
        <h1>
          Welcome to <span>GMC DASHBOARD</span>
        </h1>
      </div>
    </Nav>
  );
}
const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  color: white;
  .title {
    h1 {
      span {
        margin-left: 0.5rem;
        color: #697A21;
        letter-spacing: 0rem;
      }
    }
  }
  .search {
    background-color: #212121;
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem 8rem 1rem 1rem;
    border-radius: 1rem;
    svg {
      color: #697A21;
    }
    input {
      background-color: transparent;
      border: none;
      color: #697A21;
      &:focus {
        outline: none;
      }
      &::placeholder {
        color: #697A21;
        letter-spacing: 0.05rem;
      }
    }
  }
  @media screen and (min-width: 280px) and (max-width: 1080px) {
    flex-direction: column;
    .title {
      h1 {
        span {
          display: block;

          margin: 1rem 0;
          /* letter-spacing: 0; */
        }
      }
    }
  }
`;
