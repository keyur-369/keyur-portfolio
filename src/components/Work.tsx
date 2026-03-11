import { useState, useCallback } from "react";
import "./styles/Work.css";
import WorkImage from "./WorkImage";
import { MdArrowBack, MdArrowForward } from "react-icons/md";

const projects = [
  {
    title: "Split Expenses",
    category: "Expense Tracker App",
    tools: "Flutter, Dart, Provider, Firebase",
    image: "/images/split_expenses.png",
    github: "https://github.com/keyur-369/split_expenses.git",
  },
  {
    title: "CampusQuest",
    category: "College App",
    tools: "Flutter, Firebase, REST API",
    image: "/images/campus_quest.png",
    github: "https://github.com/keyur-369/campusquest.git",
  },
  {
    title: "Weather App",
    category: "Weather Application",
    tools: "Flutter, REST API, Dart",
    image: "/images/weather_app.png",
    github: "https://github.com/keyur-369/weather.git",
  },
  {
    title: "Quiz App",
    category: "Quiz Mobile App",
    tools: "Flutter, Local Storage, UI/UX",
    image: "/images/quiz_app.png",
    github: "https://github.com/keyur-369/quiz_app.git",
  },
  {
    title: "Daily Health Tracker",
    category: "Health & Fitness App",
    tools: "Flutter, Dart, Provider",
    image: "/images/health_tracker.png",
    github: "https://github.com/keyur-369/daily_health_tracker.git",
  },
];

const Work = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Drag / Swipe State
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentTranslate, setCurrentTranslate] = useState(0);

  const goToSlide = useCallback(
    (index: number) => {
      if (isAnimating) return;
      setIsAnimating(true);
      setCurrentIndex(index);
      setCurrentTranslate(0);
      setTimeout(() => setIsAnimating(false), 500);
    },
    [isAnimating]
  );

  const goToPrev = useCallback(() => {
    const newIndex =
      currentIndex === 0 ? projects.length - 1 : currentIndex - 1;
    goToSlide(newIndex);
  }, [currentIndex, goToSlide]);

  const goToNext = useCallback(() => {
    const newIndex =
      currentIndex === projects.length - 1 ? 0 : currentIndex + 1;
    goToSlide(newIndex);
  }, [currentIndex, goToSlide]);

  // Touch and Mouse Drag Handlers
  const handleDragStart = (e: React.TouchEvent | React.MouseEvent) => {
    if (isAnimating) return;
    const clientX =
      "touches" in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    setStartX(clientX);
    setIsDragging(true);
  };

  const handleDragMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isDragging) return;
    const clientX =
      "touches" in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const offset = clientX - startX;
    setCurrentTranslate(offset);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    const threshold = 100;

    if (currentTranslate < -threshold) {
      goToNext();
    } else if (currentTranslate > threshold) {
      goToPrev();
    } else {
      // Snap back if threshold not met
      setCurrentTranslate(0);
    }
  };

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>

        <div className="carousel-wrapper">
          {/* Navigation Arrows */}
          <button
            className="carousel-arrow carousel-arrow-left"
            onClick={goToPrev}
            aria-label="Previous project"
            data-cursor="disable"
          >
            <MdArrowBack />
          </button>
          <button
            className="carousel-arrow carousel-arrow-right"
            onClick={goToNext}
            aria-label="Next project"
            data-cursor="disable"
          >
            <MdArrowForward />
          </button>

          {/* Slides */}
          <div className="carousel-track-container">
            <div
              className="carousel-track"
              style={{
                transform: `translateX(calc(-${currentIndex * 100}% + ${currentTranslate}px))`,
                transition: isDragging
                  ? "none"
                  : "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                cursor: isDragging ? "grabbing" : "grab",
                userSelect: "none",
              }}
              onTouchStart={handleDragStart}
              onTouchMove={handleDragMove}
              onTouchEnd={handleDragEnd}
              onMouseDown={handleDragStart}
              onMouseMove={handleDragMove}
              onMouseUp={handleDragEnd}
              onMouseLeave={handleDragEnd}
            >
              {projects.map((project, index) => (
                <div className="carousel-slide" key={index}>
                  <div className="carousel-content">
                    <div className="carousel-info">
                      <div className="carousel-number">
                        <h3>0{index + 1}</h3>
                      </div>
                      <div className="carousel-details">
                        <h4>{project.title}</h4>
                        <p className="carousel-category">
                          {project.category}
                        </p>
                        <div className="carousel-tools">
                          <span className="tools-label">Tools & Features</span>
                          <p>{project.tools}</p>
                        </div>
                        <div className="carousel-tools" style={{ marginTop: "1rem" }}>
                          <span className="tools-label">Source Code</span>
                          <a href={project.github} target="_blank" rel="noreferrer" style={{ color: "var(--accent)", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "8px", fontSize: "16px", marginTop: "5px" }} data-cursor="disable">
                            View on GitHub <MdArrowForward />
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="carousel-image-wrapper" style={{ pointerEvents: 'none' }}>
                      <WorkImage image={project.image} alt={project.title} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dot Indicators */}
          <div className="carousel-dots">
            {projects.map((_, index) => (
              <button
                key={index}
                className={`carousel-dot ${index === currentIndex ? "carousel-dot-active" : ""
                  }`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to project ${index + 1}`}
                data-cursor="disable"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Work;
