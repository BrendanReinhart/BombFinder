var options = {
    bombs: 30,
    tileNumX: 20,
    tileNumY: 15,
}

jQuery(document).ready(function() {
    loadGame();
});

var tileIDs = [];
// bombIDs defined as a Set to prevent duplicates in Utils.randomiseBombs()
var bombIDs = new Set([]);
var tileNumVals = {};
var tilesRemaining = 0;

// Event Handlers. NB: tile click on/off are handled in loadGame() and gameOver()/gameWin() respectively.
$('.game-board').on('contextmenu', '.tile', rightClickTile)
$('.button-wrapper').on('click', '.replay-button', loadGame)

// TODO (maybe): fix bug where if user wins on first click, win condition loops infinitely.
