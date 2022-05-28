const e = require('express');
const connection = require('../config/connection');
const { Game, Player, Location } = require('../models');
const { getRandomName, getRandomArrItem, locations } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');

  // Drop existing thoughts
  await Location.deleteMany({});

  // Drop existing players
  await Player.deleteMany({});


// PLAYERS ---------------------------------------------------------------------------------------

// STEP 1: Create empty array to hold the players
const players = [];

// STEP 2: Construct player data object
const constructPlayerData = () => {
  const playername = getRandomName();
  const email = `${playername}${Math.floor(Math.random() * (99 - 18 + 1) + 18)}@email.com`;
  const thoughts = [];
  let singlePlayer = { playername, email, thoughts }
  return singlePlayer;
}

// STEP 3: Ensure player is unique within players prior to adding
var currentPlayer;
const checkUniquePlayer = () => {
  currentPlayer = constructPlayerData();
  players.forEach((el) => {
    if (el && currentPlayer.playername === el.playername) {
      checkUniquePlayer();
    }
  });
  return currentPlayer;
}

// STEP 4: Once determined unique, push into players array
const addUniquePlayer = () => {
  let player = checkUniquePlayer();
  players.push(player);
}

// Initialize steps above and loop 20 times -- adding only unique players to the players array
for (let i = 0; i < 20; i++) {
  addUniquePlayer();
}

// Add players to the collection and await the results
await Player.collection.insertMany(players);

// Add thoughts to the collection and await the results
await Location.collection.insertMany(locations);

// Log out the seed data to indicate what should appear in the database
console.table(players);
console.table(thoughts);
console.info('Seeding complete! 🌱');
process.exit(0);
});
