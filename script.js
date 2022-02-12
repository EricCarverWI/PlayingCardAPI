//<!-- ERIC: created  2/8 -->

//<!-- ERIC: test edit 2/11 -->
console.log ("1HELLO FETCH");
const rootDIV = document.getElementById("root");

let deckBatch = {};
let deckNUM = "new";

fetch ("https://deckofcardsapi.com/api/deck/new/")
    .then(response => response.json())
    .then(data => {
        console.log (data);  //5
        console.log (`data output:`);  //6
        console.log (data);  //7
        deckNUM = data.deck_id;
        console.log (data.deck_id);  //8
        deckNUM = data.deck_id;
        console.log (deckNUM);  //9
        rootDIV.innerText += "\n\n\nDeckID is now:   ";
        rootDIV.innerText += data.deck_id;
    });
    console.log (`2DeckID is: ${deckNUM}`);
    // console.log (data.deck_id);

// fetch (`https://deckofcardsapi.com/api/deck/${data.deck_id}/draw/?count=2`)

console.log (deckBatch);  //3
console.log (deckNUM);//4