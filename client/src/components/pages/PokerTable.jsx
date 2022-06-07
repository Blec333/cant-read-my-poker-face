import React from "react";
import onePlayer from '../../assets/img/one-player.jpg';
import twoPlayers from '../../assets/img/two-players.jpg';
import threePlayers from '../../assets/img/three-players.jpg';
import fourPlayers from '../../assets/img/four-players.jpg';
import fivePlayers from '../../assets/img/five-players.jpg';
import sixPlayers from '../../assets/img/six-players.jpg';
import sevenPlayers from '../../assets/img/seven-players.jpg';
import eightPlayers from '../../assets/img/eight-players.jpg';

export default function PokerTable() {
  
  const axios = require('axios');
  let bgPoker = onePlayer
  let numberOfPlayers = 8;
  let deckCount = 1;
  let game;
  let communityCardImages = [];
  let communityCardDescriptions = [];
  let playerCardImages = [];
  let playerCardDescriptions = [];

const getBackground = () => {
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
}
getBackground();


  async function getGame() {
    let shuffleURL = `https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=${deckCount}`
    axios.get(shuffleURL)
      .then(function (res) {
        let shuffleId = res.data.deck_id
        return shuffleId;
      })
      .then(function (shuffleId) {
        let deal = `https://www.deckofcardsapi.com/api/deck/${shuffleId}/draw/?count=${numberOfPlayers * 2 + 5}`
        axios.get(deal)
          .then(function (res) {
            for (let i = 0; i < res.data.cards.length; i++) {
              res.data.cards[i].code = res.data.cards[i].code.replace('0', '10')
            }
            let communityCardCodes = `${res.data.cards[0].code},${res.data.cards[1].code},${res.data.cards[2].code},${res.data.cards[3].code},${res.data.cards[4].code}`;
            communityCardImages = [`${res.data.cards[0].images.svg}`, `${res.data.cards[1].images.svg}`, `${res.data.cards[2].images.svg}`, `${res.data.cards[3].images.svg}`, `${res.data.cards[4].images.svg}`];
            communityCardDescriptions = [`${res.data.cards[0].value} of ${res.data.cards[0].suit}`, `${res.data.cards[1].value} of ${res.data.cards[1].suit}`, `${res.data.cards[2].value} of ${res.data.cards[2].suit}`, `${res.data.cards[3].value} of ${res.data.cards[3].suit}`, `${res.data.cards[4].value} of ${res.data.cards[4].suit}`];
            let playerCardCodes = '';
            for (let i = 0; i < numberOfPlayers * 2 - 1; i += 2) {
              playerCardCodes = playerCardCodes.concat(`&pc[]=${res.data.cards[i + 5].code},${res.data.cards[i + 6].code}`);
              playerCardImages.push(res.data.cards[i + 5].images.svg, res.data.cards[i + 6].images.svg);
              playerCardDescriptions.push(`${res.data.cards[i + 5].value} of ${res.data.cards[i + 6].suit}`);
            }
            console.log(playerCardCodes);
            let gameURL = `https://api.pokerapi.dev/v1/winner/texas_holdem?cc=${communityCardCodes}${playerCardCodes}`
            axios.get(gameURL)
              .then(function (res) {
                game = res.data;
                console.log(res.data);
                console.log(playerCardImages);
                console.log(playerCardDescriptions);
                console.log(communityCardImages);
                console.log(communityCardDescriptions);
              })
          })
      })
  }

  // getGame();





  // const io = require('socket.io');
  // const socket = io("ws://localhost:8080");
  // socket.on("chat-input", (text) => {
  //   const el = document.createElement("li");
  //   el.innerHTML = text;
  //   document.querySelector("#chat-ul").appendChild(el);
  // });
  
  // document.querySelector("#chat-button").onclick = () => {
  //   const text = document.querySelector("#chat-input").value;
  //   socket.emit("#chat-input", text);


  //   const emitText = () => {
  //     const text = document.querySelector("#chat-input").value;
  //     socket.emit("#chat-input", text);
  //   }
  // }



  return (
    <>


<div className="container w-100 hero bg-cover bg-center bg-no-repeat h-full" style={{ backgroundImage:`url(${bgPoker})`, minWidth: '100%', minHeight: 800 }} >
<div className="flex h-[333]">
<div className="flex-row">
<div className="flex-col text-center text-accent">
fold
</div>
<div className="flex-col">
center box
</div>
<div className="flex-col text-center text-accent">
place bet
</div>
</div>
</div>
</div>

      {/* <div>
        <h1>Poker Table</h1>
        <div id='chat-window' className="overflow-hidden lg:overflow-auto scrollbar:!w-1.5 scrollbar:!h-1.5 scrollbar:bg-transparent scrollbar-track:!bg-slate-100 scrollbar-thumb:!rounded scrollbar-thumb:!bg-slate-300 scrollbar-track:!rounded dark:scrollbar-track:!bg-slate-500/[0.16] dark:scrollbar-thumb:!bg-slate-500/50 max-h-96 supports-scrollbars:pr-2 lg:max-h-96">
          <ul>
            <li>testing</li>
          </ul>
        </div>
        <textarea id='chat-input' className="textarea textarea-primary" placeholder="Message" onclick={emitText}></textarea>
        <button id='chat-button' onclick=''>Send</button>
        <p></p>
      </div> */}

      {/* <script src="https://cdn.socket.io/socket.io-3.0.0.js"></script> */}
     </>
  );
 }
