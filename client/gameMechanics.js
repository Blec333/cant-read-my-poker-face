const axios = require('axios');

let numberOfPlayers = 6;
let deckCount = 1;
async function getGame() {
  let shuffleURL = `https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=${deckCount}`
  axios.get(shuffleURL)
    .then(function (res) {
      return shuffleId = res.data.deck_id
    })
    .then(function (shuffleId) {
      let deal = `https://www.deckofcardsapi.com/api/deck/${shuffleId}/draw/?count=${numberOfPlayers * 2 + 5}`
      axios.get(deal)
        .then(function (res) {
          for (i = 0; i < res.data.cards.length; i++) {
            res.data.cards[i].code = res.data.cards[i].code.replace('0', '10')
          }
          let communityCardCodes = `${res.data.cards[0].code},${res.data.cards[1].code},${res.data.cards[2].code},${res.data.cards[3].code},${res.data.cards[4].code}`;
          let communityCardImages = [`${res.data.cards[0].images.svg}`, `${res.data.cards[1].images.svg}`, `${res.data.cards[2].images.svg}`, `${res.data.cards[3].images.svg}`, `${res.data.cards[4].images.svg}`];
          let communityCardDescriptions = [`${res.data.cards[0].value} of ${res.data.cards[0].suit}`, `${res.data.cards[1].value} of ${res.data.cards[1].suit}`, `${res.data.cards[2].value} of ${res.data.cards[2].suit}`, `${res.data.cards[3].value} of ${res.data.cards[3].suit}`, `${res.data.cards[4].value} of ${res.data.cards[4].suit}`];
          let playerCardCodes = '';
          let playerCardImages = [];
          let playerCardDescriptions = [];
          for (i = 0; i < numberOfPlayers * 2 - 1; i += 2) {
            playerCardCodes = playerCardCodes.concat(`&pc[]=${res.data.cards[i + 5].code},${res.data.cards[i + 6].code}`);
            playerCardImages.push(res.data.cards[i + 5].images.svg, res.data.cards[i + 6].images.svg);
            playerCardDescriptions.push(`${res.data.cards[i + 5].value} of ${res.data.cards[i + 6].suit}`);
          }
          console.log(playerCardCodes);
          let gameURL = `https://api.pokerapi.dev/v1/winner/texas_holdem?cc=${communityCardCodes}${playerCardCodes}`
          axios.get(gameURL)
            .then(function (res) {
              console.log(res.data);
              console.log(playerCardImages);
              console.log(playerCardDescriptions);
              console.log(communityCardImages);
              console.log(communityCardDescriptions);
              // let winner = 
            })
        })
    })
}
getGame();
// https://api.pokerapi.dev/v1/winner/texas_holdem?cc=AC,KD,QH,JS,7C&pc[]=10S,8C&pc[]=3S,2C&pc[]=QS,JH