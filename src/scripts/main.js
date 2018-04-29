var options = {
    bombs: 10,
    tileNumX: 8,
    tileNumY: 7,
}

jQuery(document).ready(function() {
    console.log('options: ',options);
    generateTiles();
    randomiseBombs();
    populateNumbers();
});

var tileIDs = [];
// Defined as a set to prevent duplicates in Utils.randomiseBombs()
var bombIDs = new Set([]);
var tileNumVals = {};

$('.game-board').on('click','.tile', revealTile);