import React from "react";

// Here we are using object destructuring assignment to pluck off our variables from the props object
// We assign them to their own variable names
function NavTabs({ currentPage, handlePageChange }) {
  return (
    <ul>
      <li>
        <a
          href="#landingPage"
          onClick={() => handlePageChange("LandingPage")}
          // This is a conditional (ternary) operator that checks to see if the current page is "Home"
          // If it is, we set the current page to 'nav-link-active', otherwise we set it to 'nav-link'
          className={currentPage === "LandingPage"}
        >
          Landing Page
        </a>
      </li>
      <li className>
        <a
          href="#Login"
          onClick={() => handlePageChange("Login")}
          // Check to see if the currentPage is `About`, and if so we use the active link class from bootstrap. Otherwise, we set it to a normal nav-link
          className={currentPage === "Login"}
        >
          Login
        </a>
      </li>
      <li>
        <a
          href="#SignUp"
          onClick={() => handlePageChange("SignUp")}
          // Check to see if the currentPage is `Blog`, and if so we use the active link class from bootstrap. Otherwise, we set it to a normal nav-link
          className={currentPage === "SignUp"}
        >
          Sign Up
        </a>
      </li>
      <li>
        <a
          href="#PlayerBoard"
          onClick={() => handlePageChange("PlayerBoard")}
          // Check to see if the currentPage is `Contact`, and if so we use the active link class from bootstrap. Otherwise, we set it to a normal nav-link
          className={currentPage === "Contact"}
        >
          Player Board
        </a>
      </li>
    </ul>
  );
}

export default NavTabs;
