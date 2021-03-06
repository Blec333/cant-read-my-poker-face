import React, { useRef, useState, useEffect } from "react";
import { useCasinoContext } from "../../utils/GlobalState";
import { useParams } from "react-router-dom";
// import { useMutation } from "@apollo/client";
import { useQuery } from "@apollo/client";

import { UPDATE_CURRENT_PLAYERS_WALLET } from "../../utils/actions";
import { UPDATE_CURRENT_GAME } from "../../utils/actions";
import { QUERY_ME } from '../../utils/queries';
import { QUERY_SINGLE_GAME } from "../../utils/queries";
// import { ADD_PLAYER_TO_GAME } from "../../utils/mutations";

import Auth from "../../utils/auth";
import Chat from "../Chat";
import Header from "../Header";
import Footer from "../Footer";
// import { currentPage, handlePageChange } from "../CasinoContainer";

import onePlayer from "../../assets/img/one-player.jpg";
import twoPlayers from "../../assets/img/two-players.jpg";
import threePlayers from "../../assets/img/three-players.jpg";
import fourPlayers from "../../assets/img/four-players.jpg";
import fivePlayers from "../../assets/img/five-players.jpg";
import sixPlayers from "../../assets/img/six-players.jpg";
import sevenPlayers from "../../assets/img/seven-players.jpg";
import eightPlayers from "../../assets/img/eight-players.jpg";
import facedownCard from "../../assets/img/facedownCard.png";
import chipsInPot from "../../assets/img/chips-in-pot.png";
import smallStack from "../../assets/img/small-stack.png";
import { ADD_PLAYER_TO_GAME } from "../../utils/mutations";

const axios = require("axios");

//BEGINNING OF PRIMARY FUNCTION ==============================================================================
export default function PokerTable({ currentPage, handlePageChange }) {


  //GLOBAL VARIABLES -------------------------------------------
  let multiplayer = false;
  const firstUpdate = useRef(true);
  let fallBackChipStack = 1000000;
  let defaultComputerChipStack = 1000000;
  let numberOfPlayers = 2;
  let bgPoker = onePlayer;
  let deckCount = 1;
  let communityCardImages = [];
  let communityCardDescriptions = [];
  let playerCardImages = [];
  let playerCardDescriptions = [];
  let deal;
  let communityCardCodes;
  let playerCardCodes = "";
  let varPlayerResults = [];
  let varWinnerResults = [];
  let winner;
  let winnerString;
  let varGameRound
  let varCurrentAmount;
  let varPotAmount;
  let varRaiseCount;
  let varCallCount;
  let varCheckCount;
  let varFoldTest;
  let varPlayerChipStack;
  let varComputerChipStack;
  let varPlayerAction;
  let varPreviousAmount;
  let varPreviousAction;
  //GLOBAL VARIABLES -------------------------------------------



  //USE PARAMS -----------------------------------------------------
  let { roomId } = useParams();
  if (roomId === undefined) { roomId = "Main" }
  //USE PARAMS -----------------------------------------------------
  // console.log(roomId)


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
  const [computerActionCallback, setComputerActionCallback] = useState(0);
  const [foldTest, setFoldTest] = useState(false);





  const [dealerMessage, setDealerMessage] = useState('');
  const [gameRound, setGameRound] = useState(0);
  const [currentAmount, setCurrentAmount] = useState(0);
  const [potAmount, setPotAmount] = useState(0);
  const [raiseCount, setRaiseCount] = useState(0);
  const [callCount, setCallCount] = useState(0);
  const [checkCount, setCheckCount] = useState(0);
  const [playerChipStack, setPlayerChipStack] = useState(state.currentWallet[0] || fallBackChipStack);
  const [computerChipStack, setComputerChipStack] = useState(defaultComputerChipStack);
  const [playerAction, setPlayerAction] = useState(true);
  const [previousAmount, setPreviousAmount] = useState(0);
  const [previousAction, setPreviousAction] = useState('');
  const [winnerResults, setWinnerResults] = useState('');


  const [potVisibility, setPotVisibility] = useState("hidden");
  const [foldButtonVisibility, setFoldButtonVisibility] = useState("visible");
  const [checkButtonVisibility, setCheckButtonVisibility] = useState("visible");
  const [dealButtonVisibility, setDealButtonVisibility] = useState("visible");
  const [callButtonVisibility, setCallButtonVisibility] = useState("visible");
  const [betButtonVisibility, setBetButtonVisibility] = useState("visible");
  const [raiseButtonVisibility, setRaiseButtonVisibility] = useState("visible");
  const [player1CardImg1Visibility, setPlayer1CardImg1Visibility] = useState("visible");
  const [player1CardImg2Visibility, setPlayer1CardImg2Visibility] = useState("visible");
  const [player2CardImg1Visibility, setPlayer2CardImg1Visibility] = useState("visible");
  const [player2CardImg2Visibility, setPlayer2CardImg2Visibility] = useState("visible");

  const [gameState, setGameState] = useState({
    player1CardImg1: '',
    player1CardImg2: '',
    player2CardImg1: '',
    player2CardImg2: '',
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
    seat2Name: "Callan",
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
    updateGameDisplay();
    console.log('gameRound change trigger to updateGameDisplay on useEffect');
    console.log('game round: ' + gameRound);
  }, [gameRound]);
  //USE EFFECTS ----------------------------------------------------



  //PLAYER DECISION FUNCTIONS---------------------------------------
  const handleFold = () => {
    varFoldTest = foldTest;
    varPlayerAction = playerAction;
    varPreviousAmount = previousAmount;
    varCurrentAmount = currentAmount;
    if (multiplayer === false && gameRound < 4) {
      if (playerAction === true) {
        varPreviousAction = 'fold';
        varPreviousAmount = 0;

        //progess game round
        varFoldTest = true;
        varPlayerAction = false;
        // setWinnerResults(`${seatLabels.seat1Name} has folded, ${seatLabels.seat2Name} is our winner!`);
        endOfGame();
      }
    }
  }
  const handleCheck = () => {
    varFoldTest = foldTest;
    varPlayerAction = playerAction;
    varPreviousAmount = previousAmount;
    varCurrentAmount = currentAmount;
    if (multiplayer === false && gameRound < 4) {
      if (playerAction === true) {

        //progess game round
        varPreviousAction = 'check';
        varPreviousAmount = 0;
        varCurrentAmount = 0;
        varPlayerAction = false;
        // setDealerMessage(`${seatLabels.seat1Name} has checked over to ${seatLabels.seat2Name}`);
        computerAction();
      }
    }
  }
  const handleBet = () => {
    varFoldTest = foldTest;
    varPlayerAction = playerAction;
    varPreviousAmount = previousAmount;
    varCurrentAmount = currentAmount;
    if (multiplayer === false && gameRound < 4) {
      if (playerAction === true) {
        if (playerChipStack < currentAmount) {
          setDealerMessage(`I'm afraid you do not have enough to place that bet please consider your holdings.`);
        } else if (currentAmount < previousAmount && previousAction === 'raise') {
          setDealerMessage(`I'm afraid that won't be enought to match a raise of $${previousAmount}, I'll need you to reconsider your bet.`);
        } else if (currentAmount > 0) {
          varPotAmount = potAmount + currentAmount;
          setPlayerChipStack(playerChipStack - currentAmount);
          varPlayerChipStack = playerChipStack - currentAmount;

          //progess game round
          varPreviousAction = 'bet';
          varPreviousAmount = currentAmount;
          varPlayerAction = false;
          // setDealerMessage(`${seatLabels.seat1Name} has placed a bet of ${currentAmount}, action moves to ${seatLabels.seat2Name}`);
          computerAction();
        }
      }
    }
  }
  const handleCall = () => {
    varFoldTest = foldTest;
    varPlayerAction = playerAction;
    varPreviousAmount = previousAmount;
    varCurrentAmount = currentAmount;
    if (multiplayer === false && gameRound < 4) {
      if (playerAction === true) {
        if (playerChipStack > previousAmount) {
          varPotAmount = potAmount + previousAmount;
          setPlayerChipStack(playerChipStack - previousAmount);
          varPlayerChipStack = playerChipStack - previousAmount;

          //progess game round
          setCallCount(callCount + 1);
          varCallCount = callCount + 1;
          varPreviousAction = 'call';
          varPreviousAmount = varCurrentAmount;
          setDealerMessage(`${seatLabels.seat1Name} has called ${seatLabels.seat2Name}`);
          varPlayerAction = false;
          computerAction();
        } else {
          setDealerMessage(`I'm afraid you do not have enough to see your opponent, cards will now be revealed.`);
        }
      }
    }
  }
  const handleRaise = () => {
    varFoldTest = foldTest;
    varPlayerAction = playerAction;
    varPreviousAmount = previousAmount;
    varCurrentAmount = currentAmount;
    if (multiplayer === false && gameRound < 4) {
      if (playerAction === true) {
        if (raiseCount > 1) {
          setDealerMessage("You can no longer raise the pot, please match your opponent or fold.")
        } else {
          if (varCurrentAmount <= previousAmount) {
            setDealerMessage("If you wish to raise, your bet must be higher than you opponent's bet.")
          } else {
            if (varCurrentAmount > playerChipStack) {
              setDealerMessage("I'm afraid you cannot cover that amount with your remaining chip stack.")
            } else {
              if (varCurrentAmount > playerChipStack) {
                varPotAmount = potAmount + varCurrentAmount;
                setPlayerChipStack(playerChipStack - computerChipStack);
                varPlayerChipStack = playerChipStack - computerChipStack;

                //progess game round
                varRaiseCount = raiseCount + 1;
                varPreviousAction = 'raise';
                varPreviousAmount = computerChipStack;
                varPlayerAction = false;
                setDealerMessage(`${seatLabels.seat1Name} has forced ${seatLabels.seat2Name} all in!`)
                computerAction();
              } else {
                varPotAmount = potAmount + varCurrentAmount;
                setPlayerChipStack(playerChipStack - varCurrentAmount);
                varPlayerChipStack = playerChipStack - varCurrentAmount;

                //progess game round
                varRaiseCount = raiseCount + 1;
                varPreviousAction = 'raise';
                varPreviousAmount = varCurrentAmount;
                varPlayerAction = false;
                // setDealerMessage(`${seatLabels.seat1Name} has raised the pot to ${potAmount + varCurrentAmount} with a bet of $${varCurrentAmount}, action moves to ${seatLabels.seat2Name}`)
                computerAction();
              }
            }
          }
        }
      }
    }
  }


  //PLAYER DECISION FUNCTIONS---------------------------------------
    let delay = 2;
    const endOfGame = () => {
        console.log('endofGame triggered');
        setPlayerAction(true);
        dispatch({
          type: UPDATE_CURRENT_PLAYERS_WALLET,
          currentWallet: [playerChipStack],
        });
        setGameRound(4);
        varGameRound = 5;
      }
  //COMPUTER DECISION LOGIC ----------------------------------------
  const computerAction = () => {
    console.log('computerAction function initiated');
    let delay = (Math.floor((Math.random() * 4) + 1) * 1000);
    const decision = Math.floor((Math.random() * 5) + 1);
    console.log('computers decision number: ' + decision);
    let computersUpperLimit = 1;
    if (playerChipStack > computerChipStack) {
      computersUpperLimit = computerChipStack / 5;
    } else {
      computersUpperLimit = playerChipStack / 5;
    }
    if (computersUpperLimit < varCurrentAmount) {
      computersUpperLimit = varCurrentAmount;
    }
    let computerBet = Math.floor(Math.random() * (computersUpperLimit - varCurrentAmount) + varCurrentAmount);
    let computerRaise = Math.floor(Math.random() * (computersUpperLimit - varCurrentAmount) + varCurrentAmount);
    console.log('made it past the calcs');
    const gameProgression = () => {
        setGameRound(gameRound + 1);
        setPlayerAction(true);
        console.log('game progression triggered');
      }
    console.log('made it past the timers');
    if (varFoldTest === false) {
      console.log('passed the fold test');
      if (varPlayerAction === false) {
        console.log('passed the player action test');
        console.log('computer is actually considering its decision number');
        if (decision === 1) {
          //fold
          console.log('computer fold hit');
          if (varPreviousAction === 'check') {
            console.log('computer action callback hit on fold');
            // setComputerActionCallback(computerActionCallback + 1);
            computerAction();
          } else {
            //computer action here
            console.log(seatLabels.seat1Name);
            console.log(seatLabels.seat2Name);
            setWinnerResults(`${seatLabels.seat2Name} has folded, ${seatLabels.seat1Name} is our winner!`);
            console.log('computer actually folded');
            setPlayerChipStack(playerChipStack + varPotAmount);
            endOfGame();
          }
        } else if (decision === 2) {
          //check
          console.log('computer check hit');
          if (varPreviousAction !== 'check') {
            console.log('computer action callback hit on check');
            // setComputerActionCallback(computerActionCallback + 1);
            computerAction();
          } else {
            //computer action here
            console.log('computer actually checked');
            setPreviousAmount(0);
            gameProgression();
            setDealerMessage(`${seatLabels.seat2Name} has checked over to ${seatLabels.seat1Name}`);
          }
        } else if (decision === 3) {
          //bet
          console.log('computer bet hit');
          if (varPreviousAction === 'call') {
            console.log('computer action callback hit on bet');
            // setComputerActionCallback(computerActionCallback + 1);
            computerAction();
          } else {
            //computer action here
            console.log('computer actually bet');
            setPreviousAmount(computerBet);
            setComputerChipStack(computerChipStack - computerBet);
            setPotAmount(+varPotAmount + computerBet);
            gameProgression();
            setDealerMessage(`${seatLabels.seat2Name} has placed a bet of $${computerBet}`);
          }
        } else if (decision === 4) {
          //call
          console.log('computer call hit');
          if (varPreviousAction !== 'bet' && previousAction !== 'raise') {
            console.log('computer action callback hit on call');
            // setComputerActionCallback(computerActionCallback + 1);
            computerAction();
          } else {
            //computer action here
            console.log('computer actually called');
            setPreviousAmount(varCurrentAmount);
            setComputerChipStack(computerChipStack - varCurrentAmount);
            setPotAmount(+varPotAmount + varCurrentAmount);
            gameProgression();
            setDealerMessage(`${seatLabels.seat2Name} calls ${seatLabels.seat1Name} at $${varCurrentAmount}.`);
          }
        } else if (decision === 5) {
          //raise
          console.log('computer raise hit');
          if (raiseCount > 1 || varRaiseCount > 1) {
            console.log('computer action callback hit on raise (raiseCount > 1)');
            // setComputerActionCallback(computerActionCallback + 1);
            computerAction();
          } else {
            if (varPreviousAction !== 'bet' && varPreviousAction !== 'check' && previousAction !== 'raise') {
              console.log('computer action callback hit on raise (no bet, check or raise found)');
              // setComputerActionCallback(computerActionCallback + 1);
              computerAction();
            } else {
              console.log('computer actually raised');
              //computer action here
              setPreviousAction('raise');
              setRaiseCount(varRaiseCount + 1);
              setComputerChipStack(computerChipStack - computerRaise);
              setPreviousAmount(computerRaise);
              setPotAmount(+varPotAmount + computerRaise);
              setDealerMessage(`${seatLabels.seat2Name} raises the pot by $${computerRaise} to ${varPotAmount + computerRaise}`);
            }
          }
        }
        setPlayerAction(true);
      }
    } else {
      //The player folded
      setComputerChipStack(computerChipStack + varPotAmount);
      setFoldTest(false);
      endOfGame();
    }
  }
  //COMPUTER DECISION LOGIC ----------------------------------------


  //MUTATIONS (CUD) --------------------------------------------
  // const [addPlayerToGame] = useMutation(ADD_PLAYER_TO_GAME);
  // const [removePlayerFromGame] = useMutation(REMOVE_PLAYER_FROM_GAME);

  //MUTATIONS (CUD) --------------------------------------------

  //USER ACTION FUNCTIONS FOR STATE ----------------------------
  function updateGameDisplay() {
    if (gameRound === 0) {
      setDealerMessage('');
      setGameRound(0);
      setComputerActionCallback(0);
      setCurrentAmount(0);
      setPotAmount(0);
      setRaiseCount(0);
      setCallCount(0);
      setCheckCount(0);
      setFoldTest(false);
      setPlayerAction(true);
      setPreviousAmount(0);
      setPreviousAction('');
      setGameState({
        ...gameState,
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
      })
    } else if (gameRound === 1) {
      setCurrentAmount(0);
      setPreviousAction('');
      setGameState({
        ...gameState,
        riverDesc: facedownCard,
        riverImg: facedownCard,
        turnDesc: facedownCard,
        turnImg: facedownCard,
        flop3Desc: state.currentCommunityCardDescriptions[2],
        flop3Img: state.currentCommunityCardImages[2],
        flop2Desc: state.currentCommunityCardDescriptions[1],
        flop2Img: state.currentCommunityCardImages[1],
        flop1Desc: state.currentCommunityCardDescriptions[0],
        flop1Img: state.currentCommunityCardImages[0],
      });
    } else if (gameRound === 2) {
      setCurrentAmount(0);
      setPreviousAction('');
      setGameState({
        ...gameState,
        riverDesc: facedownCard,
        riverImg: facedownCard,
        turnDesc: state.currentCommunityCardDescriptions[3],
        turnImg: state.currentCommunityCardImages[3],
        flop3Desc: state.currentCommunityCardDescriptions[2],
        flop3Img: state.currentCommunityCardImages[2],
        flop2Desc: state.currentCommunityCardDescriptions[1],
        flop2Img: state.currentCommunityCardImages[1],
        flop1Desc: state.currentCommunityCardDescriptions[0],
        flop1Img: state.currentCommunityCardImages[0],
      });
    } else if (gameRound === 3) {
      setCurrentAmount(0);
      setPreviousAction('');
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
    } else if (gameRound === 4) {
      setCurrentAmount(0);
      setDealerMessage(`${winnerResults}`);
      setGameRound(5)
    }
  }

  //USER ACTION FUNCTIONS FOR STATE ----------------------------


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
    // console.log("Background placed");
  }

  async function shuffleDeck(deckCount, numberOfPlayers) {
    let shuffleURL = `https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=${deckCount}`;
    await axios.get(shuffleURL).then(function (res) {
      let shuffleId = res.data.deck_id;
      deal = `https://www.deckofcardsapi.com/api/deck/${shuffleId}/draw/?count=${numberOfPlayers * 2 + 5
        }`;
      // console.log("Shuffled the deck");
      return res;
    });
  }

  async function dealCards(deal) {
    await axios.get(deal).then(function (res) {
      let cards = res.data.cards;
      for (let i = 0; i < cards.length; i++) {
        cards[i].code = cards[i].code.replace("0", "10");
      }
      communityCardCodes = `${cards[0].code},${cards[1].code},${cards[2].code},${cards[3].code},${cards[4].code}`;
      communityCardImages = [
        `${cards[0].images.png}`,
        `${cards[1].images.png}`,
        `${cards[2].images.png}`,
        `${cards[3].images.png}`,
        `${cards[4].images.png}`,
      ];
      communityCardDescriptions = [
        `${cards[0].value} of ${cards[0].suit}`,
        `${cards[1].value} of ${cards[1].suit}`,
        `${cards[2].value} of ${cards[2].suit}`,
        `${cards[3].value} of ${cards[3].suit}`,
        `${cards[4].value} of ${cards[4].suit}`,
      ];
      for (let i = 0; i < numberOfPlayers * 2 - 1; i += 2) {
        playerCardCodes = playerCardCodes.concat(
          `&pc[]=${cards[i + 5].code},${cards[i + 6].code}`
        );
        playerCardImages.push(
          cards[i + 5].images.png,
          cards[i + 6].images.png
        );
        playerCardDescriptions.push(
          `${cards[i + 5].value} of ${cards[i + 6].suit}`
        );
      }
      // console.log("Cards have been dealt");
      return res;
    });
  }

  async function determineWinner(communityCardCodes, playerCardCodes) {
    let gameURL = `https://api.pokerapi.dev/v1/winner/texas_holdem?cc=${communityCardCodes}${playerCardCodes}`;
    await axios.get(gameURL).then(function (res) {
      varPlayerResults = Object.values(res.data.players).map(function (el) {
        return el.result;
      });
      varWinnerResults = Object.values(res.data.winners).map(function (el) {
        return el.result;
      });
      // console.log("Winner has been determined");
      if (varWinnerResults[0] === varPlayerResults[0]) {
        winner = seatLabels.seat1Name;
      } else {
        winner = seatLabels.seat2Name;
      }
      winnerString = `We have a winner, with ${varWinnerResults[0]}! Congratulations ${winner}`
      setWinnerResults(winnerString);
      return res;
    });
  }

  async function initiateGamePlay() {
    getBackground();
    setGameRound(0);
    await shuffleDeck(deckCount, numberOfPlayers);
    await dealCards(deal);
    await determineWinner(communityCardCodes, playerCardCodes);
    dispatch({
      type: UPDATE_CURRENT_GAME,
      currentPlayerCardImages: playerCardImages,
      currentPlayerCardDescriptions: playerCardDescriptions,
      currentCommunityCardImages: communityCardImages,
      currentCommunityCardDescriptions: communityCardDescriptions,
      currentPlayerResults: varPlayerResults,
      currentWinnerResults: varWinnerResults,
    });
    updateGameDisplay();
    setDealerMessage(`Table action to ${seatLabels.seat1Name}`);
  }
  //UPON PAGE LOAD GLOBAL STATE FUNCTIONS ----------------------

  return (
    <>
      <Header currentPage={currentPage} handlePageChange={handlePageChange} />
      <div id="poker-container" className="flex justify-center w-screen h-[screen-2rem]">
        <div style={{ fontSize: "1vw" }}>
          <img
            className="absolute -z-10 w-full h-auto"
            alt="bg"
            src={bgPoker}
          ></img>
          <div
            className="borderMeNots grid grid-cols-11 text-center text-neutral-content"
            style={{ aspectRatio: 2 / 1.1 }}
          >
            <div id="grid1" className="borderMeNot" style={{ width: "9.1vw", height: "5.07vw", fontSize: "1vw" }}></div>
            <div id="grid2" className="borderMeNot" style={{ width: "9.1vw", height: "5.07vw", fontSize: "1vw" }}></div>
            <div id="grid3" className="borderMeNot" style={{ width: "9.1vw", height: "5.07vw", fontSize: "1vw" }}></div>
            <div id="grid4" className="borderMeNot" style={{ width: "9.1vw", height: "5.07vw", fontSize: "1vw" }}></div>
            <div id="grid5" className="borderMeNot" style={{ width: "9.1vw", height: "5.07vw", fontSize: "1vw" }}></div>
            <div id="grid6" className="borderMeNot" style={{ width: "9.1vw", height: "5.07vw", fontSize: "1vw" }}></div>
            <div id="grid7" className="borderMeNot" style={{ width: "9.1vw", height: "5.07vw", fontSize: "1vw" }}></div>
            <div id="grid8" className="borderMeNot" style={{ width: "9.1vw", height: "5.07vw", fontSize: "1vw" }}></div>
            <div id="grid9" className="borderMeNot" style={{ width: "9.1vw", height: "5.07vw", fontSize: "1vw" }}></div>
            <div id="chat-component" className="borderMeNot h-333px row-span-5 col-span-2 m-0 p-0" style={{ width: "18.2vw", height: "25.275vw", fontSize: "1vw" }}>
              <Chat playerName={playerName} roomId={roomId} />
            </div>
            {/* <div id="grid10" style={{ fontSize: "1vw" }}></div> */}
            {/* <div id="grid11" style={{ fontSize: "1vw" }}></div> */}
            <div id="grid12" className="borderMeNot" style={{ width: "9.1vw", height: "5.07vw", fontSize: "1vw" }}></div>
            <div id="grid13" className="borderMeNot" style={{ width: "9.1vw", height: "5.07vw", fontSize: "1vw" }}></div>
            <div id="grid14" className="borderMeNot" style={{ width: "9.1vw", height: "5.07vw", fontSize: "1vw" }}></div>
            <div id="dealer-message"
              className="borderMeNot col-span-2 bg-white text-black text-center font-bold rounded-br-none rounded-tr-full rounded-tl-full rounded-bl-full p-2"
              style={{ width: "18.2vw", height: "5.07vw", fontSize: "1vw" }}
            >
              {dealerMessage}
            </div>
            {/* <div id="grid15" className="borderMeNot" style={{ width: "9.1vw", height: "5.07vw", fontSize: "1vw" }}></div> */}
            {/* <div id="grid16" className="borderMeNot" style={{ width: "9.1vw", height: "5.07vw", fontSize: "1vw" }}></div> */}
            <div id="" className="borderMeNot flex justify-center items-end" style={{ width: "9.1vw", height: "5.07vw", fontSize: "1vw" }}>
              <div
                id="grid17"
                className="borderMeNot bg-success border-success-content text-neutral text-center text-xl font-bold rounded-box"
                style={{ fontSize: "1vw", padding: "0.2vw" }}
              >
                {seatLabels.seat0Name}
              </div>
            </div>
            {/* <div id="grid17" style={{fontSize: '1vw'}}></div> */}
            <div id="grid18" className="borderMeNot" style={{ width: "9.1vw", height: "5.07vw", fontSize: "1vw" }}></div>
            <div id="grid19" className="borderMeNot" style={{ width: "9.1vw", height: "5.07vw", fontSize: "1vw" }}></div>
            <div id="grid20" className="borderMeNot" style={{ width: "9.1vw", height: "5.07vw", fontSize: "1vw" }}></div>
            {/* <div id="grid21" style={{ fontSize: "1vw" }}></div> */}
            {/* <div id="grid22" style={{ fontSize: "1vw" }}></div> */}
            <div id="grid23" className="borderMeNot" style={{ width: "9.1vw", height: "5.07vw", fontSize: "1vw" }}></div>
            <div id="grid24" className="borderMeNot" style={{ width: "9.1vw", height: "5.07vw", fontSize: "1vw" }}></div>
            <div id="" className="borderMeNot flex justify-center items-start" style={{ width: "9.1vw", height: "5.07vw", fontSize: "1vw" }}>
              <div
                id="grid17"
                className="bg-neutral border border-neutral-content text-neutral-content text-center text-xl font-bold rounded-box"
                style={{ fontSize: "1vw", padding: "0.2vw" }}
              >
                {seatLabels.seat7Name}
              </div>
            </div>
            {/* <div id="grid25" style={{fontSize: '1vw'}}></div> */}
            <div id="grid26" className="borderMeNot" style={{ width: "9.1vw", height: "5.07vw", fontSize: "1vw" }}></div>
            <div id="grid27" className="borderMeNot" style={{ width: "9.1vw", height: "5.07vw", fontSize: "1vw" }}></div>
            <div id="grid28" className="borderMeNot" style={{ width: "9.1vw", height: "5.07vw", fontSize: "1vw" }}></div>
            <div id="grid29" className="borderMeNot" style={{ width: "9.1vw", height: "5.07vw", fontSize: "1vw" }}></div>
            <div id="grid30" className="borderMeNot" style={{ width: "9.1vw", height: "5.07vw", fontSize: "1vw" }}></div>
            <div id="" className="flex justify-center items-start" style={{ width: "9.1vw", height: "5.07vw", fontSize: "1vw" }}>
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
            <div id="grid34" className="borderMeNot" style={{ width: "9.1vw", height: "5.07vw", fontSize: "1vw" }}></div>
            <div id="grid35" className="borderMeNot" style={{ width: "9.1vw", height: "5.07vw", fontSize: "1vw" }}></div>
            <div id="grid36" className="borderMeNot" style={{ width: "9.1vw", height: "5.07vw", fontSize: "1vw" }}></div>
            <div id="grid37" className="borderMeNot" style={{ width: "9.1vw", height: "5.07vw", fontSize: "1vw" }}></div>
            <div id="grid38" className="borderMeNot" style={{ width: "9.1vw", height: "5.07vw", fontSize: "1vw" }}></div>
            <div
              id="deal-button-container"
              className="borderMeNot flex flex-row text-secondary-content justify-center items-end" style={{ visibility: { dealButtonVisibility }, width: "9.1vw", height: "5.07vw", fontSize: "1vw" }}
            >
              <button
                id="deal-button"
                className="borderMeNot btn btn-secondary text-secondary-content text-center font-bolder"
                style={{ width: "7vw", height: "2.25vw", fontSize: "1.75vw", padding: "0.1vw" }}
                onClick={() => initiateGamePlay()}
              >
                DEAL!
              </button>
            </div>
            {/* <div id="grid39" className="borderMeNot" style={{ width: "9.1vw", height: "5.07vw", fontSize: "1vw" }}></div> */}
            <div id="grid40" className="borderMeNot" style={{ width: "9.1vw", height: "5.07vw", fontSize: "1vw" }}></div>
            <div id="grid41" className="borderMeNot" style={{ width: "9.1vw", height: "5.07vw", fontSize: "1vw" }}></div>
            <div id="grid42" className="borderMeNot" style={{ width: "9.1vw", height: "5.07vw", fontSize: "1vw" }}></div>
            {/* <div id="grid43" style={{ fontSize: "1vw" }}></div> */}
            {/* <div id="grid44" style={{ fontSize: "1vw" }}></div> */}
            <div id="grid45" className="borderMeNot" style={{ width: "9.1vw", height: "5.07vw", fontSize: "1vw" }}></div>
            <div id="grid46" className="borderMeNot" style={{ width: "9.1vw", height: "5.07vw", fontSize: "1vw" }}></div>
            <div id="grid47" className="borderMeNot" style={{ width: "9.1vw", height: "5.07vw", fontSize: "1vw" }}></div>
            <div id="grid48" className="borderMeNot" style={{ width: "9.1vw", height: "5.07vw", fontSize: "1vw" }}></div>
            <div id="grid49" className="borderMeNot" style={{ width: "9.1vw", height: "5.07vw", fontSize: "1vw" }}></div>
            <div className="borderMeNot flex flex-col justify-center items-center" style={{ width: "9.1vw", height: "5.07vw", fontSize: "1vw" }}>
              <div id="pot-amount-container" className="borderMeNot flex justify-center items-end" style={{ visibility: { potVisibility }, width: "9.1vw", height: "2.5vw", fontSize: "1vw" }}>
                <div
                  id="pot-amount"
                  className="text-neutral-content text-center text-xl font-bold"
                  style={{ fontSize: "1vw", padding: "0.2vw" }}
                >
                  {potAmount}
                </div>
              </div>
              <div id="pot" className="borderMeNot" style={{ width: "3.6vw", fontSize: "1vw" }}>
                <img
                  style={{ visibility: { potVisibility }, fontSize: "1vw" }}
                  title='pot'
                  alt='pot'
                  src={chipsInPot}
                ></img>
              </div>
            </div>
            {/* <div id="grid50" className="borderMeNot" style={{ width: "9.1vw", height: "5.07vw", fontSize: "1vw" }}></div> */}
            <div id="grid51" className="borderMeNot" style={{ width: "9.1vw", height: "5.07vw", fontSize: "1vw" }}></div>
            <div id="computer-chip-stack-container" className="borderMeNot flex justify-start items-end" style={{ width: "9.1vw", height: "5.07vw", fontSize: "1vw" }}>
              <div
                id="computer-chip-stack"
                className="text-neutral-content text-center text-xl font-bold"
                style={{ fontSize: "1vw", padding: "0.2vw" }}
              >
                {computerChipStack}
              </div>
            </div>
            {/* <div id="grid52" className="borderMeNot" style={{ width: "9.1vw", height0.: "5.07vw", fontSize: "1vw" }}></div> */}
            <div id="grid53" className="borderMeNot" style={{ width: "9.1vw", height: "5.07vw", fontSize: "1vw" }}></div>
            {/* <div id="grid54" style={{ fontSize: "1vw" }}></div> */}
            {/* <div id="gri className="borderMeNot"d55" style={{ fontSize: "1vw" }}></div> */}
            <div id="grid56" className="borderMeNot" style={{ width: "9.1vw", height: "5.07vw", fontSize: "1vw" }}></div>
            <div id="" className="borderMeNot flex justify-end items-center" style={{ width: "9.1vw", height: "5.07vw", fontSize: "1vw" }}>
              <div
                id="seat3"
                className="bg-neutral border border-neutral-content text-neutral-content text-center text-xl font-bold rounded-box"
                style={{ fontSize: "1vw", padding: "0.2vw" }}
              >
                {seatLabels.seat3Name}
              </div>
            </div>
            {/* <div id="grid57" className="borderMeNot" style={{ width: "9.1vw", height: "5.07vw", fontSize: "1vw" }}></div> */}
            <div id="grid58" className="borderMeNot" style={{ width: "9.1vw", height: "5.07vw", fontSize: "1vw" }}></div>
            <div id="grid59" className="borderMeNot" style={{ width: "9.1vw", height: "5.07vw", fontSize: "1vw" }}></div>
            <div
              id="community-cards"
              className="borderMeNot flex flex-row text-neutral-content justify-center items-start col-span-3"
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
            <div id="comp-chips" className="borderMeNot flex justify-start items-start" style={{ width: "9.1vw", height: "5.07vw", fontSize: "1vw" }}>
              <img
                style={{ visibility: { potVisibility }, width: "2vw", height: "2vw", fontSize: "1vw" }}
                title='computer-chips'
                alt='computer-chips'
                src={smallStack}
              ></img>
            </div>
            {/* <div id="grid63" className="borderMeNot" style={{ width: "9.1vw", height: "5.07vw", fontSize: "1vw" }}></div> */}
            <div id="grid64" className="borderMeNot" style={{ width: "9.1vw", height: "5.07vw", fontSize: "1vw" }}></div>
            <div id="" className="borderMeNot flex justify-start items-center" style={{ width: "9.1vw", height: "5.07vw", fontSize: "1vw" }}>
              <div
                id="seat2"
                className="borderMeNot bg-neutral border border-neutral-content text-neutral-content text-center text-xl font-bold rounded-box"
                style={{ fontSize: "1vw", padding: "0.2vw" }}
              >
                {seatLabels.seat2Name}
              </div>
            </div>
            {/* <div id="grid65" className="borderMeNot" style={{ width: "9.1vw", height: "5.07vw", fontSize: "1vw" }}></div> */}
            <div id="grid66" className="borderMeNot" style={{ width: "9.1vw", height: "5.07vw", fontSize: "1vw" }}></div>
            <div id="grid67" className="borderMeNot" style={{ width: "9.1vw", height: "5.07vw", fontSize: "1vw" }}></div>
            <div id="grid68" className="borderMeNot" style={{ width: "9.1vw", height: "5.07vw", fontSize: "1vw" }}></div>
            <div id="grid69" className="borderMeNot" style={{ width: "9.1vw", height: "5.07vw", fontSize: "1vw" }}></div>
            <div id="grid70" className="borderMeNot" style={{ width: "9.1vw", height: "5.07vw", fontSize: "1vw" }}></div>
            <div id="grid71" className="borderMeNot" style={{ width: "9.1vw", height: "5.07vw", fontSize: "1vw" }}></div>
            <div
              id="community-cards"
              className="borderMeNot flex text-neutral-content justify-center items-end" style={{ width: "9.1vw", height: "5.07vw", fontSize: "1vw" }}
            >
              <div id="pc1" className="borderMeNot" style={{ width: "3.6vw", fontSize: "1vw" }}>
                <img
                  style={{ visibility: { player1CardImg1Visibility }, fontSize: "1vw" }}
                  title={state.currentPlayerCardDescriptions[0]}
                  alt={state.currentPlayerCardDescriptions[0]}
                  src={state.currentPlayerCardImages[0]}
                ></img>
              </div>
              <div id="pc2" className="borderMeNot" style={{ width: "3.6vw", fontSize: "1vw" }}>
                <img
                  style={{ visibility: { player1CardImg2Visibility }, fontSize: "1vw" }}
                  title={state.currentPlayerCardDescriptions[1]}
                  alt={state.currentPlayerCardDescriptions[1]}
                  src={state.currentPlayerCardImages[1]}
                ></img>
              </div>
            </div>
            {/* <div id="grid72" style={{ fontSize: '1vw' }}></div> */}
            <div id="grid73" className="borderMeNot" style={{ width: "9.1vw", height: "5.07vw", fontSize: "1vw" }}></div>
            <div id="grid74" className="borderMeNot" style={{ width: "9.1vw", height: "5.07vw", fontSize: "1vw" }}></div>
            <div id="grid75" className="borderMeNot" style={{ width: "9.1vw", height: "5.07vw", fontSize: "1vw" }}></div>
            <div id="grid76" className="borderMeNot" style={{ width: "9.1vw", height: "5.07vw", fontSize: "1vw" }}></div>
            <div id="grid77" className="borderMeNot" style={{ width: "9.1vw", height: "5.07vw", fontSize: "1vw" }}></div>
            <div id="grid78" className="borderMeNot" style={{ width: "9.1vw", height: "5.07vw", fontSize: "1vw" }}></div>
            <div id="grid79" className="borderMeNot" style={{ width: "9.1vw", height: "5.07vw", fontSize: "1vw" }}></div>
            <div id="grid80" className="borderMeNot" style={{ width: "9.1vw", height: "5.07vw", fontSize: "1vw" }}></div>
            <div id="grid81" className="borderMeNot" style={{ width: "9.1vw", height: "5.07vw", fontSize: "1vw" }}></div>
            <div id="player-chips" className="borderMeNot flex justify-end items-start" style={{ width: "9.1vw", height: "5.07vw", fontSize: "1vw" }}>
              <img
                style={{ visibility: { potVisibility }, width: "2vw", height: "2vw", fontSize: "1vw" }}
                title='player chips'
                alt='player chips'
                src={smallStack}
              ></img>
            </div>
            {/* <div id="grid82" className="borderMeNot" style={{ width: "9.1vw", height: "5.07vw", fontSize: "1vw" }}></div> */}
            <div id="player-chip-stack-container" className="borderMeNot flex justify-start items-start" style={{ width: "9.1vw", height: "5.07vw", fontSize: "1vw" }}>
              <div
                id="player-chip-stack"
                className="text-neutral-content text-center text-xl font-bold"
                style={{ fontSize: "1vw", padding: "0.2vw" }}
              >
                {playerChipStack}
              </div>
            </div>
            {/* <div id="grid83" className="borderMeNot" style={{ width: "9.1vw", height: "5.07vw", fontSize: "1vw" }}></div> */}
            <div id="grid84" className="borderMeNot" style={{ width: "9.1vw", height: "5.07vw", fontSize: "1vw" }}></div>
            <div id="grid85" className="borderMeNot" style={{ width: "9.1vw", height: "5.07vw", fontSize: "1vw" }}></div>
            <div id="grid86" className="borderMeNot" style={{ width: "9.1vw", height: "5.07vw", fontSize: "1vw" }}></div>
            {/* <div
              id="raise-button-container"
              className="borderMeNot flex flex-row text-neutral-content justify-center items-end" style={{ width: "9.1vw", height: "5.07vw", fontSize: "1vw" }}
            >
              <button
                id="raise-button"
                className="borderMeNot btn btn-primary text-neutral-content text-center font-bolder"
                style={{ visibility: { raiseButtonVisibility }, width: "7vw", height: "2.25vw", fontSize: "1.75vw", padding: "0.1vw" }}
                onClick={() => handleRaise()}
              >
                RAISE
              </button>
            </div> */}
            <div id="grid87" className="borderMeNot" style={{ width: "9.1vw", height: "5.07vw", fontSize: "1vw" }}></div>
            <div id="grid88" className="borderMeNot" style={{ width: "9.1vw", height: "5.07vw", fontSize: "1vw" }}></div>
            <div id="grid89" className="borderMeNot" style={{ width: "9.1vw", height: "5.07vw", fontSize: "1vw" }}></div>
            <div
              id="check-button-container"
              className="borderMeNot flex flex-row text-neutral-content justify-center items-end" style={{ width: "9.1vw", height: "5.07vw", fontSize: "1vw" }}
            >
              <button
                id="check-button"
                className="borderMeNot btn btn-primary text-neutral-content text-center font-bolder"
                style={{ visibility: { checkButtonVisibility }, width: "7vw", height: "2.25vw", fontSize: "1.75vw", padding: "0.1vw" }}
                onClick={() => handleCheck()}
              >
                CHECK
              </button>
            </div>
            {/* <div id="grid90" className="borderMeNot" style={{width: "9.1vw", height: "5.11vw", fontSize: "1vw" }}></div> */}
            <div id="grid91" className="borderMeNot" style={{ width: "9.1vw", height: "5.07vw", fontSize: "1vw" }}></div>
            <div id="grid92" className="borderMeNot" style={{ width: "9.1vw", height: "5.07vw", fontSize: "1vw" }}></div>
            <div id="grid93" className="borderMeNot" style={{ width: "9.1vw", height: "5.07vw", fontSize: "1vw" }}></div>
            <div id="grid94" className="borderMeNot" style={{ width: "9.1vw", height: "5.07vw", fontSize: "1vw" }}></div>
            <div id="grid95" className="borderMeNot" style={{ width: "9.1vw", height: "5.07vw", fontSize: "1vw" }}></div>
            <div id="grid96" className="borderMeNot" style={{ width: "9.1vw", height: "5.07vw", fontSize: "1vw" }}></div>
            <div id="grid97" className="borderMeNot" style={{ width: "9.1vw", height: "5.07vw", fontSize: "1vw" }}></div>
            {/* <div
              id="call-button-container"
              className="borderMeNot flex flex-row text-neutral-content justify-center items-end" style={{ width: "9.1vw", height: "5.07vw", fontSize: "1vw" }}
            >
              <button
                id="call-button"
                className="borderMeNot btn btn-primary text-neutral-content text-center font-bolder"
                style={{ visibility: { callButtonVisibility }, width: "7vw", height: "2.25vw", fontSize: "1.75vw", padding: "0.1vw" }}
                onClick={() => handleCall()}
              >
                CALL
              </button>
            </div> */}
            <div id="grid98" className="borderMeNot" style={{width: "9.1vw", height: "5.11vw", fontSize: "1vw" }}></div>
            <div id="grid99" className="borderMeNot" style={{ width: "9.1vw", height: "5.07vw", fontSize: "1vw" }}></div>
            <div id="grid100" className="borderMeNot" style={{ width: "9.1vw", height: "5.07vw", fontSize: "1vw" }}></div>
            <div
              id="fold-button-container"
              className="borderMeNot flex flex-row text-neutral-content justify-center items-end" style={{ width: "9.1vw", height: "5.07vw", fontSize: "1vw" }}
            >
              <button
                id="fold-button"
                className="borderMeNot btn btn-primary text-neutral-content text-center font-bolder"
                style={{ visibility: { foldButtonVisibility }, width: "7vw", height: "2.25vw", fontSize: "1.75vw", padding: "0.1vw" }}
                onClick={() => handleFold()}
              >
                FOLD
              </button>
            </div>
            {/* <div id="grid101" style={{fontSize: '1vw'}}></div> */}
            <div id="" className="borderMeNot flex justify-end items-start" style={{ width: "9.1vw", height: "5.07vw", fontSize: "1vw" }}>
              <div
                id="grid17"
                className="borderMeNot bg-neutral border border-neutral-content text-neutral-content text-center text-xl font-bold rounded-box"
                style={{ fontSize: "1vw", padding: "0.2vw" }}
              >
                {seatLabels.seat4Name}
              </div>
            </div>
            {/* <div id="grid102" style={{fontSize: '1vw'}}></div> */}
            <div id="grid103" className="borderMeNot" style={{ width: "9.1vw", height: "5.07vw", fontSize: "1vw" }}></div>
            <div id="grid104" className="borderMeNot" style={{ width: "9.1vw", height: "5.07vw", fontSize: "1vw" }}></div>
            <div id="grid105" className="borderMeNot" style={{ width: "9.1vw", height: "5.07vw", fontSize: "1vw" }}></div>
            <div id="grid106" className="borderMeNot" style={{ width: "9.1vw", height: "5.07vw", fontSize: "1vw" }}></div>
            <div id="grid107" className="borderMeNot" style={{ width: "9.1vw", height: "5.07vw", fontSize: "1vw" }}></div>
            <div id="" className="borderMeNot flex justify-start items-start" style={{ width: "9.1vw", height: "5.07vw", fontSize: "1vw" }}>
              <div
                id="grid17"
                className="borderMeNot bg-neutral border border-neutral-content text-neutral-content text-center text-xl font-bold rounded-box"
                style={{ fontSize: "1vw", padding: "0.2vw" }}
              >
                {seatLabels.seat5Name}
              </div>
            </div>
            {/* <div id="grid108" style={{fontSize: '1vw'}}>108</div> */}
            <div
              id="bet-button-container"
              className="borderMeNot flex flex-row text-neutral-content justify-center items-end" style={{ width: "9.1vw", height: "5.07vw", fontSize: "1vw" }}
            >
              <button
                id="bet-button"
                className="borderMeNot btn btn-primary text-neutral-content text-center font-bolder"
                style={{ visibility: { betButtonVisibility }, width: "7vw", height: "2.25vw", fontSize: "1.75vw", padding: "0.1vw" }}
                onClick={() => handleBet()}
              >
                BET
              </button>
            </div>
            {/* <div id="grid109" style={{fontSize: '1vw'}}>109</div> */}
            <div id="grid110" className="borderMeNot" style={{ width: "9.1vw", height: "5.07vw", fontSize: "1vw" }}></div>
            <div id="grid111" className="borderMeNot" style={{ width: "9.1vw", height: "5.07vw", fontSize: "1vw" }}></div>
            <div id="grid112" className="borderMeNot" style={{ width: "9.1vw", height: "5.07vw", fontSize: "1vw" }}></div>
            <div id="grid113" className="borderMeNot" style={{ width: "9.1vw", height: "5.07vw", fontSize: "1vw" }}></div>
            <div id="grid114" className="borderMeNot" style={{ width: "9.1vw", height: "5.07vw", fontSize: "1vw" }}></div>
            <div id="" className="borderMeNot flex justify-start items-start" style={{ width: "9.1vw", height: "5.07vw", fontSize: "1vw" }}>
              <div
                id="seat8"
                className="borderMeNot bg-neutral border border-neutral-content text-neutral-content text-center text-xl font-bold rounded-box"
                style={{ fontSize: "1vw", padding: "0.2vw" }}
              >
                {seatLabels.seat8Name}
              </div>
            </div>
            {/* <div id="grid115" style={{fontSize: '1vw'}}>115</div> */}
            <div id="" className="borderMeNot flex justify-center items-start" style={{ width: "9.1vw", height: "5.07vw", fontSize: "1vw" }}>
              <div
                id="seat1"
                className="borderMeNot bg-secondary text-secondary-content text-center text-xl font-bold rounded-box"
                style={{ fontSize: "1vw", padding: "0.2vw" }}
              >
                {seatLabels.seat1Name}
              </div>
            </div>
            {/* <div id="grid116" style={{fontSize: '1vw'}}>116</div> */}
            <div id="" className="borderMeNot flex justify-end items-start" style={{ width: "9.1vw", height: "5.07vw", fontSize: "1vw" }}>
              <div
                id="seat9"
                className="bg-neutral border border-neutral-content text-neutral-content text-center text-xl font-bold rounded-box"
                style={{ fontSize: "1vw", padding: "0.2vw" }}
              >
                {seatLabels.seat9Name}
              </div>
            </div>
            {/* <div id="grid117" style={{fontSize: '1vw'}}>117</div> */}
            <div id="grid118" className="borderMeNot" style={{ width: "9.1vw", height: "5.07vw", fontSize: "1vw" }}></div>
            <div id="grid119" className="borderMeNot" style={{ width: "9.1vw", height: "5.07vw", fontSize: "1vw" }}></div>
            <div
              id="amount-container"
              className="borderMeNot flex text-neutral-content justify-center items-center" style={{ width: "9.1vw", height: "5.07vw", fontSize: "1vw" }}
            >
              <ul>
                <li className="w-full ">AMOUNT</li>
                <input
                  id="bet-amount"
                  className="borderMeNot bg-neutral text-neutral-content text-left font-bolder"
                  type='number'
                  style={{ width: "9vw", height: "2.25vw", fontSize: "1.25vw", padding: "0.1vw" }}
                  placeholder="$0.00"
                  onChange={(e) => setCurrentAmount(+e.target.value)}
                >
                </input>
              </ul>
            </div>
            {/* <div id="grid120" className="borderMeNot" style={{ width: "9.1vw", height: "5.07vw", fontSize: "1vw" }}></div> */}
            <div id="grid121" className="borderMeNot" style={{ width: "9.1vw", height: "5.07vw", fontSize: "1vw" }}></div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}


