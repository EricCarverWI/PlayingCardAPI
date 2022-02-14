//<!-- ERIC: created  2/13  testing local storage - WORKS but double?-->
    if (localStorage.clickcount) {
        localStorage.clickcount ++;
    } else {
    localStorage.clickcount = 1;
    }
    console.log (`ClickCount is: ${localStorage.clickcount}`);

    
//<!-- ERIC: test edit 2/11 -- TEST functionality + output to index.html>
    console.log ("1HELLO FETCH");
    const rootDIV = document.getElementById("root");

//<!-- ERIC: test edit 2/13 -- working loadNewDeck saves in object>
    const loadNewDeck = async () => {
        try {
            const res = await fetch (`https://deckofcardsapi.com/api/deck/new/`);
            const data = await res.json();
            return (data);
        }catch(err){
            console.log (err);
        }
    };
    console.log (loadNewDeck());