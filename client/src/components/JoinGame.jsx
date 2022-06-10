import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { 
    ADD_GAME,  
    ADD_GAME_TO_PLAYER, 
    ADD_PLAYER_TO_GAME, 
    REMOVE_PLAYER_FROM_GAME 
} from "../utils/mutations";

import  Auth  from "../utils/auth";


export default function JoinGame() {

  const [addGame] = useMutation(ADD_GAME);
  const [addGameToPlayer] = useMutation(ADD_GAME_TO_PLAYER);
  const [addPlayerToGame] = useMutation(ADD_PLAYER_TO_GAME);
  const [removePlayerFromGame] = useMutation(REMOVE_PLAYER_FROM_GAME);
  
  const [showModal, setShowModal] = useState(false);
  const [showForum , setForum ] = useState(false);
  const [getId , setId ] = useState('');

  const [nameState, setName] = useState('');
    
  function showModals(){
    if(showModal === true){
        setShowModal(false);
        setForum(false)
    }else if(showModal === false){
        setShowModal(true);
    }
}
    const handleName = async (event)=>{
        setName(event.target.value);
    
    }

    const handleAddGame = async () =>{
    console.log(nameState)
    console.log(Auth.getProfile().data._id)
      // try{
      //   await addGame({
      //     variables:{
      //       name: nameState,
      //       playerLimit: 8,
      //       type: 'poker',
      //       winner: 'test',
      //       playerId: Auth.getProfile().data._id
      //     },
      //   });

      // }catch(error){
      //   console.log(error)
      // }
    }

    const handleId =  async (event) => {
        setId(event.target.value);
    }
    
  return (
    <>
      <div>
      <button
        className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => showModals(true)}
      >
        Join Table
      </button>
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-sm">
              {/*content*/}
              <div className="border-0 items-center rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                
                <div className=" p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Join Table
                  </h3>
                </div>
                {/*body*/}
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                      id="name" 
                      type="name" 
                      name= "name"
                      onChange ={handleName}
                      placeholder="Enter Game Name" 
                      
                />
                <div className="relative p-6 flex-auto">
                {/* <Link to= '/game/'> */}
                    <button onClick={()=> handleAddGame()} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l">
                        Solo
                    </button>
                {/* </Link> */}
                <button onClick={() => setForum(true)} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r">
                  Multiplayer
                </button>
                {showForum ?(
                  <>
                    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2" >
                        Enter Table ID
                      </label>
                      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                      id="username" 
                      type="text" 
                      placeholder="Game ID" 
                      onChange={handleId}
                      value={getId}
                      />
                    </div>
                    <div className="flex items-center">
                        <Link to={`/game/${getId}`}>
                            <button onClick={()=> handleAddGame()} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                                Join Table
                            </button>
                        </Link>
                    </div>
                    <br/>
                    <div className="flex items-center" >
                        <Link to= '/game/'>
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                                Create Table
                            </button>
                        </Link>
                    </div>
                  </form>
                  </>
                ): null}
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
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
      </div>
    </>
  );
}