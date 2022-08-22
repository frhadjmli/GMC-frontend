import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { MdSpaceDashboard, MdMessage } from "react-icons/md";
import { FaTemperatureHigh, FaLeaf } from "react-icons/fa";
import { AiOutlineControl } from "react-icons/ai";
import { WiHumidity } from "react-icons/wi";
import { BsFillBrightnessHighFill } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";
import { GiHamburgerMenu } from "react-icons/gi";
import { VscChromeClose } from "react-icons/vsc";
import scrollreveal from "scrollreveal";
import AuthContext from '../context/AuthContext';

export default function Sidebar({alarmNotSeen ,seenAlarm}) {

  let navigate = useNavigate();
  let {logoutUser} = useContext(AuthContext)

  const [currentLink, setCurrentLink] = useState(1);
  const [navbarState, setNavbarState] = useState(false);
  const html = document.querySelector("html");
  html.addEventListener("click", () => setNavbarState(false));

  useEffect(() => {
    const sr = scrollreveal({
      origin: "left",
      distance: "80px",
      duration: 1000,
      reset: false,
    });

    sr.reveal(
      `
          .brand,
          .links>ul>li:nth-of-type(1),
      .links>ul>li:nth-of-type(2),
      .links>ul>li:nth-of-type(3),
      .links>ul>li:nth-of-type(4),
      .links>ul>li:nth-of-type(5),
      .links>ul>li:nth-of-type(6),
      .logout
      `,
      {
        opacity: 0,
        interval: 300,
      }
    );
  }, []);

  
  return (
    <>
      <Section>
        <div className="top">
          <div className="brand">
            <FaLeaf />
            <span>HGMC</span>
          </div>
          <div className="toggle">
            {navbarState ? (
              <VscChromeClose onClick={() => setNavbarState(false)} />
            ) : (
              <GiHamburgerMenu
                onClick={(e) => {
                  e.stopPropagation();
                  setNavbarState(true);
                }}
              />
            )}
          </div>
          <div className="links">
            <ul>
              <li
                className={currentLink === 1 ? "active" : "none"}
                onClick={() => setCurrentLink(1)}
              >
                <a href="">
                  <MdSpaceDashboard />
                  <span onClick={(e)=>{e.preventDefault();navigate("/");}}> Dashboard</span>
                </a>
              </li>
              <li
                className={currentLink === 2 ? "active" : "none"}
                onClick={() => setCurrentLink(2)}
              >
                <a href="">
                  <FaTemperatureHigh />
                  <span onClick={(e)=>{e.preventDefault();navigate("/temperature");}}> Temperature</span>
                </a>
              </li>
              <li
                className={currentLink === 3 ? "active" : "none"}
                onClick={() => setCurrentLink(3)}
              >
                <a href="">
                  <WiHumidity />
                  <span onClick={(e)=>{e.preventDefault();navigate("/humidity");}}> Humidity</span>
                </a>
              </li>
              <li
                className={currentLink === 4 ? "active" : "none"}
                onClick={() => setCurrentLink(4)}
              >
                <a href="">
                  <BsFillBrightnessHighFill />
                  <span onClick={(e)=>{e.preventDefault();navigate("/lux");}}> Lux</span>
                </a>
              </li>
              <li
                className={currentLink === 5 ? "active" : "none"}
                onClick={() => setCurrentLink(5)}
              >
                <a href="">
                  <AiOutlineControl />
                  <span onClick={(e)=>{e.preventDefault();navigate("/switch");}}> Switches</span>
                </a>
              </li>
              <li
                className={currentLink === 6 ? "active" : "none"}
                onClick={() => setCurrentLink(6)}
              >
                <a href="">
                  <MdMessage />
                  <span onClick={(e)=>{e.preventDefault();seenAlarm();navigate("/alarm");}}> Alarm Messages</span>{alarmNotSeen.length ? <Span>{alarmNotSeen.length}</Span> : <span></span>}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="logout">
          <a href="">
            <FiLogOut />
            <span className="logout" onClick={logoutUser}>Logout</span>
          </a>
        </div>
      </Section>
      <ResponsiveNav state={navbarState} className={navbarState ? "show" : ""}>
        <div className="responsive__links">
          <ul>
            <li
              className={currentLink === 1 ? "active" : "none"}
              onClick={() => setCurrentLink(1)}
            >
              <a href="">
                <MdSpaceDashboard />
                <span onClick={(e)=>{e.preventDefault();navigate("/");}}> Dashboard</span>
              </a>
            </li>
            <li
              className={currentLink === 2 ? "active" : "none"}
              onClick={() => setCurrentLink(2)}
            >
              <a href="">
                <FaTemperatureHigh />
                <span onClick={(e)=>{e.preventDefault();navigate("/temperature");}}> Temperature</span>
              </a>
            </li>
            <li
              className={currentLink === 3 ? "active" : "none"}
              onClick={() => setCurrentLink(3)}
            >
              <a href="">
                <WiHumidity />
                <span onClick={(e)=>{e.preventDefault();navigate("/humidity");}}> Humidity</span>
              </a>
            </li>
            <li
              className={currentLink === 4 ? "active" : "none"}
              onClick={() => setCurrentLink(4)}
            >
              <a href="">
                <BsFillBrightnessHighFill />
                <span onClick={(e)=>{e.preventDefault();navigate("/lux");}}> Lux</span>
              </a>
            </li>
            <li
              className={currentLink === 5 ? "active" : "none"}
              onClick={() => setCurrentLink(5)}
            >
              <a href="">
                <AiOutlineControl />
                <span onClick={(e)=>{e.preventDefault();navigate("/switch");}}> Switches</span>
              </a>
            </li>
            <li
              className={currentLink === 6 ? "active" : "none"}
              onClick={() => setCurrentLink(6)}
            >
              <a href="">
                <MdMessage />
                <span onClick={(e)=>{e.preventDefault();seenAlarm();navigate("/alarm");}}> Alarm Messages</span>{alarmNotSeen.length ? <Span>{alarmNotSeen.length}</Span> : <span></span>}
              </a>
            </li>
            <hr />
            <li className="lgout">
              <a href="">
                <FiLogOut />
                <span onClick={logoutUser}> Logout</span>
              </a>
            </li>
          </ul>
        </div>
      </ResponsiveNav>
    </>
  );
}

const Span = styled.span`
background-color: red;
border-radius: 0.6rem;
padding : 0.2rem;
`;

const Section = styled.section`
  position: fixed;
  left: 0;
  background-color: #212121;
  height: 100vh;
  width: 18vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 2rem 0;
  gap: 2rem;
  .top {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    width: 100%;

    .toggle {
      display: none;
    }
    .brand {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 2rem;
      svg {
        color: #697A21;
        font-size: 2rem;
      }
      span {
        font-size: 2rem;
        color: #697A21;
      }
    }
    .links {
      display: flex;
      justify-content: center;
      ul {
        list-style-type: none;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        li {
          padding: 0.6rem 1rem;
          border-radius: 0.6rem;
          &:hover {
            background-color: #697A21;
            a {
              color: black;
            }
          }
          a {
            text-decoration: none;
            display: flex;
            gap: 1rem;
            color: white;
          }
        }
        .active {
          background-color: #697A21;
          a {
            color: black;
          }
        }
      }
    }
  }

  .logout {
    padding: 0.3rem 1rem;
    border-radius: 0.6rem;
    &:hover {
      background-color: #da0037;
    }
    a {
      text-decoration: none;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      color: white;
    }
  }
  @media screen and (min-width: 280px) and (max-width: 1080px) {
    position: initial;
    width: 100%;
    height: max-content;
    padding: 1rem;
    .top {
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      padding: 0 1rem;
      .toggle {
        display: block;
        color: white;
        z-index: 99;
        svg {
          font-size: 1.4rem;
        }
      }
      .brand {
        gap: 1rem;
        justify-content: flex-start;
      }
    }
    .top > .links,
    .logout {
      display: none;
    }
  }
`;

const ResponsiveNav = styled.div`
  position: fixed;
  right: -10vw;
  top: 0;
  z-index: 10;
  background-color: black;
  height: 100vh;
  width: ${({ state }) => (state ? "60%" : "0%")};
  transition: 0.4s ease-in-out;
  display: flex;
  opacity: 0;
  visibility: hidden;
  padding: 1rem;
  .responsive__links {
    ul {
      list-style-type: none;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      margin-top: 3rem;
      li {
        padding: 0.6rem 1rem;
        border-radius: 0.6rem;
        &:hover {
          background-color: #697A21;
          a {
            color: black;
          }
        }
        a {
          text-decoration: none;
          display: flex;
          gap: 1rem;
          color: white;
        }
      }
      .active {
        background-color: #697A21;
        a {
          color: black;
        }
      }
      .lgout {
        &:hover {
          background-color: #da0037;
          a {
            color: white;
          }
        }
      }
    }
  }
`;
