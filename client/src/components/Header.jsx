import React from "react";
import Auth from "../utils/auth";
import { Link } from "react-router-dom";

function Header({ currentPage, handlePageChange }) {
  // <li className="mx-1">
  //           {/* this is not using the Link component to logout or user and then refresh the application to the start */}
  //           <a href="/" onClick={() => Auth.logout()}>
  //             Logout
  //           </a>
  //         </li>

  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        <nav>
          <div className="navbar z-20 bg-neutral text-primary-content w-screen hover:z-50">
            <div className="flex-1">
              <a className="btn normal-case text-xl" href="/">
                Casino {currentPage}
              </a>
            </div>
            <div className="flex-none">
              <ul className="menu menu-horizontal rounded-box glass p-0">
                <li className="" tabIndex="0">
                  <a href="#aboutme">
                    Pages
                    <svg
                      className="fill-current"
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                    >
                      <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
                    </svg>
                  </a>
                  <ul className="p-2 bg-neutral text-primary-content">
                    <li className="px-2 mx-2">
                      <a
                        href="#playerboard"
                        onClick={() => handlePageChange("PlayerBoard")}
                        className={
                          currentPage === "PlayerBoard"
                            ? "nav-link active"
                            : "nav-link"
                        }
                      >
                        Player Board
                      </a>
                    </li>
                    <li className="text-lg text-color-primary px-2 mx-2">
                      <a
                        href="#landingpage"
                        onClick={() => handlePageChange("Home")}
                        className={
                          currentPage === "Home"
                            ? "nav-link active"
                            : "nav-link"
                        }
                      >
                        Home
                      </a>
                    </li>
                    {/* 
                    <li className="px-2 mx-2">
                      <a
                        href="#playerboard"
                        onClick={() => handlePageChange("PlayerBoard")}
                        className={
                          currentPage === "PlayerBoard"
                            ? "nav-link active"
                            : "nav-link"
                        }
                      >
                        Player Board
                      </a>
                    </li> */}
                  </ul>
                </li>
                <li tabIndex="0">
                  <a href="/" onClick={() => Auth.logout()}>
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      );
    } else {
      return (
        <>
          <nav>
            <div className="navbar z-20 bg-neutral text-primary-content w-screen">
              <div className="flex-1">
                <a className="btn normal-case text-xl" href="/">
                  Casino {currentPage}
                </a>
              </div>
              <div className="flex-none">
                <ul
                  className="menu menu-horizontal rounded-box glass p-0"
                  style={{ marginRight: "2vw" }}
                >
                  <li tabIndex="0">
                    <a href="#aboutme">
                      Pages
                      <svg
                        className="fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                      >
                        <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
                      </svg>
                    </a>
                    <ul className="p-2 bg-neutral text-primary-content">
                      <li className="text-lg text-color-primary px-2 mx-2">
                        <a
                          href="#landingpage"
                          onClick={() => handlePageChange("Home")}
                          className={
                            currentPage === "Home"
                              ? "nav-link active"
                              : "nav-link"
                          }
                        >
                          Home
                        </a>
                      </li>
                      <li className="px-2 mx-2">
                        <a
                          href="#login"
                          onClick={() => handlePageChange("Login")}
                          className={
                            currentPage === "Login"
                              ? "nav-link active"
                              : "nav-link"
                          }
                        >
                          Login
                        </a>
                      </li>

                      <li className="px-2 mx-2">
                        <a
                          href="#signup"
                          onClick={() => handlePageChange("SignUp")}
                          className={
                            currentPage === "SignUp"
                              ? "nav-link active"
                              : "nav-link"
                          }
                        >
                          Sign Up
                        </a>
                      </li>
                    </ul>
                  </li>
                  {/* <li tabIndex="0">
                    <a
                      href="/"
                      onClick={() => handlePageChange("Home")}
                      className={
                        currentPage === "Home" ? "nav-link active" : "nav-link"
                      }
                    >
                      Logout
                    </a>
                  </li> */}
                </ul>
              </div>
            </div>
          </nav>
        </>
      );
    }
  }
  return (
    <header className="flex-row px-1">
      <nav>{showNavigation()}</nav>
    </header>
  );
}

export default Header;
