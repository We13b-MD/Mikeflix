import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import "../Cssfiles/Navbar.css";
import { useUser } from "../CreateContext/userContext";
import React, { useState } from "react";
import { FaSignOutAlt, FaTimes, FaBars } from "react-icons/fa";

function Navbar() {
  const [clicked, setClicked] = useState(false);
  const Navigate = useNavigate();
  const { isAuthenticated, logout } = useUser();
  function handleClick() {
    setClicked(!clicked);
  }

  function Logout() {
    Navigate("/movies");
  }
  return (
    <>
      <main>
        <div className="logo">
          <div id="navbar"></div>

          <nav className="navbar">
            <div id="links" className="links">
              <div className="menu-icon" onClick={handleClick}>
                {clicked ? <FaTimes /> : <FaBars />}
              </div>

              <ul
                className={clicked ? "nav-menu active" : "nav-menu"}
                id="navlinks"
              >
                <li className="nav-item">
                  <NavLink id="navlinkH" to="/" className="">
                    HOME
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    id="navlinkL"
                    className={!isAuthenticated ? "" : "hidden"}
                    to="/login"
                  >
                    LOGIN
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    id="navlinkM"
                    className={isAuthenticated ? "" : "hidden"}
                    to="/movies"
                  >
                    MOVIES
                  </NavLink>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </main>
    </>
  );
}

export default Navbar;
