import React from "react";
import Auth from "../utils/auth";
import { Link } from "react-router-dom";



export default function Header({ currentPage, handlePageChange }) {



  return (
    <>
      {Auth.loggedIn() ?
        (<nav>
          <div className="navbar z-20 bg-neutral text-primary-content w-screen hover:z-50">
            <div className="flex-1">
              <a className="btn normal-case text-xl" href="/">Casino {currentPage}</a>
            </div>
            <div className="flex-none">
              <ul className="menu menu-horizontal rounded-box glass p-0">
                <li className="" tabIndex="0">
                  <p>Pages<svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" /></svg></p>
                  <ul className="p-2 bg-neutral text-primary-content">
                    <li className="px-2 mx-2">
                      <Link to="/#playerboard" onClick={() => handlePageChange("Playerboard")} className={currentPage === "Playerboard" ? "nav-link active" : "nav-link"}>Player Board</Link>
                    </li>
                    <li className="text-lg text-color-primary px-2 mx-2">
                      <a href="/" onClick={() => handlePageChange("Home")} className={currentPage === "Home" ? "nav-link active" : "nav-link"}>Home</a>
                    </li>
                  </ul>
                </li>
                <li tabIndex="0">
                  <a href="/" onClick={() => Auth.logout()}>Logout</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>)
        :
        (<nav>
          <div className="navbar z-20 bg-neutral text-primary-content w-screen">
            <div className="flex-1">
              <a className="btn normal-case text-xl" href="/">Casino {currentPage}</a>
            </div>
            <div className="flex-none">
              <ul className="menu menu-horizontal rounded-box glass p-0" style={{ marginRight: "2vw" }}>
                <li tabIndex="0">
                  <a href="/">Pages<svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" /></svg></a>
                  <ul className="p-2 bg-neutral text-primary-content">
                    <li className="text-lg text-color-primary px-2 mx-2">
                      <a href="/" onClick={() => handlePageChange("Home")} className={currentPage === "Home" ? "nav-link active" : "nav-link"}>Home</a>
                    </li>
                    <li className="px-2 mx-2">
                      <a href="#login" onClick={() => handlePageChange("Login")} className={currentPage === "Login" ? "nav-link active" : "nav-link"}>Login</a>
                    </li>
                    <li className="px-2 mx-2">
                      <a href="#signup" onClick={() => handlePageChange("SignUp")} className={currentPage === "SignUp" ? "nav-link active" : "nav-link"}>Sign Up</a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </nav>)}
    </>
  )
}