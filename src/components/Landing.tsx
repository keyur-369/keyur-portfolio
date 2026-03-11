import { PropsWithChildren } from "react";
import "./styles/Landing.css";

const Landing = ({ children }: PropsWithChildren) => {
  return (
    <>
      <div className="landing-section" id="landingDiv">
        <div className="landing-container">
          <div className="landing-intro">
            <h2>Hello! I'm</h2>
            <h1 className="landing-name-h1">
              <div className="landing-name-1">KEYUR MISTRY</div>
            </h1>
          </div>
          <div className="landing-info">
            <h3>A Flutter</h3>
            <h2>
              <div className="landing-h2-info">APP DEVELOPER</div>
            </h2>
          </div>
        </div>
        {children}
      </div>
    </>
  );
};

export default Landing;
