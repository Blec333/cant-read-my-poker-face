import React from "react";
import { useQuery } from '@apollo/client';
import { QUERY_ME } from "../../utils/queries";

import Auth from "../../utils/auth";

import JoinGame from "../JoinGame";
import ATM from "../ATM";

export default function PlayerBoard() {


  const { data } = useQuery(QUERY_ME);
  const user = data?.me || [];



  return (
    <>
      <img
        className="bg-cover  w-screen h-screen"
        alt="bg"
        src="https://i.pinimg.com/originals/b6/4c/2f/b64c2fc80eaf789f8ff3c2b0441ce1be.jpg"
      ></img>
      {Auth.loggedIn() ? (
        <div>
          <div className="grid grid-cols-3 align-middle "  >
            <div></div>
            <div>
              <ATM 
              key={user._id}
              account = {user.account}
              _id ={user._id}
              />
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
      ):(
        <h1>You need to be loggedIn to see this page</h1>
      )}
    </>


  );
}
