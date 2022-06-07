import React, { useEffect } from "react";
import onePlayer from '../../assets/img/one-player.jpg';
import twoPlayers from '../../assets/img/two-players.jpg';
import threePlayers from '../../assets/img/three-players.jpg';
import fourPlayers from '../../assets/img/four-players.jpg';
import fivePlayers from '../../assets/img/five-players.jpg';
import sixPlayers from '../../assets/img/six-players.jpg';
import sevenPlayers from '../../assets/img/seven-players.jpg';
import eightPlayers from '../../assets/img/eight-players.jpg';
import { useQuery } from '@apollo/client';
import { useCasinoContext } from '../../utils/GlobalState';
import {
  UPDATE_PLAYERS,
  UPDATE_CURRENT_PLAYER,
} from '../../utils/actions';
import { QUERY_PLAYERS } from '../../utils/queries';

export default function PokerTable() {
  const axios = require('axios');

  const [state, dispatch] = useCasinoContext();

  const { players } = state;
  const { data: playerData } = useQuery(QUERY_PLAYERS);

  // useEffect(() => {
  //   if (playerData) {
  //     dispatch({
  //       type: UPDATE_PLAYERS,
  //       categories: playerData.players,
  //     });
  //   }
  // }, [playerData, dispatch]);

  // const handleClick = (id) => {
  //   dispatch({
  //     type: UPDATE_CURRENT_PLAYER,
  //     currentPlayer: id,
  //   });
  // };



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
                let currentGame = {
                  gameResults: res.data,
                  playerCardImages: playerCardImages,
                  

                };
                return currentGame;
              })
          })
      })
  }

  getGame();





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



    <div className="container bg-cover bg-center bg-no-repeat w-screen" style={{ backgroundImage: `url(${bgPoker})`, minWidth: '100%', minHeight: 800 }} >
      <div className="grid grid-cols-11 w-100 h-screen text-center text-neutral-content items-center">

        {/* <div id="grid7" className="text-neutral-content">FOLD</div>
        <div id="grid9" className="text-neutral-content">PLACE BET</div> */}
        <div id="grid1" className="">1</div>
        <div id="grid2" className="">2</div>
        <div id="grid3" className="">3</div>
        <div id="grid4" className="">4</div>
        <div id="grid5" className="">5</div>
        <div id="grid6" className="">6</div>
        <div id="grid7" className="">7</div>
        <div id="grid8" className="">8</div>
        <div id="grid9" className="">9</div>
        <div id="grid10" className="">10</div>
        <div id="grid11" className="">11</div>
        <div id="grid12" className="">12</div>
        <div id="grid13" className="">13</div>
        <div id="grid14" className="">14</div>
        <div id="grid15" className="">15</div>
        <div id="grid16" className="">16</div>
        <div id="grid17" className="">17</div>
        <div id="grid18" className="">18</div>
        <div id="grid19" className="">19</div>
        <div id="grid20" className="">20</div>
        <div id="grid21" className="">21</div>
        <div id="grid22" className="">22</div>
        <div id="grid23" className="">23</div>
        <div id="grid24" className="">24</div>
        <div id="grid25" className="">25</div>
        <div id="grid26" className="">26</div>
        <div id="grid27" className="">27</div>
        <div id="grid28" className="">28</div>
        <div id="grid29" className="">29</div>
        <div id="grid30" className="">30</div>
        <div id="grid31" className="">31</div>
        <div id="grid32" className="">32</div>
        <div id="grid33" className="">33</div>
        <div id="grid34" className="">34</div>
        <div id="grid35" className="">35</div>
        <div id="grid36" className="">36</div>
        <div id="grid37" className="">37</div>
        <div id="grid38" className="">38</div>
        <div id="grid39" className="">39</div>
        <div id="grid40" className="">40</div>
        <div id="grid41" className="">41</div>
        <div id="grid42" className="">42</div>
        <div id="grid43" className="">43</div>
        <div id="grid44" className="">44</div>
        <div id="grid45" className="">45</div>
        <div id="grid46" className="">46</div>
        <div id="grid47" className="">47</div>
        <div id="grid48" className="">48</div>
        <div id="grid49" className="">49</div>
        <div id="grid50" className="">50</div>
        <div id="grid51" className="">51</div>
        <div id="grid52" className="">52</div>
        <div id="grid53" className="">53</div>
        <div id="grid54" className="">54</div>
        <div id="grid55" className="">55</div>
        <div id="grid56" className="">56</div>
        <div id="grid57" className="">57</div>
        <div id="grid58" className="">58</div>
        <div id="grid59" className="">59</div>
        <div id="grid60" className="">60</div>
        <div id="community-cards" className="flex flex-row text-neutral-content justify-center gap-1">
          <div id="River" className="">River</div>
          <div id="Turn" className="">Turn</div>
          <div id="Flop3" className="">Flop3</div>
          <div id="Flop2" className="">Flop2</div>
          <div id="Flop1" className="">Flop1</div>
        </div>
        {/* <div id="grid61" className="">61</div> */}
        <div id="grid62" className="">62</div>
        <div id="grid63" className="">63</div>
        <div id="grid64" className="">64</div>
        <div id="grid65" className="">65</div>
        <div id="grid66" className="">66</div>
        <div id="grid67" className="">67</div>
        <div id="grid68" className="">68</div>
        <div id="grid69" className="">69</div>
        <div id="grid70" className="">70</div>
        <div id="grid71" className="">71</div>
        <div id="grid72" className="">72</div>
        <div id="grid73" className="">73</div>
        <div id="grid74" className="">74</div>
        <div id="grid75" className="">75</div>
        <div id="grid76" className="">76</div>
        <div id="grid77" className="">77</div>
        <div id="grid78" className="">78</div>
        <div id="grid79" className="">79</div>
        <div id="grid80" className="">80</div>
        <div id="grid81" className="">81</div>
        <div id="grid82" className="">82</div>
        <div id="community-cards" className="flex flex-row text-neutral-content items-stretch justify-center gap-1">
          <div id="pc1 mt-0" className="">PC1</div>
          <div id="pc2" className="">{playerCardImages[0]}</div>
          <div id="pc2" className="">PC3</div>
          <div id="pc2" className="">PC4</div>
          <div id="pc2" className="">PC5</div>
          <div id="pc2" className="">PC6</div>
          <div id="pc2" className="">PC7</div>
        </div>
        {/* <div id="grid83" className="">83</div> */}
        <div id="grid84" className="">84</div>
        <div id="grid85" className="">85</div>
        <div id="grid86" className="">86</div>
        <div id="grid87" className="">87</div>
        <div id="grid88" className="">88</div>
        <div id="grid89" className="">89</div>
        <div id="grid90" className="">90</div>
        <div id="grid91" className="">91</div>
        <div id="grid92" className="">92</div>
        <div id="grid93" className="">93</div>
        <div id="grid94" className="">94</div>
        <div id="grid95" className="">95</div>
        <div id="grid96" className="">96</div>
        <div id="grid97" className="">97</div>
        <div id="grid98" className="">98</div>
        <div id="grid99" className="">99</div>
        <div id="grid100" className="">100</div>
        <div id="grid101" className="">101</div>
        <div id="grid102" className="">102</div>
        <div id="grid103" className="">103</div>
        <div id="grid104" className="">104</div>
        <div id="grid105" className="">105</div>
        <div id="grid106" className="">106</div>
        <div id="grid107" className="">107</div>
        <div id="grid108" className="">108</div>
        <div id="grid109" className="">109</div>
        <div id="grid110" className="">110</div>
        <div id="grid111" className="">111</div>
        <div id="grid112" className="">112</div>
        <div id="grid113" className="">113</div>
        <div id="grid114" className="">114</div>
        <div id="grid115" className="">115</div>
        <div id="grid116" className="">116</div>
        <div id="grid117" className="">117</div>
        <div id="grid118" className="">118</div>
        <div id="grid119" className="">119</div>
        <div id="grid120" className="">120</div>
        <div id="grid121" className="">121</div>









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