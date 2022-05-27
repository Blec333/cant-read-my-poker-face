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

const appThoughts = [
  `What is the meaning of life?`,
  `What is the answer to life, the universe, and everything?`,
  `Existential crisis incoming in 3, 2, 1...`,
  `Some things need to be "slept on" for more than a single night`,
  `People who think they know everything are a great annoyance to those of us who do!`,
  `Santa Claus has the right idea, visit people only once a year.`,
  `Until I was thirteen, I thought my name was "shut up".`,
  `You know what the trouble about real life is? There's no danger music.`,
  `When a pregnant woman swims, is she a human submarine?`,
  `Doesn’t the word “FAT” just look like someone took a bite out of the first letter of the word “EAT”`,
  `I wonder if there are any times on the clock that I have never seen!`,
  `Maybe “Are you smarter than 5th grader?” isn’t a show that displays how stupid grown adults can be, but rather, a show that depicts how much useless information we teach grade schoolers that won’t be retained or applicable in life.`,
  `“Go to bed, you’ll feel better in the morning” is the human version of “Did you turn it off and turn it on again?”`,
  `Maybe plants are really farming us, giving us oxygen until we eventually expire and turn into mulch which they can consume`,
  `If my calculator had a history, it would be more embarrassing than my browser history.`,
  `Lawyers hope you get sued, doctors hope you get sick, cops hope you’re criminal, mechanics hope you have car trouble, but only a thief wishes prosperity for you.`,
  `As a kid my parents taught me to not believe everything I see on TV, now I have to teach them to not believe everything they see on Facebook.`,
  `Aliens invaded the Moon on July 20th, 1969.`,
  `When you say ‘Forward’ or ‘Back’, your lips move in those directions.`,
  `If horrific means to make horrible, shouldn't terrific mean to make terrible?`,
  `Why is the word abbreviation so long?`,
  `Tobacco companies kill their best customers and condom companies kill their future customers`,
  `Why is it that if someone tells you that there are 1 billion stars in the universe you will believe them but if they tell you a wall has wet paint you will have to touch it to be sure?`,
  `Asking someone “Where are you?” is a recent thing. Before we had mobile phones, the only way we could talk to the people is if we know where they were`,
  `I wonder what my dog named me.`,
  `I wonder what my cat named me.`,
  `Hello world`,
  `Stupid Social Media App`,
];

const appReactions = [
  `Oh My Gosh!`,
  `Gosh Darn It!`,
  `Gosh Dang It!`,
  `Yay!`,
  `Wow!`,
  `Amazing!`,
  `Huzzah!`,
  `Hooray!`,
  `Hoo-ah!`,
  `Oh No!`,
  `Yikes!`,
  `Love this!`,
  `Hate this!`,
  `Need more of this!`,
  `This is useless...`,
  `But... but why?`,
  `Why I never...`,
  `I tolerate this.`,
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
module.exports = { getRandomName, getRandomArrItem, appThoughts, appReactions };
