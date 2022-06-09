import React, { useReducer, useState, useEffect } from "react";
// import { Link, useParams } from 'react-router-dom';
import { useCasinoContext } from '../../utils/GlobalState';
import { UPDATE_CURRENT_GAME } from '../../utils/actions';
// import { useQuery } from '@apollo/client';
// import { QUERY_PLAYERS } from '../../utils/queries';

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
  const [state, dispatch] = useCasinoContext();
  useEffect(() => {
    initiateGamePlay()
  }, [])

  let bgPoker = onePlayer
  let numberOfPlayers = 8;
  let deckCount = 1;
  let communityCardImages = [];
  let communityCardDescriptions = [];
  let playerCardImages = [];
  let playerCardDescriptions = [];
  let deal;
  let communityCardCodes;
  let playerCardCodes = '';
  let playerResults = [];
  let winnerResults = [];

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
    console.log('Background placed')
  }

  async function shuffleDeck() {
    let shuffleURL = `https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=${deckCount}`
    await axios.get(shuffleURL)
      .then(function (res) {
        let shuffleId = res.data.deck_id
        deal = `https://www.deckofcardsapi.com/api/deck/${shuffleId}/draw/?count=${numberOfPlayers * 2 + 5}`
        console.log('Shuffled the deck')
        return res;
      })
  }

  async function dealCards() {
    await axios.get(deal)
      .then(function (res) {
        console.log(res)
        for (let i = 0; i < res.data.cards.length; i++) {
          res.data.cards[i].code = res.data.cards[i].code.replace('0', '10')
        }
        communityCardCodes = `${res.data.cards[0].code},${res.data.cards[1].code},${res.data.cards[2].code},${res.data.cards[3].code},${res.data.cards[4].code}`;
        communityCardImages = [`${res.data.cards[0].images.png}`, `${res.data.cards[1].images.png}`, `${res.data.cards[2].images.png}`, `${res.data.cards[3].images.png}`, `${res.data.cards[4].images.png}`];
        communityCardDescriptions = [`${res.data.cards[0].value} of ${res.data.cards[0].suit}`, `${res.data.cards[1].value} of ${res.data.cards[1].suit}`, `${res.data.cards[2].value} of ${res.data.cards[2].suit}`, `${res.data.cards[3].value} of ${res.data.cards[3].suit}`, `${res.data.cards[4].value} of ${res.data.cards[4].suit}`];
        for (let i = 0; i < numberOfPlayers * 2 - 1; i += 2) {
          playerCardCodes = playerCardCodes.concat(`&pc[]=${res.data.cards[i + 5].code},${res.data.cards[i + 6].code}`);
          playerCardImages.push(res.data.cards[i + 5].images.png, res.data.cards[i + 6].images.png);
          playerCardDescriptions.push(`${res.data.cards[i + 5].value} of ${res.data.cards[i + 6].suit}`);
        }
        console.log('Cards have been dealt')
        return res;
      })
  }

  async function determineWinner() {
    let gameURL = `https://api.pokerapi.dev/v1/winner/texas_holdem?cc=${communityCardCodes}${playerCardCodes}`
    await axios.get(gameURL)
      .then(function (res) {
        playerResults = Object.values(res.data.players).map(function (el) { return el.result });
        winnerResults = Object.values(res.data.winners).map(function (el) { return el.result });
        console.log('Winner has been determined')
        return res;
      })
  }

  async function initiateGamePlay() {
    getBackground();
    await shuffleDeck();
    await dealCards();
    await determineWinner();
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






  function showPreFlopRound() {

  }

  function showFlopRound() {
  
  }

  function showTurnRound() {
  
  }

  function showRiverRound() {
  
  }

  function showWinnerRound() {
  
  }











  return (

    <div id="poker-container" className="flex justify-center w-screen h-[screen-2rem]">
    {/* <div className="bg-cover bg-center bg-no-repeat bg-fixed w-full h-full" style={{ backgroundImage: `url(${bgPoker})` }} > */}
      <div className="border" style={{fontSize: '1vw'}}>
        <img className="absolute -z-10 w-full h-auto" alt='bg' src={bgPoker}></img>
        <div className="borders grid grid-cols-11 text-center text-neutral-content" style={{aspectRatio: 2/1.1}}>

          {/* <div id="grid7" className="text-neutral-content">FOLD</div>
        <div id="grid9" className="text-neutral-content">PLACE BET</div> */}
          <div id="grid1" className="border" style={{fontSize: '1vw'}}>1</div>
          <div id="grid2" className="border" style={{fontSize: '1vw'}}>2</div>
          <div id="grid3" className="border" style={{fontSize: '1vw'}}>3</div>
          <div id="grid4" className="border" style={{fontSize: '1vw'}}>4</div>
          <div id="grid5" className="border" style={{fontSize: '1vw'}}>5</div>
          <div id="grid6" className="border" style={{fontSize: '1vw'}}>6</div>
          <div id="grid7" className="border" style={{fontSize: '1vw'}}>7</div>
          <div id="grid8" className="border" style={{fontSize: '1vw'}}>8</div>
          <div id="grid9" className="border" style={{fontSize: '1vw'}}>9</div>
          <div id="grid10" className="border" style={{fontSize: '1vw'}}>10</div>
          <div id="grid11" className="border" style={{fontSize: '1vw'}}>11</div>
          <div id="grid12" className="border" style={{fontSize: '1vw'}}>12</div>
          <div id="grid13" className="border" style={{fontSize: '1vw'}}>13</div>
          <div id="grid14" className="border" style={{fontSize: '1vw'}}>14</div>
          <div id="grid15" className="border" style={{fontSize: '1vw'}}>15</div>
          <div id="grid16" className="border" style={{fontSize: '1vw'}}>16</div>
          <div id="" className="border" style={{fontSize: '1vw'}}>
            <div id="grid17" className="bg-neutral text-neutral-content text-center text-xl text-bold rounded-box" style={{fontSize: '1vw'}}>DEALER</div>
          </div>
          {/* <div id="grid17" className="border" style={{fontSize: '1vw'}}>17</div> */}
          <div id="grid18" className="border" style={{fontSize: '1vw'}}>18</div>
          <div id="grid19" className="border" style={{fontSize: '1vw'}}>19</div>
          <div id="grid20" className="border" style={{fontSize: '1vw'}}>20</div>
          <div id="grid21" className="border" style={{fontSize: '1vw'}}>21</div>
          <div id="grid22" className="border" style={{fontSize: '1vw'}}>22</div>
          <div id="grid23" className="border" style={{fontSize: '1vw'}}>23</div>
          <div id="grid24" className="border" style={{fontSize: '1vw'}}>24</div>
          <div id="" className="flex justify-center items-start">
            <div id="grid17" className="bg-neutral text-neutral-content text-center text-xl text-bold rounded-box" style={{fontSize: '1vw'}}>PLAYER 7</div>
          </div>
          {/* <div id="grid25" className="border" style={{fontSize: '1vw'}}>25</div> */}
          <div id="grid26" className="border" style={{fontSize: '1vw'}}>26</div>
          <div id="grid27" className="border" style={{fontSize: '1vw'}}>27</div>
          <div id="grid28" className="border" style={{fontSize: '1vw'}}>28</div>
          <div id="grid29" className="border" style={{fontSize: '1vw'}}>29</div>
          <div id="grid30" className="border" style={{fontSize: '1vw'}}>30</div>
          <div id="" className="flex justify-center items-start">
            <div id="grid17" className="bg-neutral text-neutral-content text-center text-xl text-bold rounded-box" style={{fontSize: '1vw'}}>PLAYER 6</div>
          </div>
          {/* <div id="grid31" className="border" style={{fontSize: '1vw'}}>31</div> */}
          <div id="grid32" className="border" style={{fontSize: '1vw'}}>32</div>
          <div id="grid33" className="border" style={{fontSize: '1vw'}}>33</div>
          <div id="grid34" className="border" style={{fontSize: '1vw'}}>34</div>
          <div id="grid35" className="border" style={{fontSize: '1vw'}}>35</div>
          <div id="grid36" className="border" style={{fontSize: '1vw'}}>36</div>
          <div id="grid37" className="border" style={{fontSize: '1vw'}}>37</div>
          <div id="grid38" className="border" style={{fontSize: '1vw'}}>38</div>
          <div id="grid39" className="border" style={{fontSize: '1vw'}}>39</div>
          <div id="grid40" className="border" style={{fontSize: '1vw'}}>40</div>
          <div id="grid41" className="border" style={{fontSize: '1vw'}}>41</div>
          <div id="grid42" className="border" style={{fontSize: '1vw'}}>42</div>
          <div id="grid43" className="border" style={{fontSize: '1vw'}}>43</div>
          <div id="grid44" className="border" style={{fontSize: '1vw'}}>44</div>
          <div id="grid45" className="border" style={{fontSize: '1vw'}}>45</div>
          <div id="grid46" className="border" style={{fontSize: '1vw'}}>46</div>
          <div id="grid47" className="border" style={{fontSize: '1vw'}}>47</div>
          <div id="grid48" className="border" style={{fontSize: '1vw'}}>48</div>
          <div id="grid49" className="border" style={{fontSize: '1vw'}}>49</div>
          <div id="grid50" className="border" style={{fontSize: '1vw'}}>50</div>
          <div id="grid51" className="border" style={{fontSize: '1vw'}}>51</div>
          <div id="grid52" className="border" style={{fontSize: '1vw'}}>52</div>
          <div id="grid53" className="border" style={{fontSize: '1vw'}}>53</div>
          <div id="grid54" className="border" style={{fontSize: '1vw'}}>54</div>
          <div id="grid55" className="border" style={{fontSize: '1vw'}}>55</div>
          <div id="grid56" className="border" style={{fontSize: '1vw'}}>56</div>
          <div id="grid57" className="border" style={{fontSize: '1vw'}}>57</div>
          <div id="grid58" className="border" style={{fontSize: '1vw'}}>58</div>
          <div id="grid59" className="border" style={{fontSize: '1vw'}}>59</div>
          <div id="grid60" className="border" style={{fontSize: '1vw'}}>60</div>
          <div id="community-cards" className="flex flex-row text-neutral-content justify-center items-center">
            <div id="River" className="border" style={{fontSize: '1vw'}}><img title={state.currentCommunityCardDescriptions[4]} alt={state.currentCommunityCardDescriptions[4]} src={state.currentCommunityCardImages[4]}></img></div>
            <div id="Turn" className="border" style={{fontSize: '1vw'}}><img title={state.currentCommunityCardDescriptions[3]} alt={state.currentCommunityCardDescriptions[3]} src={state.currentCommunityCardImages[3]}></img></div>
            <div id="Flop3" className="border" style={{fontSize: '1vw'}}><img title={state.currentCommunityCardDescriptions[2]} alt={state.currentCommunityCardDescriptions[2]} src={state.currentCommunityCardImages[2]}></img></div>
            <div id="Flop2" className="border" style={{fontSize: '1vw'}}><img title={state.currentCommunityCardDescriptions[1]} alt={state.currentCommunityCardDescriptions[1]} src={state.currentCommunityCardImages[1]}></img></div>
            <div id="Flop1" className="border" style={{fontSize: '1vw'}}><img title={state.currentCommunityCardDescriptions[1]} alt={state.currentCommunityCardDescriptions[1]} src={state.currentCommunityCardImages[0]}></img></div>
          </div>
          {/* <div id="grid61" className="border" style={{fontSize: '1vw'}}>61</div> */}
          <div id="grid62" className="border" style={{fontSize: '1vw'}}>62</div>
          <div id="grid63" className="border" style={{fontSize: '1vw'}}>63</div>
          <div id="grid64" className="border" style={{fontSize: '1vw'}}>64</div>
          <div id="grid65" className="border" style={{fontSize: '1vw'}}>65</div>
          <div id="grid66" className="border" style={{fontSize: '1vw'}}>66</div>
          <div id="grid67" className="border" style={{fontSize: '1vw'}}>67</div>
          <div id="" className="flex justify-end items-start">
            <div id="grid17" className="bg-neutral text-neutral-content text-center text-xl text-bold rounded-box" style={{fontSize: '1vw'}}>PLAYER 3</div>
          </div>
          {/* <div id="grid68" className="border" style={{fontSize: '1vw'}}>68</div> */}
          <div id="grid69" className="border" style={{fontSize: '1vw'}}>69</div>
          <div id="grid70" className="border" style={{fontSize: '1vw'}}>70</div>
          <div id="grid71" className="border" style={{fontSize: '1vw'}}>71</div>
          <div id="grid72" className="border" style={{fontSize: '1vw'}}>72</div>
          <div id="grid73" className="border" style={{fontSize: '1vw'}}>73</div>
          <div id="grid74" className="border" style={{fontSize: '1vw'}}>74</div>
          <div id="grid75" className="border" style={{fontSize: '1vw'}}>75</div>
          <div id="" className="flex justify-start items-start">
            <div id="grid17" className="bg-neutral text-neutral-content text-center text-xl text-bold rounded-box" style={{fontSize: '1vw'}}>PLAYER 2</div>
          </div>
          {/* <div id="grid76" className="border" style={{fontSize: '1vw'}}>76</div> */}
          <div id="grid77" className="border" style={{fontSize: '1vw'}}>77</div>
          <div id="grid78" className="border" style={{fontSize: '1vw'}}>78</div>
          <div id="grid79" className="border" style={{fontSize: '1vw'}}>79</div>
          <div id="grid80" className="border" style={{fontSize: '1vw'}}>80</div>
          <div id="grid81" className="border" style={{fontSize: '1vw'}}>81</div>
          <div id="grid82" className="border" style={{fontSize: '1vw'}}>82</div>
          <div id="community-cards" className="flex border text-neutral-content">
            <div id="pc1" className="border" style={{fontSize: '1vw'}}>
              <img className="border" style={{fontSize: '1vw'}} title={state.currentPlayerCardDescriptions[0]} alt={state.currentPlayerCardDescriptions[0]} src={state.currentPlayerCardImages[0]}></img>
              </div>
            <div id="pc2" className="border" style={{fontSize: '1vw'}}>
              <img className="border" style={{fontSize: '1vw'}} title={state.currentPlayerCardDescriptions[1]} alt={state.currentPlayerCardDescriptions[1]} src={state.currentPlayerCardImages[1]}></img>
            </div>
          </div>
          {/* <div id="grid83" className="border" style={{fontSize: '1vw'}}>83</div> */}
          <div id="grid84" className="border" style={{fontSize: '1vw'}}>84</div>
          <div id="grid85" className="border" style={{fontSize: '1vw'}}>85</div>
          <div id="grid86" className="border" style={{fontSize: '1vw'}}>86</div>
          <div id="grid87" className="border" style={{fontSize: '1vw'}}>87</div>
          <div id="grid88" className="border" style={{fontSize: '1vw'}}>88</div>
          <div id="grid89" className="border" style={{fontSize: '1vw'}}>89</div>
          <div id="grid90" className="border" style={{fontSize: '1vw'}}>90</div>
          <div id="grid91" className="border" style={{fontSize: '1vw'}}>91</div>
          <div id="grid92" className="border" style={{fontSize: '1vw'}}>92</div>
          <div id="grid93" className="border" style={{fontSize: '1vw'}}>93</div>
          <div id="grid94" className="border" style={{fontSize: '1vw'}}>94</div>
          <div id="grid95" className="border" style={{fontSize: '1vw'}}>95</div>
          <div id="grid96" className="border" style={{fontSize: '1vw'}}>96</div>
          <div id="grid97" className="border" style={{fontSize: '1vw'}}>97</div>
          <div id="grid98" className="border" style={{fontSize: '1vw'}}>98</div>
          <div id="grid99" className="border" style={{fontSize: '1vw'}}>99</div>
          <div id="grid100" className="border" style={{fontSize: '1vw'}}>100</div>
          <div id="community-cards" className="flex flex-row text-neutral-content justify-center items-end">
            <button id="fold" className="btn btn-primary text-neutral-content text-center text-bolder" style={{fontSize: '1.75vw', padding: '0.1vw'}}>FOLD</button>
          </div>
          {/* <div id="grid101" className="border" style={{fontSize: '1vw'}}>101</div> */}
          <div id="" className="flex justify-end items-start">
            <div id="grid17" className="bg-neutral text-neutral-content text-center text-xl text-bold rounded-box" style={{fontSize: '1vw'}}>PLAYER 4</div>
          </div>
          {/* <div id="grid102" className="border" style={{fontSize: '1vw'}}>102</div> */}
          <div id="grid103" className="border" style={{fontSize: '1vw'}}>103</div>
          <div id="grid104" className="border" style={{fontSize: '1vw'}}>104</div>
          <div id="grid105" className="border" style={{fontSize: '1vw'}}>105</div>
          <div id="grid106" className="border" style={{fontSize: '1vw'}}>106</div>
          <div id="grid107" className="border" style={{fontSize: '1vw'}}>107</div>
          <div id="" className="flex justify-start items-start">
            <div id="grid17" className="bg-neutral text-neutral-content text-center text-xl text-bold rounded-box" style={{fontSize: '1vw'}}>PLAYER 5</div>
          </div>
          {/* <div id="grid108" className="border" style={{fontSize: '1vw'}}>108</div> */}
          <div id="community-cards" className="flex flex-row text-neutral-content justify-center items-end">
            <button id="action" className="btn btn-primary text-neutral-content text-center text-bolder" style={{fontSize: '1.75vw', padding: '0.1vw'}}>ACTION</button>
          </div>
          {/* <div id="grid109" className="border" style={{fontSize: '1vw'}}>109</div> */}
          <div id="grid110" className="border" style={{fontSize: '1vw'}}>110</div>
          <div id="grid111" className="border" style={{fontSize: '1vw'}}>111</div>
          <div id="grid112" className="border" style={{fontSize: '1vw'}}>112</div>
          <div id="grid113" className="border" style={{fontSize: '1vw'}}>113</div>
          <div id="grid114" className="border" style={{fontSize: '1vw'}}>114</div>
          <div id="" className="flex justify-start items-start">
            <div id="grid17" className="bg-neutral text-neutral-content text-center text-xl text-bold rounded-box" style={{fontSize: '1vw'}}>PLAYER 8</div>
          </div>
          {/* <div id="grid115" className="border" style={{fontSize: '1vw'}}>115</div> */}
          <div id="" className="flex justify-center items-start">
            <div id="grid17" className="bg-neutral text-neutral-content text-center text-xl text-bold rounded-box" style={{fontSize: '1vw'}}>PLAYER 1</div>
          </div>
          {/* <div id="grid116" className="border" style={{fontSize: '1vw'}}>116</div> */}
          <div id="" className="flex justify-end items-start">
            <div id="grid17" className="bg-neutral text-neutral-content text-center text-xl text-bold rounded-box" style={{fontSize: '1vw'}}>PLAYER 9</div>
          </div>
          {/* <div id="grid117" className="border" style={{fontSize: '1vw'}}>117</div> */}
          <div id="grid118" className="border" style={{fontSize: '1vw'}}>118</div>
          <div id="grid119" className="border" style={{fontSize: '1vw'}}>119</div>
          <div id="grid120" className="border" style={{fontSize: '1vw'}}>120</div>
          <div id="grid121" className="border" style={{fontSize: '1vw'}}>121</div>
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