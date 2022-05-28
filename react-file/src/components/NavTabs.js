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
          href="#blog"
          onClick={() => handlePageChange("Blog")}
          //  TODO: Add a comment explaining what this logic is doing

          className={currentPage === "Blog" ? "nav-link active" : "nav-link"}
        >
          Blog
        </a>
      </li>
      <li className="nav-item">
        <a
          href="#profile"
          //  TODO: Add a comment explaining what this logic is doing

          onClick={() => handlePageChange("Profile")}
          className={currentPage === "Profile" ? "nav-link active" : "nav-link"}
        >
          Profile
        </a>
      </li>
    </ul>
  );
}

export default NavTabs;
