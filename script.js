//<!-- ERIC: created  2/8 -->

//<!-- ERIC: test edit 2/11 -->
console.log ("1HELLO FETCH");
const rootDIV = document.getElementById("root");

let deckBatch = {new : "new"};
let deckNUM = "new";

async function fetchDeckJSON(){
    const response = await fetch ("https://deckofcardsapi.com/api/deck/new/");
    const fetchDeckJSONdata = await response.json();
    return fetchDeckJSONdata;
}

fetchDeckJSON().then( data =>{
    console.log(1);
    deckNUM = data.deck_id;
    console.log (deckNUM);
    console.log (2);
    deckBatch = data;
    console.log (deckBatch);
    console.log (3);
    rootDIV.innerText += "\n\n\nDeckID is now:   ";
    rootDIV.innerText += deckNUM;
    console.log (deckBatch);
    console.log (deckBatch.deck_id);
});


// fetch ("https://deckofcardsapi.com/api/deck/new/")
//     .then(response => response.json())
//     .then(data => {
//         rootDIV.innerText += "\n\n\nDeckID is now:   ";
//         rootDIV.innerText += data.deck_id;
//         console.log (1);
//         console.log (data);  //GOOD
//         console.log (2);
//         deckBatch = data;  //
//         console.log (deckBatch);  //good
//         console.log (3);
//         deckNUM = data.deck_id;
//         console.log (deckNUM);
//         console.log (4);
//         console.log (`3DeckOutput: ${deckNUM}`);
//         console.log (5);

//     });

//     console.log (11);
//     console.log (deckBatch);
//     console.log (12);

// fetch (`https://deckofcardsapi.com/api/deck/${data.deck_id}/draw/?count=2`)

// console.log (deckBatch);  //3
// console.log (deckNUM);//4