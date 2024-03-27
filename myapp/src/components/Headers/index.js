import { useState } from "react";
import { NavLink } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";
import "./index.css";

const Headers = () => {
  // Using useState hook from react
  const [isMenuClicked, setisMenuClicked] = useState(false);

  const handleClick = () => setisMenuClicked((prevState) => !prevState);

  return (
    <>
    <nav className="nav-container">
      <NavLink to="/">
        <img
          className="logo"
          src="https://static.vecteezy.com/system/resources/previews/005/423/708/non_2x/graphical-analysis-icon-free-vector.jpg"
          alt="logo"
        />
      </NavLink>
      <button className="menu-btn" type="button" onClick={handleClick}>
        {isMenuClicked ? <RxCross2 /> : <GiHamburgerMenu />}
      </button>
      <div
        className={
          isMenuClicked
            ? "nav-links-container active-mobile-navbar"
            : "nav-links-container"
        }
      >
        <ul className="list-container">
          <NavLink onClick={handleClick} className="nav-link" to="/">
            <li className="each-link">Home</li>
          </NavLink>
          <NavLink onClick={handleClick} className="nav-link" to="/about">
            <li className="each-link">About</li>
          </NavLink>
          <NavLink onClick={handleClick} className="nav-link" to="/contact">
            <li className="each-link">Contact</li>
          </NavLink>
        </ul>
      </div>
    </nav>
    </>
  );
};

export default Headers;
