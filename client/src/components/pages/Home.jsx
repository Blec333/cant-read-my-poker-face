import React from "react";
import { Link } from "react-router-dom";
import Login from "./Login";
import CasinoContainer from "../CasinoContainer";

export default function Home() {
  const login = "Login";
  return (
    <div className="bg-cover w-screen h-screen relative -z-10">
      <div>
        {/* <img
          className="bg-cover w-screen h-screen"
          src="https://t3.ftcdn.net/jpg/04/96/77/34/360_F_496773440_LB7PaykdXR2IuouiWzF0EfWfEJBHHXwz.jpg"
          alt="casino"
        /> */}
      </div>
      <button className="absolute bottom-0 left-0 top-0 right-0">
        <Link to={{ pathname: "/", passedPage: login }}>Go to Casino</Link>
        {/* <Link
          to={{
            pathname: "/",
            state: { passedPage: "Login" },
          }}
        >
          Go to Casino
        </Link> */}
      </button>
    </div>
  );
}
