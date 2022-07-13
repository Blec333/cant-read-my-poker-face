import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { useQuery } from "@apollo/client";
import {
  ADD_GAME,
  ADD_GAME_TO_PLAYER,
  ADD_PLAYER_TO_GAME,
  // REMOVE_PLAYER_FROM_GAME
} from "../utils/mutations";
import { QUERY_GAMES } from "../utils/queries";
import { QUERY_SINGLE_GAME } from "../utils/queries";
import { useCasinoContext } from "../utils/GlobalState";
import Gamelist from "./GameList";
import Auth from "../utils/auth";
import { UPDATE_GAMES } from "../utils/actions";



export default function JoinGame({ currentPage, handlePageChange, _id }) {





  const [addGame, addGameData] = useMutation(ADD_GAME);
  const [addGameToPlayer] = useMutation(ADD_GAME_TO_PLAYER);
  const [addPlayerToGame] = useMutation(ADD_PLAYER_TO_GAME);
  // const [removePlayerFromGame] = useMutation(REMOVE_PLAYER_FROM_GAME);

  const [showModal, setShowModal] = useState(false);
  const [multiplayerGame, setMultiplayerGame] = useState(false);
  const [soloGame, setSoloGame] = useState(false);
  const [showCreateNewGameNameError, setCreateNewGameNameError] = useState(false)
  const [showPlayerCountError, setShowPlayerCountError] = useState(false)
  const [showNoGameSelectedError, setShowNoGameSelectedError] = useState(false)
  const [selectedGameId, setSelectedGameId] = useState('');
  const [selectedGameName, setSelectedGameName] = useState('');
  const [selectedPlayerCount, setSelectedPlayerCount] = useState('');
  const [selectedPlayerLimit, setSelectedPlayerLimit] = useState('');
  const [createNewGameName, setCreateNewGameName] = useState('');
  const [createNewGameLocation, setCreateNewGameLocation] = useState('');
  const [multiplayerGameList, setMultiplayerGameList] = useState([]);
  const [soloGameList, setSoloGameList] = useState([]);


  const [state, dispatch] = useCasinoContext();

  const gameData = useQuery(QUERY_GAMES);


  useEffect(() => {
    if (gameData) {
      setMultiplayerGameList(gameData?.data?.games?.filter((game) => game.gameType === 'Multiplayer'));
      setSoloGameList(gameData?.data?.games?.filter((game) => { return (game.gameType === 'Solo' && game.players.map((playerId) => playerId === _id)) }))
      dispatch({
        type: UPDATE_GAMES,
        games: gameData?.data?.games
      });
    }
  }, [gameData, dispatch]);

  const handleCreateNewGameName = async (event) => {
    setCreateNewGameName(event.target.value);
  }
  const handleCreateNewGameLocation = async (event) => {
    setCreateNewGameLocation(event.target.value);
  }

  const gameIdSelection = (event) => {
    event.preventDefault();
    const { playerlimit, playercount, name, value } = event.target;
    setSelectedGameId(value);
    setSelectedGameName(name);
    setSelectedPlayerCount(playercount);
    setSelectedPlayerLimit(playerlimit);
    setShowNoGameSelectedError(false);
  }

  const handleCreateNewGame = async () => {
    let gameType;
    let playerLimit;
    if (!createNewGameName.length) {
      setCreateNewGameNameError(true);
    } else {
      if (multiplayerGame) {
        gameType = 'Multiplayer';
        playerLimit = 8;
      } else {
        gameType = 'Solo';
        playerLimit = 1;
      }
      try {
        const addGameResponse = await addGame({
          variables: {
            gameName: createNewGameName.trim(),
            playerLimit: playerLimit,
            gameType: gameType,
            playerId: Auth.getProfile().data._id
          },
        });
        const createdGameId = addGameResponse.data.addGame._id;
        // eslint-disable-next-line no-restricted-globals
        location.replace(`${location.pathname}/game/${createdGameId}`);
      } catch (error) {
        console.log(error)
      }
    }
  };

  const handleJoinExistingGame = async () => {
    if (!selectedGameId) {
      setShowNoGameSelectedError(true);
    } else if (selectedPlayerCount >= selectedPlayerLimit) {
      setShowPlayerCountError(true);
    } else if (multiplayerGame) {
      try {
        const addPlayerToGameResponse = await addPlayerToGame({
          variables: {
            gameId: selectedGameId,
            playerId: Auth.getProfile().data._id
          },
        });
        const addGameToPlayerResponse = await addGameToPlayer({
          variables: {
            playerId: Auth.getProfile().data._id,
            gameId: selectedGameId
          },
        });
        // eslint-disable-next-line no-restricted-globals
        location.replace(`${location.pathname}/game/${selectedGameId}`);
      } catch (error) {
        console.log(error)
      }
    } else {
      // eslint-disable-next-line no-restricted-globals
      location.replace(`${location.pathname}/game/${selectedGameId}`);
    }
  }



  return (
    <>
      {showModal ? (
        null
      ) : (
        <button className="flex justify-center items-center rounded-box bg-primary text-primary-content font-bold h-[4rem] w-[8rem] m-32 hover:shadow-lg hover:bg-success hover:text-success-content" type="button" onClick={() => { setShowModal(true); setMultiplayerGame(true) }}>JOIN TABLE</button>
      )}
      {showModal ? (
        <>
          <div className="flex flex-col justify-center items-center text-center w-11/12 bg-white rounded-box z-50">
            <div className="flex w-full gap-4">
              <button className="rounded-box bg-primary text-primary-content font-bold w-full m-3 p-4 hover:bg-secondary focus:bg-secondary" onClick={() => { setMultiplayerGame(true); setSoloGame(false) }}>Multiplayer</button>
              <button className="rounded-box bg-primary text-primary-content font-bold w-full m-3 p-4 hover:bg-secondary focus:bg-secondary" onClick={() => { setMultiplayerGame(false); setSoloGame(true) }}>Solo</button>
            </div>
            <div className="grid grid-cols-3 w-full gap-2">
              <div>NAME</div>
              <div>PLAYERS</div>
              <div>GAME ID</div>
            </div>
            <form className="bg-white shadow-md rounded w-full p-3">
              {multiplayerGame && multiplayerGameList ?
                <div className="grid grid-cols-3 w-full gap-2 overflow-y-auto h-72">
                  {multiplayerGameList?.map((game) => (
                    <div className="flex col-span-3 rounded justify-center text-sm w-full border-b cursor-pointer select-text-none m-0 p-0" key={game._id} >
                      <button className="w-full" name={game.gameName} value={game._id} playercount={game.players.length} playerlimit={game.playerLimit} onClick={gameIdSelection}>{game.gameName}</button>
                      <button className="w-full" name={game.gameName} value={game._id} playercount={game.players.length} playerlimit={game.playerLimit} onClick={gameIdSelection}>{game.players.length}/{game.playerLimit}</button>
                      <button className="w-full" name={game.gameName} value={game._id} playercount={game.players.length} playerlimit={game.playerLimit} onClick={gameIdSelection}>{game._id}</button>
                    </div>
                  ))}
                </div>
                : (
                  <div className="grid grid-cols-3 w-full gap-2 overflow-y-auto h-72">
                    {soloGameList?.map((game) => (
                      <div className="flex col-span-3 rounded justify-center text-sm w-full border-b cursor-pointer select-text-none m-0 p-0" key={game._id} >
                        <button className="w-full" name={game.gameName} value={game._id} playercount={game.players.length} playerlimit={game.playerLimit} onClick={gameIdSelection}>{game.gameName}</button>
                        <button className="w-full" name={game.gameName} value={game._id} playercount={game.players.length} playerlimit={game.playerLimit} onClick={gameIdSelection}>{game.players.length}/{game.playerLimit}</button>
                        <button className="w-full" name={game.gameName} value={game._id} playercount={game.players.length} playerlimit={game.playerLimit} onClick={gameIdSelection}>{game._id}</button>
                      </div>
                    ))}
                  </div>
                )}
              <div className="flex items-between w-full pt-4 gap-4">
                <div className="flex flex-col w-full">
                  <h3 className="text-2xl text-center font-bold w-full">JOIN</h3>
                  <div className="border border-gray rounded w-auto h-full p-3 m-2">
                    {
                      showNoGameSelectedError ? <p className="text-center text-error w-full p-1">In order to join a room, you must first select a room</p> :
                        showPlayerCountError ? <p className="text-center text-error w-full p-1">It looks like you've chosen a full room, please try another</p> :
                          selectedGameId ? <p className="text-center text-gray-700 w-full p-1">SELECTED ROOM</p> :
                            <p className="text-center text-gray-700 w-full p-1">To join an existing game, select a room from the list.</p>
                    }
                    <p className="text-left text-sm text-gray-700 w-full p-1">Name: {selectedGameName !== '' ? selectedGameName : "Select above..."}</p>
                    <p className="text-left text-sm text-gray-700 w-full p-1">ID: {selectedGameId !== '' ? selectedGameId : "Select above..."}</p>
                  </div>
                  {selectedGameId ?
                    <button className="rounded-box bg-primary text-primary-content font-bold w-full p-4 hover:bg-secondary hover:text-secondary-content" type="button" onClick={() => handleJoinExistingGame()}>JOIN ROOM</button>
                    // <Link to={`/game/${selectedGameId}`} className="rounded-box bg-primary text-primary-content font-bold w-full p-4 hover:bg-secondary hover:text-secondary-content" >JOIN ROOM</Link>
                    : null}
                </div>
                <div className="flex flex-col w-full">
                  <h3 className="text-2xl text-center font-bold w-full">CREATE</h3>
                  <input className="placeholder:whitespace-pre-line border border-gray rounded text-center text-gray-700 w-auto h-full p-3 m-2" id="name" type="name" name="name" onChange={handleCreateNewGameName} placeholder="Choose a name for your game! (ID is generated automatically)" />
                  {showCreateNewGameNameError ? (<p className="text-error">Please enter a name</p>) : null}
                  <button className="rounded-box bg-primary text-primary-content font-bold w-full p-4 hover:bg-secondary hover:text-secondary-content" type="button" onClick={() => handleCreateNewGame()}>CREATE ROOM</button>
                </div>
              </div>
            </form>
            <div>
              <button className="text-error font-bold p-6" type="button" onClick={() => setShowModal(false)}>EXIT</button>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}