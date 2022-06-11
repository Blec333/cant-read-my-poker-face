import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="bg-cover w-screen h-screen relative">
      <div>
        <img
          className="bg-cover w-screen h-screen"
          src="https://t3.ftcdn.net/jpg/04/96/77/34/360_F_496773440_LB7PaykdXR2IuouiWzF0EfWfEJBHHXwz.jpg"
          alt="casino"
        />
      </div>
      <button className="absolute bottom-0 left-0 top-0 right-0">
        <Link to="/login">Go to Casino</Link>
      </button>
    </div>
  );
}
