jQuery(document).ready(function() {
    console.log('options: ',options);
    generateTiles();
    randomiseBombs();
});

var options = {
    bombs: 3,
    tileNumX: 7,
    tileNumY: 7,
    // tileNumTotal: (this.tileNumX*this.tileNumY),
}

var tileIDs = [];
// Defined as a set to prevent duplicates in Utils.randomiseBombs()
var bombIDs = new Set([]);