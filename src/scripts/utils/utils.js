function generateTiles() {
    tileIDs = [];
    let gameElement = $('.game-board');
    for(i=0; i<options.tileNumX; i++) {
        let column = $('<div class="col-wrapper"></div>');
        for(j=0; j<options.tileNumY; j++) {
            var coord = 100*i+j;
            let row = $('<div class="tile" data-coords="'+coord+'"></div>');
            row.appendTo(column);
            tileIDs.push(coord);
        }
        column.appendTo(gameElement);
    }
};

function randomiseBombs() {
    bombIDs.clear();
    var maxID = (options.tileNumX-1)*100+options.tileNumY;
    // Generate a list of valid tile IDs to contain bombs (without duplicates):
    while(bombIDs.size < options.bombs) {
        var num = Math.floor(maxID*Math.random(Math.max(...tileIDs)));
        if($.inArray(num, tileIDs) !== -1) {
            bombIDs.add(num);
        } 
    }
    console.log('bombs: ', bombIDs);
};

function populateNumbers() {
    // First define the object using tile IDs as keys, and instantiate the value as 0:
    for(let tile of tileIDs) {
        var thisVal = {[tile]: 0};
        Object.assign(tileNumVals, thisVal);
    }

    // For each bomb, assign +1 to it's neighbour tiles:
    for(let bomb of bombIDs) {
        var inLeftCol = (bomb < 100);
        var inRightCol = (bomb > ((options.tileNumX-1)*100));
        var inTopRow = (bomb%100 === 0);
        var inBottomRow = ((bomb-(options.tileNumY-1))%100 === 0);

        //Assignment:
        if(!inTopRow) {
            tileNumVals[bomb-1]++;          // above
        }
        if(!inTopRow && !inRightCol) {
            tileNumVals[bomb+99]++;         // above right
        }
        if(!inRightCol) {
            tileNumVals[bomb+100]++;        // right
        }
        if(!inBottomRow && !inRightCol) {
            tileNumVals[bomb+101]++;        // below right
        }
        if(!inBottomRow) {
            tileNumVals[bomb+1]++;          // below
        }
        if(!inBottomRow && !inLeftCol) {
            tileNumVals[bomb-99]++;         // below left
        }
        if(!inLeftCol) {
            tileNumVals[bomb-100]++;        // left
        }
        if(!inTopRow && !inLeftCol) {
            tileNumVals[bomb-101]++;        // above left
        }
    }
};

function setTilesRemaining() {
    var totalTiles = options.tileNumX*options.tileNumY;
    tilesRemaining = totalTiles - options.bombs;
};

function rightClickTile() {
    // event.preventDefault();
    var tile = $(this);
    tile.toggleClass('marked-tile');
    // Needs to return false to prevent default context menu popup on right click:
    return false;
};

function clickTile() {
    // if tile is marked or already revealed, do nothing:
    if($(this).hasClass('marked-tile') || $(this).hasClass('revealed')) {
        return;
    }
    var tileID = Number($(this).data('coords'));
    revealTile(tileID);
};  

function revealTile(tileID) {
    // Get clicked tile:
    var tile = $('.tile[data-coords="'+tileID+'"]')
    
    // If clicked tile has bomb, game over:
    if(bombIDs.has(tileID)) {
        gameOver();

    // else if tile is a 0, then automatically reveal all neighbours:
    } else if(tileNumVals[tileID] === 0) {
        tile.addClass('revealed');
        tilesRemaining--;

        // Reveal neighbours:
        var neighbours = [tileID-1, tileID+99, tileID+100, tileID+101, tileID+1, tileID-99, tileID-100, tileID-101];
        var validNeighbours = [];
        // Only want valid neighbour IDs:
        for(let ID of neighbours) {
            if($.inArray(ID, tileIDs) !== -1) {
                validNeighbours.push(ID);
            }
        }

        for(let neighbour of validNeighbours) {
            // if neighbour has not yet been revealed --> reveal neighbour
            if( !($('.tile[data-coords="'+neighbour+'"]').hasClass('revealed')) ) {   
                    revealTile(neighbour);
                }
        }


    // Else if tile is a number 1-8, reveal this tile's number:
    } else {
        tile.html(tileNumVals[tileID]).addClass('revealed');
        tilesRemaining--;
    }

    // Check for Win condition:
    if(tilesRemaining === 0) {
        gameWin();
    }
};

function gameWin() {
    $('.game-board').off('click','.tile', clickTile);
    alert('YOU WIN!!');
    // show restart button:
    setInterval(function() {
        $('.replay-button-wrapper').html('<button class="replay-button">Play Again?</button>')
    }, 1000);
};

function gameOver() {
    // disable tile click event listener:
    $('.game-board').off('click','.tile', clickTile);

    // show all bombs:
    for(let bomb of bombIDs) { 
        $('.tile[data-coords="'+bomb+'"]').addClass('has-bomb');
    }

    // show Game Over screen with score:
    alert('KABOOM!!!\nGame Over.');

    // show restart button:
    setInterval(function() {
        $('.replay-button-wrapper').html('<button class="replay-button">Play Again?</button>')
    }, 1000);
};

function getOptions() {
    if($('input[name=difficulty]:checked' ).val() === 'easy') {
        options = difficulties.easy;
    } else if ($( 'input[name=difficulty]:checked' ).val() === 'medium') {
        options = difficulties.medium;
    } else if ($( 'input[name=difficulty]:checked' ).val() === 'hard') {
        options = difficulties.hard;
    };
}

function loadGame() {
    console.log('initialising game...');
    getOptions();
    $('.game-board').html('');
    $('.game-board').on('click','.tile', clickTile);
    generateTiles();
    randomiseBombs();
    populateNumbers();
    setTilesRemaining();
    
};
