import React from 'react';

function Header({ currentPage, handlePageChange }) {
  return (
    <>
      <nav>
        <div className="navbar z-20 bg-neutral text-primary-content">
          <div className="flex-none">
            <ul className="menu menu-horizontal p-0">
              <li tabIndex="0">
                <a href="#aboutme">Pages<svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" /></svg></a>
                <ul className="p-2 bg-neutral text-primary-content">
                  <li className="text-lg text-color-primary px-2 mx-2">
                    <a href="#landingpage" onClick={() => handlePageChange("LandingPage")} className={currentPage === "LandingPage" ? "nav-link active" : "nav-link"}>Landing Page</a>
                  </li>
                  <li className="px-2 mx-2">
                    <a href="#login" onClick={() => handlePageChange("Login")} className={currentPage === "Login" ? "nav-link active" : "nav-link"}>Login</a>
                  </li>
                  <li className="px-2 mx-2">
                    <a href="#playerboard" onClick={() => handlePageChange("PlayerBoard")} className={currentPage === "PlayerBoard" ? "nav-link active" : "nav-link"}>Player Board</a>
                  </li>
                  <li className="px-2 mx-2">
                    <a href="#signup" onClick={() => handlePageChange("SignUp")} className={currentPage === "SignUp" ? "nav-link active" : "nav-link"}>Sign Up</a>
                  </li>
                </ul>
              </li>
              <li tabIndex="0">
                <a href="#landingpage" onClick={() => handlePageChange("LandingPage")} className={currentPage === "LandingPage" ? "nav-link active" : "nav-link"}>Home</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );

}

export default Header;
