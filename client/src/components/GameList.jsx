import React, {useEffect} from "react";
import { Link } from 'react-router-dom'
import { useCasinoContext } from "../utils/GlobalState";

export default function Gamelist(games){
    const addGame = games.games
    return (
        <>
        {addGame.map((game)=>(
            <Link key={game._id} to={`/game/${game._id}`} >
                <div  className="grid grid-cols-2">
                    <div>Name</div>
                    <div>players</div>
                    <div>{game.gameName}</div>
                    <div>{game.playerLimit}/8</div>
                </div>
            </Link>
            ))}
        </>
    )
}