import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../../utils/queries";
import { useCasinoContext } from "../../utils/GlobalState";

import Auth from "../../utils/auth";

import JoinGame from "../JoinGame";
import ATM from "../ATM";

export default function PlayerBoard() {


  const [state, dispatch] = useCasinoContext();


  const { data } = useQuery(QUERY_ME);
  const player = data?.me || [];


console.log(state)

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
          <div className="flex justify-center items-center">
              <ATM key={player._id} account={player.account} _id={player._id} />
              <JoinGame />
          </div>
        ) : (
          <h1 className="text-bold text-white">You need to be loggedIn to see this page</h1>
        )}
      </div>
    </>
  );
}
