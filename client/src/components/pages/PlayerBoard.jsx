import React from "react";
import { useQuery } from '@apollo/client';
import { QUERY_PLAYERS } from "../../../utils/queries";

export default function PlayerBoard() {
  const { loading, data }= useQuery(QUERY_PLAYERS);
  const players = data?.player || [];

  return (
    <main>
      <div>
        <div>
        
        </div>
      </div>
    </main>
  );
}
