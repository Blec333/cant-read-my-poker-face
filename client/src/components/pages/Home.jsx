import React from "react";
import { Link } from "react-router-dom";
import Login from "./Login";
import CasinoContainer from "../CasinoContainer";

export default function Home({ currentPage, handlePageChange }) {

  return (
    <div
      className="flex justify-center items-center w-screen m-0 p-0"
      style={{ height: "60vw", aspectRatio: 2 / 1 }}
    >
      <img
        className="absolute w-full h-auto -z-10"
        src="https://t3.ftcdn.net/jpg/04/96/77/34/360_F_496773440_LB7PaykdXR2IuouiWzF0EfWfEJBHHXwz.jpg"
        alt="casino"
      />
      <div
        className="flex justify-center items-center glass bg-primary rounded-box text-primary-content z-20"
        style={{ width: "20vw", height: "7.5vw" }}
      >

        <a
          style={{ fontSize: "3vw" }}
          href="#login"
          onClick={() => handlePageChange("Login")}
          className={currentPage === "Login" ? "nav-link active" : "nav-link"}
        >
          Go to Casino
        </a>
      </div>
    </div>
  );
}
