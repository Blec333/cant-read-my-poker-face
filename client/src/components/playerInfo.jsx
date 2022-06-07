import React from "react";
import { getPlayerName, getAccount, getGames } from "./helpers/playerInfoHelper";

export default function PlayerInfo(player){

    return(
        <div>
            <h1>{getPlayerName(player)}</h1>
            <div>you have ${getAccount(player)} in your account</div>
            <div>{getGames(player)}</div>
        </div>
    )
}