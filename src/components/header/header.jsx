import { Navigation } from "../../util/navigation";
import { useRef, useState, useEffect } from "react";
import Clock from "../clock/clock";
import SliderBar from "../sliderBar/sliderBar";
import "./header.scss";

const Header = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeTimezone, setActiveTimezone] = useState(0);
  const [activeElementSizePos, setActiveElementSizePos] = useState({
    width: 0,
    height: 0,
    posX: 0,
    posY: 0,
  });
  const [windowWidth, setWindowWidth] = useState(0);

  const activeMenuRef = useRef(null);

  useEffect(() => {
    if (document.readyState === "complete") {
      handleWindowSizeChange();
    } else {
      window.addEventListener("load", handleWindowSizeChange);
    }
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.addEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  const updateActiveElement = (el) => {
    const boundingClientRect = el.getBoundingClientRect();
    setActiveElementSizePos({
      width: el.offsetWidth,
      height: el.offsetHeight,
      posX: boundingClientRect.x,
      posY: boundingClientRect.y,
    });
  };

  const handleClick = (index, e) => {
    updateActiveElement(e.target);
    setActiveIndex(index);

    const activeCity = Navigation.cities[index];
    const timezone = activeCity.timezone;
    setActiveTimezone(timezone);
  };

  const handleWindowSizeChange = () => {
    setWindowWidth(window.innerWidth);
    updateActiveElement(activeMenuRef.current);
  };

  return (
    <header>
      <ul>
        {Navigation.cities.map((nav, index) => (
          <li key={index} className={index === activeIndex ? "active" : ""}>
            <button aria-label={nav.label} tabIndex='-1'>
              <span
                ref={index === activeIndex ? activeMenuRef : null}
                onClick={(e) => handleClick(index, e)}>
                {nav.label}
              </span>
            </button>
          </li>
        ))}
      </ul>
      <SliderBar
        activeElementSizePos={activeElementSizePos}
        windowWidth={windowWidth}
      />
      <Clock timeAdjustment={activeTimezone} />
    </header>
  );
};

export default Header;
