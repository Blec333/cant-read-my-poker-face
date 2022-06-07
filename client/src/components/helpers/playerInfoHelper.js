
function getPlayerName(player) {
        // console.log(player.player.playerName)

    return player.player.playerName;
}

function getAccount(player) {
    return player.player.account;
}

function getGames(player) {
    return player.player.games;
}

module.exports = {getPlayerName, getAccount, getGames}