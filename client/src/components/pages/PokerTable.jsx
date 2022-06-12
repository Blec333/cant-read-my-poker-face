import React, { useReducer, useState, useEffect } from "react";
import { useCasinoContext } from "../../utils/GlobalState";
import { Link, useParams } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { useQuery } from "@apollo/client";

import { REMOVE_PLAYER_FROM_GAME } from "../../utils/actions";
import { UPDATE_CURRENT_GAME } from "../../utils/actions";
import { QUERY_ME } from '../../utils/queries';
import { QUERY_SINGLE_GAME } from "../../utils/queries";
// import { ADD_PLAYER_TO_GAME } from "../../utils/mutations";
import Auth from "../../utils/auth";
import Chat from "../Chat";

import onePlayer from "../../assets/img/one-player.jpg";
import twoPlayers from "../../assets/img/two-players.jpg";
import threePlayers from "../../assets/img/three-players.jpg";
import fourPlayers from "../../assets/img/four-players.jpg";
import fivePlayers from "../../assets/img/five-players.jpg";
import sixPlayers from "../../assets/img/six-players.jpg";
import sevenPlayers from "../../assets/img/seven-players.jpg";
import eightPlayers from "../../assets/img/eight-players.jpg";
import facedownCard from "../../assets/img/facedownCard.png";
import { ADD_PLAYER_TO_GAME } from "../../utils/mutations";

const axios = require("axios");

export default function PokerTable() {
  let multiplayer = false;

  //USE PARAMS -----------------------------------------------------
  let { roomId } = useParams();
  if (roomId === undefined) { roomId = "62a4f2cfdded97bc21acdb97" }
  //USE PARAMS -----------------------------------------------------
  console.log(roomId)


  //QUERIES ----------------------------------------------------
  const { queryMe, data } = useQuery(QUERY_ME);
  const user = data?.me || []
  const { playerName } = user

  const { loading, error, gameData } = useQuery(QUERY_SINGLE_GAME, {
    // pass URL parameter
    variables: { gameId: roomId },
  });
  //QUERIES ----------------------------------------------------


  //USE GLOBAL STATE -----------------------------------------------
  const [state, dispatch] = useCasinoContext();
  //USE GLOBAL STATE -----------------------------------------------


  //USE STATE ------------------------------------------------------
  const [dealerMessage, setDealerMessage] = useState('');
  const [gameRound, setGameRound] = useState(0);
  const [potAmount, setPotAmount] = useState(0);
  const [raiseCount, setRaiseCount] = useState(0);
  const [callCount, setCallCount] = useState(0);
  const [checkCount, setCheckCount] = useState(0);
  const [foldTest, setFoldTest] = useState(false);
  const [playerChipStack, setPlayerChipStack] = useState(0);
  const [computerChipStack, setComputerChipStack] = useState(0);
  const [playerAction, setPlayerAction] = useState(true);
  const [previousBet, setPreviousBet] = useState(true);
  const [foldButtonVisibility, setfoldButtonVisibility] = useState("visible");
  const [checkButtonVisibility, setCheckButtonVisibility] = useState(true);
  const [callButtonVisibility, setCallButtonVisibility] = useState(true);
  const [callButtonValue, setCallButtonValue] = useState(true);
  const [raiseButtonVisibility, setRaiseButtonVisibility] = useState(true);
  foldButtonVisibility
  const [gameState, setGameState] = useState({
    riverDesc: facedownCard,
    riverImg: facedownCard,
    turnDesc: facedownCard,
    turnImg: facedownCard,
    flop3Desc: facedownCard,
    flop3Img: facedownCard,
    flop2Desc: facedownCard,
    flop2Img: facedownCard,
    flop1Desc: facedownCard,
    flop1Img: facedownCard,
  });
  const [seatLabels, setSeatState] = useState({
    seat0Name: "DEALER",
    seat1Name: Auth.getProfile().data.playerName || "Developer",
    seat2Name: "Mr. Macintosh",
    seat3Name: "PLAYER 3",
    seat4Name: "PLAYER 4",
    seat5Name: "PLAYER 5",
    seat6Name: "PLAYER 6",
    seat7Name: "PLAYER 7",
    seat8Name: "PLAYER 8",
    seat9Name: "PLAYER 9",
  });
  //USE STATE ------------------------------------------------------



  //USE EFFECTS ----------------------------------------------------
  useEffect(() => {
    console.log(roomId)
    console.log(playerName)
    console.log(gameData)
  }, [gameData]);

  useEffect(() => {
    initiateGamePlay();
  }, []);

  useEffect(() => {
    updateGameDisplay();
  }, [gameRound]);
  //USE EFFECTS ----------------------------------------------------


  if (raiseCount === 2 || checkCount === 2 || callCount === 1) {
    setRaiseCount(0)
  }
  //PLAYER DECISION FUNCTIONS---------------------------------------
  const handleFold = () => {
    if (multiplayer === false) {
      if (playerAction === true) {
        setFoldTest();
        setPotAmount(0);
        setComputerChipStack();
        setDealerMessage();
      } else {

        //computer action here
        setDealerMessage();
      }
    }
  }
  const handleCheck = () => {
    if (multiplayer === false) {
      if (playerAction === true) {
        setCheckCount(checkCount + 1)
        setPlayerAction(false);
        setDealerMessage();
      } else {

        //computer action here
        setDealerMessage();
      }
    }
    setGameRound(gameRound + 1);
  }
  const handleBet = () => {
    if (multiplayer === false) {
      if (playerAction === true) {

        setDealerMessage();
      } else {

        //computer action here
        setDealerMessage();
      }
      setGameRound(gameRound + 1);
    }
    const handleCall = () => {
      if (multiplayer === false) {
        if (playerAction === true) {
          if (playerChipStack > previousBet) { }
          setPlayerChipStack(playerChipStack - previousBet);
          setPotAmount(potAmount + previousBet);
          setCallCount(callCount + 1);
          setPlayerAction(false);
          setDealerMessage();
        } else {

          //computer action here
          setDealerMessage();
        }
      }
      setGameRound(gameRound + 1);
    }
  }
  const handleRaise = () => {
    if (multiplayer === false) {
      if (playerAction === true) {
        if (raiseCount === 2) {
          alert("You can no longer raise the pot, please match your opponent or fold.")
        } else {
          setPreviousBet()
          setRaiseCount(raiseCount + 1);
          setGameRound(gameRound + 1);
        }
      } else {

        //computer action here
      }
    }
  }
  //PLAYER DECISION FUNCTIONS---------------------------------------


  //MUTATIONS (CUD) --------------------------------------------
  // const [addPlayerToGame] = useMutation(ADD_PLAYER_TO_GAME);
  // const [removePlayerFromGame] = useMutation(REMOVE_PLAYER_FROM_GAME);

  //MUTATIONS (CUD) --------------------------------------------

  //USER ACTION FUNCTIONS FOR STATE ----------------------------
  function updateGameDisplay() {
    if (gameRound === 1) {
      setGameState({
        ...gameState,
        flop3Desc: state.currentCommunityCardDescriptions[2],
        flop3Img: state.currentCommunityCardImages[2],
        flop2Desc: state.currentCommunityCardDescriptions[1],
        flop2Img: state.currentCommunityCardImages[1],
        flop1Desc: state.currentCommunityCardDescriptions[0],
        flop1Img: state.currentCommunityCardImages[0],
      });
    } else if (gameRound === 2) {
      setGameState({
        ...gameState,
        turnDesc: state.currentCommunityCardDescriptions[3],
        turnImg: state.currentCommunityCardImages[3],
        flop3Desc: state.currentCommunityCardDescriptions[2],
        flop3Img: state.currentCommunityCardImages[2],
        flop2Desc: state.currentCommunityCardDescriptions[1],
        flop2Img: state.currentCommunityCardImages[1],
        flop1Desc: state.currentCommunityCardDescriptions[0],
        flop1Img: state.currentCommunityCardImages[0],
      });
    } else if (gameRound > 2) {
      setGameState({
        ...gameState,
        riverDesc: state.currentCommunityCardDescriptions[4],
        riverImg: state.currentCommunityCardImages[4],
        turnDesc: state.currentCommunityCardDescriptions[3],
        turnImg: state.currentCommunityCardImages[3],
        flop3Desc: state.currentCommunityCardDescriptions[2],
        flop3Img: state.currentCommunityCardImages[2],
        flop2Desc: state.currentCommunityCardDescriptions[1],
        flop2Img: state.currentCommunityCardImages[1],
        flop1Desc: state.currentCommunityCardDescriptions[0],
        flop1Img: state.currentCommunityCardImages[0],
      });
    }
  }

  function handleActionClick() {
    setGameRound(gameRound + 1);
  }
  //USER ACTION FUNCTIONS FOR STATE ----------------------------

  //GLOBAL VARIABLES -------------------------------------------
  let playerActionInRound;
  let numberOfPlayers = 8;

  let bgPoker = onePlayer;
  let deckCount = 1;
  let communityCardImages = [];
  let communityCardDescriptions = [];
  let playerCardImages = [];
  let playerCardDescriptions = [];
  let deal;
  let communityCardCodes;
  let playerCardCodes = "";
  let playerResults = [];
  let winnerResults = [];
  //GLOBAL VARIABLES -------------------------------------------

  //UPON PAGE LOAD GLOBAL STATE FUNCTIONS ----------------------
  function getBackground() {
    switch (numberOfPlayers) {
      case 1:
        bgPoker = onePlayer;
        break;
      case 2:
        bgPoker = twoPlayers;
        break;
      case 3:
        bgPoker = threePlayers;
        break;
      case 4:
        bgPoker = fourPlayers;
        break;
      case 5:
        bgPoker = fivePlayers;
        break;
      case 6:
        bgPoker = sixPlayers;
        break;
      case 7:
        bgPoker = sevenPlayers;
        break;
      case 8:
        bgPoker = eightPlayers;
        break;
      default:
        bgPoker = onePlayer;
    }
    console.log("Background placed");
  }

  async function shuffleDeck(deckCount, numberOfPlayers) {
    let shuffleURL = `https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=${deckCount}`;
    await axios.get(shuffleURL).then(function (res) {
      let shuffleId = res.data.deck_id;
      deal = `https://www.deckofcardsapi.com/api/deck/${shuffleId}/draw/?count=${numberOfPlayers * 2 + 5
        }`;
      console.log("Shuffled the deck");
      return res;
    });
  }

  async function dealCards(deal) {
    await axios.get(deal).then(function (res) {
      console.log(res);
      for (let i = 0; i < res.data.cards.length; i++) {
        res.data.cards[i].code = res.data.cards[i].code.replace("0", "10");
      }
      communityCardCodes = `${res.data.cards[0].code},${res.data.cards[1].code},${res.data.cards[2].code},${res.data.cards[3].code},${res.data.cards[4].code}`;
      communityCardImages = [
        `${res.data.cards[0].images.png}`,
        `${res.data.cards[1].images.png}`,
        `${res.data.cards[2].images.png}`,
        `${res.data.cards[3].images.png}`,
        `${res.data.cards[4].images.png}`,
      ];
      communityCardDescriptions = [
        `${res.data.cards[0].value} of ${res.data.cards[0].suit}`,
        `${res.data.cards[1].value} of ${res.data.cards[1].suit}`,
        `${res.data.cards[2].value} of ${res.data.cards[2].suit}`,
        `${res.data.cards[3].value} of ${res.data.cards[3].suit}`,
        `${res.data.cards[4].value} of ${res.data.cards[4].suit}`,
      ];
      for (let i = 0; i < numberOfPlayers * 2 - 1; i += 2) {
        playerCardCodes = playerCardCodes.concat(
          `&pc[]=${res.data.cards[i + 5].code},${res.data.cards[i + 6].code}`
        );
        playerCardImages.push(
          res.data.cards[i + 5].images.png,
          res.data.cards[i + 6].images.png
        );
        playerCardDescriptions.push(
          `${res.data.cards[i + 5].value} of ${res.data.cards[i + 6].suit}`
        );
      }
      console.log("Cards have been dealt");
      return res;
    });
  }

  async function determineWinner(communityCardCodes, playerCardCodes) {
    let gameURL = `https://api.pokerapi.dev/v1/winner/texas_holdem?cc=${communityCardCodes}${playerCardCodes}`;
    await axios.get(gameURL).then(function (res) {
      playerResults = Object.values(res.data.players).map(function (el) {
        return el.result;
      });
      winnerResults = Object.values(res.data.winners).map(function (el) {
        return el.result;
      });
      console.log("Winner has been determined");
      return res;
    });
  }

  async function initiateGamePlay() {
    getBackground();
    await shuffleDeck(deckCount, numberOfPlayers);
    await dealCards(deal);
    await determineWinner(communityCardCodes, playerCardCodes);
    dispatch({
      type: UPDATE_CURRENT_GAME,
      currentPlayerCardImages: playerCardImages,
      currentPlayerCardDescriptions: playerCardDescriptions,
      currentCommunityCardImages: communityCardImages,
      currentCommunityCardDescriptions: communityCardDescriptions,
      currentPlayerResults: playerResults,
      currentWinnerResults: winnerResults,
    });
    console.log(state);
  }
  //UPON PAGE LOAD GLOBAL STATE FUNCTIONS ----------------------

  return (
    <div
      id="poker-container"
      className="flex justify-center w-screen h-[screen-2rem]"
    >
      {/* <div className="bg-cover bg-center bg-no-repeat bg-fixed w-full h-full" style={{ backgroundImage: `url(${bgPoker})` }} > */}
      <div style={{ fontSize: "1vw" }}>
        <img
          className="absolute -z-10 w-full h-auto"
          alt="bg"
          src={bgPoker}
        ></img>
        <div
          className="borders grid grid-cols-11 text-center text-neutral-content"
          style={{ aspectRatio: 2 / 1.1 }}
        >
          <div id="grid1" className="border" style={{ width: "9.1vw", height: "5.11vw", fontSize: "1vw" }}></div>
          <div id="grid2" className="border" style={{ width: "9.1vw", height: "5.11vw", fontSize: "1vw" }}></div>
          <div id="grid3" className="border" style={{ width: "9.1vw", height: "5.11vw", fontSize: "1vw" }}></div>
          <div id="grid4" className="border" style={{ width: "9.1vw", height: "5.11vw", fontSize: "1vw" }}></div>
          <div id="grid5" className="border" style={{ width: "9.1vw", height: "5.11vw", fontSize: "1vw" }}></div>
          <div id="grid6" className="border" style={{ width: "9.1vw", height: "5.11vw", fontSize: "1vw" }}></div>
          <div id="grid7" className="border" style={{ width: "9.1vw", height: "5.11vw", fontSize: "1vw" }}></div>
          <div id="grid8" className="border" style={{ width: "9.1vw", height: "5.11vw", fontSize: "1vw" }}></div>
          <div id="grid9" className="border" style={{ width: "9.1vw", height: "5.11vw", fontSize: "1vw" }}></div>
          <div id="chat-component" className="border h-333px row-span-5 col-span-2 m-0 p-0" style={{ width: "18.2vw", height: "25.275vw", fontSize: "1vw" }}>
            <Chat playerName={playerName} roomId={roomId} />
          </div>
          {/* <div id="grid10" style={{ fontSize: "1vw" }}></div> */}
          {/* <div id="grid11" style={{ fontSize: "1vw" }}></div> */}
          <div id="grid12" className="border" style={{ width: "9.1vw", height: "5.11vw", fontSize: "1vw" }}></div>
          <div id="grid13" className="border" style={{ width: "9.1vw", height: "5.11vw", fontSize: "1vw" }}></div>
          <div id="grid14" className="border" style={{ width: "9.1vw", height: "5.11vw", fontSize: "1vw" }}></div>
          <div id="grid15" className="border" style={{ width: "9.1vw", height: "5.11vw", fontSize: "1vw" }}></div>
          <div id="grid16" className="border" style={{ width: "9.1vw", height: "5.11vw", fontSize: "1vw" }}></div>
          <div id="" className="border flex justify-center items-end" style={{ width: "9.1vw", height: "5.11vw", fontSize: "1vw" }}>
            <div
              id="grid17"
              className="border bg-success border-success-content text-neutral text-center text-xl font-bold rounded-box"
              style={{ fontSize: "1vw", padding: "0.2vw" }}
            >
              {seatLabels.seat0Name}
            </div>
          </div>
          {/* <div id="grid17" style={{fontSize: '1vw'}}></div> */}
          <div id="grid18" className="border" style={{ width: "9.1vw", height: "5.11vw", fontSize: "1vw" }}></div>
          <div id="grid19" className="border" style={{ width: "9.1vw", height: "5.11vw", fontSize: "1vw" }}></div>
          <div id="grid20" className="border" style={{ width: "9.1vw", height: "5.11vw", fontSize: "1vw" }}></div>
          {/* <div id="grid21" style={{ fontSize: "1vw" }}></div> */}
          {/* <div id="grid22" style={{ fontSize: "1vw" }}></div> */}
          <div id="grid23" className="border" style={{ width: "9.1vw", height: "5.11vw", fontSize: "1vw" }}></div>
          <div id="grid24" className="border" style={{ width: "9.1vw", height: "5.11vw", fontSize: "1vw" }}></div>
          <div id="" className="border flex justify-center items-start" style={{ width: "9.1vw", height: "5.11vw", fontSize: "1vw" }}>
            <div
              id="grid17"
              className="bg-neutral border border-neutral-content text-neutral-content text-center text-xl font-bold rounded-box"
              style={{ fontSize: "1vw", padding: "0.2vw" }}
            >
              {seatLabels.seat7Name}
            </div>
          </div>
          {/* <div id="grid25" style={{fontSize: '1vw'}}></div> */}
          <div id="grid26" className="border" style={{ width: "9.1vw", height: "5.11vw", fontSize: "1vw" }}></div>
          <div id="grid27" className="border" style={{ width: "9.1vw", height: "5.11vw", fontSize: "1vw" }}></div>
          <div id="grid28" className="border" style={{ width: "9.1vw", height: "5.11vw", fontSize: "1vw" }}></div>
          <div id="grid29" className="border" style={{ width: "9.1vw", height: "5.11vw", fontSize: "1vw" }}></div>
          <div id="grid30" className="border" style={{ width: "9.1vw", height: "5.11vw", fontSize: "1vw" }}></div>
          <div id="" className="flex justify-center items-start" style={{ width: "9.1vw", height: "5.11vw", fontSize: "1vw" }}>
            <div
              id="grid17"
              className="bg-neutral border border-neutral-content text-neutral-content text-center text-xl font-bold rounded-box"
              style={{ fontSize: "1vw", padding: "0.2vw" }}
            >
              {seatLabels.seat6Name}
            </div>
          </div>
          {/* <div id="grid31" style={{fontSize: '1vw'}}></div> */}
          {/* <div id="grid32" style={{ fontSize: "1vw" }}></div> */}
          {/* <div id="grid33" style={{ fontSize: "1vw" }}></div> */}
          <div id="grid34" className="border" style={{ width: "9.1vw", height: "5.11vw", fontSize: "1vw" }}></div>
          <div id="grid35" className="border" style={{ width: "9.1vw", height: "5.11vw", fontSize: "1vw" }}></div>
          <div id="grid36" className="border" style={{ width: "9.1vw", height: "5.11vw", fontSize: "1vw" }}></div>
          <div id="grid37" className="border" style={{ width: "9.1vw", height: "5.11vw", fontSize: "1vw" }}></div>
          <div id="grid38" className="border" style={{ width: "9.1vw", height: "5.11vw", fontSize: "1vw" }}></div>
          <div id="grid39" className="border" style={{ width: "9.1vw", height: "5.11vw", fontSize: "1vw" }}></div>
          <div id="grid40" className="border" style={{ width: "9.1vw", height: "5.11vw", fontSize: "1vw" }}></div>
          <div id="grid41" className="border" style={{ width: "9.1vw", height: "5.11vw", fontSize: "1vw" }}></div>
          <div id="grid42" className="border" style={{ width: "9.1vw", height: "5.11vw", fontSize: "1vw" }}></div>
          {/* <div id="grid43" style={{ fontSize: "1vw" }}></div> */}
          {/* <div id="grid44" style={{ fontSize: "1vw" }}></div> */}
          <div id="grid45" className="border" style={{ width: "9.1vw", height: "5.11vw", fontSize: "1vw" }}></div>
          <div id="grid46" className="border" style={{ width: "9.1vw", height: "5.11vw", fontSize: "1vw" }}></div>
          <div id="grid47" className="border" style={{ width: "9.1vw", height: "5.11vw", fontSize: "1vw" }}></div>
          <div id="grid48" className="border" style={{ width: "9.1vw", height: "5.11vw", fontSize: "1vw" }}></div>
          <div id="grid49" className="border" style={{ width: "9.1vw", height: "5.11vw", fontSize: "1vw" }}></div>
          <div id="grid50" className="border" style={{ width: "9.1vw", height: "5.11vw", fontSize: "1vw" }}></div>
          <div id="grid51" className="border" style={{ width: "9.1vw", height: "5.11vw", fontSize: "1vw" }}></div>
          <div id="grid52" className="border" style={{ width: "9.1vw", height: "5.11vw", fontSize: "1vw" }}></div>
          <div id="grid53" className="border" style={{ width: "9.1vw", height: "5.11vw", fontSize: "1vw" }}></div>
          {/* <div id="grid54" style={{ fontSize: "1vw" }}></div> */}
          {/* <div id="gri className="border"d55" style={{ fontSize: "1vw" }}></div> */}
          <div id="grid56" className="border" style={{ width: "9.1vw", height: "5.11vw", fontSize: "1vw" }}></div>
          <div id="grid57" className="border" style={{ width: "9.1vw", height: "5.11vw", fontSize: "1vw" }}></div>
          <div id="grid58" className="border" style={{ width: "9.1vw", height: "5.11vw", fontSize: "1vw" }}></div>
          <div id="grid59" className="border" style={{ width: "9.1vw", height: "5.11vw", fontSize: "1vw" }}></div>
          <div
            id="community-cards"
            className="border flex flex-row text-neutral-content justify-center items-start col-span-3"
          >
            <div id="River" className="" style={{ width: "3vw", fontSize: "1vw" }}>
              <img
                title={gameState.riverDesc}
                alt={gameState.riverDesc}
                src={gameState.riverImg}
              ></img>
            </div>
            <div id="Turn" className="" style={{ width: "3vw", fontSize: "1vw" }}>
              <img
                title={gameState.turnDesc}
                alt={gameState.turnDesc}
                src={gameState.turnImg}
              ></img>
            </div>
            <div id="Flop3" className="" style={{ width: "3vw", fontSize: "1vw" }}>
              <img
                title={gameState.flop3Desc}
                alt={gameState.flop3Desc}
                src={gameState.flop3Img}
              ></img>
            </div>
            <div id="Flop2" className="" style={{ width: "3vw", fontSize: "1vw" }}>
              <img
                title={gameState.flop2Desc}
                alt={gameState.flop2Desc}
                src={gameState.flop2Img}
              ></img>
            </div>
            <div id="Flop1" className="" style={{ width: "3vw", fontSize: "1vw" }}>
              <img
                title={gameState.flop1Desc}
                alt={gameState.flop1Desc}
                src={gameState.flop1Img}
              ></img>
            </div>
          </div>
          {/* <div id="grid60" style={{ fontSize: '1vw' }}></div> */}
          {/* <div id="grid61" style={{fontSize: '1vw'}}></div> */}
          {/* <div id="grid62" style={{ fontSize: '1vw' }}></div> */}
          <div id="grid63" className="border" style={{ width: "9.1vw", height: "5.11vw", fontSize: "1vw" }}></div>
          <div id="grid64" className="border" style={{ width: "9.1vw", height: "5.11vw", fontSize: "1vw" }}></div>
          <div id="grid65" className="border" style={{ width: "9.1vw", height: "5.11vw", fontSize: "1vw" }}></div>
          <div id="grid66" className="border" style={{ width: "9.1vw", height: "5.11vw", fontSize: "1vw" }}></div>
          <div id="grid67" className="border" style={{ width: "9.1vw", height: "5.11vw", fontSize: "1vw" }}></div>
          <div id="" className="border flex justify-end items-start" style={{ width: "9.1vw", height: "5.11vw", fontSize: "1vw" }}>
            <div
              id="grid17"
              className="bg-neutral border border-neutral-content text-neutral-content text-center text-xl font-bold rounded-box"
              style={{ fontSize: "1vw", padding: "0.2vw" }}
            >
              {seatLabels.seat3Name}
            </div>
          </div>
          {/* <div id="grid68" style={{fontSize: '1vw'}}></div> */}
          <div id="grid69" className="border" style={{ width: "9.1vw", height: "5.11vw", fontSize: "1vw" }}></div>
          <div id="grid70" className="border" style={{ width: "9.1vw", height: "5.11vw", fontSize: "1vw" }}></div>
          <div id="grid71" className="border" style={{ width: "9.1vw", height: "5.11vw", fontSize: "1vw" }}></div>
          <div
            id="community-cards"
            className="border flex text-neutral-content justify-center items-end" style={{ width: "9.1vw", height: "5.11vw", fontSize: "1vw" }}
          >
            <div id="pc1" className="border" style={{ width: "3.6vw", fontSize: "1vw" }}>
              <img
                style={{ fontSize: "1vw" }}
                title={state.currentPlayerCardDescriptions[0]}
                alt={state.currentPlayerCardDescriptions[0]}
                src={state.currentPlayerCardImages[0]}
              ></img>
            </div>
            <div id="pc2" className="border" style={{ width: "3.6vw", fontSize: "1vw" }}>
              <img
                style={{ fontSize: "1vw" }}
                title={state.currentPlayerCardDescriptions[1]}
                alt={state.currentPlayerCardDescriptions[1]}
                src={state.currentPlayerCardImages[1]}
              ></img>
            </div>
          </div>
          {/* <div id="grid72" style={{ fontSize: '1vw' }}></div> */}
          <div id="grid73" className="border" style={{ width: "9.1vw", height: "5.11vw", fontSize: "1vw" }}></div>
          <div id="grid74" className="border" style={{ width: "9.1vw", height: "5.11vw", fontSize: "1vw" }}></div>
          <div id="grid75" className="border" style={{ width: "9.1vw", height: "5.11vw", fontSize: "1vw" }}></div>
          <div id="" className="border flex justify-start items-start" style={{ width: "9.1vw", height: "5.11vw", fontSize: "1vw" }}>
            <div
              id="grid17"
              className="border bg-neutral border border-neutral-content text-neutral-content text-center text-xl font-bold rounded-box"
              style={{ fontSize: "1vw", padding: "0.2vw" }}
            >
              {seatLabels.seat2Name}
            </div>
          </div>
          {/* <div id="grid76" style={{fontSize: '1vw'}}></div> */}
          <div id="grid77" className="border" style={{ width: "9.1vw", height: "5.11vw", fontSize: "1vw" }}></div>
          <div id="grid78" className="border" style={{ width: "9.1vw", height: "5.11vw", fontSize: "1vw" }}></div>
          <div id="grid79" className="border" style={{ width: "9.1vw", height: "5.11vw", fontSize: "1vw" }}></div>
          <div id="grid80" className="border" style={{ width: "9.1vw", height: "5.11vw", fontSize: "1vw" }}></div>
          <div id="grid81" className="border" style={{ width: "9.1vw", height: "5.11vw", fontSize: "1vw" }}></div>
          <div id="grid82" className="border" style={{ width: "9.1vw", height: "5.11vw", fontSize: "1vw" }}></div>
          <div id="grid83" className="border" style={{ width: "9.1vw", height: "5.11vw", fontSize: "1vw" }}></div>
          <div id="grid84" className="border" style={{ width: "9.1vw", height: "5.11vw", fontSize: "1vw" }}></div>
          <div id="grid85" className="border" style={{ width: "9.1vw", height: "5.11vw", fontSize: "1vw" }}></div>
          <div id="grid86" className="border" style={{ width: "9.1vw", height: "5.11vw", fontSize: "1vw" }}></div>
          <div id="grid87" className="border" style={{ width: "9.1vw", height: "5.11vw", fontSize: "1vw" }}></div>
          <div id="grid88" className="border" style={{ width: "9.1vw", height: "5.11vw", fontSize: "1vw" }}></div>
          <div id="grid89" className="border" style={{ width: "9.1vw", height: "5.11vw", fontSize: "1vw" }}></div>
          <div
            id="check-button-container"
            className="border flex flex-row text-neutral-content justify-center items-end" style={{ width: "9.1vw", height: "5.11vw", fontSize: "1vw" }}
          >
            <button
              id="check-button"
              className="border btn btn-primary text-neutral-content text-center font-bolder"
              style={{ width: "7vw", height: "2.25vw", fontSize: "1.75vw", padding: "0.1vw" }}
              onClick={handleActionClick}
            >
              CHECK
            </button>
          </div>
          {/* <div id="grid90" className="border" style={{width: "9.1vw", height: "5.11vw", fontSize: "1vw" }}></div> */}
          <div id="grid91" className="border" style={{ width: "9.1vw", height: "5.11vw", fontSize: "1vw" }}></div>
          <div id="grid92" className="border" style={{ width: "9.1vw", height: "5.11vw", fontSize: "1vw" }}></div>
          <div id="grid93" className="border" style={{ width: "9.1vw", height: "5.11vw", fontSize: "1vw" }}></div>
          <div id="grid94" className="border" style={{ width: "9.1vw", height: "5.11vw", fontSize: "1vw" }}></div>
          <div id="grid95" className="border" style={{ width: "9.1vw", height: "5.11vw", fontSize: "1vw" }}></div>
          <div id="grid96" className="border" style={{ width: "9.1vw", height: "5.11vw", fontSize: "1vw" }}></div>
          <div id="grid97" className="border" style={{ width: "9.1vw", height: "5.11vw", fontSize: "1vw" }}></div>
          <div
            id="raise-button-container"
            className="border flex flex-row text-neutral-content justify-center items-end" style={{ width: "9.1vw", height: "5.11vw", fontSize: "1vw" }}
          >
            <button
              id="raise-button"
              className="border btn btn-primary text-neutral-content text-center font-bolder"
              style={{ width: "7vw", height: "2.25vw", fontSize: "1.75vw", padding: "0.1vw" }}
              onClick={() => handleRaise()}
            >
              RAISE
            </button>
          </div>
          {/* <div id="grid98" className="border" style={{width: "9.1vw", height: "5.11vw", fontSize: "1vw" }}></div> */}
          <div id="grid99" className="border" style={{ width: "9.1vw", height: "5.11vw", fontSize: "1vw" }}></div>
          <div id="grid100" className="border" style={{ width: "9.1vw", height: "5.11vw", fontSize: "1vw" }}></div>
          <div
            id="fold-button-container"
            className="border flex flex-row text-neutral-content justify-center items-end" style={{ width: "9.1vw", height: "5.11vw", fontSize: "1vw" }}
          >
            <button
              id="fold-button"
              className="border btn btn-primary text-neutral-content text-center font-bolder"
              style={{ width: "7vw", height: "2.25vw", fontSize: "1.75vw", padding: "0.1vw" }}
              visibility={foldButtonVisibility}
              onClick={() => handleFold()}
            >
              FOLD
            </button>
          </div>
          {/* <div id="grid101" style={{fontSize: '1vw'}}></div> */}
          <div id="" className="border flex justify-end items-start" style={{ width: "9.1vw", height: "5.11vw", fontSize: "1vw" }}>
            <div
              id="grid17"
              className="border bg-neutral border border-neutral-content text-neutral-content text-center text-xl font-bold rounded-box"
              style={{ fontSize: "1vw", padding: "0.2vw" }}
            >
              {seatLabels.seat4Name}
            </div>
          </div>
          {/* <div id="grid102" style={{fontSize: '1vw'}}></div> */}
          <div id="grid103" className="border" style={{ width: "9.1vw", height: "5.11vw", fontSize: "1vw" }}></div>
          <div id="grid104" className="border" style={{ width: "9.1vw", height: "5.11vw", fontSize: "1vw" }}></div>
          <div id="grid105" className="border" style={{ width: "9.1vw", height: "5.11vw", fontSize: "1vw" }}></div>
          <div id="grid106" className="border" style={{ width: "9.1vw", height: "5.11vw", fontSize: "1vw" }}></div>
          <div id="grid107" className="border" style={{ width: "9.1vw", height: "5.11vw", fontSize: "1vw" }}></div>
          <div id="" className="border flex justify-start items-start" style={{ width: "9.1vw", height: "5.11vw", fontSize: "1vw" }}>
            <div
              id="grid17"
              className="border bg-neutral border border-neutral-content text-neutral-content text-center text-xl font-bold rounded-box"
              style={{ fontSize: "1vw", padding: "0.2vw" }}
            >
              {seatLabels.seat5Name}
            </div>
          </div>
          {/* <div id="grid108" style={{fontSize: '1vw'}}>108</div> */}
          <div
            id="call-button-container"
            className="border flex flex-row text-neutral-content justify-center items-end" style={{ width: "9.1vw", height: "5.11vw", fontSize: "1vw" }}
          >
            <button
              id="call-button"
              className="border btn btn-primary text-neutral-content text-center font-bolder"
              style={{ width: "7vw", height: "2.25vw", fontSize: "1.75vw", padding: "0.1vw" }}
              onClick={() => handleCall()}
            >
              CALL
            </button>
          </div>
          {/* <div id="grid109" style={{fontSize: '1vw'}}>109</div> */}
          <div id="grid110" className="border" style={{ width: "9.1vw", height: "5.11vw", fontSize: "1vw" }}></div>
          <div id="grid111" className="border" style={{ width: "9.1vw", height: "5.11vw", fontSize: "1vw" }}></div>
          <div id="grid112" className="border" style={{ width: "9.1vw", height: "5.11vw", fontSize: "1vw" }}></div>
          <div id="grid113" className="border" style={{ width: "9.1vw", height: "5.11vw", fontSize: "1vw" }}></div>
          <div id="grid114" className="border" style={{ width: "9.1vw", height: "5.11vw", fontSize: "1vw" }}></div>
          <div id="" className="border flex justify-start items-start" style={{ width: "9.1vw", height: "5.11vw", fontSize: "1vw" }}>
            <div
              id="grid17"
              className="border bg-neutral border border-neutral-content text-neutral-content text-center text-xl font-bold rounded-box"
              style={{ fontSize: "1vw", padding: "0.2vw" }}
            >
              {seatLabels.seat8Name}
            </div>
          </div>
          {/* <div id="grid115" style={{fontSize: '1vw'}}>115</div> */}
          <div id="" className="border flex justify-center items-start" style={{ width: "9.1vw", height: "5.11vw", fontSize: "1vw" }}>
            <div
              id="grid17"
              className="border bg-secondary text-secondary-content text-center text-xl font-bold rounded-box"
              style={{ fontSize: "1vw", padding: "0.2vw" }}
            >
              {seatLabels.seat1Name}
            </div>
          </div>
          {/* <div id="grid116" style={{fontSize: '1vw'}}>116</div> */}
          <div id="" className="border flex justify-end items-start" style={{ width: "9.1vw", height: "5.11vw", fontSize: "1vw" }}>
            <div
              id="grid17"
              className="bg-neutral border border-neutral-content text-neutral-content text-center text-xl font-bold rounded-box"
              style={{ fontSize: "1vw", padding: "0.2vw" }}
            >
              {seatLabels.seat9Name}
            </div>
          </div>
          {/* <div id="grid117" style={{fontSize: '1vw'}}>117</div> */}
          <div id="grid118" className="border" style={{ width: "9.1vw", height: "5.11vw", fontSize: "1vw" }}></div>
          <div id="grid119" className="border" style={{ width: "9.1vw", height: "5.11vw", fontSize: "1vw" }}></div>
          <div id="grid120" className="border" style={{ width: "9.1vw", height: "5.11vw", fontSize: "1vw" }}></div>
          <div id="grid121" className="border" style={{ width: "9.1vw", height: "5.11vw", fontSize: "1vw" }}></div>
        </div>
      </div>
    </div>
  );
}

//     {/* <div>
//       <h1>Poker Table</h1>
//       <div id='chat-window' className="overflow-hidden lg:overflow-auto scrollbar:!w-1.5 scrollbar:!h-1.5 scrollbar:bg-transparent scrollbar-track:!bg-slate-100 scrollbar-thumb:!rounded scrollbar-thumb:!bg-slate-300 scrollbar-track:!rounded dark:scrollbar-track:!bg-slate-500/[0.16] dark:scrollbar-thumb:!bg-slate-500/50 max-h-96 supports-scrollbars:pr-2 lg:max-h-96">
//         <ul>
//           <li>testing</li>
//         </ul>
//       </div>
//       <textarea id='chat-input' className="textarea textarea-primary" placeholder="Message" onclick={emitText}></textarea>
//       <button id='chat-button' onclick=''>Send</button>
//       <p></p>
//     </div> */}

// {/* <script src="https://cdn.socket.io/socket.io-3.0.0.js"></script> */ }
