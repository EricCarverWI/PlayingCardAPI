//Storage Arrays
    var gameDecksHistory = [];   //tracks all decks used since game load
    var handWinHistory = [];        //tracks all hand statistics for report menu
//Flags for access
    var flagLiveDeck = false;    //tracks whether a deck has been generated
    var activeHand = false;      //tracks whether hand has been dealt and player is active
    var handCompleted = false       //tracks whether current hand is complete
    var scoreTabulated = false;  //tracks whether a closed hand had score tracked
    var flagReportWindowClosed = true;  //tracks current status of report window (open or closed)
//Score tracker
    var handCounter = 0;        //tracks total hands played
    var counterHuman = 0;       //tracks player points
    var counterComputer = 0;    //tracks computer points
//DOM elements for Hand Value and Hand Card Contents
    const handHuman = document.getElementById("you");
    const handHumanCards = document.getElementById("'yourArr");
    const handComputer = document.getElementById("dealer");
    const handComputerCards = document.getElementById("'dealerArr");
//DOM elements for Results / Info 
    const resultsHuman = document.getElementById("resultHUM");
    const resultsComputer = document.getElementById("resultCOMP");
    const gamesCounter = document.getElementById("COUNT");
        gamesCounter.innerHTML = handCounter;
//DOM Declaration of Buttons
    const buttonDeck = document.getElementById("deckButton");
    const buttonReport = document.getElementById("reportButton");
//DOM Declaration of DIVs
    const divReport =  document.getElementById("reportDiv");
    var scoreHuman = document.getElementById("HUMW");
        scoreHuman.innerText = 0;
    var scoreComputer = document.getElementById("COMPW");
        scoreComputer.innerText = 0;
    var deckReminder = false;

//Generate an API deck and saves WHOLE DECK to Array
    const generateNewDeck = async () => {
            //new object for storage
            let newDeck = {};
            buttonDeck.innerText = 'Obtaining new deck Plz Wait..';
            try {
                const res = await fetch (`https://www.deckofcardsapi.com/api/deck/new/draw/?count=52`);
                newDeck = await res.json();
                gameDecksHistory.unshift(newDeck);
                console.log ("this is the newDeck:", newDeck);
                buttonDeck.innerText = (`SUCCESS: deck#: ${gameDecksHistory[0].deck_id}, cards left: ${gameDecksHistory[0].cards.length} ***`);
                flagLiveDeck = true;  //Ready to play
                activeHand = false;
                handCompleted = false;
                // document.getElementById("buttonDeal").setAttribute("class", "btn btn-primary btn");
            }catch(err){
                console.log (err);
            }
    };

    function GenerateNewGame(){
        if (flagLiveDeck === true && gameDecksHistory[0].cards.length > 25){       //only allows a deal IF API works
            activeHand = true;
            scoreTabulated = false;
            handCompleted = false;
            handCounter +=1;
            resultsHuman.innerHTML = "";
            resultsComputer.innerHTML = "";
            gamesCounter.innerHTML = handCounter;
            handComputer.value = 0;
            handHuman.value = 0;

            let cardDealerNEWFirst = returnNewCardFromDeck();
                console.log (`This is after the first dealer card: ${cardDealerNEWFirst.code}`);
            let cardHumanNEWFirst = returnNewCardFromDeck();
                console.log ("This is after the first human card: ", cardHumanNEWFirst.code);
            let cardHumanNEWSecond = returnNewCardFromDeck();
                console.log ("This is after the second human card: ", cardHumanNEWSecond.code);

            handComputer.value = returnNewCardValue(cardDealerNEWFirst);                //cardDealerFirst;
            handComputerCards.value = (`[${returnNewCardInitial(cardDealerNEWFirst)}${returnNewCardSuit(cardDealerNEWFirst)}]`);   //(`[${cardDealerFirst}]`);
            handHuman.value = returnNewCardValue(cardHumanNEWFirst) + returnNewCardValue(cardHumanNEWSecond); //cardHumanFirst + cardHumanSecond;
            handHumanCards.value = (`[${returnNewCardInitial(cardHumanNEWFirst)}${returnNewCardSuit(cardHumanNEWFirst)}] [${returnNewCardInitial(cardHumanNEWSecond)}${returnNewCardSuit(cardHumanNEWSecond)}]`);
///////BLACKJACK TEST
            if (handHuman.value == "21"){
                counterHuman += 1;
                activeHand = false;
                resultsHuman.innerHTML = "YOU WIN!";
                resultsComputer.innerHTML = "BLACKJACK!!";
                scoreTabulated = true;
                tabulateHandHistory();
            }
        } else if (flagLiveDeck === true){
            if (deckReminder == false){
                buttonDeck.innerText = (`TOO FEW CARDS REMAINING: deck#: ${gameDecksHistory[0].deck_id}, cards left: ${gameDecksHistory[0].cards.length} ***`);
                deckReminder = true;
            } else {
                buttonDeck.innerText = (`NEED TO RESHUFFLE: deck#: ${gameDecksHistory[0].deck_id}, cards left: ${gameDecksHistory[0].cards.length} ***`);
                deckReminder = false;
            }
        }
    }

    function HUMAN(){
        if (activeHand===true && flagLiveDeck===true && handCompleted === false){
            let humanNewCard = returnNewCardFromDeck();
            console.log (`This is after the NEW humanNewCard: ${humanNewCard.code}`);
    
//checks to see if the next card is an Ace value 11 and would break them - if so reduce ace to Ace value 01
            let newCardValue = returnNewCardValue(humanNewCard);
            if (newCardValue===11 && Number(handHuman.value)>10){
                newCardValue = 1;
            }
    
            handHuman.value = Number(handHuman.value) + newCardValue;  //newCard;
            handHumanCards.value += (` [${returnNewCardInitial(humanNewCard)}${returnNewCardSuit(humanNewCard)}]`);     
            if(handHuman.value > 21){
                counterComputer += 1;
                scoreComputer.innerHTML = counterComputer;
                resultsComputer.innerHTML = "PC WIN";
                resultsHuman.innerHTML = "YOU BUSTED";
                activeHand = false;
                scoreTabulated=true;
                tabulateHandHistory();
            }
        }
    }

    function COMPUTER(){
        if (activeHand===true && flagLiveDeck===true){
            while(handComputer.value < 17){
                let computerNewCard = returnNewCardFromDeck();
                console.log (`This is after the NEW computer card: ${computerNewCard.code}`);

//checks to see if the next card is an Ace value 11 and would break them - if so reduce ace to Ace value 01
                let newCardValue = returnNewCardValue(computerNewCard);
                if (newCardValue===11 && Number(handHuman.value)>10){
                    newCardValue = 1;
                }                
                handComputer.value = Number(handComputer.value) + newCardValue; 
                handComputerCards.value += (` [${returnNewCardInitial(computerNewCard)}${returnNewCardSuit(computerNewCard)}]`);
            }
            activeHand = false;
            handCompleted = true;
        }        
    }

    function determineWinner(){
        if (activeHand===false && scoreTabulated===false && flagLiveDeck===true && handCompleted === true){
            let a = Number(handHuman.value);
            let b = Number(handComputer.value);
            scoreTabulated = true;
            if(b > 21){
                counterHuman += 1;
                scoreHuman.innerHTML = counterHuman;
                resultsHuman.innerHTML = "YOU WIN";
                tabulateHandHistory();
                return;
            } else if(a==b){
                counterHuman += 0.5;
                counterComputer += 0.5;
                scoreHuman.innerHTML = counterHuman;
                scoreComputer.innerHTML = counterComputer;
                resultsHuman.innerHTML = "TIE";
                resultsComputer.innerHTML = "TIE";
                tabulateHandHistory();
            } else if(a>b){
                counterHuman += 1;
                scoreHuman.innerHTML = counterHuman;
                resultsHuman.innerHTML = "YOU WIN";
                tabulateHandHistory();
            } else if(b>a){
                counterComputer += 1;
                scoreComputer.innerHTML = counterComputer;
                resultsComputer.innerHTML = "PC WIN";
                tabulateHandHistory();
            }
        }
    }

    function returnNewCardFromDeck(){
        let newCardObj = gameDecksHistory[0].cards.pop();
        buttonDeck.innerText = (`IN PLAY: deck#: ${gameDecksHistory[0].deck_id}, cards left: ${gameDecksHistory[0].cards.length} ***`);
        return newCardObj;
    }

    function returnNewCardValue(obj){
        switch (obj.value){
            case "ACE": return 11;
            case "KING": return 10;
            case "QUEEN": return 10;
            case "JACK": return 10;
            case "10": return 10;
            case "9": return 9;
            case "8": return 8;
            case "7": return 7;
            case "6": return 6;
            case "5": return 5;
            case "4": return 4;
            case "3": return 3;
            case "2": return 2;
            default: return -1;
        }
    }

    function returnNewCardInitial(obj){
        switch (obj.value){
            case "ACE": return "A";
            case "KING": return "K";
            case "QUEEN": return "Q";
            case "JACK": return "J";
            case "10": return "10";
            case "9": return "9";
            case "8": return "8";
            case "7": return "7";
            case "6": return "6";
            case "5": return "5";
            case "4": return "4";
            case "3": return "3";
            case "2": return "2";
            default: return -1;
        }
    }

    function returnNewCardSuit(obj){
        switch (obj.suit){
            case "CLUBS": return "♣";
            case "HEARTS": return "♥";
            case "DIAMONDS": return "♦";
            case "SPADES": return "♠";
            default: return -1;
        }
    }

    function generateReport(){
        if (flagReportWindowClosed == true){
            divReport.innerText = "";

            handWinHistory.forEach(element => {
                divReport.innerText += element;
            });
            
            //"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna. Nunc viverra imperdiet enim. Fusce est. Vivamus a tellus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin pharetra nonummy pede. Mauris et orci. Aenean nec lorem. In porttitor. Donec laoreet nonummy augue. Suspendisse dui purus, scelerisque at, vulputate vitae, pretium mattis, nunc. Mauris eget neque at sem venenatis eleifend. Ut nonummy.";
            buttonReport.innerText = "click to retract report info!";
            flagReportWindowClosed = false;
        } else {
            buttonReport.innerText = "click to expand report info!";
            divReport.innerText = "";
            flagReportWindowClosed = true;
        }
    }

    function tabulateHandHistory(){
        handWinHistory.unshift(`${gameDecksHistory[0].deck_id}> \n\thuman: ${Number(handHuman.value)}-${document.getElementById("'yourArr").value} \n\t\tvs \n\t\t\tcomputer: ${handComputer.value}-${handComputerCards.value}\n\n`);
    }

