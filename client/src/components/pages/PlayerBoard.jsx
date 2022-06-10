import React, { useEffect } from "react";
import { useCasinoContext } from "../../utils/GlobalState";
import { useQuery } from '@apollo/client';
import { QUERY_PLAYERS } from "../../utils/queries";
import { UPDATE_PLAYERS} from "../../utils/actions";
import JoinGame from "../JoinGame";

import Auth from "../../utils/auth";
import ATM from "../ATM";

export default function PlayerBoard() {
  const { loading, data } =  useQuery(QUERY_PLAYERS);
  const [state, dispatch] = useCasinoContext();
  const { currentPlayers } = state;
  // const players = data?.players || [];
  // console.log(players)



  // useEffect(()=>{
  //   if(data){
  //     dispatch({
  //       type: UPDATE_PLAYERS,
  //       players: data.players
  //     });
  //   }
  // },[data, dispatch]);

  function showPlayer(){
    if(!currentPlayers){
      return state.players;
    }
  }

  return (
    <div>
      <h1>test</h1>
      {Auth.loggedIn() ? (
        <div>
          <ATM />
        
          {/* <JoinGame /> */}
        </div>
      ):(
        <h1>You need to be loggedIn to see this page</h1>
      )}
    </div>


  );
}
