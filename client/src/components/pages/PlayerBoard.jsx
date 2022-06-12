import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../../utils/queries";

import Auth from "../../utils/auth";

import JoinGame from "../JoinGame";
import ATM from "../ATM";

export default function PlayerBoard() {
  const { data } = useQuery(QUERY_ME);
  const user = data?.me || [];

  return (
    <>
      <div
        className="flex justify-center items-center w-screen"
        style={{ height: "60vw", aspectRatio: 2 / 1 }}
      >
        <img
          className="absolute w-full h-auto -z-10"
          alt="bg"
          src="https://media.istockphoto.com/vectors/people-gambling-in-casino-illustration-vector-id923167072?k=20&m=923167072&s=612x612&w=0&h=ULI0-O0fRHPachy4RV8xHQacwwarBglgMiGaXLjmAHc="
        ></img>
        {Auth.loggedIn() ? (
          <div>
            <div className="flex justify-center items-center bg-primary h-[4rem] w-[8rem] rounded-box text-primary-content z-20">
              <div></div>
              <div>
                <ATM key={user._id} account={user.account} _id={user._id} />
              </div>
              <div>
                <JoinGame />
              </div>
            </div>
            {/* <div className="py-12" />
          <div className="py-12" />
          <div className="py-12" />
          <div className="py-12" />
          <div className="py-12" />
          <div className="py-11" /> */}
          </div>
        ) : (
          <h1>You need to be loggedIn to see this page</h1>
        )}
      </div>
    </>
  );
}
