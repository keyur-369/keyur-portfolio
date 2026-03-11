import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Flutter Developer Intern</h4>
                <h5>Patrixel · Remote</h5>
              </div>
              <h3>Dec '25<br/><span style={{fontSize:"0.55em", color:"var(--accent)"}}>Present</span></h3>
            </div>
            <p>
              Developing and maintaining cross-platform mobile applications using Flutter and Dart.
              Implementing new features and enhancing existing modules while converting UI/UX designs
              into responsive and visually consistent screens. Integrating REST APIs, third-party plugins,
              and backend services. Participating in testing, debugging, and peer code reviews, and staying
              updated with the latest Flutter updates and best practices.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
