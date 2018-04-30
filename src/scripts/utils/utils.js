function generateTiles() {
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
    var maxID = (options.tileNumX-1)*100+options.tileNumY;
    console.log('generating bombs, up to max ID: ', maxID);
    // Generate a list of valid tile IDs to contain bombs (without duplicates):
    while(bombIDs.size < options.bombs) {
        var num = Math.floor(maxID*Math.random(Math.max(...tileIDs)));
        console.log('trying number ',num);
        if($.inArray(num, tileIDs) !== -1) {
            bombIDs.add(num);
        } 
    }
    console.log('all bomb IDs: ', bombIDs);

    // FOR TESTING: assign classes to the bomb tiles:
    // for(var ID of bombIDs) {
    //     console.log('bomb ID: ',ID);
    //     let stringID = String(ID);
    //     console.log('bomb ID as a string: ',stringID);
    //     $('.tile[data-coords="'+stringID+'"]').addClass('has-bomb');
    // };
    console.log('Populating bombIDs COMPLETE! final bombIDs: ', bombIDs.size, bombIDs);
};

function populateNumbers() {
    // First define the object using tile IDs as keys, and instantiate the value as 0:
    for(let tile of tileIDs) {
        var thisVal = {[tile]: 0};
        Object.assign(tileNumVals, thisVal);
    }
    console.log('tileNumVals: ', tileNumVals);  

    // Now for each bomb, assign +1 to it's neighbour tiles:
    for(let bomb of bombIDs) {

        var inLeftCol = (bomb < 100);
        var inRightCol = (bomb > ((options.tileNumX-1)*100));
        var inTopRow = (bomb%100 === 0);
        var inBottomRow = ((bomb-(options.tileNumY-1))%100 === 0);
        console.log('Assignment: Bomb ID ', bomb);
        //Assignment:
        if(!inTopRow) {
            tileNumVals[bomb-1]++;  // above
        }
        if(!inTopRow && !inRightCol) {
            tileNumVals[bomb+99]++;   // above right
        }
        if(!inRightCol) {
            tileNumVals[bomb+100]++;    // right
        }
        if(!inBottomRow && !inRightCol) {
            tileNumVals[bomb+101]++;      // below right
        }
        if(!inBottomRow) {
            tileNumVals[bomb+1]++;         // below
        }
        if(!inBottomRow && !inLeftCol) {
            tileNumVals[bomb-99]++;     // below left
        }
        if(!inLeftCol) {
            tileNumVals[bomb-100]++;      // left
        }
        if(!inTopRow && !inLeftCol) {
            tileNumVals[bomb-101]++;      // above left
        }
        
        console.log('after bomb ', bomb, ' assignment - tileNumVals: ', tileNumVals);
    }
    console.log('post-assignment tileNumVals: ', tileNumVals);
};

function clickTile() {
    var tileID = Number($(this).data('coords'));
    revealTile(tileID);
}


// LOGIC FLAW IN BELOW: Need to figure how neighbour reveal works.
function revealTile(tileID) {
    // Get clicked tile ID:
    var tile = $('.tile[data-coords="'+tileID+'"]')
    // tile.addClass

    //populate with tileNum:
    console.log('this pressed tile has ID: ', tileID, ', and number should be: ', tileNumVals[tileID]);
    
    // If clicked tile has bomb, game over:
    if(bombIDs.has(tileID)) {
        console.log('ka-BOOM!!!!!');
        gameOver();
    // else if tile is a 0, then reveal all non-bomb neighbours:
    } else if(tileNumVals[tileID] === 0) {
        // Reveal, with no number on screen:
        tile.addClass('revealed');
        // Then, reveal neighbours:
        
        //List all neighbours, and refine to only valid tile IDs:
        var neighbours = [tileID-1, tileID+99, tileID+100, tileID+101, tileID+1, tileID-99, tileID-100, tileID-101];
        var validNeighbours = [];
        for(let ID of neighbours) {
            if($.inArray(ID, tileIDs) !== -1) {
                validNeighbours.push(ID);
            }
        }
        console.log('0 tile clicked. Valid neighbours: ', validNeighbours);

        for(let neighbour of validNeighbours) {
            // if (<neighbour has not yet been revealed> && <neighbour is not a bomb>) {clickTile(neighbour ID)}
            if( !($('.tile[data-coords="'+neighbour+'"]').hasClass('revealed')) && !bombIDs.has(tileID) ) {
                // $('.tile[data-coords="'+neighbour+'"]').addClass('revealed');    
                    revealTile(neighbour);
                }
        }


    // Else if tile is a number 1-8, reveal this tile's number:
    } else {
        tile.html(tileNumVals[tileID]).addClass('revealed');
    }
};

function gameOver() {
    // <disable click event listener with off() method.>

    // <show all bombs>
    for(let bomb of bombIDs) {
        // $('.tile[data-coords="'+neighbour+'"]').addClass('revealed');    
        $('.tile[data-coords="'+bomb+'"]').addClass('has-bomb');
    }

    // <show Game Over screen with score>
    alert('ka-BOOM!!!!!');

    // <show restart button.>
    
};