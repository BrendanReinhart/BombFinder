function generateTiles() {
    let gameElement = $('.game-board');
    for(i=0; i<options.tileNumX; i++) {
        let column = $('<div class="col-wrapper"></div>');
        for(j=0; j<options.tileNumY; j++) {
            let row = $('<div class="tile" data-coords="'+i+j+'"></div>');
            row.appendTo(column);
            tileIDs.push(10*i+j);
        }
        column.appendTo(gameElement);
    }

};

function randomiseBombs() {
    var tilenum = options.tileNumX*options.tileNumY;

    // Use this to determine if newly-created random number is in the tile ID array, ie, is assignable to a tile by its ID:
    while(bombIDs.size < options.bombs) {
        var num = Math.floor(tilenum*Math.random(Math.max(...tileIDs)));
        console.log('trying number ',num);
        if($.inArray(num, tileIDs) !== -1) {
            bombIDs.add(num);
            console.log()
        } 
    }

    // For proofing, assign classes to the bomb tiles:
    for(var ID of bombIDs) {
        console.log('bomb ID: ',ID);
        let stringID = String(ID);
        console.log('bomb ID as a string: ',stringID);

        if (stringID.length == 1) {
            $('.tile[data-coords="0'+stringID+'"]').addClass('has-bomb');
        } else {
            $('.tile[data-coords="'+stringID+'"]').addClass('has-bomb');
        }
    };

    console.log('Populating bombIDs COMPLETE! final bombIDs: ', bombIDs.size, bombIDs);
}