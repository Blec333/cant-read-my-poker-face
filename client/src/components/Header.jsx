import React from "react";

function Header({ currentPage, handlePageChange }) {
  return (
    <>
    <ul className="nav nav-tabs">
      <li className="nav-item">
        <a href="#home" onClick={() => handlePageChange("Home")} className={currentPage === "Home" ? "nav-link active" : "nav-link"}>Home</a>
      </li>
      <li className="nav-item">
        <a href="#login" onClick={() => handlePageChange("Login")} className={currentPage === "Login" ? "nav-link active" : "nav-link"}>Login</a>
      </li>
      <li className="nav-item">
        <a href="#landingpage" onClick={() => handlePageChange("LandingPage")} className={currentPage === "LandingPage" ? "nav-link active" : "nav-link"}>Landing Page</a>
      </li>
      <li className="nav-item">
        <a href="#playerboard" onClick={() => handlePageChange("PlayerBoard")} className={currentPage === "PlayerBoard" ? "nav-link active" : "nav-link"}>Player Board</a>
      </li>
      <li className="nav-item">
        <a href="#signup" onClick={() => handlePageChange("SignUp")} className={currentPage === "SignUp" ? "nav-link active" : "nav-link"}>Sign Up</a>
      </li>
    </ul>
    </>
  );
}

export default Header;
