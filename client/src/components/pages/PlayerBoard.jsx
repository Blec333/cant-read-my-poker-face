import React from "react";
import { useQuery } from '@apollo/client';
import { QUERY_PLAYERS } from "../../utils/queries";

export default function PlayerBoard() {
  const { loading, data }=  useQuery(QUERY_PLAYERS);
  const players = data?.players || [];
  console.log(players)

  return (
    <main>
      <div>
        {/* <span>${players[1].account}</span> */}
      </div>
    </main>
  );
}
