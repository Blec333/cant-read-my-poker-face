import React from "react";
import layerInfoHelper from "../playerInfoHelper";

export default function PlayerInfo(player){
    const{
        playerName,
        account,
        games
    } = player;

    return(
        <div>
            <h1>{playerName}</h1>
            <div>you have ${account} in your account</div>
            <div>{games}</div>
        </div>
    )
}