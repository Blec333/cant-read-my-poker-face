import React from "react";

// TODO: Add a comment explaining how we are able to extract the key value pairs from props
//
function NavTabs({ currentPage, handlePageChange }) {
  return (
    <ul className="nav nav-tabs">
      <li className="nav-item">
        <a
          href="#home"
          onClick={() => handlePageChange("Home")}
          //*  TODO: BONUS: Add a comment explaining what kind of operator this is and what it is checking for

          className={currentPage === "Home" ? "nav-link active" : "nav-link"}
        >
          Home
        </a>
      </li>
      <li className="nav-item">
        <a
          href="#login"
          onClick={() => handlePageChange("Login")}
          //  TODO: Add a comment explaining what this logic is doing

          className={currentPage === "Login" ? "nav-link active" : "nav-link"}
        >
          Login
        </a>
      </li>
      <li className="nav-item">
        <a
          href="#landingpage"
          onClick={() => handlePageChange("LandingPage")}
          //  TODO: Add a comment explaining what this logic is doing

          className={
            currentPage === "LandingPage" ? "nav-link active" : "nav-link"
          }
        >
          Landing Page
        </a>
      </li>
      <li className="nav-item">
        <a
          href="#playerboard"
          //  TODO: Add a comment explaining what this logic is doing

          onClick={() => handlePageChange("PlayerBoard")}
          className={
            currentPage === "PlayerBoard" ? "nav-link active" : "nav-link"
          }
        >
          Player Board
        </a>
      </li>
      <li className="nav-item">
        <a
          href="#pokertable"
          //  TODO: Add a comment explaining what this logic is doing

          onClick={() => handlePageChange("PokerTable")}
          className={
            currentPage === "PokerTable" ? "nav-link active" : "nav-link"
          }
        >
          Poker Table
        </a>
      </li>
      <li className="nav-item">
        <a
          href="#signup"
          //  TODO: Add a comment explaining what this logic is doing

          onClick={() => handlePageChange("SignUp")}
          className={currentPage === "SignUp" ? "nav-link active" : "nav-link"}
        >
          Sign Up
        </a>
      </li>
    </ul>
  );
}

export default NavTabs;
