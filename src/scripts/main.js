var options = {
    difficulty: 'medium',
    bombs: 40,
    tileNumX: 20,
    tileNumY: 15,
}

var difficulties = {
    easy: {
        difficulty: 'easy',
        bombs: 8,
        tileNumX: 12,
        tileNumY: 10,
        },
    medium: {
        difficulty: 'medium',
        bombs: 40,
        tileNumX: 20,
        tileNumY: 15,
        },
    hard: {
        difficulty: 'hard',
        bombs: 200,
        tileNumX: 40,
        tileNumY: 25,
        }

}

jQuery(document).ready(function() {
    $('#play-game').on('click', loadGame);
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
