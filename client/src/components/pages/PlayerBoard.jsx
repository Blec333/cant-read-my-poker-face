import React, { useEffect } from "react";
import { useCasinoContext } from "../../utils/GlobalState";
import { useQuery } from '@apollo/client';
import { QUERY_PLAYERS } from "../../utils/queries";
import { UPDATE_PLAYERS} from "../../utils/actions";
import PlayerInfo from "../../components/playerInfo";

export default function PlayerBoard() {
  const { loading, data } =  useQuery(QUERY_PLAYERS);
  const [state, dispatch] = useCasinoContext();
  const { currentPlayers } = state;
  const players = data?.players || [];
  console.log(players)

  useEffect(()=>{
    if(data){
      dispatch({
        type: UPDATE_PLAYERS,
        players: data.players
      });
    }
  },[data, dispatch]);

  function showPlayer(){
    if(!currentPlayers){
      return state.players;
    }
  }

  return (
    <main>
      <div>
        {showPlayer().map((player)=>(
          <PlayerInfo
          key = {player._id}
          player = {player}
          />
        ))}
      </div>
    </main>
  );
}
