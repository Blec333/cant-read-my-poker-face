import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { useQuery } from "@apollo/client";
import {
  ADD_GAME,
  // ADD_GAME_TO_PLAYER, 
  // ADD_PLAYER_TO_GAME, 
  // REMOVE_PLAYER_FROM_GAME 
} from "../utils/mutations";
import { QUERY_GAMES } from "../utils/queries";
import { QUERY_SINGLE_GAME } from "../utils/queries";
import { useCasinoContext } from "../utils/GlobalState";
import Gamelist from "./GameList";
import Auth from "../utils/auth";
import { UPDATE_GAMES } from "../utils/actions";


export default function JoinGame() {

  const [addGame] = useMutation(ADD_GAME);
  // const [addGameToPlayer] = useMutation(ADD_GAME_TO_PLAYER);
  // const [addPlayerToGame] = useMutation(ADD_PLAYER_TO_GAME);
  // const [removePlayerFromGame] = useMutation(REMOVE_PLAYER_FROM_GAME);

  const [showModal, setShowModal] = useState(false);
  const [multiplayerGame, setMultiplayerGame] = useState(false);
  const [showError, setError] = useState(false)
  const [nameState, setName] = useState('');

  
  const [state, dispatch] = useCasinoContext();
  // const { currentGame } =state;

  const { data } = useQuery(QUERY_GAMES);
  const games = data?.games || []

  useEffect(() => {
    if (data) {
      dispatch({
        type: UPDATE_GAMES,
        games: data.games
      });
    }
  }, [data, dispatch]);

  function showModals() {
    if (showModal === true) {
      setShowModal(false);
      setMultiplayerGame(false)
    } else if (showModal === false) {
      setShowModal(true);
    }
  }
  const handleName = async (event) => {
    setName(event.target.value);

  }

  const handleAddGame = async () => {
    if (!nameState.length) {
      setError(true);
    }
    try {
      const { data } = await addGame({
        variables: {
          gameName: nameState.trim(),
          // winner: 'test',
          playerLimit: 6,
          gameType: 'poker',
          playerId: Auth.getProfile().data._id
        },
      });
      let gameId = data.addGame._id
      // eslint-disable-next-line no-restricted-globals
      const path = location.pathname
      // eslint-disable-next-line no-restricted-globals
      location.replace(`${path}game/${gameId}`)
    } catch (error) {
      console.log(error)
    };
  };

  function ErrorText() {
    return (
      <div>
        <p className="text-red-500">Please enter a name</p>
      </div>
    )
  }

  return (
    <>
      {showModal ? (
        null
      ) : (
        <button
          className="flex justify-center items-center rounded-box bg-primary text-primary-content font-bold h-[4rem] w-[8rem] m-32 hover:shadow-lg hover:bg-success hover:text-success-content" type="button" onClick={() => setShowModal(true)}>JOIN TABLE</button>
      )}
      {showModal ? (
        <>
          <div className="flex flex-col justify-center items-center text-center w-full bg-white rounded-box z-50">
            <h3 className="text-3xl font-semibold">Join Table</h3>
            {showError ? (
              <p className="text-red-500">Please enter a name</p>
            ) : null}
            {/*body*/}
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="name"
              name="name"
              onChange={handleName}
              placeholder=" Game Name"

            />
            <div className="relative p-6 flex-auto">
              <button onClick={() => handleAddGame()} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l">
                Solo
              </button>
              <button onClick={() => setMultiplayerGame(true)} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r">
                Multiplayer
              </button>
              {multiplayerGame ? (
                <>
                  <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="overflow-y-auto h-32 relative max-w-sm mx-auto bg-white dark:bg-slate-800 dark:highlight-white/5 shadow-lg ring-black/5 rounded-xl flex flex-col divide-y dark:divide-slate-200/5">
                      <Gamelist
                        games={games}
                      />
                    </div>
                    <div className="flex items-center">
                      <p>Join Game</p>
                      {/* <button onClick={()=> handleAddGame()} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                            Join Table
                        </button> */}
                    </div>
                    <br />
                    <div className="flex items-center" >

                      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                        Create Table
                      </button>

                    </div>
                  </form>
                </>
              ) : null}
            </div>
            {/*footer*/}
            <div>
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => showModals(false)}
              >
                Exit
              </button>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}