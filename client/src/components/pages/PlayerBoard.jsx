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
    <div>
      <h1>test</h1>
      {Auth.loggedIn() ? (
        <div>
          <ATM 
          key={user._id}
          account = {user.account}
          _id ={user._id}
          />

          <JoinGame />
        </div>
      ):(
        <h1>You need to be loggedIn to see this page</h1>
      )}
    </div>


  );
}
