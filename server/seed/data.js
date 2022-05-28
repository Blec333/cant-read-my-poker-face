const playernames = [
  `Aaran`,
  `Aaren`,
  `Aarez`,
  `Aarman`,
  `Aaron`,
  `Aaron-James`,
  `Aarron`,
  `Aaryan`,
  `Aaryn`,
  `Aayan`,
  `Aazaan`,
  `Abaan`,
  `Abbas`,
  `Abdallah`,
  `Abdalroof`,
  `Abdihakim`,
  `Abdirahman`,
  `Abdisalam`,
  `Abdul`,
  `Abdul-Aziz`,
  `Abdulbasir`,
  `Abdulkadir`,
  `Abdulkarem`,
  `Smith`,
  `Jones`,
  `Coollastname`,
  `enter_name_here`,
  `Ze`,
  `Zechariah`,
  `Zeek`,
  `Zeeshan`,
  `Zeid`,
  `Zein`,
  `Zen`,
  `Zendel`,
  `Zenith`,
  `Zennon`,
  `Zeph`,
  `Zerah`,
  `Zhen`,
  `Zhi`,
  `Zhong`,
  `Zhuo`,
  `Zi`,
  `Zidane`,
  `Zijie`,
  `Zinedine`,
  `Zion`,
  `Zishan`,
  `Ziya`,
  `Ziyaan`,
  `Zohaib`,
  `Zohair`,
  `Zoubaeir`,
  `Zubair`,
  `Zubayr`,
  `Zuriel`,
  `Xander`,
  `Jared`,
  `Courtney`,
  `Gillian`,
  `Clark`,
  `Jared`,
  `Grace`,
  `Kelsey`,
  `Tamar`,
  `Alex`,
  `Mark`,
  `Tamar`,
  `Farish`,
  `Sarah`,
  `Nathaniel`,
  `Parker`,
];

const locations = [
  'Johannesbug',
  'Las Vegas',
  'London',
  'Macau',
  'Melborne',
  'Monte Carlo',
  'Paradise Island',

];


// Get a random item given an array
const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Gets a random full name
const getRandomName = () =>
  `${getRandomArrItem(playernames)}`;

// // Function to generate random reactions that we can add to player object.
// const getRandomReactions = (int) => {
//   const results = [];
//   for (let i = 0; i < int; i++) {
//     results.push({
//       playername: getRandomArrItem(playernames),
//       reactionName: getRandomArrItem(appReactions),
//     });
//   }
//   return results;
// };

// // Function to generate random thoughts that we can add to player object.
// const getRandomThoughts = (int) => {
//   const results = [];
//   for (let i = 0; i < int; i++) {
//     results.push({
//       thoughtText: getRandomArrItem(appThoughts),
//       playername: getRandomArrItem(playernames),
//       reactions: getRandomReactions(3),
//     });
//   }
//   return results;
// };

// Export the functions for use in seed.js
module.exports = { getRandomName, getRandomArrItem , locations };
