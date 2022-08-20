import React, { useEffect } from "react";
import styled from "styled-components";
import Analytics from "./Analytics";
import TempDash from "./TempDash";
import HumdDash from "./HumdDash";
import Navbar from "./Navbar";
import Profile from "./Profile";
import SensorSummary from "./SensorSummary";
import scrollreveal from "scrollreveal";
export default function Dashboard({alarmNotSeen}) {
  useEffect(() => {
    const sr = scrollreveal({
      origin: "bottom",
      distance: "80px",
      duration: 2000,
      reset: false,
    });
    sr.reveal(
      `
        nav,
        .row__one,
        .row__two
    `,
      {
        opacity: 0,
        interval: 100,
      }
    );
  }, []);
  return (
    <Section>
      <Navbar />
      <div className="grid">
        <div className="row__one">
          <Analytics />
          <HumdDash />
        </div>
        <div className="row__two">
          <TempDash />
          <SensorSummary />
          <Profile alarmNotSeen={alarmNotSeen}/>
        </div>
      </div>
    </Section>
  );
}

const Section = styled.section`
  margin-left: 18vw;
  padding: 2rem;
  height: 100%;
  .grid {
    display: flex;
    flex-direction: column;
    height: 100%;
    gap: 1rem;
    margin-top: 2rem;
    .row__one {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      height: 50%;
      gap: 1rem;
    }
    .row__two {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1rem;
      height: 50%;
    }
  }
  @media screen and (min-width: 280px) and (max-width: 1080px) {
    margin-left: 0;
    .grid {
      .row__one,
      .row__two {
        grid-template-columns: 1fr;
      }
    }
  }
`;
