var options = {
    bombs: 10,
    tileNumX: 15,
    tileNumY: 15,
}

jQuery(document).ready(function() {
    console.log('options: ',options);
    generateTiles();
    randomiseBombs();
    populateNumbers();
    setTilesRemaining();
});

var tileIDs = [];
// Defined as a set to prevent duplicates in Utils.randomiseBombs()
var bombIDs = new Set([]);
var tileNumVals = {};
var tilesRemaining = 0;

$('.game-board').on('click','.tile', clickTile);

$('.game-board').on('contextmenu', '.tile', rightClickTile)
    // ev.preventDefault();
    // alert('success!');
    // return false;);